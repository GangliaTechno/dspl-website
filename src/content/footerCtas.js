export const footerCtas = Object.freeze({
  '/': {
    eyebrow: 'Build with us',
    title: 'Turn a promising idea into a working project.',
    text: 'Tell us the context, the constraint and the outcome you need. We reply within one working day.',
    label: 'Start a project',
    href: '/start',
  },
  '/about': {
    eyebrow: 'Work with DSPL',
    title: 'Ready to build with fewer unknowns?',
    text: 'Tell us what you are building, where you need support and what a good next step looks like.',
    label: 'Contact DSPL',
    href: '/start',
  },
  '/brands': {
    eyebrow: 'Owned brand experience',
    title: 'See how DSPL built Raw Radicles.',
    text: 'Explore the operating work behind our first owned consumer brand.',
    label: 'Explore Raw Radicles',
    href: '/brands/raw-radicles',
  },
  '/branding': {
    eyebrow: 'Build a usable brand system',
    title: 'Clarify the decisions your brand needs to make consistently.',
    text: 'Share your current materials and the decisions that are holding the work back.',
    label: 'Start a branding project',
    href: '/start',
  },
  '/marketing': {
    eyebrow: 'Plan the next programme',
    title: 'Connect campaign activity to a clearer operating plan.',
    text: 'Tell us what has been tried, what can be measured, and what needs to change.',
    label: 'Start a marketing project',
    href: '/start',
  },
  '/ecommerce': {
    eyebrow: 'Improve the commerce operation',
    title: 'Make the buying journey and operating handoffs easier to manage.',
    text: 'Share your store, marketplace, payment, fulfilment, or compliance-support needs.',
    label: 'Start an e-commerce project',
    href: '/start',
  },
  '/blogs': {
    eyebrow: 'From insight to execution',
    title: 'Have a brand, market or commerce challenge worth working through?',
    text: 'Bring the context, constraints, and outcome you are working towards.',
    label: 'Start a project',
    href: '/start',
  },
});

const normalizePath = (path) =>
  path && path.length > 1 ? path.replace(/\/+$/, '') : path;

export const getFooterCta = (pathname) =>
  footerCtas[normalizePath(pathname)] || null;
