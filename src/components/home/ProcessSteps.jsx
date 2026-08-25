const ProcessSteps = ({ steps }) => (
  <section className="section process-section" aria-labelledby="process-title">
    <div className="container">
      <div className="process-intro">
        <div>
          <span className="section-subtitle">How We Deliver</span>
          <h2 className="section-title" id="process-title">
            One accountable path, from audit to launch
          </h2>
        </div>
        <p className="section-title-description">
          Three stages, fixed outputs, agreed timelines. You know what arrives
          and when.
        </p>
      </div>

      <ol className="process-framework-grid">
        {steps.map((step) => (
          <li className="process-column" key={step.number}>
            <div className="process-column-top">
              <span className="process-big-numeral" aria-hidden="true">
                {step.number}
              </span>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-description">{step.description}</p>
            </div>

            <div className="process-column-metadata">
              <dl className="process-step-details">
                <div className="process-meta-row">
                  <dt>Timing</dt>
                  <dd>{step.timing}</dd>
                </div>
                <div className="process-meta-row">
                  <dt>Output</dt>
                  <dd>{step.output}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessSteps;
