import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Award, Star, Compass, Target, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';

import manuImg from '../assets/manu_pro_fixed.jpg';
import sreeImg from '../assets/sree_pro_fixed.jpg';
import drImg from '../assets/dr_pro.png';
import balakrishnaImg from '../assets/vice_chairman_pro.png';
import anushaImg from '../assets/Anusha-mam_pro.png';
import nameshImg from '../assets/ceo_pro.png';
import aboutHeroImg from '../assets/about_dspl.jpeg';
import teamBgImg from '../assets/linen_concrete_texture.png';
import dsplImg from '../assets/dspl_img.jpg';

const About = () => {
  const location = useLocation();

  useSEO(
    'About Us | Dasha Patmaja Services, Manipal',
    'Dasha Patmaja Services Pvt. Ltd. helps businesses grow through branding, marketing, and e-commerce. We were founded in 2023 and are incubated at the Manipal Universal Technology Business Incubator (MUTBI) at MAHE, Manipal.'
  );

  // Scroll to hash anchor when route hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const team = [
    { name: 'Dr. Manu Sudhi', role: 'Chairman and Director', initial: 'MS', image: manuImg, linkedin: 'https://www.linkedin.com/in/dr-manu-sudhi-609296167/', objectPosition: 'center 10%' },
    { name: 'Mr. Shreepathy Ranga Bhatta', role: 'Managing Director', initial: 'SR', image: sreeImg, linkedin: 'https://www.linkedin.com/in/shreepathy-ranga-bhatta-b-862a2b24a/', objectPosition: 'center 15%' },
    { name: 'Ms. Anusha Pai', role: 'Director', initial: 'AP', image: anushaImg, linkedin: 'https://www.linkedin.com/in/anusha-pai-013b0213/', objectPosition: 'center 5%' },
    { name: 'Dr. Balakrishna S. Maddodi', role: 'Mentor', initial: 'BM', image: balakrishnaImg, linkedin: 'https://www.linkedin.com/in/dr-balakrishna-srinivas-maddodi-68874218/', objectPosition: 'center 10%' },
    { name: 'Mr. Namesh Malarout', role: 'Director', initial: 'NM', image: nameshImg, linkedin: 'https://www.linkedin.com/in/namesh-malarout-97375697/', objectPosition: 'center 5%' },
    { name: 'Dr. Dasharathraj K Shetty', role: 'Mentor', initial: 'DS', image: drImg, linkedin: 'https://www.linkedin.com/in/dasharathraj/', objectPosition: 'center 10%' }
  ];

  return (
    <div className="about-page fade-in">
      {/* Background Glows */}
      <div className="glow-bg">
        <div className="glow-circle glow-circle-1"></div>
        <div className="glow-circle glow-circle-2"></div>
      </div>

      {/* Story Section */}
      <section id="story" className="section about-hero">
        <div className="about-hero-bg"></div>
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="section-subtitle">Our Corporate Profile</span>
          <h1 className="about-title">About Dasha Patmaja Services</h1>
          <div className="about-intro-grid">
            <p className="about-intro-text">
              Dasha Patmaja Services Pvt. Ltd. helps businesses grow through branding, marketing, and e-commerce. We were founded in 2023 and are incubated at the Manipal Universal Technology Business Incubator (MUTBI) at MAHE, Manipal. Our team comes from healthcare, engineering, design, and business. We also build and sell our own brand, Raw Radicles, which keeps our methods tested and current.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section mission-vision-section bg-alt">
        <div className="container">
          <div className="mission-vision-grid">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
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

          <div className="timeline-container">
            {/* Year 2023 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="timeline-item">
                <div className="timeline-badge">
                  <Calendar size={18} />
                </div>
                <div className="timeline-card glass">
                  <div className="timeline-year">2023</div>
                  <h3 className="timeline-milestone-title">Founding and first incubation</h3>
                  <ul className="timeline-list">
                    <li>Started with a plan to build consumer brands and the services that grow them.</li>
                    <li>Incubated at GoK Bioincubator, Manipal, where we set up our base.</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Year 2024 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="timeline-item">
                <div className="timeline-badge">
                  <Star size={18} />
                </div>
                <div className="timeline-card glass">
                  <div className="timeline-year">2024</div>
                  <h3 className="timeline-milestone-title">First brand</h3>
                  <ul className="timeline-list">
                    <li>Launched Raw Radicles, a premium chocolate brand with Ayurveda inside.</li>
                    <li>Built the product, packaging, and supply chain from the ground up.</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Year 2025 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="timeline-item">
                <div className="timeline-badge">
                  <Award size={18} />
                </div>
                <div className="timeline-card glass">
                  <div className="timeline-year">2025</div>
                  <h3 className="timeline-milestone-title">MUTBI incubation and national grant</h3>
                  <ul className="timeline-list">
                    <li>Joined MUTBI at MAHE, Manipal, for technical and academic support.</li>
                    <li>Won a government grant under the NIDHI-PRAYAS scheme.</li>
                    <li>Signed a Memorandum of Understanding with Amruthanjali Ayurveda for manufacturing.</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Year 2026 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="timeline-item">
                <div className="timeline-badge">
                  <Compass size={18} />
                </div>
                <div className="timeline-card glass">
                  <div className="timeline-year">2026</div>
                  <h3 className="timeline-milestone-title">Services arm (new entry)</h3>
                  <ul className="timeline-list">
                    <li>Opened our branding, marketing, and e-commerce services to outside clients.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="team-card glass">
                  <div className="team-avatar-wrapper">
                  <div className="team-avatar-container">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="team-avatar-image"
                        loading="lazy"
                        decoding="async"
                        style={{ 
                          objectPosition: member.objectPosition || 'center center'
                        }}
                      />
                    ) : (
                      <div className={`team-avatar-gradient`}>
                        <span className="avatar-initial">{member.initial}</span>
                      </div>
                    )}
                  </div>
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
                </div>
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .about-page {
          padding-top: 5rem;
          position: relative;
        }

        .bg-alt {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .about-hero {
          text-align: center;
          padding: 8rem 0 6rem;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border-color);
        }

        @keyframes subtleZoom {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }

        .about-hero-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url(${aboutHeroImg});
          background-size: cover;
          background-position: center 35%;
          animation: subtleZoom 20s infinite alternate ease-in-out;
          z-index: 0;
        }

        .about-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.65); /* Dark blackish overlay at 65% opacity */
          z-index: 1;
        }

        .about-hero .container {
          position: relative;
          z-index: 2;
        }

        .about-hero .section-subtitle {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
        }

        .about-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          letter-spacing: -0.04em;
          color: #ffffff; /* Changed black text to white */
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
        }

        .about-subtitle {
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--accent-dark); /* Kept gold/yellow */
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
        }

        .about-intro-grid {
          max-width: 800px;
          margin: 0 auto;
        }

        .about-intro-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #ffffff; /* Changed black text to white */
          font-weight: 500;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        }

        /* Mission & Vision Grid */
        .mission-vision-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .mv-card {
          padding: 3rem 2.5rem;
          border-radius: 4px;
          border: 1px solid var(--border-color);
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mv-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-border-alpha);
          box-shadow: var(--shadow-lg);
        }

        .mv-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 4px;
          background: var(--accent-glow);
          border: 1px solid var(--accent-border-alpha);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .mv-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--text-heading);
        }

        .mv-text {
          font-size: 0.975rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Section Header */
        .section-header {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 4rem;
        }

        .section-subtitle {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-dark);
          display: inline-block;
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.03em;
          color: var(--text-heading);
          font-weight: 800;
        }

        .section-title-description {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Timeline Styles */
        .timeline-section {
          position: relative;
          overflow: hidden;
          background-image: url(${dsplImg});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .timeline-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgb(10 10 10 / 40%);
          z-index: 1;
        }

        .timeline-section .section-title {
          color: #ffffff;
        }

        .timeline-section .section-title-description {
          color: rgba(255, 255, 255, 0.7);
        }



        .timeline-section .container {
          position: relative;
          z-index: 2;
        }

        .timeline-container {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .timeline-container::after {
          content: '';
          position: absolute;
          width: 2px;
          background: linear-gradient(to bottom, var(--accent) 0%, var(--accent-light) 100%);
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -1px;
        }

        .timeline-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          margin-bottom: 3rem;
          position: relative;
        }

        .timeline-badge {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-primary);
          border: 2px solid var(--accent);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          box-shadow: 0 0 0 4px #121212;
        }

        .timeline-card {
          width: 45%;
          padding: 2rem;
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .timeline-card:hover {
          border-color: var(--accent-border-alpha);
          box-shadow: var(--shadow-lg);
        }

        .timeline-container > div:nth-child(odd) .timeline-card {
          margin-left: auto;
        }

        .timeline-container > div:nth-child(even) .timeline-card {
          margin-right: auto;
        }

        .timeline-year {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }

        .timeline-milestone-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-heading);
          margin-bottom: 1rem;
        }

        .timeline-list {
          padding-left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .timeline-list li {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        /* Team Section */
        .team-section {
          position: relative;
          overflow: hidden;
        }

        .team-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url(${teamBgImg});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.22; /* Increased opacity to 22% for better display visibility */
          z-index: 1;
          pointer-events: none;
        }

        .team-section .container {
          position: relative;
          z-index: 2;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .team-card {
          background: #ffffff;
          border: 1px solid var(--border-color);
          padding: 2.5rem 1.5rem;
          border-radius: 4px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }

        .team-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-border-alpha);
          box-shadow: var(--shadow-lg);
        }

        .team-avatar-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 1.5rem;
        }

        .team-avatar-container {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #ffffff;
          box-shadow: 0 4px 10px var(--accent-shadow);
        }

        .team-linkedin-link {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 32px;
          height: 32px;
          background: #ffffff;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          color: #0a66c2;
          transition: all 0.2s ease-in-out;
          z-index: 3;
          border: 1px solid #e0e0e0;
        }

        .team-linkedin-link:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          background: #f5f5f5;
        }

        .team-linkedin-icon {
          width: 20px;
          height: 20px;
        }

        .team-avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .team-avatar-gradient {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--accent-light) 0%, var(--accent) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-initial {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffffff;
        }

        .member-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-heading);
          margin-bottom: 0.25rem;
          min-height: 3.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .member-role {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-dark);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 900px) {
          .mission-vision-grid {
            grid-template-columns: 1fr;
          }
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .about-title {
            font-size: 2.75rem;
          }
          .about-subtitle {
            font-size: 1.4rem;
          }
          .timeline-container::after {
            left: 2rem;
          }
          .timeline-badge {
            left: 2rem;
            transform: translateX(-50%);
          }
          .timeline-card {
            width: calc(100% - 4rem);
            margin-left: 4rem !important;
          }
          .team-grid {
            grid-template-columns: 1fr;
            max-width: 320px;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
