import './PageLoader.css';
const PageLoader = () => {
  return (
    <div className="page-loader-container" aria-live="polite" aria-busy="true">
      <div className="loader-spinner"></div>
      <span className="sr-only">Loading…</span>
    </div>
  );
};

export default PageLoader;
