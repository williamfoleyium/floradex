import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchEncyclopediaPlants, 
  selectEncyclopediaPlants,
  selectLoading,
  selectError,
  addUserPlant,
  removeUserPlant
} from '../features/plants/plantsSlice';

const usePlants = () => {
  const dispatch = useDispatch();
  
  // Select data from Redux store
  const plants = useSelector(selectEncyclopediaPlants);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Local state for search term and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    light: [],
    water: [],
    difficulty: [],
    type: []
  });

  // Load plants on hook initialization
  useEffect(() => {
    dispatch(fetchEncyclopediaPlants());
  }, [dispatch]);

  // Function to add a plant to user's collection
  const addPlant = (plant) => {
    dispatch(addUserPlant(plant));
  };

  // Function to remove a plant from user's collection
  const removePlant = (plantId) => {
    dispatch(removeUserPlant(plantId));
  };

  // Get a specific plant by ID
  const getPlantById = (plantId) => {
    return plants.find(plant => plant.id === plantId);
  };

  // Filter plants based on search term and filters
  const filterPlants = () => {
    return plants
      .filter(plant => 
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(plant => 
        (!filters.light?.length || filters.light.includes(plant.lightNeeds)) &&
        (!filters.water?.length || filters.water.includes(plant.waterNeeds)) &&
        (!filters.difficulty?.length || filters.difficulty.includes(plant.difficulty)) &&
        (!filters.type?.length || filters.type.includes(plant.type))
      );
  };

  return {
    plants,
    loading,
    error,
    addPlant,
    removePlant,
    getPlantById,
    filterPlants,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters
  };
};

export default usePlants;