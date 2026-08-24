# DSPL Sanity Insights Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. The approved implementation worker is `bounded_implementer` on `gpt-5.6-luna` at `max`; keep one writer active and send the completed diff to a fresh `independent_reviewer` on Sol/high.

**Goal:** Connect the existing static DSPL Insights pipeline to a new public Sanity `production` dataset, safely bootstrap the two approved articles, and verify local Studio authoring plus fail-closed production snapshots without changing public routes or UI.

**Architecture:** Keep Sanity Studio at the repository root and use the existing `blogPost` schema. The authoritative bootstrap uses the installed first-party `sanity exec --with-user-token` surface: it performs a direct `getDocuments(ids)` preflight, defaults to a dry-run, accepts only explicit `-- --apply` for live execution, and creates only missing records with `createIfNotExists`. When both fixed IDs exist, it constructs and submits no transaction. Continue serving only generated build-time snapshots; make strict builds fail closed while retaining explicit fallback commands and warning-backed local fallback behavior.

**Tech Stack:** Node.js `>=22.22.0`, npm on Windows via `npm.cmd`, Sanity Studio 6.10.1 / local Sanity CLI, `@sanity/client` 8.2.0, Vitest 4.1.10, Vite 8.0.12, PowerShell.

## Authority and precedence

The current implementation, the approved Task 5C/5D/5E/5F/5G sections below,
and fresh release-gate evidence are authoritative for the active setup. They
supersede earlier bootstrap instructions when wording conflicts. Task 5B's
bulk-import/NDJSON path is retained as explicitly labeled diagnostic history
only; it is not the current command, architecture, or rerun procedure.

The active bootstrap contract is authenticated `sanity exec --with-user-token`,
direct `getDocuments(ids)` preflight, default dry-run, explicit
`-- --apply` live form, missing-only `createIfNotExists`, and zero transaction
submission when all fixed IDs already exist. The active publication contract is
strict live Sanity sync, safe slug/path containment, deterministic
`sourceUpdatedAt`, no `syncedAt`, and generated-output idempotence.

## Global Constraints

- Sanity project display name is exactly `DSPL Insights`; dataset is exactly `production`; visibility is `public`.
- Local Studio origin is exactly `http://localhost:3333`, with credentials allowed. Do not add a wildcard or production-site CORS origin.
- Use the existing root `sanity.config.js` and existing `sanity/schemas/blogPost.js`; do not create a second repository or embed Studio in the React router.
- Keep public delivery static/prerendered through `scripts/sync-blog-content.mjs`; do not add browser-side Sanity fetching or a browser-visible write/read token.
- `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` are browser-visible identifiers only. `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_API_VERSION` configure Node content sync. `SANITY_READ_TOKEN` stays optional and is not added as a required example value.
- Bootstrap exactly the two approved records from `src/cms/seedData.js`, with stable existing `_id` values and no `_createdAt`, `_updatedAt`, `_rev`, image, or generated Sanity metadata.
- Bootstrap only through authenticated `sanity exec --with-user-token` with a
  direct `getDocuments(ids)` preflight; default to dry-run and require explicit
  `-- --apply` for live execution. Create only missing records with
  `createIfNotExists`, submit at most one transaction, and submit none when all
  fixed IDs already exist.
- The retired bulk importer and NDJSON stdin pipe are diagnostic history only;
  do not use `sanity datasets import`, a `.cmd` shim, a temporary import file,
  or a replacement/deletion/patch path for the active bootstrap.
- Featured image migration, hosted Studio deployment, DNS/hosting, webhooks, previews, author/tag/category documents, UI changes, and new dependencies are out of scope except the separately approved `styled-components@^6.1.15` first-level Studio dependency in Task 5A.
- Strict builds, `NODE_ENV=production`, and CI must fail closed for a missing project ID or failed Sanity fetch. Only explicit fallback mode or non-strict local CMS work may use seed data, with a visible warning.
- Creating the project/dataset, adding the exact CORS entry, and importing the two missing documents are approved external mutations. Authentication, organization choice, duplicate-project resolution, unexpected existing dataset content, and CORS conflicts are pause gates; do not guess.
- `.env.local` is ignored local state. Never print or store a Sanity session, token, password, or claim link in Git, logs, the plan, or documentation.
- Preserve the approved untracked spec `docs/superpowers/specs/2026-08-21-dspl-sanity-insights-setup-design.md` and all unrelated user work.
- Do not access `D:`. Do not reset, stash, clean, change branches, commit, push, merge, deploy, or run `sanity deploy`.
- Follow RED -> GREEN for every source behavior change. Do not claim an external check passed without its fresh output.

## File Map and Implementation Allowlists

### Task 1 allowlist

- Local ignored state only: `.env.local`
- External state only: one Sanity project named `DSPL Insights` and its public `production` dataset
- No tracked source-file edits

### Task 2 allowlist

Task 2's import-document generator remains a deterministic fixture/source
contract for the approved seed records. It is not the active bootstrap command;
the Task 5C/5D `sanity exec` path is authoritative.

- Create `sanity/env.js`: strict environment reader shared by Studio and CLI config.
- Create `sanity.cli.js`: CLI project/dataset binding.
- Create `scripts/create-sanity-import.mjs`: deterministic, stdout-only NDJSON bootstrap generator.
- Create `scripts/__tests__/sanitySetup.test.js`: config, import-shape, environment, and missing-only command contracts.
- Modify `sanity.config.js`: consume the strict environment reader; keep schema and Studio identity unchanged.
- Modify `.env.example`: document the five non-secret Sanity variables.
- Modify `package.json`: add local Studio and missing-only bootstrap scripts.

### Task 3 allowlist

- Create `scripts/__tests__/sync-blog-content.test.js`: strict/local/explicit-fallback source-policy tests.
- Modify `scripts/sync-blog-content.mjs`: export a test seam and enforce strict fail-closed behavior.
- Modify `package.json`: add `content:sync:strict`, load `.env.local`, and route production build through strict sync.

### Task 4 allowlist

- Modify `README.md`: concise Sanity setup, authoring, publishing, and command documentation.

### Task 5A allowlist

- Modify `package.json`: add only `styled-components@^6.1.15` to `dependencies`.
- Modify `package-lock.json`: npm's matching lock resolution for that dependency and its required transitives.
- Create ignored probe/audit reports only under `test-results/sanity-task5a/`.
- Do not modify Sanity data, generated content, source code, environment files, or any other manifest.

### Task 5B allowlist

Task 5B is retained as superseded diagnostic history for the incompatible bulk
importer and Windows stdin shim. Its package-command assertion is historical;
do not treat `datasets import` or NDJSON piping as current behavior.

- Modify `scripts/__tests__/sanitySetup.test.js`: replace the obsolete shim-based package-command assertion with the direct first-party launcher contract and explicit no-temporary-file guards.
- Modify `package.json`: change only the `sanity:bootstrap` command's right-hand launcher; preserve the generator, stdin source argument, dataset, and `--missing` semantics exactly.
- Do not modify `package-lock.json`, the generator, Sanity configuration, environment files, generated content, or remote state.

### Task 5 allowlist

- External state: add `http://localhost:3333` with credentials if absent; bootstrap the two missing documents through the approved authenticated `sanity exec` path.
- Generated snapshots, only after the live-sync gate: `src/generated/blogManifest.json`, `src/generated/blog/coordinating-brand-market-commerce.json`, and `src/generated/blog/from-packaging-to-purchase.json`.
- Ignored validation output only: `dist/`.
- No other source files, assets, schema fields, routes, styles, or remote services.

---

### Task 1: Authenticate and create the remote project/dataset safely

**Files:**
- Create locally: `.env.local` (ignored; non-secret identifiers only)
- Do not modify tracked files

**External gate:** This task opens Sanity's browser login and creates durable remote state. It is authorized, but Luna must pause while the user completes authentication or chooses the owning Sanity account/organization. If a project named `DSPL Insights` already exists, do not create another one; pause for the user to confirm which project ID to use.

- [ ] **Step 1: Reconfirm the worktree and local prerequisites**

Run:

```powershell
git status --short --untracked-files=all
git diff --name-only
git diff --check
git branch --show-current
node --version
npm.cmd exec -- sanity --version
Test-Path -LiteralPath '.env.local'
git check-ignore -v .env.local
```

Expected: current branch is `release/v1.0-production`; Node satisfies `>=22.22.0`; Sanity CLI responds; `.env.local` is absent and ignored; the approved untracked spec is preserved. If `.env.local` already exists at execution time, stop and inspect only its key names, never its values, before deciding how to merge identifiers.

- [ ] **Step 2: Start authenticated CLI login and pause for the browser gate**

Run:

```powershell
npm.cmd exec -- sanity login
```

Expected: the browser-based OAuth flow completes and the CLI reports a successful login. Do not copy the session token into the repository or terminal transcript. If account or SSO choice needs user judgment, pause.

- [ ] **Step 3: Check for an existing project before any create operation**

Run:

```powershell
npm.cmd exec -- sanity projects list
```

Expected: either no project named `DSPL Insights`, or one existing candidate. If one exists, stop and ask the user to confirm reuse; do not run `init` and do not infer identity from the display name alone.

- [ ] **Step 4: Create the project and public dataset exactly once**

Only when Step 3 proves the project does not exist, run:

```powershell
npm.cmd exec -- sanity init --bare --project-name "DSPL Insights" --dataset production --visibility public --env .env.local
```

Expected: Sanity creates one project and `production` dataset, prints the project/dataset identifiers, writes only ignored `.env.local`, and does not scaffold or overwrite Studio files. If organization or plan selection is presented, pause for the user.

- [ ] **Step 5: Normalize `.env.local` to both Studio and build-time identifiers**

Run without printing values:

```powershell
$studioProjectLine = Get-Content -LiteralPath '.env.local' | Where-Object { $_ -match '^SANITY_STUDIO_PROJECT_ID=' }
$studioDatasetLine = Get-Content -LiteralPath '.env.local' | Where-Object { $_ -match '^SANITY_STUDIO_DATASET=' }
if (-not $studioProjectLine -or -not $studioDatasetLine) { throw 'Sanity init did not write the expected Studio identifiers.' }
$sanityProjectId = ($studioProjectLine -split '=', 2)[1].Trim()
$sanityDataset = ($studioDatasetLine -split '=', 2)[1].Trim()
if (-not $sanityProjectId -or $sanityDataset -ne 'production') { throw 'Unexpected Sanity project or dataset identifier.' }
$sanityLocalEnvironment = @(
  "SANITY_STUDIO_PROJECT_ID=$sanityProjectId"
  "SANITY_STUDIO_DATASET=$sanityDataset"
  "SANITY_PROJECT_ID=$sanityProjectId"
  "SANITY_DATASET=$sanityDataset"
  'SANITY_API_VERSION=2026-08-20'
)
Set-Content -LiteralPath '.env.local' -Value $sanityLocalEnvironment -Encoding utf8
```

Expected: `.env.local` contains exactly five identifier/configuration keys and no token.

- [ ] **Step 6: Verify project identity and dataset visibility without mutating them**

Run:

```powershell
npm.cmd exec -- sanity projects list
npm.cmd exec -- sanity datasets list --project-id $sanityProjectId
npm.cmd exec -- sanity datasets visibility get production --project-id $sanityProjectId
git check-ignore -v .env.local
if (git ls-files --error-unmatch .env.local 2>$null) { throw '.env.local must not be tracked.' }
```

Expected: project `DSPL Insights` is listed; dataset `production` is listed; visibility is `public`; ignore output identifies `.gitignore`; the final `git ls-files` command fails because `.env.local` is not tracked. Record the project ID privately for later commands but do not add it to the plan.

---

### Task 2: Add strict local config and a missing-only bootstrap stream (historical fixture contract)

> **Historical task section:** Task 2's stdout-only NDJSON generator and its
> initial package-command examples are preserved as fixture/diagnostic history.
> The active bootstrap command and architecture are the Task 5C/5D
> authenticated `sanity exec` path.

**Files:**
- Create: `sanity/env.js`
- Create: `sanity.cli.js`
- Create: `scripts/create-sanity-import.mjs`
- Create: `scripts/__tests__/sanitySetup.test.js`
- Modify: `sanity.config.js`
- Modify: `.env.example`
- Modify: `package.json`

**Interfaces:**
- Produces `readSanityEnvironment(env)` -> `{ projectId: string, dataset: string }` or an actionable error.
- Produces `createSanityImportDocuments(posts)` -> exactly two plain Sanity `blogPost` documents.
- Produces `serializeSanityImport(posts)` -> newline-terminated NDJSON and nothing else on stdout.
- Produces package commands `studio` and `sanity:bootstrap`; the latter must contain `--missing` and must not contain `--replace`.

- [ ] **Step 1: Write the failing setup tests**

Create `scripts/__tests__/sanitySetup.test.js`:

```js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { seedBlogPosts } from '../../src/cms/seedData.js';
import { readSanityEnvironment } from '../../sanity/env.js';
import {
  createSanityImportDocuments,
  serializeSanityImport,
} from '../create-sanity-import.mjs';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const envExample = fs.readFileSync(path.join(rootDir, '.env.example'), 'utf8');

describe('Sanity setup contract', () => {
  it('requires the two Studio identifiers with an actionable local-env error', () => {
    expect(readSanityEnvironment({
      SANITY_STUDIO_PROJECT_ID: 'abc123',
      SANITY_STUDIO_DATASET: 'production',
    })).toEqual({ projectId: 'abc123', dataset: 'production' });

    expect(() => readSanityEnvironment({})).toThrow(
      /SANITY_STUDIO_PROJECT_ID.*SANITY_STUDIO_DATASET.*\.env\.local/s,
    );
  });

  it('converts only the two approved seeds to stable import documents', () => {
    const documents = createSanityImportDocuments(seedBlogPosts);

    expect(documents.map(({ _id }) => _id)).toEqual([
      'seed-post-coordinating-brand-market-commerce',
      'seed-post-from-packaging-to-purchase',
    ]);
    expect(documents.map(({ slug }) => slug.current)).toEqual([
      'coordinating-brand-market-commerce',
      'from-packaging-to-purchase',
    ]);
    expect(documents.every(({ _type }) => _type === 'blogPost')).toBe(true);
    for (const document of documents) {
      expect(Object.keys(document).sort()).toEqual([
        '_id', '_type', 'body', 'category', 'description', 'publishedAt', 'slug', 'title',
      ]);
      expect(document).not.toHaveProperty('_createdAt');
      expect(document).not.toHaveProperty('_updatedAt');
      expect(document).not.toHaveProperty('_rev');
      expect(document).not.toHaveProperty('mainImage');
    }

    const lines = serializeSanityImport(seedBlogPosts).trimEnd().split('\n');
    expect(lines).toHaveLength(2);
    expect(lines.map(JSON.parse)).toEqual(documents);
  });

  it('uses stdin plus missing-only import and documents non-secret variables', () => {
    expect(packageJson.scripts.studio).toBe('sanity dev --host localhost --port 3333');
    expect(packageJson.scripts['sanity:bootstrap']).toBe(
      'node scripts/create-sanity-import.mjs | sanity datasets import - --dataset production --missing',
    );
    expect(packageJson.scripts['sanity:bootstrap']).not.toContain('--replace');
    for (const key of [
      'SANITY_STUDIO_PROJECT_ID=',
      'SANITY_STUDIO_DATASET=production',
      'SANITY_PROJECT_ID=',
      'SANITY_DATASET=production',
      'SANITY_API_VERSION=2026-08-20',
    ]) expect(envExample).toContain(key);
    expect(envExample).not.toContain('SANITY_READ_TOKEN=');
  });
});
```

- [ ] **Step 2: Run RED**

Run:

```powershell
npm.cmd test -- scripts/__tests__/sanitySetup.test.js
```

Expected: FAIL because `sanity/env.js`, `scripts/create-sanity-import.mjs`, and package scripts do not exist.

- [ ] **Step 3: Implement the strict environment reader**

Create `sanity/env.js`:

```js
import process from 'node:process';

export function readSanityEnvironment(env = process.env) {
  const projectId = env.SANITY_STUDIO_PROJECT_ID?.trim();
  const dataset = env.SANITY_STUDIO_DATASET?.trim();
  const missing = [
    !projectId && 'SANITY_STUDIO_PROJECT_ID',
    !dataset && 'SANITY_STUDIO_DATASET',
  ].filter(Boolean);

  if (missing.length > 0) {
    throw new Error(
      `${missing.join(' and ')} must be set in ignored .env.local before running Sanity Studio or project CLI commands.`,
    );
  }

  return { projectId, dataset };
}
```

- [ ] **Step 4: Bind Studio and CLI to the same environment**

Create `sanity.cli.js`:

```js
import { defineCliConfig } from 'sanity/cli';
import { readSanityEnvironment } from './sanity/env.js';

const { projectId, dataset } = readSanityEnvironment();

export default defineCliConfig({
  api: { projectId, dataset },
});
```

Replace only the dummy environment block in `sanity.config.js`; keep `name`, `title`, `structureTool()`, and `types: [blogPost]` unchanged:

```js
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
  schema: { types: [blogPost] },
});
```

- [ ] **Step 5: Implement the stdout-only import generator**

Create `scripts/create-sanity-import.mjs`:

```js
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seedBlogPosts } from '../src/cms/seedData.js';

const EXPECTED_SLUGS = [
  'coordinating-brand-market-commerce',
  'from-packaging-to-purchase',
];

export function createSanityImportDocuments(posts = seedBlogPosts) {
  const slugs = posts.map((post) => post.slug?.current);
  if (posts.length !== 2 || slugs.some((slug, index) => slug !== EXPECTED_SLUGS[index])) {
    throw new Error(`Bootstrap is restricted to the two approved Insights slugs: ${EXPECTED_SLUGS.join(', ')}.`);
  }

  const ids = new Set();
  return posts.map(({ _id, title, slug, category, publishedAt, description, body }) => {
    if (!/^[A-Za-z0-9_-]+$/.test(_id || '') || ids.has(_id)) {
      throw new Error(`Bootstrap document ID must be stable, unique, and import-safe: ${_id || 'missing'}.`);
    }
    ids.add(_id);
    return { _id, _type: 'blogPost', title, slug, category, publishedAt, description, body };
  });
}

export function serializeSanityImport(posts = seedBlogPosts) {
  return `${createSanityImportDocuments(posts).map(JSON.stringify).join('\n')}\n`;
}

const isDirectExecution =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) process.stdout.write(serializeSanityImport());
```

- [ ] **Step 6: Add environment examples and package commands**

Append these exact non-secret lines to `.env.example`:

```dotenv
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_API_VERSION=2026-08-20
```

Add these exact entries to `package.json`'s `scripts` object without changing dependency versions:

```json
"studio": "sanity dev --host localhost --port 3333",
"sanity:bootstrap": "node scripts/create-sanity-import.mjs | sanity datasets import - --dataset production --missing"
```

- [ ] **Step 7: Run GREEN and focused lint**

Run:

```powershell
npm.cmd test -- scripts/__tests__/sanitySetup.test.js
npm.cmd exec -- eslint sanity/env.js sanity.cli.js sanity.config.js scripts/create-sanity-import.mjs scripts/__tests__/sanitySetup.test.js
git diff --check
git status --short --untracked-files=all
```

Expected: setup tests pass; focused lint and diff checks pass; only Task 2 allowlist files plus the approved spec and this plan appear.

---

### Task 3: Make production sync explicitly fail closed

**Files:**
- Create: `scripts/__tests__/sync-blog-content.test.js`
- Modify: `scripts/sync-blog-content.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces `resolveSyncPolicy({ argv, env })` -> `{ fallbackMode, strictMode }`.
- Produces `resolveBlogSource(options)` -> `{ rawPosts, source: 'sanity' | 'fallback' }`.
- `--fallback` always means explicit seed use; `--strict`, `NODE_ENV=production`, or truthy `CI` means missing/failing Sanity is fatal.

- [ ] **Step 1: Write failing source-policy tests**

Create `scripts/__tests__/sync-blog-content.test.js`:

```js
import { describe, expect, it, vi } from 'vitest';
import { seedBlogPosts } from '../../src/cms/seedData.js';
import { resolveBlogSource, resolveSyncPolicy } from '../sync-blog-content.mjs';

const silentLogger = { info: vi.fn(), warn: vi.fn() };

describe('blog content sync source policy', () => {
  it('treats build, production, and CI flags as strict while preserving explicit fallback', () => {
    expect(resolveSyncPolicy({ argv: ['--strict'], env: {} }).strictMode).toBe(true);
    expect(resolveSyncPolicy({ argv: [], env: { NODE_ENV: 'production' } }).strictMode).toBe(true);
    expect(resolveSyncPolicy({ argv: [], env: { CI: 'true' } }).strictMode).toBe(true);
    expect(resolveSyncPolicy({ argv: ['--fallback'], env: { CI: 'true' } })).toEqual({
      fallbackMode: true,
      strictMode: true,
    });
  });

  it('fails closed when strict sync lacks a project identifier', async () => {
    await expect(resolveBlogSource({
      strictMode: true,
      projectId: '',
      fetchPosts: vi.fn(),
      logger: silentLogger,
    })).rejects.toThrow('SANITY_PROJECT_ID environment variable is missing');
  });

  it('fails closed when strict live fetch is inaccessible', async () => {
    await expect(resolveBlogSource({
      strictMode: true,
      projectId: 'abc123',
      fetchPosts: vi.fn().mockRejectedValue(new Error('401 Unauthorized')),
      logger: silentLogger,
    })).rejects.toThrow(/Failed to fetch published Sanity content.*401 Unauthorized/);
  });

  it('warns and falls back only for non-strict local CMS failure', async () => {
    const result = await resolveBlogSource({
      strictMode: false,
      projectId: 'abc123',
      fetchPosts: vi.fn().mockRejectedValue(new Error('offline')),
      logger: silentLogger,
    });
    expect(result).toEqual({ rawPosts: seedBlogPosts, source: 'fallback' });
    expect(silentLogger.warn).toHaveBeenCalledWith(expect.stringMatching(/offline.*fallback/i));
  });

  it('uses published Sanity results when live fetch succeeds', async () => {
    const fetched = [{ _id: 'live-post' }];
    const result = await resolveBlogSource({
      strictMode: true,
      projectId: 'abc123',
      fetchPosts: vi.fn().mockResolvedValue(fetched),
      logger: silentLogger,
    });
    expect(result).toEqual({ rawPosts: fetched, source: 'sanity' });
  });

  it('keeps explicit fallback independent of project and network state', async () => {
    const fetchPosts = vi.fn();
    const result = await resolveBlogSource({
      fallbackMode: true,
      strictMode: true,
      projectId: '',
      fetchPosts,
      logger: silentLogger,
    });
    expect(result).toEqual({ rawPosts: seedBlogPosts, source: 'fallback' });
    expect(fetchPosts).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run RED without touching generated content**

Run:

```powershell
npm.cmd test -- scripts/__tests__/sync-blog-content.test.js
```

Expected: FAIL because the two functions are not exported and importing the current executable is not side-effect safe. No generated JSON changes.

- [ ] **Step 3: Add pure policy and source selection**

Replace the current top-level `isFallbackMode` declaration with these exports:

```js
export function resolveSyncPolicy({ argv = [], env = {} } = {}) {
  const fallbackMode = argv.includes('--fallback') || env.SANITY_SYNC_MODE === 'fallback';
  const ciEnabled = Boolean(env.CI) && !['0', 'false'].includes(String(env.CI).toLowerCase());
  const strictMode = argv.includes('--strict') || env.NODE_ENV === 'production' || ciEnabled;
  return { fallbackMode, strictMode };
}

export async function resolveBlogSource({
  fallbackMode = false,
  strictMode = false,
  projectId,
  fetchPosts,
  fallbackPosts = seedBlogPosts,
  logger = console,
}) {
  if (fallbackMode) {
    logger.info('Using explicit bundled seed/fallback dataset.');
    return { rawPosts: fallbackPosts, source: 'fallback' };
  }

  if (!projectId) {
    const error = new Error('SANITY_PROJECT_ID environment variable is missing.');
    if (strictMode) throw error;
    logger.warn(`${error.message} Using local fallback because strict mode is not enabled.`);
    return { rawPosts: fallbackPosts, source: 'fallback' };
  }

  try {
    return { rawPosts: await fetchPosts(), source: 'sanity' };
  } catch (cause) {
    const message = cause?.message || String(cause);
    if (strictMode) throw new Error(`Failed to fetch published Sanity content: ${message}`, { cause });
    logger.warn(`Failed to fetch published Sanity content (${message}); using local fallback because strict mode is not enabled.`);
    return { rawPosts: fallbackPosts, source: 'fallback' };
  }
}
```

- [ ] **Step 4: Route `runSync` through the policy and make imports side-effect safe**

Replace the source-selection branch at the start of `runSync()` with:

```js
  const { fallbackMode, strictMode } = resolveSyncPolicy({
    argv: process.argv.slice(2),
    env: process.env,
  });
  const { rawPosts, source } = await resolveBlogSource({
    fallbackMode,
    strictMode,
    projectId,
    fetchPosts: fetchFromSanity,
  });

  if (source === 'sanity') {
    console.log(`✔ Successfully fetched ${rawPosts.length} published document(s) from Sanity.`);
  } else {
    console.log('ℹ Using bundled seed/fallback dataset for blog content sync.');
  }
```

Keep the existing Sanity client configured with `perspective: 'published'`, `useCdn: false`, optional `SANITY_READ_TOKEN`, validation, and snapshot writes unchanged. Replace the unconditional bottom-level invocation with:

```js
const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;

if (isDirectExecution) {
  runSync().catch((err) => {
    console.error('❌ Fatal error during blog content sync:', err);
    process.exitCode = 1;
  });
}
```

- [ ] **Step 5: Load local identifiers and make the production build strict**

Set these exact `package.json` scripts, preserving `dev`, `dev:cms`, `sync:fallback`, and `build:fallback` semantics:

```json
"content:sync": "node --env-file-if-exists=.env.local scripts/sync-blog-content.mjs",
"content:sync:strict": "node --env-file-if-exists=.env.local scripts/sync-blog-content.mjs --strict",
"sync:fallback": "node scripts/sync-blog-content.mjs --fallback",
"build": "npm run content:sync:strict && npm run build:site"
```

- [ ] **Step 6: Run GREEN and focused regression checks**

Run only tests/lint that cannot write snapshots:

```powershell
npm.cmd test -- scripts/__tests__/sync-blog-content.test.js scripts/__tests__/sanitySetup.test.js src/content/__tests__/publication.test.js
npm.cmd exec -- eslint scripts/sync-blog-content.mjs scripts/__tests__/sync-blog-content.test.js
git diff --check
git status --short --untracked-files=all
```

Expected: all focused tests pass; focused JS lint is clean; no generated JSON changed during this task.

---

### Task 4: Document local authoring and static publication (historical draft)

> **Historical task section:** The draft bootstrap wording below predates the
> Task 5C/5D architecture. The reconciled README and spec, plus the authority
> section at the top of this plan, define current behavior.

**Files:**
- Modify: `README.md`

**Consumes:** Task 2 and Task 3 command names and environment contract.

- [ ] **Step 1: Add Sanity variables to the environment table**

Add these rows after the existing Vite variables:

```markdown
| `SANITY_STUDIO_PROJECT_ID` | Browser-visible Sanity project identifier used by local Studio; never a secret |
| `SANITY_STUDIO_DATASET` | Dataset used by local Studio (`production`) |
| `SANITY_PROJECT_ID` | Server/build-time Sanity project identifier used by content sync |
| `SANITY_DATASET` | Build-time content dataset (`production`) |
| `SANITY_API_VERSION` | Pinned Sanity API date (`2026-08-20`) |
```

State directly below the table: `SANITY_STUDIO_*` values are bundled into Studio and must never contain secrets; the public dataset needs no read token; Sanity login sessions and any optional token stay outside Git.

- [ ] **Step 2: Add exact Studio/bootstrap/publication instructions**

Add this section before `## Architecture`:

````markdown
## Sanity Insights authoring

The repository root is the Sanity Studio workspace. Copy the five Sanity values
from `.env.example` into ignored `.env.local`, then authenticate and start Studio:

```powershell
npm.cmd exec -- sanity login
npm.cmd run studio
```

Studio runs at `http://localhost:3333` and edits the public `production` dataset.
The website never writes to Sanity and never receives an editor credential.

The initial two-article bootstrap is intentionally missing-only:

```powershell
npm.cmd run sanity:bootstrap
```

It streams the approved seeds to `sanity datasets import` with `--missing`.
Rerunning it skips existing document IDs and does not replace editor changes.

Public pages continue to use deterministic generated snapshots. `npm.cmd run build`
performs a strict published-perspective sync before the static site build and fails
if Sanity is missing or inaccessible. `npm.cmd run build:fallback` is the explicit
offline build. Local `npm.cmd run dev:cms` may warn and use bundled seed content if
Sanity is unavailable.

Hosted Studio deployment, webhooks, image migration, and live preview are not part
of this setup. See the official Sanity documentation for
[CLI initialization](https://www.sanity.io/docs/cli-reference/init),
[CORS](https://www.sanity.io/docs/cli-reference/cors-in-cli),
[dataset import](https://www.sanity.io/docs/cli-reference/cli-datasets), and
[document validation](https://www.sanity.io/docs/cli-reference/documents).
````

- [ ] **Step 3: Update the command table and local examples to Windows-safe commands**

Add `npm.cmd run studio`, `npm.cmd run sanity:bootstrap`, `npm.cmd run content:sync`, `npm.cmd run content:sync:strict`, and `npm.cmd run build:fallback` with the meanings above. Do not document `sanity deploy`, a hosted URL, a token, or direct browser fetching.

- [ ] **Step 4: Validate documentation and current diff**

Run:

```powershell
rg -n "SANITY_|sanity:bootstrap|content:sync:strict|localhost:3333|--missing|sanity deploy" README.md .env.example package.json
git diff --check
git status --short --untracked-files=all
```

Expected: all five non-secret variables and all intended commands are documented; `--missing` appears; `sanity deploy` appears only in an explicit out-of-scope sentence or not at all; no secret value appears.

---

### Task 5A: Install Sanity Studio's required styled-components peer

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create ignored reports: `test-results/sanity-task5a/`

**Evidence and scope:** Installed `sanity@6.10.1` declares `styled-components ^6.1.15` as a peer dependency, and the bounded Studio startup consistently fails with `Declared dependency styled-components is not installed`. Official Sanity Studio installation guidance requires `styled-components ^6` as a first-level dependency. The user approved only `styled-components@^6.1.15`; do not upgrade Sanity, React, npm, Node, or any unrelated package.

**Current resume point:** The first install and the later in-range update have already run once and are retained below as historical evidence. Do not rerun any install/update step. Resume only at **Task 5A verification-only continuation**.

**Produces:** A root dependency entry `"styled-components": "^6.1.15"`, a matching npm lock resolution satisfying `>=6.1.15 <7.0.0`, and fresh evidence that Studio is reachable at `http://localhost:3333`.

- [ ] **Step 1: Capture the protected baseline before package mutation**

Run:

```powershell
$task5aReports = 'test-results/sanity-task5a'
New-Item -ItemType Directory -Path $task5aReports -Force | Out-Null
$baselineStatus = @(git status --short --untracked-files=all)
$baselineChangedPaths = @(git diff --name-only)
$baselineManifestHash = (Get-FileHash -LiteralPath 'src/generated/blogManifest.json' -Algorithm SHA256).Hash
Set-Content -LiteralPath "$task5aReports/baseline-status.txt" -Value $baselineStatus -Encoding utf8
Set-Content -LiteralPath "$task5aReports/baseline-changed-paths.txt" -Value $baselineChangedPaths -Encoding utf8
Set-Content -LiteralPath "$task5aReports/baseline-manifest-sha256.txt" -Value $baselineManifestHash -Encoding ascii
git diff --check
```

Expected: the baseline records all existing approved Task 1-5 work; manifest SHA-256 is captured before npm runs; no Task 5A source mutation has occurred.

- [ ] **Step 2: Record RED evidence without allowing a successful server to linger**

The already captured failure `Declared dependency styled-components is not installed` is valid RED evidence. If that exact output is not available in the coordinator's evidence, run this bounded probe:

```powershell
$redOut = "$task5aReports/studio-red.stdout.log"
$redErr = "$task5aReports/studio-red.stderr.log"
$redProcess = Start-Process -FilePath 'npm.cmd' -ArgumentList @('run', 'studio') -PassThru -WindowStyle Hidden -RedirectStandardOutput $redOut -RedirectStandardError $redErr
$redProcess | Wait-Process -Timeout 30 -ErrorAction SilentlyContinue
$redProcess.Refresh()
if (-not $redProcess.HasExited) {
  Stop-Process -Id $redProcess.Id
  throw 'RED probe unexpectedly kept Studio running; stop and inspect before installing.'
}
$redEvidence = ((Get-Content -LiteralPath $redOut -Raw) + "`n" + (Get-Content -LiteralPath $redErr -Raw))
if ($redEvidence -notmatch 'Declared dependency styled-components is not installed') {
  throw 'RED probe did not reproduce the approved missing styled-components failure.'
}
```

Expected: the exact missing-dependency failure is present. Do not proceed on a different error.

- [ ] **Step 3: Capture the pre-install audit baseline**

Run:

```powershell
$beforeAuditText = (npm.cmd audit --json | Out-String)
Set-Content -LiteralPath "$task5aReports/audit-before.json" -Value $beforeAuditText -Encoding utf8
$beforeAudit = $beforeAuditText | ConvertFrom-Json
if (-not $beforeAudit.metadata.vulnerabilities) { throw 'Could not parse the pre-install npm audit summary.' }
```

Expected: valid audit JSON is saved as an ignored report. A nonzero `npm audit` exit caused only by reported vulnerabilities is acceptable here; invalid JSON or a registry/network failure is a stop condition.

- [ ] **Step 4: Install only the approved first-level dependency**

Run exactly:

```powershell
npm.cmd install styled-components@^6.1.15 --save
if ($LASTEXITCODE -ne 0) { throw 'npm install failed; do not retry with force, legacy-peer-deps, or a version change.' }
```

Expected: npm changes only `package.json`, `package-lock.json`, and ignored `node_modules`; no `--force`, `--legacy-peer-deps`, audit fix, or package upgrade is used.

- [ ] **Step 5: Verify dependency resolution, package drift, audit, and manifest preservation**

Run:

```powershell
$resolvedStyledComponents = (Get-Content -LiteralPath 'node_modules/styled-components/package.json' -Raw | ConvertFrom-Json).version
if ([version]$resolvedStyledComponents -lt [version]'6.1.15' -or [version]$resolvedStyledComponents -ge [version]'7.0.0') {
  throw "Resolved styled-components $resolvedStyledComponents does not satisfy ^6.1.15."
}
npm.cmd ls sanity styled-components --depth=0
if ($LASTEXITCODE -ne 0) { throw 'npm reports an invalid root Sanity/styled-components dependency tree.' }

$package = Get-Content -LiteralPath 'package.json' -Raw | ConvertFrom-Json
if ($package.dependencies.'styled-components' -ne '^6.1.15') { throw 'package.json contains an unexpected styled-components range.' }

$newChangedPaths = @(git diff --name-only | Where-Object { $_ -notin $baselineChangedPaths })
$unexpectedChangedPaths = @($newChangedPaths | Where-Object { $_ -notin @('package.json', 'package-lock.json') })
if ($unexpectedChangedPaths) { throw "Unexpected package-install drift: $($unexpectedChangedPaths -join ', ')" }

$currentManifestHash = (Get-FileHash -LiteralPath 'src/generated/blogManifest.json' -Algorithm SHA256).Hash
if ($currentManifestHash -ne $baselineManifestHash) { throw 'Package installation changed the protected blog manifest.' }

$afterAuditText = (npm.cmd audit --json | Out-String)
Set-Content -LiteralPath "$task5aReports/audit-after.json" -Value $afterAuditText -Encoding utf8
$afterAudit = $afterAuditText | ConvertFrom-Json
foreach ($severity in @('info', 'low', 'moderate', 'high', 'critical', 'total')) {
  if ([int]$afterAudit.metadata.vulnerabilities.$severity -gt [int]$beforeAudit.metadata.vulnerabilities.$severity) {
    throw "npm audit vulnerability count increased at severity: $severity."
  }
}
git diff -- package.json package-lock.json
git diff --check
```

Expected: the root dependency is exactly `^6.1.15`; the resolved version satisfies Sanity's peer; only the intended manifest/lock delta is new; the protected manifest hash is unchanged; no audit severity count increases. Inspect the lock diff for only `styled-components` and npm-required transitive entries. If npm rewrites unrelated versions or lock metadata, stop and report the exact diff; do not reset, hand-edit the lockfile, rerun with flags, or perform an unapproved rollback.

- [ ] **Step 6: Run focused setup verification**

Run:

```powershell
npm.cmd test -- scripts/__tests__/sanitySetup.test.js scripts/__tests__/sync-blog-content.test.js
npm.cmd exec -- eslint sanity/env.js sanity.cli.js sanity.config.js scripts/create-sanity-import.mjs scripts/sync-blog-content.mjs scripts/__tests__/sanitySetup.test.js scripts/__tests__/sync-blog-content.test.js
git diff --check
```

Expected: focused tests and lint pass; dependency installation caused no source regression.

- [ ] **Step 7: Run a condition-based GREEN Studio startup probe and stop it**

Run:

```powershell
$greenOut = "$task5aReports/studio-green.stdout.log"
$greenErr = "$task5aReports/studio-green.stderr.log"
try {
  $existingStudio = Invoke-WebRequest -Uri 'http://localhost:3333' -TimeoutSec 2 -UseBasicParsing
  if ($existingStudio) { throw 'localhost:3333 is already serving content; stop that process before the probe.' }
} catch {
  if ($_.Exception.Message -like '*already serving content*') { throw }
}
$studioProcess = Start-Process -FilePath 'npm.cmd' -ArgumentList @('run', 'studio') -PassThru -WindowStyle Hidden -RedirectStandardOutput $greenOut -RedirectStandardError $greenErr
$studioResponse = $null
$studioDeadline = (Get-Date).AddSeconds(45)
try {
  while ((Get-Date) -lt $studioDeadline) {
    $studioProcess.Refresh()
    if ($studioProcess.HasExited) {
      $failureOutput = ((Get-Content -LiteralPath $greenOut -Raw) + "`n" + (Get-Content -LiteralPath $greenErr -Raw))
      throw "Studio exited before becoming reachable: $failureOutput"
    }
    try {
      $studioResponse = Invoke-WebRequest -Uri 'http://localhost:3333' -TimeoutSec 2 -UseBasicParsing
      if ($studioResponse.StatusCode -eq 200) { break }
    } catch {
      Start-Sleep -Seconds 1
    }
  }
  if (-not $studioResponse -or $studioResponse.StatusCode -ne 200) {
    throw 'Studio did not return HTTP 200 on localhost:3333 within 45 seconds.'
  }
} finally {
  $studioProcess.Refresh()
  if (-not $studioProcess.HasExited) {
    & "$env:SystemRoot/System32/taskkill.exe" /PID $studioProcess.Id /T /F | Out-Null
  }
}
```

Expected: the port is free before startup; Studio remains running long enough to return HTTP 200 from `http://localhost:3333`; logs contain no missing `styled-components` error; and the exact spawned process tree is stopped in `finally`.

- [ ] **Step 8: Confirm Task 5A scope and hand back to Task 5 Step 1**

Run:

```powershell
git status --short --untracked-files=all
git diff --name-only
git diff --check
```

Expected: relative to the captured baseline, only `package.json` and `package-lock.json` are newly changed; reports remain ignored; generated content and remote Sanity state are untouched. Do not import, sync, add CORS, commit, push, or deploy in Task 5A. After this bounded slice passes review, resume Task 5 from Step 1.

**Task 5A stop/rollback rule:** Stop immediately on a different RED error, install failure, peer invalidity, unexpected manifest/lock drift, increased audit count, manifest hash change, focused-test/lint failure, or failed HTTP probe. Preserve evidence and ask the coordinator for direction. Do not automatically reset, delete, hand-edit, force-install, run `npm audit fix`, or roll back user work; any rollback requires a separately approved exact operation.

#### Task 5A recovery history: Resolve the vulnerable 6.1.15 lock entry within the approved range (do not rerun)

**Historical evidence to preserve:** The first approved `npm.cmd install styled-components@^6.1.15 --save` correctly declared the root range and resolved canonical `styled-components@6.1.15`, then stopped because audit increased from 7 to 9 vulnerabilities. The added findings are attributable to `styled-components@6.1.15` and its nested vulnerable `postcss`. The approved dry run `npm.cmd update styled-components --dry-run --json` showed that updating within the existing root range resolves `styled-components@6.5.3`, removes the vulnerable nested dependency set, and leaves `package.json` at `^6.1.15`. Do not erase or overwrite the first-attempt reports or diff.

**Recovery allowlist:** Modify only `package-lock.json` relative to the blocked first-attempt state. `package.json` must remain byte-for-byte unchanged with `"styled-components": "^6.1.15"`. New ignored evidence may be written only under `test-results/sanity-task5a/`. Do not modify `@sanity/client`, Sanity CLI/Studio, generated content, source, environment files, or remote Sanity state.

- [ ] **Recovery Step 1: Revalidate the blocked state and immutable baselines**

Run:

```powershell
$task5aReports = 'test-results/sanity-task5a'
$originalAuditPath = "$task5aReports/audit-before.json"
$originalManifestHashPath = "$task5aReports/baseline-manifest-sha256.txt"
if (-not (Test-Path -LiteralPath $originalAuditPath)) { throw 'Original audit-before.json is missing; do not reconstruct or overwrite it.' }
if (-not (Test-Path -LiteralPath $originalManifestHashPath)) { throw 'Original manifest hash report is missing.' }

$packageBeforeRecoveryHash = (Get-FileHash -LiteralPath 'package.json' -Algorithm SHA256).Hash
$originalAuditFileHash = (Get-FileHash -LiteralPath $originalAuditPath -Algorithm SHA256).Hash
$originalManifestHash = (Get-Content -LiteralPath $originalManifestHashPath -Raw).Trim()
$currentManifestHash = (Get-FileHash -LiteralPath 'src/generated/blogManifest.json' -Algorithm SHA256).Hash
if ($currentManifestHash -ne $originalManifestHash) { throw 'Protected blog manifest changed since the original Task 5A baseline.' }

$packageBeforeRecovery = Get-Content -LiteralPath 'package.json' -Raw | ConvertFrom-Json
if ($packageBeforeRecovery.dependencies.'styled-components' -ne '^6.1.15') {
  throw 'Recovery requires package.json to retain exactly styled-components ^6.1.15.'
}

$originalAudit = (Get-Content -LiteralPath $originalAuditPath -Raw) | ConvertFrom-Json
$expectedOriginalAudit = @{ info = 0; low = 0; moderate = 6; high = 1; critical = 0; total = 7 }
foreach ($severity in $expectedOriginalAudit.Keys) {
  if ([int]$originalAudit.metadata.vulnerabilities.$severity -ne $expectedOriginalAudit[$severity]) {
    throw "Original audit baseline is not the recorded 6 moderate / 1 high / 7 total state: $severity."
  }
}

$blockedStatus = @(git status --short --untracked-files=all)
$blockedProtectedPaths = @(
  git status --porcelain=v1 |
    ForEach-Object { $_.Substring(3) } |
    Where-Object { $_ -ne 'package-lock.json' -and (Test-Path -LiteralPath $_ -PathType Leaf) }
)
$blockedProtectedHashes = @{}
foreach ($path in $blockedProtectedPaths) {
  $blockedProtectedHashes[$path] = (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash
}
Set-Content -LiteralPath "$task5aReports/recovery-blocked-status.txt" -Value $blockedStatus -Encoding utf8
git diff -- package.json package-lock.json
```

Expected: root range is exactly `^6.1.15`; original `audit-before.json` still records 0 info, 0 low, 6 moderate, 1 high, 0 critical, 7 total; manifest matches the original Task 5A hash; the blocked lock diff still records the historical 6.1.15 attempt.

- [ ] **Recovery Step 2: Record the known npm peer warning boundary**

The existing `@sanity/import` peer warning involving the already installed `@sanity/client` is known pre-recovery evidence. Record it in `test-results/sanity-task5a/recovery-known-peer-warning.txt`. It is not authorization to install, remove, downgrade, or update `@sanity/import`, `@sanity/client`, Sanity CLI, or Sanity Studio. Any warning from the recovery command that is not the same `@sanity/import`/`@sanity/client` warning is a stop condition.

- [ ] **Recovery Step 3: Update styled-components within the existing declared range**

Run exactly this command, with no additional npm flag:

```powershell
$recoveryUpdateOutput = (npm.cmd update styled-components 2>&1 | Out-String)
$recoveryUpdateExitCode = $LASTEXITCODE
Set-Content -LiteralPath "$task5aReports/recovery-update-output.txt" -Value $recoveryUpdateOutput -Encoding utf8
if ($recoveryUpdateExitCode -ne 0) {
  throw 'npm.cmd update styled-components failed; do not retry with --save, --force, --legacy-peer-deps, or npm audit fix.'
}
```

Expected: npm updates the locked `styled-components` resolution within `^6.1.15`. Do not use `--save`, `--force`, `--legacy-peer-deps`, `npm audit fix`, or any package-name/version variation.

- [ ] **Recovery Step 4: Verify exact 6.5.3 resolution and no package/source drift**

Run:

```powershell
$resolvedStyledComponents = (Get-Content -LiteralPath 'node_modules/styled-components/package.json' -Raw | ConvertFrom-Json).version
if ($resolvedStyledComponents -ne '6.5.3') { throw "Expected styled-components 6.5.3, resolved $resolvedStyledComponents." }
if ([version]$resolvedStyledComponents -lt [version]'6.1.15' -or [version]$resolvedStyledComponents -ge [version]'7.0.0') {
  throw "Resolved styled-components $resolvedStyledComponents does not satisfy ^6.1.15."
}

$packageAfterRecovery = Get-Content -LiteralPath 'package.json' -Raw | ConvertFrom-Json
$packageAfterRecoveryHash = (Get-FileHash -LiteralPath 'package.json' -Algorithm SHA256).Hash
if ($packageAfterRecovery.dependencies.'styled-components' -ne '^6.1.15' -or $packageAfterRecoveryHash -ne $packageBeforeRecoveryHash) {
  throw 'npm update changed package.json; recovery permits only package-lock.json to change.'
}

foreach ($path in $blockedProtectedPaths) {
  $currentHash = (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash
  if ($currentHash -ne $blockedProtectedHashes[$path]) { throw "Recovery changed protected path: $path" }
}

$currentManifestHash = (Get-FileHash -LiteralPath 'src/generated/blogManifest.json' -Algorithm SHA256).Hash
if ($currentManifestHash -ne $originalManifestHash) { throw 'Recovery changed the protected blog manifest.' }
if ((Get-FileHash -LiteralPath $originalAuditPath -Algorithm SHA256).Hash -ne $originalAuditFileHash) {
  throw 'Recovery overwrote the original audit-before.json baseline.'
}

npm.cmd ls sanity styled-components --depth=0
if ($LASTEXITCODE -ne 0) { throw 'npm reports an invalid root Sanity/styled-components dependency tree.' }

$warningLines = @($recoveryUpdateOutput -split "`r?`n" | Where-Object { $_ -match '(?i)warn|warning' })
if ($warningLines) {
  $knownPeerContext = $recoveryUpdateOutput -match '(?is)(@sanity/import.*@sanity/client|@sanity/client.*@sanity/import)'
  $warningResolvers = @(
    [regex]::Matches($recoveryUpdateOutput, '(?im)While resolving:\s*([^\r\n]+)') |
      ForEach-Object { $_.Groups[1].Value.Trim() }
  )
  $unexpectedResolvers = @($warningResolvers | Where-Object { $_ -notmatch '^@sanity/import@' })
  if (-not $knownPeerContext -or $unexpectedResolvers) {
    throw "Recovery emitted a warning outside the recorded @sanity/import/@sanity/client peer context: $($warningLines -join ' | ')"
  }
}

git diff -- package.json package-lock.json
git diff --check
```

Expected: installed version is exactly `6.5.3`; it satisfies `^6.1.15`; `package.json`, all blocked protected paths, the manifest, and original audit baseline are byte-for-byte unchanged; only `package-lock.json` changes relative to the blocked state. The known `@sanity/import` peer warning is recorded but not acted upon. Stop on an invalid root tree or any new warning.

- [ ] **Recovery Step 5: Prove audit returned to or below the original baseline**

Run:

```powershell
$recoveryAuditText = (npm.cmd audit --json | Out-String)
Set-Content -LiteralPath "$task5aReports/audit-recovery-after.json" -Value $recoveryAuditText -Encoding utf8
$recoveryAudit = $recoveryAuditText | ConvertFrom-Json
if (-not $recoveryAudit.metadata.vulnerabilities) { throw 'Could not parse the recovery npm audit summary.' }
foreach ($severity in @('info', 'low', 'moderate', 'high', 'critical', 'total')) {
  $recoveryCount = [int]$recoveryAudit.metadata.vulnerabilities.$severity
  $originalCount = [int]$originalAudit.metadata.vulnerabilities.$severity
  if ($recoveryCount -gt $originalCount) {
    throw "Recovery audit exceeds the original baseline at ${severity}: ${recoveryCount} > ${originalCount}."
  }
}
```

Expected: audit is no worse than 0 info, 0 low, 6 moderate, 1 high, 0 critical, and 7 total in every severity. Preserve `audit-before.json`, the blocked `audit-after.json`, and new `audit-recovery-after.json` as separate historical evidence.

- [ ] **Recovery Step 6: Run focused tests and lint**

Run:

```powershell
npm.cmd test -- scripts/__tests__/sanitySetup.test.js scripts/__tests__/sync-blog-content.test.js
npm.cmd exec -- eslint sanity/env.js sanity.cli.js sanity.config.js scripts/create-sanity-import.mjs scripts/sync-blog-content.mjs scripts/__tests__/sanitySetup.test.js scripts/__tests__/sync-blog-content.test.js
git diff --check
```

Expected: focused setup/sync tests and lint pass without generated-content or remote-state mutation.

- [ ] **Recovery Step 7: Run a fresh condition-based Studio HTTP probe and clean up**

Run:

```powershell
$recoveryGreenOut = "$task5aReports/studio-recovery-green.stdout.log"
$recoveryGreenErr = "$task5aReports/studio-recovery-green.stderr.log"
try {
  $existingStudio = Invoke-WebRequest -Uri 'http://localhost:3333' -TimeoutSec 2 -UseBasicParsing
  if ($existingStudio) { throw 'localhost:3333 is already serving content; stop that process before the recovery probe.' }
} catch {
  if ($_.Exception.Message -like '*already serving content*') { throw }
}

$studioProcess = Start-Process -FilePath 'npm.cmd' -ArgumentList @('run', 'studio') -PassThru -WindowStyle Hidden -RedirectStandardOutput $recoveryGreenOut -RedirectStandardError $recoveryGreenErr
$studioResponse = $null
$studioDeadline = (Get-Date).AddSeconds(45)
try {
  while ((Get-Date) -lt $studioDeadline) {
    $studioProcess.Refresh()
    if ($studioProcess.HasExited) {
      $failureOutput = ((Get-Content -LiteralPath $recoveryGreenOut -Raw) + "`n" + (Get-Content -LiteralPath $recoveryGreenErr -Raw))
      throw "Studio exited before becoming reachable: $failureOutput"
    }
    try {
      $studioResponse = Invoke-WebRequest -Uri 'http://localhost:3333' -TimeoutSec 2 -UseBasicParsing
      if ($studioResponse.StatusCode -eq 200) { break }
    } catch {
      Start-Sleep -Seconds 1
    }
  }
  if (-not $studioResponse -or $studioResponse.StatusCode -ne 200) {
    throw 'Studio did not return HTTP 200 on localhost:3333 within 45 seconds.'
  }
} finally {
  $studioProcess.Refresh()
  if (-not $studioProcess.HasExited) {
    & "$env:SystemRoot/System32/taskkill.exe" /PID $studioProcess.Id /T /F | Out-Null
  }
}

$recoveryStudioLog = ((Get-Content -LiteralPath $recoveryGreenOut -Raw) + "`n" + (Get-Content -LiteralPath $recoveryGreenErr -Raw))
if ($recoveryStudioLog -match 'Declared dependency styled-components is not installed') {
  throw 'Studio still reports the missing styled-components dependency.'
}
```

Expected: localhost port is free before startup; Studio returns HTTP 200 within 45 seconds; the missing-dependency error is absent; the exact spawned process tree is stopped.

- [ ] **Recovery Step 8: Audit final scope and resume Task 5 only after review**

Run:

```powershell
foreach ($path in $blockedProtectedPaths) {
  if ((Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash -ne $blockedProtectedHashes[$path]) {
    throw "Final recovery scope check found protected drift: $path"
  }
}
if ((Get-FileHash -LiteralPath 'src/generated/blogManifest.json' -Algorithm SHA256).Hash -ne $originalManifestHash) {
  throw 'Final recovery scope check found manifest drift.'
}
git status --short --untracked-files=all
git diff --name-only
git diff --check
```

Expected: relative to the blocked first-attempt state, only `package-lock.json` changed; `package.json` remains exactly `^6.1.15`; reports are ignored; no import, sync, CORS, external mutation, commit, push, or deployment occurred. Send the recovery diff/evidence to review, then resume Task 5 Step 1 only after acceptance.

**Recovery stop rule:** Stop on a missing/changed original baseline, any command other than exact `npm.cmd update styled-components`, a resolution other than 6.5.3, changed `package.json`, protected-path/manifest drift, invalid root tree, any warning beyond the recorded `@sanity/import` peer warning, audit above the original per-severity baseline, focused verification failure, or failed HTTP probe. Preserve both attempts' evidence; do not automatically reset, hand-edit the lockfile, change `@sanity/client`/CLI, run audit fix, or perform any rollback without separately approved exact instructions.

#### Task 5A verification-only continuation: Prove the accepted 6.5.3 state without another package mutation

**Current accepted state:** `package.json` still declares `"styled-components": "^6.1.15"`; the lock/install resolves `styled-components@6.5.3`; root `npm ls` is valid; the protected blog manifest is unchanged; and the coordinator's fresh audit is exactly the original baseline of 0 info, 0 low, 6 moderate, 1 high, 0 critical, and 7 total. Do not rerun either prior install/update command.

**Recorded warning boundary:** The completed npm update emitted an `allow-scripts` warning that `esbuild@0.28.2` has an install script not covered by the current allow-scripts policy. Record this warning as pending functional proof. Do not run `npm approve-scripts`, do not change npm/allow-scripts configuration, and do not reinstall/rebuild esbuild. A successful Studio bundle and HTTP 200 response is the bounded functional proof here; the full Task 5 Vite build is the later site-level proof. If Studio reports any esbuild binary/install failure, stop.

**Verification-only allowlist:** No tracked or untracked project file may change. Only ignored reports under `test-results/sanity-task5a/` may be created or updated. Commands in this continuation are read-only verification or bounded process startup/cleanup; no `npm install`, `npm update`, `npm approve-scripts`, `npm rebuild`, `npm audit fix`, dependency/config edit, import, sync, CORS mutation, commit, push, or deployment is allowed.

- [ ] **Verification Step 1: Capture the accepted state without hashing directories**

Run:

```powershell
$task5aReports = 'test-results/sanity-task5a'
$originalAuditPath = "$task5aReports/audit-before.json"
$originalManifestHashPath = "$task5aReports/baseline-manifest-sha256.txt"
if (-not (Test-Path -LiteralPath $originalAuditPath -PathType Leaf)) { throw 'Original audit-before.json is missing.' }
if (-not (Test-Path -LiteralPath $originalManifestHashPath -PathType Leaf)) { throw 'Original manifest hash report is missing.' }

$verificationStatusBefore = @(git status --short --untracked-files=all)
$verificationChangedPathsBefore = @(git diff --name-only)
$packageVerificationHash = (Get-FileHash -LiteralPath 'package.json' -Algorithm SHA256).Hash
$lockVerificationHash = (Get-FileHash -LiteralPath 'package-lock.json' -Algorithm SHA256).Hash
$manifestVerificationHash = (Get-FileHash -LiteralPath 'src/generated/blogManifest.json' -Algorithm SHA256).Hash
$originalManifestHash = (Get-Content -LiteralPath $originalManifestHashPath -Raw).Trim()
$originalAuditVerificationHash = (Get-FileHash -LiteralPath $originalAuditPath -Algorithm SHA256).Hash

$verificationFiles = @(
  git status --porcelain=v1 |
    ForEach-Object { $_.Substring(3) } |
    Where-Object { Test-Path -LiteralPath $_ -PathType Leaf }
)
$verificationFileHashes = @{}
foreach ($path in $verificationFiles) {
  $verificationFileHashes[$path] = (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash
}

if ($manifestVerificationHash -ne $originalManifestHash) { throw 'Manifest differs from the original Task 5A baseline.' }
$package = Get-Content -LiteralPath 'package.json' -Raw | ConvertFrom-Json
if ($package.dependencies.'styled-components' -ne '^6.1.15') { throw 'package.json no longer declares exactly ^6.1.15.' }
$resolvedStyledComponents = (Get-Content -LiteralPath 'node_modules/styled-components/package.json' -Raw | ConvertFrom-Json).version
if ($resolvedStyledComponents -ne '6.5.3') { throw "Expected resolved styled-components 6.5.3, found $resolvedStyledComponents." }

Set-Content -LiteralPath "$task5aReports/verification-only-status-before.txt" -Value $verificationStatusBefore -Encoding utf8
Set-Content -LiteralPath "$task5aReports/verification-only-warning.txt" -Value 'Recorded only: allow-scripts reports esbuild@0.28.2 install script is not covered. No approval or config mutation authorized; require Studio HTTP proof.' -Encoding utf8
npm.cmd ls sanity styled-components --depth=0
if ($LASTEXITCODE -ne 0) { throw 'Root Sanity/styled-components dependency tree is invalid.' }
```

Expected: all baseline files exist; only file paths are hashed, so untracked directories cannot reach `Get-FileHash`; root range is `^6.1.15`; resolution is exactly `6.5.3`; root dependency tree is valid; manifest matches its original hash.

- [ ] **Verification Step 2: Save a fresh audit and compare every severity with the original**

Run:

```powershell
$originalAudit = (Get-Content -LiteralPath $originalAuditPath -Raw) | ConvertFrom-Json
$expectedOriginalAudit = @{ info = 0; low = 0; moderate = 6; high = 1; critical = 0; total = 7 }
foreach ($severity in $expectedOriginalAudit.Keys) {
  if ([int]$originalAudit.metadata.vulnerabilities.$severity -ne $expectedOriginalAudit[$severity]) {
    throw "Original audit baseline differs at severity: $severity."
  }
}

$verificationAuditText = (npm.cmd audit --json | Out-String)
Set-Content -LiteralPath "$task5aReports/audit-verification-only.json" -Value $verificationAuditText -Encoding utf8
$verificationAudit = $verificationAuditText | ConvertFrom-Json
if (-not $verificationAudit.metadata.vulnerabilities) { throw 'Could not parse the fresh verification audit.' }
foreach ($severity in @('info', 'low', 'moderate', 'high', 'critical', 'total')) {
  $freshCount = [int]$verificationAudit.metadata.vulnerabilities.$severity
  $originalCount = [int]$originalAudit.metadata.vulnerabilities.$severity
  if ($freshCount -gt $originalCount) {
    throw "Fresh audit exceeds the original baseline at ${severity}: ${freshCount} > ${originalCount}."
  }
}
```

Expected: fresh audit is no worse than 0 info, 0 low, 6 moderate, 1 high, 0 critical, and 7 total in every severity; the new JSON is separate from and does not overwrite either earlier audit artifact.

- [ ] **Verification Step 3: Run focused tests and lint without build, sync, or package mutation**

Run:

```powershell
npm.cmd test -- scripts/__tests__/sanitySetup.test.js scripts/__tests__/sync-blog-content.test.js
npm.cmd exec -- eslint sanity/env.js sanity.cli.js sanity.config.js scripts/create-sanity-import.mjs scripts/sync-blog-content.mjs scripts/__tests__/sanitySetup.test.js scripts/__tests__/sync-blog-content.test.js
git diff --check
```

Expected: focused setup/sync tests and lint pass; these commands do not modify dependencies, generated content, or remote state.

- [ ] **Verification Step 4: Prove existing esbuild usability through Studio HTTP 200 and clean up**

Run:

```powershell
$verificationStudioOut = "$task5aReports/studio-verification-only.stdout.log"
$verificationStudioErr = "$task5aReports/studio-verification-only.stderr.log"
try {
  $existingStudio = Invoke-WebRequest -Uri 'http://localhost:3333' -TimeoutSec 2 -UseBasicParsing
  if ($existingStudio) { throw 'localhost:3333 is already serving content; stop that process before verification.' }
} catch {
  if ($_.Exception.Message -like '*already serving content*') { throw }
}

$studioProcess = Start-Process -FilePath 'npm.cmd' -ArgumentList @('run', 'studio') -PassThru -WindowStyle Hidden -RedirectStandardOutput $verificationStudioOut -RedirectStandardError $verificationStudioErr
$studioResponse = $null
$studioDeadline = (Get-Date).AddSeconds(45)
try {
  while ((Get-Date) -lt $studioDeadline) {
    $studioProcess.Refresh()
    if ($studioProcess.HasExited) {
      $failureOutput = ((Get-Content -LiteralPath $verificationStudioOut -Raw) + "`n" + (Get-Content -LiteralPath $verificationStudioErr -Raw))
      throw "Studio exited before becoming reachable: $failureOutput"
    }
    try {
      $studioResponse = Invoke-WebRequest -Uri 'http://localhost:3333' -TimeoutSec 2 -UseBasicParsing
      if ($studioResponse.StatusCode -eq 200) { break }
    } catch {
      Start-Sleep -Seconds 1
    }
  }
  if (-not $studioResponse -or $studioResponse.StatusCode -ne 200) {
    throw 'Studio did not return HTTP 200 on localhost:3333 within 45 seconds.'
  }
} finally {
  $studioProcess.Refresh()
  if (-not $studioProcess.HasExited) {
    & "$env:SystemRoot/System32/taskkill.exe" /PID $studioProcess.Id /T /F | Out-Null
  }
}

$verificationStudioLog = ((Get-Content -LiteralPath $verificationStudioOut -Raw) + "`n" + (Get-Content -LiteralPath $verificationStudioErr -Raw))
if ($verificationStudioLog -match '(?is)esbuild.*(binary|install).*(fail|error)|Could not start service.*esbuild|The package.*esbuild.*could not be found') {
  throw 'Studio reported an esbuild binary/install failure; do not approve scripts or modify configuration.'
}
if ($verificationStudioLog -match 'Declared dependency styled-components is not installed') {
  throw 'Studio still reports the original missing styled-components failure.'
}
```

Expected: Studio compiles with the existing `esbuild@0.28.2`, returns HTTP 200 within 45 seconds, emits no esbuild binary/install or missing styled-components failure, and the exact spawned process tree is stopped. Do not run `npm approve-scripts`; Task 5's full Vite build remains the later second proof.

- [ ] **Verification Step 5: Prove no third mutation and hand off**

Run:

```powershell
if ((Get-FileHash -LiteralPath 'package.json' -Algorithm SHA256).Hash -ne $packageVerificationHash) { throw 'Verification changed package.json.' }
if ((Get-FileHash -LiteralPath 'package-lock.json' -Algorithm SHA256).Hash -ne $lockVerificationHash) { throw 'Verification changed package-lock.json.' }
if ((Get-FileHash -LiteralPath 'src/generated/blogManifest.json' -Algorithm SHA256).Hash -ne $manifestVerificationHash) { throw 'Verification changed the manifest.' }
if ((Get-FileHash -LiteralPath $originalAuditPath -Algorithm SHA256).Hash -ne $originalAuditVerificationHash) { throw 'Verification overwrote original audit-before.json.' }
foreach ($path in $verificationFiles) {
  if ((Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash -ne $verificationFileHashes[$path]) {
    throw "Verification changed protected file: $path"
  }
}

$verificationStatusAfter = @(git status --short --untracked-files=all)
$verificationChangedPathsAfter = @(git diff --name-only)
if ((Compare-Object $verificationStatusBefore $verificationStatusAfter) -or (Compare-Object $verificationChangedPathsBefore $verificationChangedPathsAfter)) {
  throw 'Verification changed the repository status or changed-path set.'
}
git diff -- package.json package-lock.json
git diff --check
git status --short --untracked-files=all
```

Expected: package manifest, lockfile, all enumerated files, manifest, original audit, status, and changed-path set are unchanged; only ignored verification reports were added. Return evidence for review and resume Task 5 Step 1 only after acceptance.

**Verification-only stop rule:** Stop on any package/config mutation request, missing or changed baseline, unexpected resolution/tree, fresh audit above the original per-severity baseline, focused failure, Studio HTTP failure, esbuild binary/install error, protected-file/status drift, or failure to clean up the spawned server. Record the existing allow-scripts warning without acting on it. Do not run another install/update, approve scripts, rebuild esbuild, edit config, import, sync, mutate CORS, commit, push, or deploy.

---

### Task 5B: Bypass the Windows CLI shim without changing import semantics (superseded diagnostic history)

> **Historical diagnostic evidence — superseded, not active behavior:** The
> generator exited with two NDJSON lines, but the bulk-import command reported
> zero imports twice. This evidence explains why Task 5C replaced the bulk
> importer; do not execute or describe the Task 5B command as current.

The historical launcher experiment changed only the stdin boundary. The
authoritative authenticated two-document proof is now the Task 5C/5D direct
`sanity exec` path described above and below.

**Files:**
- Modify: `scripts/__tests__/sanitySetup.test.js`
- Modify: `package.json`

**Interfaces:**
- Consumes `serializeSanityImport()` from `scripts/create-sanity-import.mjs`, which already emits exactly two newline-terminated NDJSON records on stdout.
- Produces package command `sanity:bootstrap` using the installed `sanity` package's first-party Node launcher: `node scripts/create-sanity-import.mjs | node node_modules/sanity/bin/sanity datasets import - --dataset production --missing`.
- Preserves the CLI contract in the installed import implementation: source `-` maps to `process.stdin`, and `--missing` maps to `createIfNotExists`; no replacement, deletion, direct mutation API, or temporary file is introduced.

**Execution assignment:** Run this as one bounded implementation slice with `bounded_implementer` on `gpt-5.6-luna` at `max` as the sole writer. After GREEN evidence, stop for a fresh read-only `independent_reviewer` on Sol/high before Task 5 resumes. Do not run the bootstrap or make any remote mutation in Task 5B.

- [ ] **Step 1: Write the failing launcher-contract test**

In `scripts/__tests__/sanitySetup.test.js`, replace only the current `sanity:bootstrap` assertions inside `uses stdin plus missing-only import and documents non-secret variables` with:

```js
    const bootstrapCommand = packageJson.scripts['sanity:bootstrap'];
    expect(bootstrapCommand).toBe(
      'node scripts/create-sanity-import.mjs | node node_modules/sanity/bin/sanity datasets import - --dataset production --missing',
    );
    expect(bootstrapCommand).toContain('datasets import -');
    expect(bootstrapCommand).toContain('--missing');
    expect(bootstrapCommand).not.toContain('--replace');
    expect(bootstrapCommand).not.toContain('node_modules/.bin');
    expect(bootstrapCommand).not.toMatch(/(?:^|\s)sanity(?:\.cmd)?\s+datasets\s+import/);
    expect(bootstrapCommand).not.toMatch(/[<>]|\.ndjson\b/);
    expect(fs.existsSync(path.join(rootDir, 'node_modules', 'sanity', 'bin', 'sanity'))).toBe(true);
```

Keep the existing two-record serialization assertions and environment-variable checks unchanged.

- [ ] **Step 2: Run the focused test to verify RED**

Run:

```powershell
npm.cmd test -- scripts/__tests__/sanitySetup.test.js
```

Expected: exactly the bootstrap-command contract fails because `package.json` still invokes bare `sanity`, which resolves through `node_modules/.bin/sanity.cmd` on Windows. The existing generator/import-shape tests remain green. If any different assertion fails, stop and diagnose it before editing `package.json`.

- [ ] **Step 3: Make the minimal package-script change**

In `package.json`, replace only the `sanity:bootstrap` value with:

```json
"sanity:bootstrap": "node scripts/create-sanity-import.mjs | node node_modules/sanity/bin/sanity datasets import - --dataset production --missing"
```

Do not create a wrapper, temporary NDJSON file, new dependency, or platform-specific branch. Do not change `scripts/create-sanity-import.mjs`; its stdout-only two-line behavior is already covered.

- [ ] **Step 4: Run focused GREEN verification**

Run:

```powershell
npm.cmd test -- scripts/__tests__/sanitySetup.test.js scripts/__tests__/sync-blog-content.test.js
npm.cmd exec -- eslint scripts/__tests__/sanitySetup.test.js
node node_modules/sanity/bin/sanity --version
$generatorLines = @(node scripts/create-sanity-import.mjs | ForEach-Object { $_ })
if ($generatorLines.Count -ne 2) { throw 'Generator did not emit exactly two NDJSON records.' }
git diff --check
```

Expected: focused tests and lint pass; the direct launcher reports the installed Sanity CLI version on Windows; the generator still emits exactly two lines; no remote import is attempted.

- [ ] **Step 5: Prove the bounded diff and no remote/generated drift**

Run:

```powershell
git diff -- package.json scripts/__tests__/sanitySetup.test.js
git diff --name-only
git status --short --untracked-files=all
```

Expected: relative to the pre-Task-5B snapshot, only `package.json` and `scripts/__tests__/sanitySetup.test.js` changed. `package-lock.json`, `scripts/create-sanity-import.mjs`, `.env.local`, Sanity configuration, generated blog snapshots, and remote state are unchanged. Do not run `npm.cmd run sanity:bootstrap` in this task.

- [ ] **Step 6: Stop for independent review before resuming Task 5**

Send the two-file diff plus RED/GREEN output to a fresh `independent_reviewer` on Sol/high. Review must confirm that the command uses the installed first-party launcher rather than `@sanity/cli` internals or a `.cmd` shim, retains `datasets import - --dataset production --missing`, stays cross-platform through `node` plus forward-slash paths, and creates no temporary file. Resume Task 5 from Step 1 only after acceptance.

**Task 5B stop rule:** Stop on any non-contract test failure, missing first-party launcher, package-lock/source/generated drift, request to call the remote import during this slice, or need for a wrapper/dependency/direct API mutation. Preserve evidence and return to the coordinator; do not broaden the allowlist.

---

### Task 5C: Replace the incompatible bulk importer with an authenticated missing-only transaction

**Superseded historical diagnosis:** The target was empty, CORS and schema
checks passed, and the bulk importer reported zero documents through both the
Windows shim and the first-party Node launcher. An authenticated direct API
`dryRun` using the same `createIfNotExists` payloads succeeded. This failure
evidence motivated the current architecture below; it is not an active command
or implementation path.

**Test-realm diagnosis:** A static `sanity/cli` import under the repository's normal Vitest jsdom environment initializes the CLI/esbuild stack and fails its `TextEncoder` realm invariant before the fake-client tests run. A file-level Node environment directive avoids that first failure but then the repository-wide `src/test/setup.js` fails because it correctly assumes `window`. Do not change the shared setup or Vitest configuration and do not add a per-file environment directive. Keep the test in the normal jsdom realm and lazy-load `sanity/cli` only when `main()` has no injected `getClient`; injected tests must never import the CLI/esbuild stack.

**Architecture decision:** Stop patching or upgrading the bulk importer. Use the documented `sanity exec ... --with-user-token` surface and `getCliClient({apiVersion})` to send the two existing approved documents in one transaction with `createIfNotExists`. The command is dry-run by default and requires the exact script argument `--apply` for a live transaction. This preserves missing-only/idempotent semantics, uses the installed first-party launcher, adds no dependency or temporary NDJSON file, and keeps the existing document factory as the single payload source.

**Exact implementation allowlist:**
- Create: `scripts/bootstrap-sanity.mjs`
- Create: `scripts/__tests__/bootstrap-sanity.test.js`
- Modify: `scripts/__tests__/sanitySetup.test.js`
- Modify: `package.json`
- May create evidence only: `.git/sdd/task-5c-report.md`
- Must not modify: `package-lock.json`, `scripts/create-sanity-import.mjs`, Sanity configuration, `.env.local`, generated content, the approved spec, or any dependency version

**Interfaces:**
- Consumes `createSanityImportDocuments()` from `scripts/create-sanity-import.mjs` unchanged.
- Produces `parseBootstrapMode(argv)`, `runBootstrap({client, documents, env, mode})`, and `main({argv, env, getClient, write})` from `scripts/bootstrap-sanity.mjs`; `main()` uses the injected client factory in tests and otherwise lazy-loads official `sanity/cli` at runtime.
- Produces package command `sanity:bootstrap`: `node --env-file-if-exists=.env.local node_modules/sanity/bin/sanity exec scripts/bootstrap-sanity.mjs --with-user-token --`.
- Default invocation is authenticated `dryRun`; `npm.cmd run --silent sanity:bootstrap -- --apply` is the only approved live form.
- Runtime output is one sanitized JSON object containing only `mode`, `requested`, `resultCount`, and `transactionAccepted`; it never includes a project ID, dataset value, document ID/slug/revision, transaction ID, token, or response body.

**Execution assignment:** Run Task 5C as one bounded implementation slice with `bounded_implementer` on `gpt-5.6-luna` at `max` as the sole writer. Task 5C itself is local-only: do not invoke `sanity:bootstrap`, import, sync, or any remote mutation. After local GREEN evidence, stop for a fresh read-only Sol/high `independent_reviewer`. Only an accepted Task 5C diff may proceed to Task 5's remote dry-run and live gates.

- [ ] **Step 1: Create the failing transaction-contract tests**

Create `scripts/__tests__/bootstrap-sanity.test.js` with:

Do not add `// @vitest-environment node` or any other file-level environment directive; successful module loading under the normal project jsdom/setup environment is part of this test.

```js
import { describe, expect, it, vi } from 'vitest';
import {
  main,
  parseBootstrapMode,
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

function createFakeClient({
  config = {
    projectId: 'project123',
    dataset: 'production',
    apiVersion: '2026-08-20',
  },
  response = {
    transactionId: 'must-never-be-printed',
    results: [{ operation: 'create' }, { operation: 'create' }],
  },
} = {}) {
  const transaction = {
    createIfNotExists: vi.fn(() => transaction),
    commit: vi.fn(async () => response),
  };
  const client = {
    config: vi.fn(() => config),
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
  ])('uses one createIfNotExists transaction in %s mode', async (mode, dryRun) => {
    const { client, transaction } = createFakeClient();
    const summary = await runBootstrap({
      client,
      env: targetEnvironment,
      mode,
    });

    expect(client.transaction).toHaveBeenCalledTimes(1);
    expect(transaction.createIfNotExists).toHaveBeenCalledTimes(2);
    expect(transaction.createIfNotExists.mock.calls.map(([document]) => document.slug.current)).toEqual([
      'coordinating-brand-market-commerce',
      'from-packaging-to-purchase',
    ]);
    expect(transaction.commit).toHaveBeenCalledWith({
      dryRun,
      returnDocuments: false,
      visibility: 'sync',
    });
    expect(summary).toEqual({
      mode,
      requested: 2,
      resultCount: 2,
      transactionAccepted: true,
    });
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
    })).rejects.toThrow(/expected two mutation results/);
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
      resultCount: 2,
      transactionAccepted: true,
    });
    expect(output).not.toMatch(/project123|must-never-be-printed|seed-post|coordinating-brand/);
  });
});
```

- [ ] **Step 2: Run the new test to verify RED**

Run:

```powershell
npm.cmd test -- scripts/__tests__/bootstrap-sanity.test.js
```

Expected: FAIL because `scripts/bootstrap-sanity.mjs` does not exist. Stop if the failure is unrelated to that missing module.

- [ ] **Step 3: Implement the minimal authenticated transaction runner**

Create `scripts/bootstrap-sanity.mjs` with:

```js
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
  if (!['dry-run', 'apply'].includes(mode) || documents.length !== 2) {
    throw new Error('Sanity bootstrap contract is invalid.');
  }

  const transaction = client.transaction();
  for (const document of documents) transaction.createIfNotExists(document);
  const response = await transaction.commit({
    dryRun: mode === 'dry-run',
    returnDocuments: false,
    visibility: 'sync',
  });
  const resultCount = Array.isArray(response?.results) ? response.results.length : -1;
  const transactionAccepted = typeof response?.transactionId === 'string'
    && response.transactionId.length > 0;
  if (!transactionAccepted || resultCount !== documents.length) {
    throw new Error('Sanity bootstrap did not return the expected two mutation results.');
  }

  return {
    mode,
    requested: documents.length,
    resultCount,
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

const isDirectExecution = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) await main();
```

Do not accept an explicit token, call `client.create`, patch/delete a document, use multiple transactions, serialize NDJSON, catch and print response bodies, or add retry/fallback behavior.

- [ ] **Step 4: Run the transaction tests to verify GREEN**

Run:

```powershell
npm.cmd test -- scripts/__tests__/bootstrap-sanity.test.js
npm.cmd exec -- eslint scripts/bootstrap-sanity.mjs scripts/__tests__/bootstrap-sanity.test.js
```

Expected: all new tests pass under the repository's unchanged normal jsdom environment and focused lint is clean. The prior `TextEncoder` realm failure and the `src/test/setup.js` missing-`window` failure are both absent. No Sanity command or remote request runs because every `main()` test injects a fake client and the lazy `sanity/cli` branch is never loaded.

- [ ] **Step 5: Write the failing package-command contract**

In `scripts/__tests__/sanitySetup.test.js`, retain the existing document-factory/environment assertions but replace the old stdin/bulk-import command assertions with:

```js
    const bootstrapCommand = packageJson.scripts['sanity:bootstrap'];
    expect(bootstrapCommand).toBe(
      'node --env-file-if-exists=.env.local node_modules/sanity/bin/sanity exec scripts/bootstrap-sanity.mjs --with-user-token --',
    );
    expect(bootstrapCommand).toContain('sanity exec scripts/bootstrap-sanity.mjs');
    expect(bootstrapCommand).toContain('--with-user-token');
    expect(bootstrapCommand).not.toMatch(/datasets\s+import|--replace|\.ndjson\b|[<>|]/);
    expect(bootstrapCommand).not.toContain('node_modules/.bin');
    expect(fs.existsSync(path.join(rootDir, 'node_modules', 'sanity', 'bin', 'sanity'))).toBe(true);
```

Rename that test to `uses the authenticated transaction bootstrap and documents non-secret variables`.

- [ ] **Step 6: Run the setup contract to verify RED**

Run:

```powershell
npm.cmd test -- scripts/__tests__/sanitySetup.test.js scripts/__tests__/bootstrap-sanity.test.js
```

Expected: the new transaction tests stay GREEN and exactly the package-command assertion fails because `package.json` still uses `datasets import`.

- [ ] **Step 7: Replace only the package command**

In `package.json`, replace only `sanity:bootstrap` with:

```json
"sanity:bootstrap": "node --env-file-if-exists=.env.local node_modules/sanity/bin/sanity exec scripts/bootstrap-sanity.mjs --with-user-token --"
```

Do not change dependencies or `package-lock.json`; do not add an apply-by-default package command.

- [ ] **Step 8: Run local GREEN and prove the bounded diff**

Run:

```powershell
npm.cmd test -- scripts/__tests__/sanitySetup.test.js scripts/__tests__/bootstrap-sanity.test.js scripts/__tests__/sync-blog-content.test.js
npm.cmd exec -- eslint scripts/bootstrap-sanity.mjs scripts/__tests__/bootstrap-sanity.test.js scripts/__tests__/sanitySetup.test.js
node node_modules/sanity/bin/sanity exec --help
git diff --check
git diff -- package.json scripts/__tests__/sanitySetup.test.js
git status --short --untracked-files=all
```

Expected: focused tests and lint pass; local help confirms `sanity exec SCRIPT... [--with-user-token]` and `--` argument forwarding; relative to the pre-Task-5C snapshot, only the four source allowlist paths changed. `package-lock.json`, dependency resolution, generator, configuration, generated content, and remote state are unchanged.

- [ ] **Step 9: Stop for fresh Sol/high review before any remote invocation**

Write sanitized RED/GREEN/scope evidence to `.git/sdd/task-5c-report.md` and request a fresh `independent_reviewer`. Review must confirm: the exact four-file source allowlist; lazy official `sanity/cli` loading only when `main()` lacks an injected client factory; `getCliClient({apiVersion})` at runtime; normal jsdom tests with no file-level environment directive and no shared setup/config edit; ignored `.env.local` loading; matching Studio/build/client target checks; one transaction containing exactly two `createIfNotExists` calls; dry-run default; exact explicit `--apply`; no dependency/lock change; no bulk importer, replacement, deletion, direct token, response-body logging, temporary file, sync, or remote invocation. Task 5 remains blocked until APPROVED.

**Task 5C stop rule:** Stop on any failure outside the expected RED assertions, static `sanity/cli` import, file-level Vitest environment directive, need to edit `src/test/setup.js` or Vitest configuration, inability to test with an injected fake client, need to edit the generator/config/dependencies/lockfile, output containing an identifier/token/response body, use of anything other than `transaction().createIfNotExists(...).commit(...)`, any remote call during Task 5C, any fifth changed source path, or loss of Luna/max sole-writer isolation.

---

### Task 5D: Amend bootstrap idempotence to avoid all-existing transactions

**Reason for amendment:** The original Task 5 Step 6 gate hashed a GROQ/search-store response without canonicalizing object property order. Its mismatch proves only that the observed serialization changed; it does not prove that the second `createIfNotExists` transaction rewrote either document. Three fresh sanitized samples now show the exact two direct Doc API records are stable, GROQ is stable, and both endpoints agree. Sanity documents the Doc API as bypassing indexing/caching and `createIfNotExists` as a no-op for an existing ID. The strongest safe invariant is therefore to submit no transaction when both fixed IDs already exist.

This is an internal safety correction inside the approved two-article setup. It introduces no new product, content, schema, deployment, or authentication decision. It supersedes the original Task 5 Step 6 rerun procedure and the four-field bootstrap success summary.

**Implementation assignment:** `bounded_implementer` on `gpt-5.6-luna` at `max`, as the sole writer.

**Exact implementation allowlist:**
- Modify `scripts/bootstrap-sanity.mjs`.
- Modify `scripts/__tests__/bootstrap-sanity.test.js`.
- Modify only the stale Sanity-bootstrap paragraph in `README.md`.
- May create sanitized evidence at `.git/sdd/task-5d-report.md`.

Everything else is protected during implementation, including `package.json`, `package-lock.json`, `.env.local`, Sanity config/schema, `scripts/create-sanity-import.mjs`, `scripts/sync-blog-content.mjs`, the spec, generated content, assets, and UI files.

#### Step 1: Capture protected state

Run `git status --short --untracked-files=all`, `git diff --name-only`, `git diff --check`, and SHA-256 hashes for `package-lock.json`, `package.json`, `scripts/create-sanity-import.mjs`, `sanity.config.js`, and `src/generated/blogManifest.json`. Do not stage, restore, or rewrite any existing work.

#### Step 2: Add the complete RED test set before source changes

Extend the fake client with `getDocuments`, defaulting to `[null, null]`, then test:
- empty direct state submits one transaction with two missing `createIfNotExists` mutations;
- all-existing direct state submits no transaction;
- partial direct state submits exactly the one missing document;
- malformed length, `undefined`, or mismatched returned IDs stop before any transaction;
- dry-run, apply, and `main` return the amended seven-field summary;
- the generic direct-execution error boundary remains sanitized.

Run `npm.cmd test -- scripts/__tests__/bootstrap-sanity.test.js`. Expected RED: only the new/changed direct-preflight and summary assertions fail; the existing mode, target, incomplete-response, and error-sanitization behavior stays green.

#### Step 3: Implement the minimal direct-document preflight

`runBootstrap()` must validate the mode, exact two-document contract, and matched target before calling `client.getDocuments(ids)` exactly once. The result must be an array of the same length, with each entry either `null` or an object whose `_id` equals the ID at the same index. Any malformed, undefined, reordered, or mismatched result stops before `client.transaction()`.

Select only `null` entries as missing. If none are missing, return before constructing a transaction. Otherwise construct at most one transaction, add only the missing documents with `createIfNotExists`, and retain `dryRun`, `returnDocuments: false`, and `visibility: 'sync'`. The mutation response result count must equal the missing count.

The exact sanitized summary is:

```js
{
  mode,
  requested: 2,
  existingCount,
  missingCount,
  resultCount,
  transactionSubmitted,
  transactionAccepted,
}
```

For the current all-existing apply state, require exactly:

```json
{"mode":"apply","requested":2,"existingCount":2,"missingCount":0,"resultCount":0,"transactionSubmitted":false,"transactionAccepted":false}
```

`transactionAccepted: false` is valid only when `transactionSubmitted: false`.

#### Step 4: GREEN, lint, documentation truth, and scope gates

Run:

```powershell
npm.cmd test -- scripts/__tests__/bootstrap-sanity.test.js
npm.cmd test -- scripts/__tests__/sanitySetup.test.js scripts/__tests__/bootstrap-sanity.test.js scripts/__tests__/sync-blog-content.test.js
npm.cmd exec -- eslint scripts/bootstrap-sanity.mjs scripts/__tests__/bootstrap-sanity.test.js
rg -n "sanity:bootstrap|datasets import|--missing|--apply|dry-run" README.md
git diff --check
```

README must truthfully describe default dry-run, explicit `-- --apply`, creation of missing fixed IDs only, and zero transaction when both exist. It must not claim the active bootstrap streams NDJSON into `sanity datasets import`.

#### Step 5: Stop for fresh Sol/high review before any remote invocation

The reviewer must confirm the exact three-file source allowlist, direct `getDocuments(ids)` preflight, no transaction for all-existing state, at most one transaction containing only missing `createIfNotExists` mutations, no content comparison/overwrite, unchanged authentication and generic error boundary, exact seven-field summary, TDD evidence, and no remote call during Task 5D implementation.

#### Step 6: Prove the current remote path is read-only by construction

After review approval, an anonymous `@sanity/client` probe with the environment API version, `useCdn: false`, and explicit `published` perspective must call `getDocuments(ids)`. Validate expected ID, type, slug, revision, and update timestamp internally. Canonical digest input must be arrays in requested-ID order:

```js
documents.map((document, index) => [ids[index], document._rev, document._updatedAt])
```

Capture two consecutive direct digests privately and print only `{"count":2,"exact":true,"stable":true}`. Stop unless both records are exact and stable.

Then run the default dry-run and require exactly the seven-field dry-run equivalent of the all-existing summary. Recheck the canonical direct digest. Run the explicit `-- --apply` command only if the dry-run reported `transactionSubmitted:false`; require the exact all-existing apply summary above and recheck the canonical direct digest. Print only `BOOTSTRAP_EXISTING_DOCUMENTS_NO_TRANSACTION=True` after all three digests match.

The explicit apply is permitted here only because the amended all-existing path returns before constructing a transaction.

#### Step 7: Resume strict sync and release gates

Only after Step 6 passes, continue with Task 5 Step 7 onward: strict live sync, exact two-slug/generated-file checks, focused tests, full lint/tests/build/HTML verification, zero public source maps, protected-state audit, and final independent review. `src/generated/blogManifest.json`, the two generated article JSON files, and the tracked build-generated `public/sitemap.xml` enter the write allowlist only at this point.

**Task 5D stop rule:** Stop immediately if the direct preflight finds zero, one, malformed, reordered, or unexpected documents in the current remote continuation; either initial direct digest is unstable; either runner invocation reports `transactionSubmitted:true`, a nonzero result count, or extra output; any direct digest changes; any identifier/revision/timestamp/digest/token/transaction response/raw error leaks; the native CLI crash recurs; a fourth implementation source path changes; strict sync uses fallback or unexpected slugs; generated sync would overwrite unrelated work; or an unrelated gate fails. Do not retry, delete, replace, patch, recreate, restore automatically, or run another apply after a stop.

#### Task 5D remote execution micro-amendment

The first Step 6 wrapper displayed only the initial direct proof and exact all-existing dry-run summary because its outer orchestration layer drained one intermediate terminal chunk and discarded the still-running session. It did not establish a remote assertion failure. Do not rerun that wrapper. Replace it with three separate commands, each awaited to final exit and each ending in explicit sanitized markers:

1. **Direct baseline:** capture two canonical direct Doc API digests privately, require exact two-document state and equality, and print only `DIRECT_BASELINE_EXACT=True` followed by `DIRECT_BASELINE_STABLE=True`.
2. **Dry-run:** capture a fresh private direct digest; run only the default bootstrap; require its exact seven-field all-existing dry-run summary; capture another direct digest and compare privately. Print the summary, `DRY_RUN_NO_TRANSACTION=True`, and `DIRECT_POST_DRY_RUN_UNCHANGED=True` in that order.
3. **Explicit apply:** start only after phase 2 visibly completes. Capture two fresh direct digests and require exact/stable state; print `DIRECT_PRE_APPLY_EXACT=True` and `DIRECT_PRE_APPLY_STABLE=True`; run the explicit apply and require its exact seven-field all-existing summary; capture a final direct digest and compare privately. Print the apply summary, `APPLY_NO_TRANSACTION=True`, `DIRECT_POST_APPLY_UNCHANGED=True`, and `BOOTSTRAP_EXISTING_DOCUMENTS_NO_TRANSACTION=True`.

Each phase must run as its own shell/tool call with a sufficient initial yield; if it returns a live session ID, poll that same session until a final exit code is observed. Never infer completion from partial output. Never print or retain the private digests, rows, identifiers, revisions, timestamps, response bodies, or credentials.

Repeating phases 1 and 2 is permitted because the probes are read-only and the reviewed all-existing dry-run returns before constructing a transaction. Phase 3 is permitted only after phase 2's final marker. Stop without retry if a required marker is absent, a command yields extra output, a direct equality check fails, either bootstrap reports `transactionSubmitted` other than `false` or `resultCount` other than zero, a CLI crash recurs, or any protected/source/generated/staged state changes. No new user decision is required for this internal execution-safety correction.

#### Task 5 generated-sitemap allowlist correction

The approved strict build necessarily runs `build:site`, which runs `sitemap:generate` and deterministically writes tracked `public/sitemap.xml` from `src/generated/blogManifest.json`. Add `public/sitemap.xml` to the Task 5 generated-output allowlist. This is an internal correction, not a source/configuration/product change.

Accept only the observed three-line semantic update: `/blogs` and the two approved article routes change `<lastmod>` from `2026-08-20` to the live manifest date `2026-08-24`; ordered locations, entry count, priorities, change frequencies, attributes, and every other node remain identical. Require exactly `3 3 public/sitemap.xml` from `git diff --numstat`.

Run a targeted `npm.cmd run sitemap:generate` and require the sitemap SHA-256 to remain unchanged. Require `public/sitemap.xml` and the already-built `dist/sitemap.xml` to have identical hashes. Then resume the final scope/protected-state audit. Do not rerun the full gate solely for this allowlist correction because the strict build, lint, tests, HTML verification, and zero-map checks already passed and no source changed. Stop if the targeted generator changes bytes, built/public copies differ, the XML structure or any fourth date differs, manifest provenance fails, or any additional path appears. Do not restore or remove the tracked sitemap.

### Task 5E: Fail-closed CMS slug and snapshot-path boundary

**Reason:** Final review proved that an editor-controlled slug such as `../../../package` can escape `src/generated/blog` through the current `path.join()` write sink and resolve to a workspace JSON file. Live CMS integration makes this pre-existing boundary reachable. This P1 blocks final approval.

**Exact implementation allowlist:** `scripts/sync-blog-content.mjs`, `scripts/__tests__/sync-blog-content.test.js`, and sanitized `.git/sdd/task-5e-security-report.md`.

Use Luna/max as sole writer and TDD. Add strict lowercase ASCII kebab-case validation (`^[a-z0-9]+(?:-[a-z0-9]+)*$`, maximum 96 characters) at the shared CMS slug boundary, while allowing trimmed uppercase input to normalize consistently to lowercase. Add an independent write-boundary resolver using `path.resolve()` plus `path.relative()` containment. Every output must be an own child file of the exact generated blog directory. Route validation and writes through these helpers; invalid state fails before any filesystem write.

RED tests must cover both approved slugs and traversal/alias forms including forward slash, backslash, `.`, `..`, double-dot suffixes, percent-encoded traversal text, nested paths, leading/trailing/double hyphens, whitespace-only, and overlength values. Prove safe paths remain contained and invalid input never reaches `fs.writeFileSync`. Then run focused tests, focused ESLint, diff/whitespace/scope/protected-state checks. No remote call, generated write, build, package/schema/doc edit, commit, push, or deploy. Stop for fresh Sol/high security review before Task 5F.

**Task 5E Windows/write-pipeline micro-amendment:** Fresh review additionally requires rejection of exact Windows reserved basenames `con`, `prn`, `aux`, `nul`, `com1`-`com9`, and `lpt1`-`lpt9` after normalization, while allowing ordinary near-misses. Change the resolver signature to require explicit `resolveArticleSnapshotPath(blogDir, slug)` with no default directory. Add an exported `writeBlogSnapshots({generatedDir, manifest, fullArticleMap, sink, logger})` seam that requires an injected sink, derives the blog directory itself, pre-resolves and serializes every article plus the manifest before any sink call, and only then performs one mkdir, manifest write, and article writes. Production passes `fs`; tests use non-call-through fake functions. Prove reserved/traversal-only and safe-then-invalid maps cause zero mkdir/writes, while the two approved entries write exactly the manifest and two immediate child JSON files. All production filesystem mutation must be centralized in this seam. Keep the same two-file allowlist and require fresh Sol/high re-review.

### Task 5F: Deterministic generated-manifest provenance

**Exact implementation allowlist:** `scripts/sync-blog-content.mjs`, `scripts/__tests__/sync-blog-content.test.js`, `src/content/publication.js`, `src/content/__tests__/publication.test.js`, and sanitized `.git/sdd/task-5f-determinism-report.md`.

After Task 5E approval, replace wall-clock `syncedAt` with deterministic `sourceUpdatedAt`, calculated as the maximum valid `_updatedAt` or `publishedAt` timestamp across processed posts, or `null` for empty input. Export/test a manifest constructor; identical source content must serialize identically regardless of system time or post order, invalid source timestamps must fail closed, and neither production nor fallback manifests may retain `syncedAt`. Update the publication fallback to `sourceUpdatedAt: null`.

Use TDD, then focused tests/lint/diff/scope gates and fresh Sol/high determinism review. No remote call or generated write occurs in the implementation slice.

**Task 5F ordering/timestamp micro-amendment:** Fresh review requires a strict RFC3339 lexical and calendar/time/offset validator rather than permissive `Date.parse()` admission. Apply it to `publishedAt`, provided `_createdAt`/`_updatedAt`, featured ordering, and `sourceUpdatedAt` provenance. Reject impossible calendar dates, locale formats, 24-hour/60-minute/60-second values, invalid offsets, and `-00:00`; preserve current approved `Z` and explicit-offset forms. Sort manifest posts by `publishedAt` descending so `posts[0]` remains the newest/featured article, then normalized ASCII slug and `_id` ascending as deterministic tie-breakers. Do not use locale ordering or slug as the primary key.

Export a pure `normalizeBlogManifest()` from `src/content/publication.js` that removes legacy `syncedAt`, preserves a valid deterministic `sourceUpdatedAt` string, and otherwise provides `sourceUpdatedAt: null`. Use it for the imported artifact so tests accept both the transitional legacy manifest and the regenerated deterministic form without requiring provenance to remain null. Add RED cases for accepted/rejected timestamps, publication-first ordering/ties/input reversal, legacy/deterministic fixtures, and the actual imported artifact before source changes. Keep the same four-file allowlist and require fresh Sol/high re-review before generated writes.

### Task 5 generated-output idempotence rerun

Only after Tasks 5E and 5F are independently approved, run strict live sync twice. Capture the manifest and two article hashes privately and require all three to remain identical; require live Sanity, exactly two approved slugs, `sourceUpdatedAt` present, `syncedAt` absent, and print only `STRICT_SYNC_GENERATED_OUTPUT_IDEMPOTENT=True`. Run the focused six-file gate, full lint/tests/strict build/HTML verification, and diff check. Require generated hashes before and after build to remain identical, three Insights HTML documents, zero public maps, structurally valid 14-route sitemap, expected Insights dates, and matching public/dist sitemap. No remote mutation is permitted.

### Task 5G: Reconcile authoritative documentation and handoff evidence

After all security/determinism/release gates pass, correct only `README.md`, the approved Sanity spec, this plan, `.git/sdd/task-5-final-report.md`, and coordinator-owned `.git/sdd/progress.md`. Active summaries must describe authenticated `sanity exec`, direct `getDocuments` preflight, default dry-run, explicit `-- --apply`, missing-only `createIfNotExists`, zero transactions for existing IDs, safe slug/path validation, and deterministic `sourceUpdatedAt`. Preserve bulk-import failures and earlier blockers only as explicitly superseded historical evidence. Correct the README command-table dry-run wording and the report's current status. Run documentation searches, diff/whitespace checks, then a fresh holistic Sol/high review.

No new material user decision is required for Tasks 5E-5G. They are internal security, determinism, and truth corrections within the approved Sanity setup. No commit, push, deploy, branch change, remote mutation, or cleanup follows without separate authorization.

### Task 5H: Reconcile published-only article snapshots

**Reason:** Final holistic review proved that sync never removes obsolete article JSON. Because Vite and prerender discover every `src/generated/blog/*.json`, an unpublished, deleted, or renamed body can remain bundled even after leaving the manifest. Filtering after `import.meta.glob()` is insufficient; the source directory must match the current published manifest before Vite runs.

**Exact implementation allowlist:** `scripts/sync-blog-content.mjs`, `scripts/__tests__/sync-blog-content.test.js`, and sanitized `.git/sdd/task-5h-reconciliation-report.md`.

Extend the existing injected sink with `readdirSync` and `unlinkSync`. Before any mkdir, write, or unlink, validate/serialize the manifest and all desired articles, read only direct directory entries with `withFileTypes:true`, and validate the complete inventory. An `ENOENT` directory is empty; every other read failure propagates.

Deletion authority is limited to lexically sorted stale files satisfying every condition: regular non-symlink direct child, lowercase `.json`, canonical non-reserved slug basename, and absent from the desired article set. Never delete nested content, directories, symlinks, non-JSON files, malformed/reserved JSON filenames, desired snapshots, recursive targets, wildcards, or unresolved paths. Any unexpected JSON symlink/directory/malformed/reserved name stops before mutation.

After complete preflight: create the blog directory, write all desired articles, unlink sorted stale snapshots, and write the manifest last as the commit marker. On any I/O failure, propagate and stop strict sync/build; do not roll back, recurse, or clean broadly. A later idempotent rerun may converge only after the underlying error is resolved.

TDD must cover exact two-stale reconciliation and lexical deletion order, non-JSON preservation, direct-child `package.json` containment, zero mutations for symlink/directory/malformed/uppercase/reserved/slash/backslash inventories, malicious/unserializable desired maps, non-ENOENT reads, missing-directory behavior, manifest-last ordering, unlink failure, and two-run idempotent convergence. Tests use only non-call-through fake sinks. Run focused tests/lint/diff/scope checks and fresh Sol/high review before real sync.

Before real sync, inspect the current generated blog directory read-only and require exactly the two approved snapshot files; any extra current entry is an ownership stop. After approval run strict sync twice, require exact manifest-to-body bijection and identical hashes/inventory, and print only `PUBLISHED_SNAPSHOT_RECONCILIATION_IDEMPOTENT=True`. Then run the focused six-file gate, full lint/tests/strict build/HTML verification, diff check, exact current routes, absence of stale routes, zero maps, sitemap parity, and final audits. No remote mutation is permitted.

### Task 5I: Correct README route inventory

After Task 5H's verified build, update only `README.md` to include `/brands/raw-radicles`, `/start`, `/terms`, `/blogs`, and dynamic `/blogs/:slug` entries. Replace the stale fixed “eight public routes” claim with the dynamic truth: the build prerenders 11 static routes, the Insights index, and one article route per published manifest entry; the currently verified two-article dataset produces 14 public route documents. Do not present 14 as a permanent limit. Run README truth searches/diff checks, then fresh README and holistic Sol/high review.

### Task 5J: Fail-closed Studio/build target validation

**Reason:** Final review found that strict sync silently defaulted dataset/API version and required only a project ID, allowing a misconfigured live build to consume a non-production dataset. The shared Studio reader also accepted non-production values.

**Exact implementation allowlist:** `sanity/env.js`, `scripts/sync-blog-content.mjs`, `scripts/__tests__/sanitySetup.test.js`, `scripts/__tests__/sync-blog-content.test.js`, and sanitized `.git/sdd/task-5j-target-report.md`.

Harden `readSanityEnvironment()` to require trimmed Studio project/dataset, dataset exactly `production`, and equality with supplied build project/dataset values. Add `resolveSanitySyncTarget(env, {strictMode})`: validate every configured Studio/build dataset and project pair before fallback, require complete build project/dataset/API trio in strict mode, allow non-strict fallback only for incomplete/missing configuration, reject configured staging/mismatch in every live mode, validate API version as a real `YYYY-MM-DD` calendar date, and return only the trimmed production target. Explicit fallback returns before validation.

Remove all module defaults for build dataset/API version. `fetchFromSanity(target, env)` must receive the validated target. Refactor/export injectable `runSync({argv, env, fetchPosts, sink, logger, generatedDir})` so tests prove invalid targets stop before network and all filesystem calls; direct execution retains production defaults. Configuration errors remain outside the network fallback catch.

TDD must cover missing/whitespace strict trio values, staging Studio/build datasets, project/dataset mismatch, malformed/impossible API dates, strict/non-strict behavior, explicit fallback independence, trimmed legitimate production target, and full zero-fetch/zero-sink proof. Run focused two-test-file RED/GREEN, four-file ESLint/diff/scope/protected audits, then fresh Sol/high review before schema validation or live sync.

After approval require schema validation with zero errors/warnings, two strict production syncs with identical inventory/hashes and no fallback, full lint/tests/strict build/HTML verification, 14 current route documents, zero maps, sitemap parity, and no remote mutation. Stop if any default remains, staging/mismatch reaches fetch/client, explicit fallback requires CMS config, current ignored environment fails, a fifth source path changes, or any remote/generated action occurs before review.

**Task 5J build-authority micro-amendment:** Fresh review requires the build trio—not Studio variables—as the authoritative live-sync target. Strict and non-strict complete build-only configuration must fetch with trimmed `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_API_VERSION`; Studio values are optional independent cross-checks and may never be returned as the fetch target. Complete Studio configuration cannot substitute for an incomplete build trio. In `readSanityEnvironment()`, compare optional build project and dataset mirrors independently when supplied; do not require them as a pair. Treat whitespace-only optional mirrors as absent. Add RED cases for build-only strict/non-strict fetch, incomplete build with complete Studio, project-only/dataset-only match and mismatch through environment/options, zero-fetch/zero-sink mismatches, and retained explicit-fallback bypass. Keep the same four-file allowlist and require fresh Sol/high re-review before schema or live gates.

**Task 5J execution-harness micro-amendment:** The first post-review strict sync and schema validation passed, but PowerShell `ConvertFrom-Json` coerced the RFC3339 provenance string into `DateTime` and produced a false assertion. A raw Node `JSON.parse` probe proved canonical `sourceUpdatedAt`, absent `syncedAt`, and exact two-post state. Retain this valid first-sync baseline. Use only raw Node JSON parsing and private aggregate hashes for the manifest/articles. Run the pending second strict sync as a separately awaited phase, require exact manifest validity and identical before/after hash, then run focused tests, lint, full tests, strict build, post-build hash proof, HTML verification, and final audits as separate awaited phases with explicit markers. Do not repeat the passed first sync/schema/target probes or use a monolithic wrapper. Stop on any missing marker, fallback, digest change, unexpected output/path, or nonzero exit.

**Task 5J concurrent-preview recovery amendment:** A user-owned `sync:fallback && vite` preview started after the passed strict build; its completed fallback pre-step rewrote the manifest while leaving the earlier live sitemap, producing the final audit mismatch. Preserve and do not stop the running Vite process. Require zero active `scripts/sync-blog-content.mjs` processes, capture hashes for concurrent ServicePage/design-test and all protected files, run one restoring strict live sync, then separately rerun focused coverage including the concurrent files, full lint/tests, and one strict build whose built-in sync is the idempotence comparison. Validate raw manifest, exact inventory/bijection, manifest-derived sitemap dates, 14 HTML routes plus 404, zero maps, stable generated/protected hashes, staging/env/credential/whitespace/scope, and zero active content-sync/Sanity processes. Accept the lingering Vite process. Stop without retry if another content-sync appears, any protected hash changes, or generated state drifts. No source edit, preview termination, remote mutation, commit, push, or deploy is authorized.

---

### Task 5: Configure CORS, validate Studio, import, live-sync, and run the release gate

> **Historical task sequence:** The original empty-dataset/import procedure in
> this section is retained as execution history. Task 5C/5D replaced its
> bootstrap path with authenticated `sanity exec`, direct `getDocuments(ids)`
> preflight, default dry-run, explicit `-- --apply`, missing-only
> `createIfNotExists`, and zero all-existing transactions. Task 5E/5F/5G and
> the completed strict double-sync/release evidence below are authoritative for
> current behavior; do not restart the historical import/apply sequence.

**Files:**
- May modify through the approved live sync/build only: `src/generated/blogManifest.json`, `src/generated/blog/coordinating-brand-market-commerce.json`, `src/generated/blog/from-packaging-to-purchase.json`, `public/sitemap.xml`
- May create ignored build output: `dist/`
- No source edits unless a failing check is diagnosed and a new bounded allowlist is approved

**Execution assignment:** Resume Task 5 with `bounded_implementer` on `gpt-5.6-luna` at `max` as the sole writer. After completion, route the evidence and actual diff to a fresh Sol/high `independent_reviewer`.

**Read-only query boundary:** Never use `sanity documents query` in Task 5. On this Windows/Node 26 host that command exits with native status `-1073740791`, while the official `@sanity/client` v8 succeeds anonymously against the same environment. Use the inline anonymous client probes below with `useCdn: false`; do not pass a token, print identifiers/revisions/timestamps, or add a helper file merely for these probes.

**External pause gates:** Stop before mutation if the Studio/build project or dataset values are missing or disagree, the configured dataset is not `production`, the pinned API version is missing, the anonymous empty-content probe fails or returns any `blogPost`, or `http://localhost:3333` exists without credentials. Do not delete/recreate a dataset, project, document, or CORS entry to force the expected state.

- [ ] **Step 1: Revalidate exact remote target and empty-content precondition**

Run:

```powershell
$targetProbeJson = node --env-file-if-exists=.env.local --input-type=module -e 'import {createClient} from "@sanity/client"; const {SANITY_STUDIO_PROJECT_ID:studioProjectId,SANITY_STUDIO_DATASET:studioDataset,SANITY_PROJECT_ID:projectId,SANITY_DATASET:dataset,SANITY_API_VERSION:apiVersion}=process.env; if (!studioProjectId || !studioDataset || !projectId || !dataset || !apiVersion) throw new Error("Missing required Sanity environment."); if (studioProjectId!==projectId || studioDataset!==dataset || dataset!=="production") throw new Error("Sanity Studio/build targets disagree or are not production."); const client=createClient({projectId,dataset,apiVersion,useCdn:false}); const count=await client.fetch("count(*[_type == \"blogPost\"])"); process.stdout.write(JSON.stringify({configured:true,count,empty:count===0}));'
if ($LASTEXITCODE -ne 0) { throw 'Anonymous Sanity target/empty-content probe failed.' }
$targetProbe = $targetProbeJson | ConvertFrom-Json
if (-not $targetProbe.configured -or $targetProbe.count -ne 0 -or -not $targetProbe.empty) { throw 'Target dataset is not empty; stop before import.' }
$targetProbe | ConvertTo-Json -Compress
$studioProjectLine = Get-Content -LiteralPath '.env.local' | Where-Object { $_ -match '^SANITY_STUDIO_PROJECT_ID=' }
$sanityProjectId = ($studioProjectLine -split '=', 2)[1].Trim()
$studioDatasetLine = Get-Content -LiteralPath '.env.local' | Where-Object { $_ -match '^SANITY_STUDIO_DATASET=' }
$sanityDataset = ($studioDatasetLine -split '=', 2)[1].Trim()
```

Expected: sanitized output is exactly equivalent to `{"configured":true,"count":0,"empty":true}`. This confirms matching Studio/build targets, configured `production`, public anonymous reads, and no existing `blogPost` without printing the project ID or using a token. If the probe fails or any post exists, pause rather than relying on `--missing` to conceal an unexpected target.

- [ ] **Step 2: Add only the exact credentialed local Studio CORS origin**

Run the read-only check first:

```powershell
npm.cmd exec -- sanity cors list --project-id $sanityProjectId
```

If the exact origin is absent, run:

```powershell
npm.cmd exec -- sanity cors add http://localhost:3333 --credentials --project-id $sanityProjectId
npm.cmd exec -- sanity cors list --project-id $sanityProjectId
```

Expected: exactly `http://localhost:3333` with credentials. If it already exists with credentials, skip the add. If it exists without credentials, pause for user approval before any delete/re-add; never add a wildcard.

- [ ] **Step 3: Validate schema and start Studio without deployment**

Run:

```powershell
npm.cmd exec -- sanity schema validate
npm.cmd run studio
```

Expected: schema validation reports zero errors; Studio starts on `http://localhost:3333` with no schema errors. Open the local Studio, complete local authentication if prompted, and verify the structure exposes the existing `Blog Post` document type. Stop the dev server after evidence is recorded. Do not run `sanity deploy`.

- [ ] **Step 4: Dry-run, then apply, exactly the two missing bootstrap documents**

Run this step only after Task 5C's four-file source diff has passed focused GREEN checks and fresh Sol/high review, and Step 1 has freshly reconfirmed the empty target. First prove the permanent command's default dry-run; only then use the explicit apply flag:

Run:

```powershell
$dryRunLines = @(npm.cmd run --silent sanity:bootstrap)
if ($LASTEXITCODE -ne 0 -or $dryRunLines.Count -eq 0) { throw 'Authenticated bootstrap dry-run failed.' }
$dryRunSummary = $dryRunLines[-1] | ConvertFrom-Json
if ($dryRunSummary.mode -ne 'dry-run' -or $dryRunSummary.requested -ne 2 -or $dryRunSummary.resultCount -ne 2 -or -not $dryRunSummary.transactionAccepted) {
  throw 'Authenticated bootstrap dry-run returned an unexpected sanitized summary.'
}
$dryRunSummary | ConvertTo-Json -Compress

$applyLines = @(npm.cmd run --silent sanity:bootstrap -- --apply)
if ($LASTEXITCODE -ne 0 -or $applyLines.Count -eq 0) { throw 'Authenticated bootstrap apply failed.' }
$applySummary = $applyLines[-1] | ConvertFrom-Json
if ($applySummary.mode -ne 'apply' -or $applySummary.requested -ne 2 -or $applySummary.resultCount -ne 2 -or -not $applySummary.transactionAccepted) {
  throw 'Authenticated bootstrap apply returned an unexpected sanitized summary.'
}
$applySummary | ConvertTo-Json -Compress
```

Expected: dry-run prints only `{"mode":"dry-run","requested":2,"resultCount":2,"transactionAccepted":true}` and changes nothing. The explicit live form then prints only the equivalent `mode:"apply"` summary. Both executions use the authenticated CLI client, the environment API version and matched target, one two-document `createIfNotExists` transaction, no bulk importer, and no temporary file. Stop before apply on any dry-run mismatch.

- [ ] **Step 5: Verify exact published content and schema validity**

Run:

```powershell
$publishedProbeJson = node --env-file-if-exists=.env.local --input-type=module -e 'import {createClient} from "@sanity/client"; const {SANITY_PROJECT_ID:projectId,SANITY_DATASET:dataset,SANITY_API_VERSION:apiVersion}=process.env; if (!projectId || !dataset || !apiVersion) throw new Error("Missing required Sanity environment."); const client=createClient({projectId,dataset,apiVersion,useCdn:false}); const expected=[{_id:"seed-post-coordinating-brand-market-commerce",slug:"coordinating-brand-market-commerce"},{_id:"seed-post-from-packaging-to-purchase",slug:"from-packaging-to-purchase"}]; const rows=await client.fetch("*[_type == \"blogPost\" && !(_id in path(\"drafts.**\"))] | order(slug.current asc){_id,\"slug\":slug.current}"); const exact=JSON.stringify(rows)===JSON.stringify(expected); process.stdout.write(JSON.stringify({count:rows.length,exact})); if (!exact) throw new Error("Published Sanity documents do not match the approved bootstrap identities.");'
if ($LASTEXITCODE -ne 0) { throw 'Anonymous Sanity published-content probe failed.' }
$publishedProbe = $publishedProbeJson | ConvertFrom-Json
if ($publishedProbe.count -ne 2 -or -not $publishedProbe.exact) { throw 'Published Sanity identity probe failed.' }
$publishedProbe | ConvertTo-Json -Compress
npm.cmd exec -- sanity documents validate --project-id $sanityProjectId --dataset $sanityDataset --yes --level error
```

Expected: the anonymous, uncached probe compares the published rows internally against the exact approved IDs/slugs and prints only `{"count":2,"exact":true}`; document validation reports zero errors. Any other count or identity is a hard stop, and the probe must not print the rows themselves.

- [ ] **Step 6: Prove the bootstrap rerun is non-destructive**

Run:

```powershell
$revisionProbe = 'import {createClient} from "@sanity/client"; import {createHash} from "node:crypto"; const {SANITY_PROJECT_ID:projectId,SANITY_DATASET:dataset,SANITY_API_VERSION:apiVersion}=process.env; if (!projectId || !dataset || !apiVersion) throw new Error("Missing required Sanity environment."); const client=createClient({projectId,dataset,apiVersion,useCdn:false}); const ids=["seed-post-coordinating-brand-market-commerce","seed-post-from-packaging-to-purchase"]; const rows=await client.fetch("*[_id in $ids] | order(_id asc){_id,_rev,_updatedAt}",{ids}); if (rows.length!==ids.length) throw new Error("Expected bootstrap documents are missing."); process.stdout.write(createHash("sha256").update(JSON.stringify(rows)).digest("hex"));'
$beforeMissingOnlyRerun = (node --env-file-if-exists=.env.local --input-type=module -e $revisionProbe | Out-String).Trim()
if ($LASTEXITCODE -ne 0 -or $beforeMissingOnlyRerun -notmatch '^[a-f0-9]{64}$') { throw 'Failed to capture pre-rerun revision digest.' }
$rerunLines = @(npm.cmd run --silent sanity:bootstrap -- --apply)
if ($LASTEXITCODE -ne 0 -or $rerunLines.Count -eq 0) { throw 'Missing-only bootstrap rerun failed.' }
$rerunSummary = $rerunLines[-1] | ConvertFrom-Json
if ($rerunSummary.mode -ne 'apply' -or $rerunSummary.requested -ne 2 -or $rerunSummary.resultCount -ne 2 -or -not $rerunSummary.transactionAccepted) {
  throw 'Missing-only bootstrap rerun returned an unexpected sanitized summary.'
}
$afterMissingOnlyRerun = (node --env-file-if-exists=.env.local --input-type=module -e $revisionProbe | Out-String).Trim()
if ($LASTEXITCODE -ne 0 -or $afterMissingOnlyRerun -notmatch '^[a-f0-9]{64}$') { throw 'Failed to capture post-rerun revision digest.' }
if ($beforeMissingOnlyRerun -ne $afterMissingOnlyRerun) { throw 'Missing-only bootstrap changed existing document revision state.' }
'MISSING_ONLY_REVISION_STATE_UNCHANGED=True'
```

Expected: the second explicit apply transaction accepts the two `createIfNotExists` mutations as no-ops; the SHA-256 digest of the exact two documents' `_id`, `_rev`, and `_updatedAt` rows is identical before and after. Only the sanitized apply summary and final boolean marker are reported; document IDs, revisions, and timestamps stay out of logs.

- [ ] **Step 7: Perform strict live sync and verify public routes**

Run:

```powershell
npm.cmd run content:sync:strict
$manifest = Get-Content -LiteralPath 'src/generated/blogManifest.json' -Raw | ConvertFrom-Json
$actualSlugs = @($manifest.posts.slug | Sort-Object)
$expectedSlugs = @('coordinating-brand-market-commerce', 'from-packaging-to-purchase')
if ($manifest.totalPosts -ne 2 -or -not $manifest.blogsEnabled) { throw 'Live Sanity manifest did not enable exactly two posts.' }
if (Compare-Object $expectedSlugs $actualSlugs) { throw 'Live Sanity manifest slugs differ from the approved routes.' }
Test-Path -LiteralPath 'src/generated/blog/coordinating-brand-market-commerce.json'
Test-Path -LiteralPath 'src/generated/blog/from-packaging-to-purchase.json'
```

Expected: console says it fetched two published documents from Sanity, never says it used fallback, manifest has exactly two approved slugs, and both article snapshots exist.

- [ ] **Step 8: Run focused tests, full quality gate, and public source-map check**

Run in this order:

```powershell
npm.cmd test -- scripts/__tests__/sanitySetup.test.js scripts/__tests__/bootstrap-sanity.test.js scripts/__tests__/sync-blog-content.test.js src/content/__tests__/publication.test.js src/pages/__tests__/Blogs.test.jsx src/pages/__tests__/BlogPost.test.jsx
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run verify:html
$publicSourceMaps = @(Get-ChildItem -LiteralPath 'dist' -Recurse -File -Filter '*.map')
if ($publicSourceMaps.Count -ne 0) { throw "Public source maps found: $($publicSourceMaps.FullName -join ', ')" }
git diff --check
```

Expected: focused and full tests pass; lint passes; strict build fetches exactly two published Sanity articles and prerenders both `/blogs` routes; HTML verification passes; `dist` contains zero `.map` files; tracked diff check passes.

- [ ] **Step 9: Run the untracked-aware whitespace and secret/staging audit**

Run:

```powershell
$orchestrationPaths = @(
  'AGENTS.md',
  '.codex/config.toml',
  '.codex/agents/evidence-mapper.toml',
  '.codex/agents/project-planner.toml',
  '.codex/agents/bounded-implementer.toml',
  '.codex/agents/independent-reviewer.toml',
  'docs/agent/PROJECT_CONTEXT.md',
  'docs/superpowers/plans/2026-08-21-codex-project-orchestration.md',
  'docs/superpowers/specs/2026-08-21-dspl-sanity-insights-setup-design.md',
  'docs/superpowers/plans/2026-08-21-dspl-sanity-insights-setup.md'
)
$whitespaceFailures = foreach ($file in $orchestrationPaths) {
  if (Test-Path -LiteralPath $file) {
    $lineNumber = 0
    foreach ($line in Get-Content -LiteralPath $file) {
      $lineNumber++
      if ($line -match '[ \t]+$') { "${file}:${lineNumber}" }
    }
  }
}
if ($whitespaceFailures) { throw "Trailing whitespace: $($whitespaceFailures -join ', ')" }
git status --short --untracked-files=all
git diff --cached --name-only
git ls-files .env.local
git check-ignore -v .env.local
rg -n --hidden --glob '!node_modules/**' --glob '!dist/**' --glob '!.git/**' '(SANITY_(READ|AUTH|IMPORT)_TOKEN\s*=\s*[^\s]|sk[A-Za-z0-9_-]{20,})' .
```

Expected: no whitespace failures; nothing is staged; `.env.local` is ignored and untracked; no authentication token/session or generated import file appears; status contains only the exact Task 2-5 allowlist plus the preserved approved spec and this plan. The token-pattern scan may mention variable names in source, but must not show a non-empty value.

- [ ] **Step 10: Stop at review handoff**

Record command outputs, exact status, and external project/dataset/CORS/import evidence for the coordinator. Request a fresh `independent_reviewer` on Sol/high over the actual diff and remote-verification evidence. Do not commit, push, merge, deploy, change branches, or edit `docs/agent/PROJECT_CONTEXT.md` from the bounded implementation task.

## Luna Pause/Stop Conditions

Luna must pause and return control to the coordinator when any of these occurs:

1. Browser login, SSO, account, organization, or plan selection needs user input.
2. Any existing project named `DSPL Insights` makes project identity ambiguous.
3. `.env.local` already exists with unknown keys or Sanity identifiers that conflict with the selected project.
4. The selected `production` dataset is absent, private, non-empty, or contains any unexpected `blogPost` before bootstrap.
5. `http://localhost:3333` exists without credentials, or any wildcard/extra origin would need removal.
6. Studio schema validation or document validation reports an error.
7. The bootstrap uses bulk import, replacement/deletion/patch semantics, more than one transaction, mutates an existing fixed ID, fails to use direct `getDocuments(ids)` preflight, or constructs any transaction when both fixed IDs already exist; or the current all-existing dry-run/apply changes the canonical direct Doc API revision state.
8. The bootstrap command resolves through `node_modules/.bin/sanity.cmd`, invokes `datasets import`, imports `@sanity/cli` internals instead of official `sanity/cli`, writes NDJSON to disk, accepts an apply-by-default path, or changes any dependency/lockfile.
9. Strict sync reports fallback, returns any slug other than the two approved slugs, or would overwrite unrelated generated/user work.
10. Task 5A recovery resolves `styled-components` to anything other than `6.5.3`, changes `package.json` from `^6.1.15`, changes a file beyond the allowed lock/report scope, exceeds the original audit baseline, changes the protected manifest, or fails its focused/HTTP checks.
11. Any file outside the exact task allowlist changes, a credential is detected, or an unrelated test/build failure appears.
12. Any request arises to deploy Studio/site, create a token, add production CORS, commit, push, merge, or change branches.
13. An anonymous `@sanity/client` probe uses a token or CDN, prints project/document/revision data, omits the environment API version, returns a malformed digest, or fails its empty/exact/revision assertion; or the authenticated bootstrap prints any identifier, transaction ID, token, or response body.
14. `sanity documents query` is reintroduced, or any native CLI crash recurs. Preserve the evidence and stop; do not substitute another remote mutation path.
15. Task 5 cannot continue with the assigned Luna/max bounded implementer as the sole writer.
16. Task 5C or Task 5D lacks fresh Sol/high APPROVED review, the Task 5D summary is not exactly the seven sanitized fields, or apply is requested unless the all-existing dry-run reports `transactionSubmitted:false` and the direct digest remains stable.

## Completion Evidence Checklist

- [ ] Authentication succeeded without recording a credential.
- [ ] Exactly one confirmed `DSPL Insights` project and public `production` dataset exist.
- [ ] Root `styled-components` remains exactly declared as `^6.1.15`, recovery resolves exactly `6.5.3`, audit returns to no more than 6 moderate / 1 high / 7 total with no per-severity increase, and Studio HTTP 200 proves the existing esbuild works without approving scripts or changing configuration.
- [ ] Local Studio starts at `http://localhost:3333` and exposes `Blog Post` without schema errors.
- [ ] Exact credentialed localhost CORS exists; no wildcard or production-site origin was added.
- [ ] Task 5B is retained as diagnostic history; no further bulk-import or dependency-upgrade attempt is made.
- [ ] Task 5C's RED/GREEN cycle proves the installed first-party `sanity exec --with-user-token` path uses `getCliClient({apiVersion})`, matched environment/client targets, default dry-run, explicit `--apply`, sanitized output, and no temporary file/dependency change; Task 5D proves direct exact-ID preflight, no transaction when both IDs exist, and at most one missing-only `createIfNotExists` transaction; fresh Sol/high review accepts each bounded diff before remote use.
- [ ] Anonymous official `@sanity/client` v8 probes use the environment project/dataset/API version with `useCdn: false`, no token, and count/boolean or revision-digest-only output; Task 5 never invokes `sanity documents query`.
- [ ] Exactly two expected published IDs/slugs pass the internal exact comparison and validate with zero errors.
- [ ] The current all-existing dry-run and explicit apply both report `transactionSubmitted:false`, while three canonical direct Doc API revision-state digests remain identical.
- [ ] Strict live sync fetched Sanity, not fallback, and generated both approved routes.
- [ ] Focused tests, full tests, lint, strict build, HTML verification, and zero public source maps pass.
- [ ] `.env.local`, sessions, tokens, and temporary import data are absent from Git/staging.
- [ ] Fresh independent review accepts the actual diff; no commit, push, merge, or deployment occurred.
