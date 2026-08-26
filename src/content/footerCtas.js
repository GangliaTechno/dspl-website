export const footerCtas = Object.freeze({
  '/': {
    eyebrow: 'Build with us',
    title: 'Turn a promising idea into a working project.',
    text: 'Tell us the context, the constraint and the outcome you need. We reply within one working day.',
    label: 'Start a project',
    href: '/start',
  },
  '/about': {
    eyebrow: 'Build with us',
    title: 'Ready to build with fewer unknowns?',
    text: 'Tell us what you are building, where you need support and what a good next step looks like.',
    label: 'Contact DSPL',
    href: '/contact',
  },
  '/brands': {
    eyebrow: 'Build with us',
    title: 'Ready to build with fewer unknowns?',
    text: 'Tell us what you are building, where you need support and what a good next step looks like.',
    label: 'Start a project',
    href: '/start',
  },
  '/branding': {
    eyebrow: 'Build with us',
    title: 'Ready to build with fewer unknowns?',
    text: 'Tell us what you are building, where you need support and what a good next step looks like.',
    label: 'Start a branding project',
    href: '/start',
  },
  '/marketing': {
    eyebrow: 'Build with us',
    title: 'Ready to build with fewer unknowns?',
    text: 'Tell us what you are building, where you need support and what a good next step looks like.',
    label: 'Start a marketing project',
    href: '/start',
  },
  '/ecommerce': {
    eyebrow: 'Build with us',
    title: 'Ready to build with fewer unknowns?',
    text: 'Tell us what you are building, where you need support and what a good next step looks like.',
    label: 'Start an e-commerce project',
    href: '/start',
  },
  '/blogs': {
    eyebrow: 'Build with us',
    title: 'Ready to build with fewer unknowns?',
    text: 'Tell us what you are building, where you need support and what a good next step looks like.',
    label: 'Contact DSPL',
    href: '/contact',
  },
});

export const getFooterCta = (pathname) => {
  if (footerCtas[pathname]) {
    return footerCtas[pathname];
  }
  if (pathname.startsWith('/blogs/')) {
    return footerCtas['/blogs'];
  }
  return null;
};
