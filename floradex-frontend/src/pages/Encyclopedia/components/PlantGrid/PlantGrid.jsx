import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';
import styles from './PlantGrid.module.css';

const PlantGrid = ({ plants }) => {
  if (plants.length === 0) {
    return (
      <div className={styles.noResults}>
        <h3>No plants found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      {plants.map(plant => (
        <Link 
          to={`/plant/${plant.id || plant._id}`} 
          key={plant.id || plant._id || Math.random()} 
          className={styles.plantCard}
        >
          <div className={styles.imageContainer}>
            <img src={plant.image || `/public/assets/images/plants/${plant.name}.jpg`} alt={plant.name} />
          </div>
          <div className={styles.plantInfo}>
            <h3>{plant.name}</h3>
            <p className={styles.scientificName}>{plant.scientificName}</p>
            <div className={styles.tags}>
              <span className={styles.tag}>{plant.lightNeeds}</span>
              <span className={styles.tag}>{plant.waterNeeds}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

// Define PropTypes for the component
PlantGrid.propTypes = {
  plants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      scientificName: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      lightNeeds: PropTypes.string.isRequired,
      waterNeeds: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PlantGrid;