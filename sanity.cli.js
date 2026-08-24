import { defineCliConfig } from 'sanity/cli';
import { readSanityEnvironment } from './sanity/env.js';

const { projectId, dataset } = readSanityEnvironment();

export default defineCliConfig({
  api: { projectId, dataset },
});
