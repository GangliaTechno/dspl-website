/* global process */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { blogPost } from './sanity/schemas/blogPost';
import { readSanityEnvironment } from './sanity/env.js';

const { projectId, dataset } = readSanityEnvironment({
  SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
  SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
});

export default defineConfig({
  name: 'dspl-insights',
  title: 'DSPL Insights Studio',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: [blogPost],
  },
});
