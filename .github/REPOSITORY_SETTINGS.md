# GitHub repository settings handoff

These settings require organization-owner or repository-administrator access.
They are intentionally separate from source changes and deployment.

## About

- Description: `Public website for Dasha Patmaja Services - branding, marketing, e-commerce, and owned-brand proof.`
- Website: `https://dashapatmaja.in`
- Topics:
  - `react`
  - `vite`
  - `branding`
  - `digital-marketing`
  - `ecommerce`
  - `prerendering`

## Default and protected branch

Keep `main` as the default branch. Add a branch protection rule for `main`
that:

- requires a pull request before merging;
- requires at least one approval;
- requires the `build-and-test` CI status check;
- requires conversations to be resolved;
- blocks force pushes;
- blocks branch deletion.

Do not configure a source-code push or pull request to deploy automatically
until DSPL explicitly approves that release workflow.

## Merge and release policy

- Develop changes on named feature branches.
- Review and approve the visual result before merging.
- Treat merge approval and deployment approval as separate decisions.
- Keep the production Web3Forms key rotated and out of Git history.

## Legal decision still required

The public repository currently has no software license. Do not add an
open-source license or a code of conduct on DSPL's behalf without an explicit
owner/legal decision about reuse rights and enforcement.
