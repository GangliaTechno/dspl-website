const ProcessSteps = ({ steps }) => (
  <section className="section process-section" aria-labelledby="process-title">
    <div className="container">
      <div className="section-header process-header">
        <span className="section-subtitle">Execution framework</span>
        <h2 className="section-title" id="process-title">
          How We Work With You
        </h2>
        <p className="section-title-description">
          One accountable path from the first audit to measurement and
          iteration.
        </p>
      </div>

      <ol className="process-list">
        {steps.map((step) => (
          <li className="process-step" key={step.number}>
            <span className="process-step-number" aria-hidden="true">
              Step {Number(step.number)}
            </span>
            <div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-description">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessSteps;
