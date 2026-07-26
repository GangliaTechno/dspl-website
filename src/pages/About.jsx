import './About.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Award, Star, Compass, Target, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';

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

  useSEO(getRouteMetadata('/about'));

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
    { name: 'Dr. Manu Sudhi', role: 'Chairman and Director', initial: 'MS', image: manuImg, linkedin: 'https://www.linkedin.com/in/dr-manu-sudhi-609296167/', objectPosition: 'center 10%', scale: 1.04 },
    { name: 'Mr. Shreepathy Ranga Bhatta', role: 'Managing Director', initial: 'SR', image: sreeImg, linkedin: 'https://www.linkedin.com/in/shreepathy-ranga-bhatta-b-862a2b24a/', objectPosition: 'center 20%', scale: 1.0 },
    { name: 'Ms. Anusha Pai', role: 'Director', initial: 'AP', image: anushaImg, linkedin: 'https://www.linkedin.com/in/anusha-pai-013b0213/', objectPosition: 'center 8%', scale: 1.0 },
    { name: 'Dr. Balakrishna S. Maddodi', role: 'Mentor', initial: 'BM', image: balakrishnaImg, linkedin: 'https://www.linkedin.com/in/dr-balakrishna-srinivas-maddodi-68874218/', objectPosition: 'center 15%', scale: 1.0 },
    { name: 'Mr. Namesh Malarout', role: 'Director', initial: 'NM', image: nameshImg, linkedin: 'https://www.linkedin.com/in/namesh-malarout-97375697/', objectPosition: 'center 2%', scale: 1.18 },
    { name: 'Dr. Dasharathraj K Shetty', role: 'Mentor', initial: 'DS', image: drImg, linkedin: 'https://www.linkedin.com/in/dasharathraj/', objectPosition: 'center 12%', scale: 1.0 }
  ];

  return (
    <div
      className="about-page fade-in"
      style={{
        '--about-hero-image': `url("${aboutHeroImg}")`,
        '--about-story-image': `url("${dsplImg}")`,
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

      <section className="section mission-vision-section bg-alt">
        <div className="container">
          {/* Visually-hidden h2 so heading hierarchy h1→h2→h3 is unbroken */}
          <h2 className="sr-only">Our Core Values</h2>
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
                        className={`team-avatar-image team-avatar-image-${idx + 1}`}
                        loading="lazy"
                        decoding="async"
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

    </div>
  );
};

export default About;
