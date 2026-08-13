export const footerCtas = Object.freeze({
  '/': {
    eyebrow: 'Build with us',
    title: 'Turn a promising idea into a coordinated project.',
    text: 'Share the context, constraints, and outcome you are working towards.',
    label: 'Start a project',
    href: '/start',
  },
  '/about': {
    eyebrow: 'Work with DSPL',
    title: 'Bring the right disciplines around the same brief.',
    text: 'Tell us where your project stands and where coordinated support would help.',
    label: 'Start a project',
    href: '/start',
  },
  '/brands': {
    eyebrow: 'Owned brand experience',
    title: 'See how Raw Radicles is being developed.',
    text: 'Review the confirmed workstreams behind our first owned consumer brand.',
    label: 'View the project overview',
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
    text: 'Share your store, marketplace, payment, fulfilment, or compliance-coordination needs.',
    label: 'Start an e-commerce project',
    href: '/start',
  },
});

export const getFooterCta = (pathname) => footerCtas[pathname] || null;
