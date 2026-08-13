import './About.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { motion, useReducedMotion } from 'framer-motion';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';
import RotatingHeroMedia from '../components/RotatingHeroMedia';

import manuImg from '../assets/manu_pro_fixed.webp';
import sreeImg from '../assets/sree_pro_extended.webp';
import drImg from '../assets/dr_pro.webp';
import balakrishnaImg from '../assets/balakrishna_pro_extended.webp';
import anushaImg from '../assets/Anusha-mam_pro.webp';
import nameshImg from '../assets/ceo_pro.webp';
import aboutTeam01960 from '../assets/about-team-01-960.webp';
import aboutTeam011440 from '../assets/about-team-01-1440.webp';
import aboutTeam01Mobile from '../assets/about-team-01-mobile.webp';
import aboutTeam02960 from '../assets/about-team-02-960.webp';
import aboutTeam021440 from '../assets/about-team-02-1440.webp';
import aboutTeam02Mobile from '../assets/about-team-02-mobile.webp';
import teamBgImg from '../assets/linen_concrete_texture.webp';
import journey2023Img from '../assets/about-journey-2023.webp';
import journey2024Img from '../assets/about-journey-2024.webp';
import journey2025Img from '../assets/about-journey-2025.webp';
import journey2026Img from '../assets/about-journey-2026.webp';
import {
  getAboutRevealInitial,
  getAboutRevealTransition,
  getHashScrollBehavior,
} from './aboutMotion';

const getAboutHeroTransition = (prefersReducedMotion) => (
  prefersReducedMotion
    ? getAboutRevealTransition(true, 0)
    : { duration: 0.8, ease: 'easeOut', delay: 0 }
);

const journeyMilestones = [
  {
    year: '2022',
    title: 'Company incorporation',
    image: journey2023Img,
    width: 1536,
    height: 1024,
    alt: 'Early consumer-brand planning materials at a shared workspace',
    items: [
      'Dashapatmaja Solutions Pvt Ltd was incorporated on 28 July 2022.',
      'The company was formed to develop consumer brands and the capabilities needed to take them to market.',
    ],
  },
  {
    year: '2023',
    title: 'First incubation',
    image: journey2023Img,
    width: 1536,
    height: 1024,
    alt: 'Consumer-brand planning materials in an early-stage incubator workspace',
    items: [
      'Incubated at GoK Bioincubator, Manipal, where we set up our base.',
    ],
  },
  {
    year: '2024',
    title: 'First brand',
    image: journey2024Img,
    width: 1536,
    height: 1024,
    alt: 'Cacao, chocolate, and Ayurvedic botanicals arranged for premium product development',
    items: [
      'Launched Raw Radicles, a premium chocolate brand with Ayurveda inside.',
      'Built the product, packaging, and supply chain from the ground up.',
    ],
  },
  {
    year: '2025',
    title: 'MUTBI incubation and national grant',
    image: journey2025Img,
    width: 1536,
    height: 1024,
    alt: 'Research desk with a consumer-product prototype and measured botanical ingredients',
    items: [
      'Joined MUTBI at MAHE, Manipal, for technical and academic support.',
      'Won a government grant under the NIDHI-PRAYAS scheme.',
      'Signed a Memorandum of Understanding with Amruthanjali Ayurveda for manufacturing.',
    ],
  },
  {
    year: '2026',
    title: 'Services arm',
    image: journey2026Img,
    width: 1536,
    height: 1024,
    alt: 'Brand and e-commerce operations studio with packaging, photography, and dispatch materials',
    items: [
      'Opened our branding, marketing, and e-commerce services to outside clients.',
    ],
  },
];

const directionCards = [
  {
    label: 'Company and operating team',
    title: 'What we are',
    text: 'A private limited company developing and operating consumer brands while providing coordinated branding, marketing, e-commerce, and compliance-support services.',
  },
  {
    label: 'Long-term direction',
    title: 'What we are building towards',
    text: 'A focused portfolio of consumer brands and an operating team able to support businesses from brand decisions through market and commerce execution.',
  },
  {
    label: 'Operating principles',
    title: 'How we work',
    text: 'We define scope, responsibilities, dependencies, and evidence clearly; coordinate the agreed work; and communicate decisions without overstating what the evidence can support.',
  },
];

const aboutHeroImages = [
  {
    id: 'about-primary',
    src: aboutTeam011440,
    desktopSrcSet: `${aboutTeam01960} 960w, ${aboutTeam011440} 1440w`,
    mobileSrc: aboutTeam01Mobile,
    sizes: '100vw',
    width: 1440,
    height: 810,
  },
  {
    id: 'about-02',
    src: aboutTeam021440,
    desktopSrcSet: `${aboutTeam02960} 960w, ${aboutTeam021440} 1440w`,
    mobileSrc: aboutTeam02Mobile,
    sizes: '100vw',
    width: 1440,
    height: 810,
  },
];

const About = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const revealInitial = (y) =>
    getAboutRevealInitial(prefersReducedMotion, y);

  useSEO(getRouteMetadata('/about'));

  // Scroll to hash anchor when route hash changes
  useEffect(() => {
    if (!location.hash) return undefined;

    const id = location.hash.substring(1);
    const element = document.getElementById(id);
    if (!element) return undefined;

    const timerId = window.setTimeout(() => {
      element.scrollIntoView({
        behavior: getHashScrollBehavior(prefersReducedMotion),
        block: 'start',
      });
    }, 100);

    return () => window.clearTimeout(timerId);
  }, [location.hash, prefersReducedMotion]);

  const team = [
    {
      name: 'Dr. Manu Sudhi',
      role: 'Chairman and Director',
      initial: 'MS',
      image: manuImg,
      width: 1024,
      height: 1024,
      linkedin: 'https://www.linkedin.com/in/dr-manu-sudhi-609296167/',
      objectPosition: 'center',
      scale: 1.04,
      transformOrigin: '50% 42%',
    },
    {
      name: 'Dr. Shreepathy Rangabhatta R',
      role: 'Managing Director',
      initial: 'SR',
      image: sreeImg,
      width: 640,
      height: 640,
      linkedin: 'https://www.linkedin.com/in/shreepathy-ranga-bhatta-b-862a2b24a/',
      objectPosition: 'center',
      scale: 1.45,
      transformOrigin: '50% 43%',
    },
    {
      name: 'Dr. Anusha Pai',
      role: 'Director',
      initial: 'AP',
      image: anushaImg,
      width: 302,
      height: 302,
      linkedin: 'https://www.linkedin.com/in/anusha-pai-013b0213/',
      objectPosition: 'center',
      scale: 1.08,
      transformOrigin: '50% 40%',
    },
    {
      name: 'Dr. Balakrishna S. Maddodi',
      role: 'Mentor',
      initial: 'BM',
      image: balakrishnaImg,
      width: 640,
      height: 640,
      linkedin: 'https://www.linkedin.com/in/dr-balakrishna-srinivas-maddodi-68874218/',
      objectPosition: 'center',
      scale: 1.45,
      transformOrigin: '50% 37%',
    },
    {
      name: 'Mr. Namesh Malarout',
      role: 'Director',
      initial: 'NM',
      image: nameshImg,
      width: 332,
      height: 327,
      linkedin: 'https://www.linkedin.com/in/namesh-malarout-97375697/',
      objectPosition: 'center',
      scale: 1.9,
      transformOrigin: '50% 28%',
    },
    {
      name: 'Dr. Dasharathraj K Shetty',
      role: 'Mentor',
      initial: 'DS',
      image: drImg,
      width: 358,
      height: 354,
      linkedin: 'https://www.linkedin.com/in/dasharathraj/',
      objectPosition: 'center',
      scale: 1.06,
      transformOrigin: '50% 40%',
    },
  ];

  return (
    <div
      className="about-page fade-in"
      style={{
        '--about-team-image': `url("${teamBgImg}")`,
      }}
    >
      {/* Story Section */}
      <section id="story" className="section about-hero">
        <RotatingHeroMedia
          images={aboutHeroImages}
          className="about-hero-bg"
          imageClassName="about-hero-bg-img"
          mobileBreakpoint={767}
        />
        <motion.div 
          className="container"
          initial={revealInitial(30)}
          animate={{ opacity: 1, y: 0 }}
          transition={getAboutHeroTransition(prefersReducedMotion)}
        >
          <span className="section-subtitle">Our Corporate Profile</span>
          <h1 className="about-title">About Dashapatmaja Solutions Pvt Ltd</h1>
          <p className="about-subtitle">
            A multidisciplinary company focused on developing brands and building coordinated commercial capabilities.
          </p>
        </motion.div>
      </section>

      <section className="section direction-section bg-alt" aria-labelledby="direction-title">
        <div className="container">
          <h2 id="direction-title" className="section-title">What guides our work</h2>
          <div className="direction-grid">
            {directionCards.map((card, index) => (
              <motion.article
                key={card.title}
                className="direction-card"
                initial={revealInitial(20)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={getAboutRevealTransition(prefersReducedMotion, index)}
              >
                <span className="direction-label">{card.label}</span>
                <h3 className="direction-title">{card.title}</h3>
                <p className="direction-text">{card.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-delivery-section" aria-labelledby="about-delivery-title">
        <div className="container about-scope-grid">
          <div>
            <span className="section-subtitle">Delivery model</span>
            <h2 id="about-delivery-title" className="section-title">
              Based in Manipal, built to work remotely
            </h2>
          </div>
          <p>
            Our operating base is in Manipal. Project work can be coordinated
            remotely through defined briefs, review points, shared files, and
            named decision-makers, with in-person work agreed when it materially
            helps the engagement.
          </p>
        </div>
      </section>

      <section className="section about-boundaries-section bg-alt" aria-labelledby="about-boundaries-title">
        <div className="container about-scope-grid">
          <div>
            <span className="section-subtitle">Clear boundaries</span>
            <h2 id="about-boundaries-title" className="section-title">
              What we do not take on
            </h2>
          </div>
          <p>
            DSPL does not act as a regulator, licensing authority, chartered
            accountant, or legal adviser. Where regulated advice or formal
            certification is required, the client retains the appropriate
            qualified professional and we coordinate the agreed implementation.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="section timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Milestones</span>
            <h2 className="section-title">Our journey</h2>
            <p className="section-title-description">
              A short record of how we started, our incubations, and the brands we are building.
            </p>
          </div>

          <div className="journey-stories">
            {journeyMilestones.map((milestone, index) => (
              <motion.article
                className={[
                  'journey-story',
                  index % 2 === 1 ? 'journey-story--reverse' : '',
                ].filter(Boolean).join(' ')}
                key={milestone.year}
                initial={revealInitial(24)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={getAboutRevealTransition(prefersReducedMotion, index)}
              >
                <div className="journey-story-media">
                  <img
                    src={milestone.image}
                    alt={milestone.alt}
                    width={milestone.width}
                    height={milestone.height}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="journey-story-copy">
                  <div className="journey-year">{milestone.year}</div>
                  <h3 className="journey-title">{milestone.title}</h3>
                  <ul className="journey-list">
                    {milestone.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section team-section bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Leadership and Guidance</span>
            <h2 className="section-title">Meet our team</h2>
            <p className="section-title-description">
              Our team builds the brands and runs the work. We bring together people from healthcare, engineering, management, and technology.
            </p>
          </div>

          <div className="team-grid">
            {team.map((member, idx) => (
              <motion.div 
                key={idx}
                initial={revealInitial(20)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={getAboutRevealTransition(prefersReducedMotion, idx)}
              >
                <div className="team-card glass">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-linkedin-link"
                      aria-label={`${member.name} LinkedIn Profile`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="team-linkedin-icon"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                  <div className="team-avatar-wrapper">
                    <div
                      className="team-avatar-container"
                      style={{
                        '--avatar-position': member.objectPosition,
                        '--avatar-scale': member.scale,
                        '--avatar-origin': member.transformOrigin,
                        '--avatar-y': member.offsetY || '0px',
                        '--avatar-background':
                          member.background || '#f3f1ec',
                      }}
                    >
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="team-avatar-image"
                          width={member.width}
                          height={member.height}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="team-avatar-gradient">
                          <span className="avatar-initial">{member.initial}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  {member.bio && <p className="member-bio">{member.bio}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
