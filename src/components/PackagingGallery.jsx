import './PackagingGallery.css';
import { Link } from 'react-router';

const PackagingGallery = ({ items = [], fallbackActionHref = '/contact' }) => {
  if (items.length === 0) {
    return (
      <div className="packaging-fallback">
        <p>Packaging imagery will be added after approved artwork is available.</p>
        <Link className="btn btn-secondary" to={fallbackActionHref}>
          Discuss packaging
        </Link>
      </div>
    );
  }

  return (
    <div className="packaging-gallery">
      {items.map((item) => (
        <article className="packaging-item" key={item.sku}>
          <div className="packaging-images">
            <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
            {item.backImage && (
              <img
                src={item.backImage}
                alt={`${item.alt} back packaging`}
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
          <p className="packaging-collection">{item.collection}</p>
          <h3>{item.sku}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
};

export default PackagingGallery;
