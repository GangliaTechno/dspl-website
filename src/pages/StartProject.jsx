import './StartProject.css';
import ProjectPlannerForm from '../components/ProjectPlannerForm';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';

const briefingPoints = [
  {
    label: 'Context',
    text: 'Where the business, brand or product stands today.',
  },
  {
    label: 'Need',
    text: 'The decision or capability that is currently blocking you.',
  },
  {
    label: 'Outcome',
    text: 'What a good result would make possible for your team.',
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
              Five minutes here saves an hour of back and forth later. Tell us
              where you stand, what you need and what a good outcome looks like.
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
