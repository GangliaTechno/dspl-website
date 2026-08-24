import process from 'node:process';
import { defineCliConfig } from 'sanity/cli';
import { readSanityEnvironment } from './sanity/env.js';

const { projectId, dataset } = readSanityEnvironment(process.env);

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    appId: 'j2rcsz1kc9nebl9n1ga0o01j',
  },
});
