import { describe, expect, it, vi } from 'vitest';
import {
  main,
  parseBootstrapMode,
  runDirectExecution,
  runBootstrap,
} from '../bootstrap-sanity.mjs';

const targetEnvironment = {
  SANITY_STUDIO_PROJECT_ID: 'project123',
  SANITY_STUDIO_DATASET: 'production',
  SANITY_PROJECT_ID: 'project123',
  SANITY_DATASET: 'production',
  SANITY_API_VERSION: '2026-08-20',
  SANITY_AUTH_TOKEN: 'must-never-be-printed',
};

const bootstrapIds = [
  'seed-post-fssai-labelling-requirements-checklist-2026',
  'seed-post-legal-metrology-packaged-commodity-rules-india',
];

function createFakeClient({
  config = {
    projectId: 'project123',
    dataset: 'production',
    apiVersion: '2026-08-20',
  },
  response = {
    transactionId: 'must-never-be-printed',
    results: [
      { operation: 'create' },
      { operation: 'create' },
    ],
  },
  documents = [null, null],
} = {}) {
  const transaction = {
    createIfNotExists: vi.fn(() => transaction),
    commit: vi.fn(async () => response),
  };
  const client = {
    config: vi.fn(() => config),
    getDocuments: vi.fn(async () => documents),
    transaction: vi.fn(() => transaction),
  };
  return { client, transaction };
}

describe('Sanity transaction bootstrap', () => {
  it('is dry-run by default and accepts only an explicit apply flag', () => {
    expect(parseBootstrapMode([])).toBe('dry-run');
    expect(parseBootstrapMode(['--apply'])).toBe('apply');
    expect(() => parseBootstrapMode(['--replace'])).toThrow(/exactly --apply/);
    expect(() => parseBootstrapMode(['--apply', '--apply'])).toThrow(/exactly --apply/);
  });

  it.each([
    ['dry-run', true],
    ['apply', false],
  ])('uses one missing-only createIfNotExists transaction in %s mode', async (mode, dryRun) => {
    const { client, transaction } = createFakeClient();
    const summary = await runBootstrap({
      client,
      env: targetEnvironment,
      mode,
    });

    expect(client.getDocuments).toHaveBeenCalledTimes(1);
    expect(client.getDocuments).toHaveBeenCalledWith(bootstrapIds);
    expect(client.transaction).toHaveBeenCalledTimes(1);
    expect(transaction.createIfNotExists).toHaveBeenCalledTimes(2);
    expect(transaction.createIfNotExists.mock.calls.map(([document]) => document.slug.current)).toEqual([
      'fssai-labelling-requirements-checklist-2026',
      'legal-metrology-packaged-commodity-rules-india',
    ]);
    expect(transaction.commit).toHaveBeenCalledWith({
      dryRun,
      returnDocuments: false,
      visibility: 'sync',
    });
    expect(summary).toEqual({
      mode,
      requested: 2,
      existingCount: 0,
      missingCount: 2,
      resultCount: 2,
      transactionSubmitted: true,
      transactionAccepted: true,
    });
  });

  it('returns without a transaction when both compliance documents already exist', async () => {
    const existingDocuments = bootstrapIds.map((_id) => ({
      _id,
      _type: 'blogPost',
      title: 'Editor-owned title',
    }));
    const { client, transaction } = createFakeClient({
      documents: existingDocuments,
    });

    const summary = await runBootstrap({
      client,
      env: targetEnvironment,
      mode: 'apply',
    });

    expect(client.getDocuments).toHaveBeenCalledTimes(1);
    expect(client.getDocuments).toHaveBeenCalledWith(bootstrapIds);
    expect(client.transaction).not.toHaveBeenCalled();
    expect(transaction.createIfNotExists).not.toHaveBeenCalled();
    expect(transaction.commit).not.toHaveBeenCalled();
    expect(summary).toEqual({
      mode: 'apply',
      requested: 2,
      existingCount: 2,
      missingCount: 0,
      resultCount: 0,
      transactionSubmitted: false,
      transactionAccepted: false,
    });
  });

  it('submits only the missing document for a partial direct state', async () => {
    const { client, transaction } = createFakeClient({
      documents: [
        { _id: bootstrapIds[0], _type: 'blogPost' },
        null,
      ],
      response: {
        transactionId: 'must-never-be-printed',
        results: [{ operation: 'create' }],
      },
    });

    const summary = await runBootstrap({
      client,
      env: targetEnvironment,
      mode: 'dry-run',
    });

    expect(client.transaction).toHaveBeenCalledTimes(1);
    expect(transaction.createIfNotExists).toHaveBeenCalledTimes(1);
    expect(transaction.createIfNotExists.mock.calls.map(([d]) => d.slug.current)).toEqual([
      'legal-metrology-packaged-commodity-rules-india',
    ]);
    expect(summary).toEqual({
      mode: 'dry-run',
      requested: 2,
      existingCount: 1,
      missingCount: 1,
      resultCount: 1,
      transactionSubmitted: true,
      transactionAccepted: true,
    });
  });

  it.each([
    ['a malformed result length', { documents: [null] }],
    ['an undefined result', { documents: undefined }],
    ['an undefined entry', { documents: [undefined, null] }],
    ['a sparse result', { documents: new Array(2) }],
    ['a mismatched result ID', {
      documents: [
        { _id: 'wrong-document-id', _type: 'blogPost' },
        null,
      ],
    }],
  ])('stops before a transaction when direct preflight returns %s', async (_label, options) => {
    const { client } = createFakeClient(options);
    if (options.documents === undefined) client.getDocuments.mockResolvedValue(undefined);

    await expect(runBootstrap({
      client,
      env: targetEnvironment,
      mode: 'apply',
    })).rejects.toThrow(/direct document preflight/);

    expect(client.getDocuments).toHaveBeenCalledTimes(1);
    expect(client.transaction).not.toHaveBeenCalled();
  });

  it('stops before a transaction when Studio/build/client targets disagree', async () => {
    const { client } = createFakeClient({
      config: {
        projectId: 'different-project',
        dataset: 'production',
        apiVersion: '2026-08-20',
      },
    });

    await expect(runBootstrap({
      client,
      env: targetEnvironment,
      mode: 'dry-run',
    })).rejects.toThrow(/target configuration does not match/);
    expect(client.transaction).not.toHaveBeenCalled();
  });

  it('rejects an incomplete transaction response', async () => {
    const { client } = createFakeClient({
      response: { transactionId: 'redacted', results: [{}] },
    });
    await expect(runBootstrap({
      client,
      env: targetEnvironment,
      mode: 'dry-run',
    })).rejects.toThrow(/mutation response count did not match the missing document count/);
  });

  it('rejects an overcounted partial response with a count-neutral internal error', async () => {
    const { client } = createFakeClient({
      documents: [
        { _id: bootstrapIds[0], _type: 'blogPost' },
        null,
      ],
      response: {
        transactionId: 'redacted',
        results: [
          { operation: 'create' },
          { operation: 'create' },
        ],
      },
    });

    await expect(runBootstrap({
      client,
      env: targetEnvironment,
      mode: 'apply',
    })).rejects.toThrow(/mutation response count did not match the missing document count/);
  });

  it('gets the CLI client with the environment API version and prints only a sanitized summary', async () => {
    const { client } = createFakeClient();
    const getClient = vi.fn(() => client);
    let output = '';

    await main({
      argv: [],
      env: targetEnvironment,
      getClient,
      write: (value) => { output += value; },
    });

    expect(getClient).toHaveBeenCalledWith({ apiVersion: '2026-08-20' });
    expect(JSON.parse(output)).toEqual({
      mode: 'dry-run',
      requested: 2,
      existingCount: 0,
      missingCount: 2,
      resultCount: 2,
      transactionSubmitted: true,
      transactionAccepted: true,
    });
    expect(output).not.toMatch(/project123|must-never-be-printed|seed-post|coordinating-brand/);
  });

  it('sanitizes direct-execution failures without leaking error details', async () => {
    const { client, transaction } = createFakeClient();
    transaction.commit.mockRejectedValue(new Error(
      'sentinel-project sentinel-document sentinel-transaction sentinel-token',
    ));
    let stdout = '';
    let stderr = '';
    let exitCode = 0;

    const result = await runDirectExecution({
      argv: [],
      env: targetEnvironment,
      getClient: () => client,
      write: (value) => { stdout += value; },
      writeError: (value) => { stderr += value; },
      setExitCode: (value) => { exitCode = value; },
    });

    expect(result).toBeUndefined();
    expect(stdout).toBe('');
    expect(stderr).toBe('Sanity bootstrap failed.\n');
    expect(exitCode).toBe(1);
    expect(`${stdout}${stderr}`).not.toMatch(
      /sentinel-project|sentinel-document|sentinel-transaction|sentinel-token/,
    );
  });

  it('rejects a 1-document count in runBootstrap contract check', async () => {
    const { client } = createFakeClient();
    await expect(runBootstrap({
      client,
      env: targetEnvironment,
      documents: [{ _id: 'seed-1', _type: 'blogPost' }],
      mode: 'dry-run',
    })).rejects.toThrow(/Sanity bootstrap contract is invalid/);
  });

  it('rejects a 4-document count in runBootstrap contract check', async () => {
    const { client } = createFakeClient();
    await expect(runBootstrap({
      client,
      env: targetEnvironment,
      documents: [
        { _id: 'seed-1', _type: 'blogPost' },
        { _id: 'seed-2', _type: 'blogPost' },
        { _id: 'seed-3', _type: 'blogPost' },
        { _id: 'seed-4', _type: 'blogPost' },
      ],
      mode: 'dry-run',
    })).rejects.toThrow(/Sanity bootstrap contract is invalid/);
  });
});
