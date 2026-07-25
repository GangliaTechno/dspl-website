import { Sparkles, Compass, BookOpen, ShieldCheck } from 'lucide-react';
import brandingBgImg from '../assets/brand_hero.jpg';
import ServicePage from '../components/ServicePage';

const Branding = () => {


  const offers = [
    {
      title: 'Brand Identity and Visual Systems',
      text: 'We design your logo, colours, type, and style rules. You get one clear look that works on your packaging, your site, and your ads.',
      icon: <Sparkles size={22} />
    },
    {
      title: 'Market Positioning',
      text: 'We study your buyers and your rivals, then find the gap only you can own. You get a clear reason for people to choose you.',
      icon: <Compass size={22} />
    },
    {
      title: 'Brand Story and Voice',
      text: 'We write your story and the way you speak. We give you a message map so your words stay the same across every page, post, and pack.',
      icon: <BookOpen size={22} />
    },
    {
      title: 'Design Systems and Brand Assets',
      text: 'We hand you an organised set of templates and files your team can reuse. Your brand stays consistent as you grow.',
      icon: <ShieldCheck size={22} />
    }
  ];

  const faqs = [
    {
      q: 'How long does a brand identity take?',
      a: 'A full identity takes four to six weeks, depending on scope.'
    },
    {
      q: 'Do you only design logos?',
      a: 'No. We build the logo, the rules, the voice, and the story, so your brand holds together everywhere.'
    },
    {
      q: 'Can you refresh an existing brand?',
      a: 'Yes. We can update a tired brand without losing what your customers already know.'
    }
  ];

  return (
    <ServicePage
      seoTitle="Branding Agency | Brand Identity & Strategy | Dashapatmaja"
      seoDesc="Build a brand customers remember and trust. Logo, identity, positioning, and brand story for businesses in India. By the team behind Raw Radicles."
      pageTypeClass="branding-page"
      heroTitle="Branding"
      heroSubtitle="Build a name customers trust and remember."
      heroDesc="We build the parts of your brand that make customers choose you: your name, identity, voice, and story. We did this for Raw Radicles. We can do it for you."
      bgImg={brandingBgImg}
      mattersText="Anyone can copy your product. No one can copy your brand. A clear brand sets you apart, earns trust fast, and lets you charge a fair price. It is the reason a customer picks you again and tells a friend."
      offersTitle="What we offer"
      offersDesc="A full set of brand work to define your business, from the first logo to the last template."
      offers={offers}
      faqsTitle="Frequently Asked Questions"
      faqsDesc="Common questions about our brand identity design and visual strategies."
      faqs={faqs}
    />
  );
};

export default Branding;
