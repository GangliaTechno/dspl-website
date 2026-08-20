const ProcessSteps = ({ steps }) => (
  <section className="section process-section" aria-labelledby="process-title">
    <div className="container">
      <div className="process-intro">
        <div>
          <h2 className="section-title" id="process-title">
            How We Work With You
          </h2>
        </div>
        <p className="section-title-description">
          One accountable path from the first audit to measurement and
          iteration.
        </p>
      </div>

      <ol className="process-list">
        {steps.map((step) => (
          <li className="process-step" key={step.number}>
            <div className="process-step-header">
              <span className="process-step-number" aria-hidden="true">
                Step {Number(step.number)}
              </span>
              <h3 className="process-step-title">{step.title}</h3>
            </div>
            <p className="process-step-description">{step.description}</p>
            <dl className="process-step-details">
              <div className="process-step-timing">
                <dt>Timing</dt>
                <dd>{step.timing}</dd>
              </div>
              <div className="process-step-output">
                <dt>Output</dt>
                <dd>{step.output}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessSteps;
