/**
 * Authoritative company facts for Dashapatmaja Solutions Pvt Ltd.
 * Single source of truth for statutory details, registration numbers,
 * registered office address, and official contact points.
 */

export const COMPANY_FACTS = Object.freeze({
  legalName: 'Dashapatmaja Solutions Pvt Ltd',
  shortName: 'DSPL',
  cin: 'U74999KA2022PTC163810',
  incorporationDate: '28 July 2022',
  incorporationYear: '2022',
  roc: 'ROC Bangalore',
  natureOfBusiness: 'Brand development, operating company, and commercial capability services',
  registeredOffice: Object.freeze({
    line1: '#12, 4th Floor, MUTBI',
    line2: 'Advanced Research Center, Madhava Nagar',
    locality: 'Manipal',
    region: 'Karnataka',
    postalCode: '576104',
    country: 'India',
    countryCode: 'IN',
    fullAddress: '#12, 4th Floor, MUTBI, Advanced Research Center, Madhava Nagar, Manipal, Karnataka 576104',
  }),
  incubation: Object.freeze({
    incubator: 'Manipal Universal Technology Business Incubator (MUTBI)',
    institution: 'Manipal Academy of Higher Education (MAHE)',
    support: 'DST-NIDHI PRAYAS',
  }),
  contacts: Object.freeze({
    primaryPhone: '+91 88619 42440',
    primaryPhoneDigits: '+918861942440',
    secondaryPhone: '+91 90725 56665',
    secondaryPhoneDigits: '+919072556665',
    directorEmail: 'director@dashapatmaja.in',
    projectEmail: 'dsplmanipal@gmail.com',
    operatingHours: 'Monday – Saturday: 9:00 AM – 6:00 PM IST',
  }),
  socials: Object.freeze({
    linkedin: 'https://www.linkedin.com/company/dashapatmaja-solutions-private-limited/',
  }),
  brands: Object.freeze({
    flagship: 'Raw Radicles',
    flagshipPath: '/brands/raw-radicles',
  }),
});
