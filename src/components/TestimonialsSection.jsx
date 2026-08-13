import './TestimonialsSection.css';

const TestimonialsSection = ({
  eyebrow = 'Client perspective',
  title = 'What collaborators say',
  testimonials = [],
}) => {
  if (testimonials.length === 0) return null;

  const titleId = 'testimonials-section-title';

  return (
    <section
      className="section testimonials-section bg-alt"
      aria-labelledby={titleId}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">{eyebrow}</span>
          <h2 id={titleId} className="section-title">{title}</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <figure
              className="testimonial-card"
              key={`${testimonial.name}-${testimonial.company}`}
            >
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}, {testimonial.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
