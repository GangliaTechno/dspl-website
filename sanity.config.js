import process from 'node:process';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { blogPost } from './sanity/schemas/blogPost';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'dummy-project-id';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

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
