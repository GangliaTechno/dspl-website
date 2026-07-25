import { Search, Megaphone, BarChart, FileText } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import marketingBgImg from '../assets/Marketing_hero_section.webp';
import marketingBgImgMobile from '../assets/Marketing_hero_section-mobile.webp';
import ServicePage from '../components/ServicePage';

const Marketing = () => {
  useSEO(
    'Marketing Services | SEO, Paid Ads & Content | Dashapatmaja',
    'Grow with marketing that pays back. SEO, paid campaigns, analytics, and content for businesses in India. Built by a team that markets its own brands.'
  );

  const offers = [
    {
      title: 'Search Engine Optimisation (SEO)',
      text: 'We help the right people find you on Google. We fix your site, target the words your buyers use, and build content that ranks and brings free traffic month after month.',
      icon: <Search size={22} />
    },
    {
      title: 'Paid Campaign Management',
      text: 'We plan and run paid ads on Google, Meta, and quick commerce platforms. We review spend daily and move budget to what works, so you get more leads and sales for less.',
      icon: <Megaphone size={22} />
    },
    {
      title: 'Analytics and Performance Tracking',
      text: 'We set up clean tracking across your site and ads. You get clear reports on traffic, cost per customer, and return, so every decision rests on real numbers.',
      icon: <BarChart size={22} />
    },
    {
      title: 'Content and Copywriting',
      text: 'We write landing pages, blogs, and product copy that read well and sell. Each piece is built to rank on search and move readers to act.',
      icon: <FileText size={22} />
    }
  ];

  const faqs = [
    {
      q: 'How soon will I see results?',
      a: 'SEO builds over three to six months. Paid ads can bring leads in the first week. We usually run both, so you get early wins while the long-term traffic grows.'
    },
    {
      q: 'Do I need a large budget?',
      a: 'No. We start at a level that fits you and raise spend only as the numbers improve.'
    },
    {
      q: 'Will I know what I am paying for?',
      a: 'Yes. You get a monthly report with traffic, leads, cost per customer, and return.'
    }
  ];

  return (
    <ServicePage
      seoTitle="Performance Marketing & SEO Agency | Dashapatmaja"
      seoDesc="Data-driven marketing that gets you found and gets you sales. SEO, Google Ads, Meta Ads, and content strategies. By the team behind Raw Radicles."
      pageTypeClass="marketing-page"
      heroTitle="Marketing"
      heroSubtitle="Get found. Get chosen. Get sales."
      heroDesc="We build marketing systems that put your business in front of the people already looking for what you sell. We did this for Raw Radicles. We can do it for you."
      bgImg={marketingBgImg}
      bgImgMobile={marketingBgImgMobile}
      mattersText="Great products fail quietly every day because no one knows they exist. Good marketing changes the math. It turns invisible businesses into obvious choices and casual browsers into paying customers."
      offersTitle="What we offer"
      offersDesc="A full set of marketing work to find your audience and turn them into buyers."
      offers={offers}
      faqsTitle="Frequently Asked Questions"
      faqsDesc="Common questions about our marketing, SEO, and paid ad strategies."
      faqs={faqs}
    />
  );
};

export default Marketing;
