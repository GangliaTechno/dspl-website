# Security policy

## Supported code

Security fixes are evaluated for the production website and the latest code on
`main`. Feature branches are development work and may change before review.

## Reporting a vulnerability

Please do not disclose a suspected vulnerability in a public GitHub issue.
Email `director@dashapatmaja.in` with:

- the affected URL, route, or component;
- clear reproduction steps;
- the potential impact;
- relevant browser, device, or request details;
- a safe proof of concept, if available.

Do not include real credentials or personal data. Allow the maintainers time to
investigate and coordinate a fix before publishing details.

## Browser-visible configuration

This is a static Vite application. Variables beginning with `VITE_` are
compiled into browser-visible JavaScript and must not contain private server
credentials. Local values belong in the ignored `.env` file.
