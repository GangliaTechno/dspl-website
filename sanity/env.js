import process from 'node:process';

const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);

const trimEnvironmentValue = (value) => (typeof value === 'string' ? value.trim() : '');

export function readSanityEnvironment(env = process.env, options = {}) {
  const projectId = trimEnvironmentValue(env.SANITY_STUDIO_PROJECT_ID);
  const dataset = trimEnvironmentValue(env.SANITY_STUDIO_DATASET);
  const missing = [
    !projectId && 'SANITY_STUDIO_PROJECT_ID',
    !dataset && 'SANITY_STUDIO_DATASET',
  ].filter(Boolean);

  if (missing.length > 0) {
    throw new Error(
      `${missing.join(' and ')} must be set in ignored .env.local before running Sanity Studio or project CLI commands.`,
    );
  }

  if (dataset !== 'production') {
    throw new Error('SANITY_STUDIO_DATASET must be exactly production.');
  }

  const hasBuildProjectMirror = hasOwn(options, 'buildProjectId') || hasOwn(env, 'SANITY_PROJECT_ID');
  const hasBuildDatasetMirror = hasOwn(options, 'buildDataset') || hasOwn(env, 'SANITY_DATASET');
  const buildProjectId = trimEnvironmentValue(
    hasOwn(options, 'buildProjectId') ? options.buildProjectId : env.SANITY_PROJECT_ID,
  );
  const buildDataset = trimEnvironmentValue(
    hasOwn(options, 'buildDataset') ? options.buildDataset : env.SANITY_DATASET,
  );

  if (hasBuildProjectMirror && buildProjectId && buildProjectId !== projectId) {
    throw new Error('Sanity Studio and build project IDs must match.');
  }
  if (hasBuildDatasetMirror && buildDataset && buildDataset !== dataset) {
    throw new Error('Sanity Studio and build datasets must match.');
  }

  return { projectId, dataset };
}
