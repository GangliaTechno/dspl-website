import { ShoppingCart, HeartHandshake, Layers, CreditCard } from 'lucide-react';
import ecomBgImg from '../assets/ecom.webp';
import ecomBgImgMobile from '../assets/ecom-mobile.webp';
import ServicePage from '../components/ServicePage';

const Ecommerce = () => {

  const offers = [
    {
      title: 'Store Setup and Build',
      text: 'We build fast, mobile-first stores on Shopify, WooCommerce, or React. Your store loads quickly and looks right on every phone.',
      icon: <ShoppingCart size={22} />
    },
    {
      title: 'Conversion Rate Optimisation (CRO)',
      text: 'We study how shoppers move through your store, simplify the checkout, and remove the steps that lose sales. You keep more of the buyers you already pay to bring in.',
      icon: <HeartHandshake size={22} />
    },
    {
      title: 'Multi-Channel Selling',
      text: 'We connect your store with Amazon, Flipkart, and quick commerce, and keep stock and prices in sync. You sell in more places without the mess.',
      icon: <Layers size={22} />
    },
    {
      title: 'Payments and Delivery Setup',
      text: 'We set up secure payments, multiple currencies, and shipping links to your warehouse. Orders flow from cart to doorstep without manual work.',
      icon: <CreditCard size={22} />
    }
  ];

  const faqs = [
    {
      q: 'Which platform do you use?',
      a: 'Shopify or WooCommerce for most stores. We build on React when you need something custom.'
    },
    {
      q: 'Can you fix my current store?',
      a: 'Yes. We audit your store, find what loses sales, and fix it.'
    },
    {
      q: 'Do you handle Amazon and quick commerce?',
      a: 'Yes. We connect your store with marketplaces and keep stock and prices in sync.'
    }
  ];

  return (
    <ServicePage
      seoTitle="E-commerce Services | Store Setup & CRO | Dashapatmaja"
      seoDesc="Sell more online. Fast stores on Shopify and WooCommerce, sharper checkouts, and Amazon and quick commerce integration. By a team that runs its own store."
      pageTypeClass="ecommerce-page"
      heroTitle="E-commerce"
      heroSubtitle="Build a store that loads fast and converts."
      heroDesc="We build and run online stores that turn visitors into buyers. We set up your store, your payments, and your delivery, then improve the steps that lose sales. We sell our own brand this way, so we know what holds up."
      bgImg={ecomBgImg}
      bgImgMobile={ecomBgImgMobile}
      mattersText="An online store is your salesperson that never sleeps. A fast site, a simple checkout, and reliable delivery raise your sales, bring buyers back, and cut the time you spend fixing orders. A small change to a checkout can add real revenue."
      offersTitle="What we offer"
      offersDesc="End-to-end e-commerce work, built for speed, safe payments, and selling in more than one place."
      offers={offers}
      faqsTitle="Frequently Asked Questions"
      faqsDesc="Common questions about our e-commerce platforms and optimization strategies."
      faqs={faqs}
    />
  );
};

export default Ecommerce;
