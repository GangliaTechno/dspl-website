import { blogsEnabled } from './publication';

const freezeEntry = (entry) => {
  const children = entry.children
    ? Object.freeze(
        entry.children.map((child) =>
          Object.freeze({
            ...child,
            ...(child.activePrefixes
              ? { activePrefixes: Object.freeze([...child.activePrefixes]) }
              : {}),
          }),
        ),
      )
    : undefined;

  return Object.freeze({
    ...entry,
    ...(entry.activePrefixes
      ? { activePrefixes: Object.freeze([...entry.activePrefixes]) }
      : {}),
    ...(children ? { children } : {}),
  });
};

/**
 * @param {boolean} [includeInsights=blogsEnabled]
 * @returns {readonly object[]}
 */
export const createHeaderNavigation = (includeInsights = blogsEnabled) => {
  const entries = [
    {
      id: 'company',
      label: 'Company',
      kind: 'group',
      children: [
        {
          id: 'about',
          label: 'About DSPL',
          to: '/about',
          description: 'Company, leadership, journey and direction',
        },
        {
          id: 'brands',
          label: 'Our Brands',
          to: '/brands',
          description: 'Consumer brands developed and operated by DSPL',
          activePrefixes: ['/brands'],
        },
      ],
    },
    {
      id: 'capabilities',
      label: 'Capabilities',
      kind: 'group',
      children: [
        {
          id: 'branding',
          label: 'Branding',
          to: '/branding',
          description: 'Positioning, identity and brand systems',
          activePrefixes: ['/branding'],
        },
        {
          id: 'marketing',
          label: 'Marketing',
          to: '/marketing',
          description: 'Strategy, campaigns, content and measurement',
          activePrefixes: ['/marketing'],
        },
        {
          id: 'ecommerce',
          label: 'E-commerce',
          to: '/ecommerce',
          description: 'Storefront, marketplace and commerce execution',
          activePrefixes: ['/ecommerce'],
        },
      ],
    },
    ...(includeInsights
      ? [
          {
            id: 'insights',
            label: 'Insights',
            kind: 'link',
            to: '/blogs',
            activePrefixes: ['/blogs'],
          },
        ]
      : []),
    {
      id: 'contact',
      label: 'Contact',
      kind: 'link',
      to: '/contact',
    },
  ];

  return Object.freeze(entries.map(freezeEntry));
};

export const HEADER_NAVIGATION = createHeaderNavigation();

export const HEADER_PRIMARY_ACTION = Object.freeze({
  id: 'start',
  label: 'Start a project',
  kind: 'link',
  to: '/start',
});

export const normalizeNavigationPath = (pathname = '') => {
  if (pathname === '/') return pathname;
  return pathname.replace(/\/+$/, '');
};

/**
 * @param {string} pathname
 * @param {object} item
 * @returns {'page'|'location'|null}
 */
export const getNavigationMatch = (pathname, item) => {
  const currentPath = normalizeNavigationPath(pathname);
  const destination = normalizeNavigationPath(item.to);

  if (currentPath === destination) return 'page';
  if (
    (item.activePrefixes || []).some((prefix) =>
      currentPath.startsWith(`${normalizeNavigationPath(prefix)}/`),
    )
  ) {
    return 'location';
  }

  return null;
};

/**
 * @param {string} pathname
 * @param {readonly object[]} [navigation=HEADER_NAVIGATION]
 * @returns {{parentId: string|null, itemId: string|null, ariaCurrent: 'page'|'location'|null}}
 */
export const getHeaderNavigationState = (
  pathname,
  navigation = HEADER_NAVIGATION,
) => {
  for (const entry of navigation) {
    if (entry.kind === 'group') {
      for (const item of entry.children) {
        const match = getNavigationMatch(pathname, item);
        if (match) {
          return {
            parentId: entry.id,
            itemId: item.id,
            ariaCurrent: match,
          };
        }
      }
      continue;
    }

    const match = getNavigationMatch(pathname, entry);
    if (match) {
      return {
        parentId: null,
        itemId: entry.id,
        ariaCurrent: match,
      };
    }
  }

  return { parentId: null, itemId: null, ariaCurrent: null };
};
