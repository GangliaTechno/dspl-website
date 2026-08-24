import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { createSanityImportDocuments } from './create-sanity-import.mjs';

function readBootstrapTarget(env) {
  const projectId = env.SANITY_PROJECT_ID?.trim();
  const dataset = env.SANITY_DATASET?.trim();
  const apiVersion = env.SANITY_API_VERSION?.trim();
  const studioProjectId = env.SANITY_STUDIO_PROJECT_ID?.trim();
  const studioDataset = env.SANITY_STUDIO_DATASET?.trim();

  if (!projectId || !dataset || !apiVersion || !studioProjectId || !studioDataset) {
    throw new Error('Required Sanity bootstrap environment is missing.');
  }
  if (projectId !== studioProjectId || dataset !== studioDataset || dataset !== 'production') {
    throw new Error('Sanity bootstrap target configuration does not match.');
  }
  return { projectId, dataset, apiVersion };
}

export function parseBootstrapMode(argv = process.argv.slice(2)) {
  if (argv.length === 0) return 'dry-run';
  if (argv.length === 1 && argv[0] === '--apply') return 'apply';
  throw new Error('Sanity bootstrap accepts no arguments or exactly --apply.');
}

export async function runBootstrap({
  client,
  documents = createSanityImportDocuments(),
  env = process.env,
  mode = 'dry-run',
}) {
  const target = readBootstrapTarget(env);
  const clientConfig = client.config();
  if (
    clientConfig.projectId !== target.projectId
    || clientConfig.dataset !== target.dataset
    || clientConfig.apiVersion !== target.apiVersion
  ) {
    throw new Error('Sanity bootstrap target configuration does not match.');
  }
  if (!['dry-run', 'apply'].includes(mode) || !Array.isArray(documents) || documents.length !== 4) {
    throw new Error('Sanity bootstrap contract is invalid.');
  }

  const ids = documents.map((document) => document?._id);
  if (ids.some((id) => typeof id !== 'string' || id.length === 0)) {
    throw new Error('Sanity bootstrap document IDs are invalid.');
  }

  const directDocuments = await client.getDocuments(ids);
  const hasExpectedDirectResultShape = Array.isArray(directDocuments)
    && directDocuments.length === ids.length;
  if (!hasExpectedDirectResultShape) {
    throw new Error('Sanity bootstrap direct document preflight returned an unexpected result.');
  }
  for (let index = 0; index < ids.length; index += 1) {
    if (!Object.prototype.hasOwnProperty.call(directDocuments, index)) {
      throw new Error('Sanity bootstrap direct document preflight returned an unexpected result.');
    }
    const document = directDocuments[index];
    if (
      document !== null
      && (
        typeof document !== 'object'
        || Array.isArray(document)
        || document._id !== ids[index]
      )
    ) {
      throw new Error('Sanity bootstrap direct document preflight returned an unexpected result.');
    }
  }

  const existingCount = directDocuments.length - directDocuments.filter((document) => document === null).length;
  const missingDocuments = documents.filter((_document, index) => directDocuments[index] === null);
  const missingCount = missingDocuments.length;
  if (missingCount === 0) {
    return {
      mode,
      requested: documents.length,
      existingCount,
      missingCount,
      resultCount: 0,
      transactionSubmitted: false,
      transactionAccepted: false,
    };
  }

  const transaction = client.transaction();
  for (const document of missingDocuments) transaction.createIfNotExists(document);
  const response = await transaction.commit({
    dryRun: mode === 'dry-run',
    returnDocuments: false,
    visibility: 'sync',
  });
  const resultCount = Array.isArray(response?.results) ? response.results.length : -1;
  const transactionAccepted = typeof response?.transactionId === 'string'
    && response.transactionId.length > 0;
  if (!transactionAccepted || resultCount !== missingCount) {
    throw new Error('Sanity bootstrap mutation response count did not match the missing document count.');
  }

  return {
    mode,
    requested: documents.length,
    existingCount,
    missingCount,
    resultCount,
    transactionSubmitted: true,
    transactionAccepted,
  };
}

export async function main({
  argv = process.argv.slice(2),
  env = process.env,
  getClient,
  write = (value) => process.stdout.write(value),
} = {}) {
  const mode = parseBootstrapMode(argv);
  const { apiVersion } = readBootstrapTarget(env);
  const getAuthenticatedClient = getClient ?? (await import('sanity/cli')).getCliClient;
  const client = getAuthenticatedClient({ apiVersion });
  const summary = await runBootstrap({ client, env, mode });
  write(`${JSON.stringify(summary)}\n`);
  return summary;
}

export async function runDirectExecution({
  argv,
  env,
  getClient,
  write = (value) => process.stdout.write(value),
  writeError = (value) => process.stderr.write(value),
  setExitCode = (value) => { process.exitCode = value; },
} = {}) {
  try {
    return await main({ argv, env, getClient, write });
  } catch {
    writeError('Sanity bootstrap failed.\n');
    setExitCode(1);
    return undefined;
  }
}

const isDirectExecution = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) await runDirectExecution();
