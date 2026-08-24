import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { blogPost } from './sanity/schemas/blogPost';
import { readSanityEnvironment } from './sanity/env.js';

const { projectId, dataset } = readSanityEnvironment();

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
