import './StartProject.css';
import ProjectPlannerForm from '../components/ProjectPlannerForm';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';

const briefingPoints = [
  {
    label: 'Context',
    text: 'Where the business, brand, or project stands today.',
  },
  {
    label: 'Need',
    text: 'The decision, capability, or operating problem that needs support.',
  },
  {
    label: 'Outcome',
    text: 'What a useful result would make easier for your team.',
  },
];

const StartProject = () => {
  useSEO(getRouteMetadata('/start'));

  return (
    <div className="start-project-page fade-in">
      <section className="start-project-hero">
        <div className="container start-project-intro">
          <div className="start-project-copy">
            <span className="section-subtitle">Project planner</span>
            <h1 className="start-project-title">Start a Project</h1>
            <p className="start-project-subtitle">
              Share the context we need to review your project and prepare a
              useful first conversation.
            </p>
            <ul className="start-project-briefing-points" aria-label="What to include in your brief">
              {briefingPoints.map((point, index) => (
                <li key={point.label}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{point.label}</strong>
                    <p>{point.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="start-project-next" aria-labelledby="start-project-next-title">
            <span className="start-project-next-label">After you submit</span>
            <h2 id="start-project-next-title">What happens next</h2>
            <ol>
              <li>We review the information and any file you attach.</li>
              <li>We identify the right discipline and immediate questions.</li>
              <li>We reply to arrange a focused first conversation.</li>
            </ol>
            <p>We aim to respond within one working day.</p>
          </aside>
        </div>
      </section>

      <section
        className="section start-project-form-section"
        aria-labelledby="start-project-form-title"
      >
        <div className="container start-project-form-wrap">
          <div className="start-project-form-heading">
            <span className="section-subtitle">Your brief</span>
            <h2 id="start-project-form-title" className="section-title">
              Tell us enough to begin well
            </h2>
            <p>
              A polished brief is not required. Complete the relevant fields and
              leave optional details blank if they are not decided yet.
            </p>
          </div>
          <div className="start-project-form-shell">
            <ProjectPlannerForm idPrefix="start" source="start-page" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartProject;
