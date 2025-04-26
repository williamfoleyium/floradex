//MyPlant.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlantList from '../../components/plants/PlantList/PlantList';
import { addUserPlant, removeUserPlant, fetchUserPlants } from '../../features/plants/plantsSlice';
import axios from 'axios';
import styles from './MyPlants.module.css';

axios.defaults.baseURL = 'http://localhost:5000'; // Set base URL


const MyPlants = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const userPlants = useSelector((state) => state.plants.userPlants);
  
  // Fetch user plants when component mounts
  useEffect(() => {
    if (currentUser && currentUser._id) {
      console.log("Fetching user plants for:", currentUser._id);
      dispatch(fetchUserPlants(currentUser._id));
    }
  }, [currentUser, dispatch]);
  
  const handleAddToMyPlants = (plantId) => {
    if (!currentUser) {
      console.error("User is not logged in.");
      return;
    }
   
    console.log("Adding plant with details:", {
      userId: currentUser._id,
      plantId: plantId
    });
 
    dispatch(addUserPlant({
      userId: currentUser._id,
      plantId
    }));
  };
 
  const handleRemoveFromMyPlants = (plantId) => {
    if (!currentUser) {
      console.error("User is not logged in.");
      return;
    }
    
    console.log("Removing plant with details:", {
      userId: currentUser._id,
      plantId: plantId
    });
    
    dispatch(removeUserPlant({
      userId: currentUser._id,
      plantId
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Plants</h1>
      {userPlants.length === 0 ? (
        <p className={styles.emptyMessage}>
          You haven not added any plants yet. Browse the encyclopedia to add plants to your collection!
        </p>
      ) : (
        <PlantList
          plants={userPlants}
          isUserPlants={true}
          onAddToMyPlants={handleAddToMyPlants}
          onRemoveFromMyPlants={handleRemoveFromMyPlants}
        />
      )}
    </div>
  );
};

export default MyPlants;