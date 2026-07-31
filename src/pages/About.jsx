import './About.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Target, Eye } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';

import manuImg from '../assets/manu_pro_fixed.jpg';
import sreeImg from '../assets/sree_pro_extended.webp';
import drImg from '../assets/dr_pro.png';
import balakrishnaImg from '../assets/balakrishna_pro_extended.webp';
import anushaImg from '../assets/Anusha-mam_pro.png';
import nameshImg from '../assets/ceo_pro.png';
import aboutHero960 from '../assets/dspl-about-hero-960.webp';
import aboutHero1440 from '../assets/dspl-about-hero-1440.webp';
import aboutHero1600 from '../assets/dspl-about-hero-1600.webp';
import aboutHeroMobile from '../assets/dspl-about-hero-mobile.webp';
import teamBgImg from '../assets/linen_concrete_texture.webp';
import journey2023Img from '../assets/about-journey-2023.webp';
import journey2024Img from '../assets/about-journey-2024.webp';
import journey2025Img from '../assets/about-journey-2025.webp';
import journey2026Img from '../assets/about-journey-2026.webp';

const journeyMilestones = [
  {
    year: '2023',
    title: 'Founding and first incubation',
    image: journey2023Img,
    alt: 'Consumer-brand planning materials in an early-stage incubator workspace',
    items: [
      'Started with a plan to build consumer brands and the services that grow them.',
      'Incubated at GoK Bioincubator, Manipal, where we set up our base.',
    ],
  },
  {
    year: '2024',
    title: 'First brand',
    image: journey2024Img,
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
    alt: 'Brand and e-commerce operations studio with packaging, photography, and dispatch materials',
    items: [
      'Opened our branding, marketing, and e-commerce services to outside clients.',
    ],
  },
];

const About = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const revealInitial = (y) =>
    prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y };
  const revealTransition = (base) =>
    prefersReducedMotion ? { duration: 0.15, ease: 'easeOut' } : base;

  useSEO(getRouteMetadata('/about'));

  // Scroll to hash anchor when route hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start',
          });
        }, 100);
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [location, prefersReducedMotion]);

  const team = [
    {
      name: 'Dr. Manu Sudhi',
      role: 'Chairman and Director',
      initial: 'MS',
      image: manuImg,
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
      linkedin: 'https://www.linkedin.com/in/dasharathraj/',
      objectPosition: 'center',
      scale: 1.06,
      transformOrigin: '50% 40%',
    },
  ];

  const heroImage = {
    src: aboutHero1440,
    desktopSrcSet: `${aboutHero960} 960w, ${aboutHero1440} 1440w, ${aboutHero1600} 1600w`,
    mobileSrc: aboutHeroMobile,
    sizes: '100vw',
    width: 1600,
    height: 901,
  };

  return (
    <div
      className="about-page fade-in"
      style={{
        '--about-team-image': `url("${teamBgImg}")`,
      }}
    >
      {/* Background Glows */}
      <div className="glow-bg">
        <div className="glow-circle glow-circle-1"></div>
        <div className="glow-circle glow-circle-2"></div>
      </div>

      {/* Story Section */}
      <section id="story" className="section about-hero">
        <picture className="about-hero-bg" aria-hidden="true">
          <source media="(max-width: 767px)" srcSet={heroImage.mobileSrc} />
          <source srcSet={heroImage.desktopSrcSet} sizes={heroImage.sizes} />
          <img
            className="about-hero-bg-img"
            src={heroImage.src}
            alt=""
            width={heroImage.width}
            height={heroImage.height}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <motion.div 
          className="container"
          initial={revealInitial(30)}
          animate={{ opacity: 1, y: 0 }}
          transition={revealTransition({ duration: 0.8, ease: 'easeOut' })}
        >
          <span className="section-subtitle">Our Corporate Profile</span>
          <h1 className="about-title">About Dashapatmaja Solutions Pvt Ltd</h1>
          <div className="about-intro-grid">
            <p className="about-intro-text">
              Dashapatmaja Solutions Pvt Ltd helps businesses grow through branding, marketing, and e-commerce. We were founded in 2023 and are incubated at the Manipal Universal Technology Business Incubator (MUTBI) at MAHE, Manipal. Our team comes from healthcare, engineering, design, and business. We also build and sell our own brand, Raw Radicles, which keeps our methods tested and current.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="section mission-vision-section bg-alt">
        <div className="container">
          {/* Visually-hidden h2 so heading hierarchy h1→h2→h3 is unbroken */}
          <h2 className="sr-only">Our Core Values</h2>
          <div className="mission-vision-grid">
            <motion.div 
              initial={revealInitial(20)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={revealTransition({ duration: 0.6 })}
            >
              <div className="mv-card glass">
                <div className="mv-icon-box">
                  <Target size={24} />
                </div>
                <h3 className="mv-title">Our Mission</h3>
                <p className="mv-text">
                  Build brands people trust, and help other businesses do the same.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={revealInitial(20)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={revealTransition({ duration: 0.6, delay: 0.15 })}
            >
              <div className="mv-card glass">
                <div className="mv-icon-box">
                  <Eye size={24} />
                </div>
                <h3 className="mv-title">Our Vision</h3>
                <p className="mv-text">
                  A group of Indian consumer brands, supported by a services arm that any growing business can hire.
                </p>
              </div>
            </motion.div>
          </div>
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
                viewport={{ once: true, margin: '-50px' }}
                transition={revealTransition({
                  duration: 0.55,
                  delay: index > 0 ? 0.05 : 0,
                })}
              >
                <div className="journey-story-media">
                  <img
                    src={milestone.image}
                    alt={milestone.alt}
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
                viewport={{ once: true, margin: "-50px" }}
                transition={revealTransition({
                  duration: 0.5,
                  delay: idx * 0.1,
                })}
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
