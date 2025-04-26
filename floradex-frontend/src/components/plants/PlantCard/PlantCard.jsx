import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './PlantCard.module.css';

const PlantCard = ({
  id,
  name,
  scientificName,
  image, 
  careLevel,
  lightNeeds,
  waterNeeds,
  isUserPlant = false,
  lastWatered,
  onAddToMyPlants,
  onRemoveFromMyPlants
}) => {
  const handleAddRemove = (e) => {
    e.preventDefault(); // Prevent navigating to detail page when clicking button
    isUserPlant ? onRemoveFromMyPlants(id) : onAddToMyPlants(id);
  };

  const getCareLabel = (level) => {
    const labels = {
      easy: 'Easy Care',
      moderate: 'Moderate Care',
      expert: 'Expert Care'
    };
    return labels[level] || level;
  };

  return (
    <Link to={`/plant/${id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img
            src={image || '/placeholder-plant.jpg'}
            alt={name}
            className={styles.image}
          />
          <span className={`${styles.careLevel} ${styles[careLevel]}`}>
            {getCareLabel(careLevel)}
          </span>
        </div>
       
        <div className={styles.content}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.scientificName}>{scientificName}</p>
         
          <div className={styles.careInfo}>
            <div className={styles.careItem}>
              <span className={styles.careIcon}>☀️</span>
              <span>{lightNeeds}</span>
            </div>
            <div className={styles.careItem}>
              <span className={styles.careIcon}>💧</span>
              <span>{waterNeeds}</span>
            </div>
          </div>
          {isUserPlant && lastWatered && (
            <p className={styles.lastWatered}>
              Last watered: {new Date(lastWatered).toLocaleDateString()}
            </p>
          )}
          <button
            onClick={handleAddRemove}
            className={`${styles.actionButton} ${isUserPlant ? styles.remove : styles.add}`}
          >
            {isUserPlant ? 'Remove from My Plants' : 'Add to My Plants'}
          </button>
        </div>
      </div>
    </Link>
  );
};

PlantCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  scientificName: PropTypes.string,
  image: PropTypes.string,
  careLevel: PropTypes.string,
  lightNeeds: PropTypes.string,
  waterNeeds: PropTypes.string,
  isUserPlant: PropTypes.bool,
  lastWatered: PropTypes.string,
  onAddToMyPlants: PropTypes.func,
  onRemoveFromMyPlants: PropTypes.func
};

export default PlantCard;