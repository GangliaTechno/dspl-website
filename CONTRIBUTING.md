# Contributing to the DSPL website

Thank you for helping improve the Dashapatmaja Solutions Pvt Ltd website. This
repository uses short-lived branches and pull requests so that the public site
changes only after review.

## Development workflow

1. Start from the latest `main`.
2. Create a descriptive branch such as `name/contact-form-copy`.
3. Install the locked dependency graph with `npm ci`.
4. Keep environment values in a local `.env`; never commit credentials.
5. Make the smallest change that solves the stated problem.
6. Run the complete quality gate before requesting review.

```powershell
npm run lint
npm test
npm run build
npm run verify:html
```

## Pull requests

Pull requests should include:

- a concise explanation of the user-facing outcome;
- the routes and components affected;
- desktop and mobile screenshots for visual changes;
- accessibility, responsive, and reduced-motion considerations;
- the verification commands that passed;
- an explicit note about deployment impact.

Do not merge or deploy a visual change until it has been reviewed. Keep
deployment as a separate, explicitly approved action.

## Content and design standards

- Use `PRODUCT.md` for audience, positioning, proof, and conversion intent.
- Use `DESIGN.md` for tokens, typography, spacing, imagery, and anti-patterns.
- Prefer verified evidence over unsupported performance claims.
- Preserve the warm cream, black, and gold identity unless a reviewed design
  decision changes it.
- Use responsive image sources and meaningful alternative text.

## Security

Do not include secrets, access keys, private customer information, or
credentials in commits, screenshots, issues, or pull requests. Follow
`SECURITY.md` for private vulnerability reporting.
