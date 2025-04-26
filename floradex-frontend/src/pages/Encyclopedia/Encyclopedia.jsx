import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Encyclopedia.module.css';

// Components
import SearchBar from './components/SearchBar/SearchBar';
import FilterSection from './components/FilterSection/FilterSection';
import PlantGrid from './components/PlantGrid/PlantGrid';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

// Redux
import {
  fetchEncyclopediaPlants,
  selectEncyclopediaPlants,
  selectLoading,
  selectError,
  updateFilters,
  setSearchTerm,
  selectFilters,
  selectSearchTerm
} from '../../features/plants/plantsSlice';

const Encyclopedia = () => {
  const dispatch = useDispatch();
 
  // Redux state
  const plants = useSelector(selectEncyclopediaPlants) || [];
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters) || { 
    light: [], 
    water: [], 
    difficulty: [], 
    type: [] 
  };
  const searchTerm = useSelector(selectSearchTerm) || '';

  useEffect(() => {
    console.log("Dispatching fetchEncyclopediaPlants");
    dispatch(fetchEncyclopediaPlants());
  }, [dispatch]);

  const handleSearch = (term) => {
    dispatch(setSearchTerm(term));
  };

  const handleFilterChange = (filterType, values) => {
    dispatch(updateFilters({ filterType, values }));
  };

  // Add null checks to prevent errors
  const filteredPlants = plants && plants.length > 0
    ? plants
      .filter(plant =>
        plant && 
        (plant.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (plant.scientificName || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(plant =>
        (!filters.light.length || filters.light.includes(plant.lightNeeds)) &&
        (!filters.water.length || filters.water.includes(plant.waterNeeds)) &&
        (!filters.difficulty.length || filters.difficulty.includes(plant.difficulty)) &&
        (!filters.type.length || filters.type.includes(plant.type))
      )
    : [];

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error loading plants</h2>
        <p>{error}</p>
      </div>
    );
  }

  console.log("Plants from Redux:", plants);
  console.log("Loading state:", loading);
  console.log("Error state:", error);
  console.log("Filtered plants:", filteredPlants);

  return (
    <div className={styles.encyclopediaContainer}>
      <section className={styles.header}>
        <h1>Plant Encyclopedia</h1>
        <p>Discover and learn about different plant species</p>
      </section>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <FilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        <main className={styles.mainContent}>
          <SearchBar
            value={searchTerm}
            onChange={handleSearch}
          />

          {loading ? (
            <LoadingSpinner />
          ) : (
            <PlantGrid plants={filteredPlants} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Encyclopedia;