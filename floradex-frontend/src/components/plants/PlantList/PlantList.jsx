import { useState } from 'react';
import PlantCard from '../PlantCard/PlantCard';
import styles from './PlantList.module.css';
import PropTypes from 'prop-types';

const PlantList = ({
  plants = [],
  isUserPlants = false,
  onAddToMyPlants,
  onRemoveFromMyPlants
}) => {
  const [sortBy, setSortBy] = useState('name');
  const [filterCareLevel, setFilterCareLevel] = useState('all');

  const sortPlants = (plantsToSort) => {
    return [...plantsToSort].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'careLevel':
          return a.careLevel.localeCompare(b.careLevel);
        case 'lastWatered':
          if (!isUserPlants) return 0;
          return new Date(b.lastWatered) - new Date(a.lastWatered);
        default:
          return 0;
      }
    });
  };

  const filterPlants = (plantsToFilter) => {
    if (filterCareLevel === 'all') return plantsToFilter;
    return plantsToFilter.filter(plant => plant.careLevel === filterCareLevel);
  };

  const displayedPlants = filterPlants(sortPlants(plants));
  console.log("PlantList received plants:", plants);
  console.log("Plant in map:", displayedPlants.map(p => ({ id: p.id, _id: p._id, image: p.image })));

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.select}
        >
          <option value="name">Sort by Name</option>
          <option value="careLevel">Sort by Care Level</option>
          {isUserPlants && (
            <option value="lastWatered">Sort by Last Watered</option>
          )}
        </select>
        <select
          value={filterCareLevel}
          onChange={(e) => setFilterCareLevel(e.target.value)}
          className={styles.select}
        >
          <option value="all">All Care Levels</option>
          <option value="easy">Easy Care</option>
          <option value="moderate">Moderate Care</option>
          <option value="expert">Expert Care</option>
        </select>
      </div>
      {displayedPlants.length === 0 ? (
        <p className={styles.noPlants}>
          {isUserPlants
            ? "You haven't added any plants yet!"
            : "No plants found matching your criteria."}
        </p>
      ) : (
        <div className={styles.grid}>
          {displayedPlants.map(plant => (
            <PlantCard
              key={plant._id}
              {...plant}
              id={plant._id}
              isUserPlant={isUserPlants}
              onAddToMyPlants={onAddToMyPlants}
              onRemoveFromMyPlants={onRemoveFromMyPlants}
            />
          ))}
        </div>
      )}
    </div>
  );
};

PlantList.propTypes = {
  plants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      careLevel: PropTypes.string,
      lastWatered: PropTypes.string,
      image: PropTypes.string,
      difficulty: PropTypes.string,
      type: PropTypes.string
    })
  ),
  isUserPlants: PropTypes.bool,
  onAddToMyPlants: PropTypes.func,
  onRemoveFromMyPlants: PropTypes.func
};

export default PlantList;