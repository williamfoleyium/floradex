import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchPlantDetails, 
  addUserPlant, 
  removeUserPlant,
  fetchUserPlants 
} from '../../features/plants/plantsSlice';
import styles from './PlantDetails.module.css';

const PlantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get the current user from the auth slice
  const user = useSelector((state) => state.auth?.user);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const loading = useSelector((state) => state.plants.loading);
  const error = useSelector((state) => state.plants.error);
  
  // Use local state for button status to ensure immediate UI update
  const [isInUserCollection, setIsInUserCollection] = useState(false);

  const plant = useSelector((state) => {
    return state.plants.encyclopediaPlants.find(p => p._id === id);
  });

  const userPlants = useSelector((state) => state.plants.userPlants);

  // Create a stable function to check if plant is in collection
  const checkIsUserPlant = useCallback(() => {
    if (!userPlants || userPlants.length === 0 || !id) return false;
    
    // Use some() for efficient search
    return userPlants.some(plant => plant._id === id);
  }, [userPlants, id]);

  // Update local state when userPlants changes
  useEffect(() => {
    const isInCollection = checkIsUserPlant();
    setIsInUserCollection(isInCollection);
    console.log("Updated isInUserCollection:", isInCollection);
  }, [userPlants, checkIsUserPlant]);

  // Fetch user plants when component mounts
  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchUserPlants(user._id));
    }
  }, [user, dispatch]);

  // Fetch plant details if not in store
  useEffect(() => {
    if (!plant) {
      dispatch(fetchPlantDetails(id));
    }
  }, [id, plant, dispatch]);

  const handleAddRemovePlant = async () => {
    // Ensure user is logged in before dispatching action
    if (!user) {
      // Redirect to login page
      navigate('/login', { state: { from: `/plant/${id}` } });
      return;
    }

    try {
      if (isInUserCollection) {
        // Immediately update UI state
        setIsInUserCollection(false);
        
        // Then perform backend operation
        await dispatch(removeUserPlant({ 
          userId: user._id, 
          plantId: id 
        })).unwrap();
      } else {
        // Immediately update UI state
        setIsInUserCollection(true);
        
        // Then perform backend operation
        await dispatch(addUserPlant({ 
          userId: user._id, 
          plantId: id 
        })).unwrap();
      }
      
      // Always refetch to ensure state is in sync with server
      dispatch(fetchUserPlants(user._id));
    } catch (error) {
      // Revert UI state if operation failed
      setIsInUserCollection(checkIsUserPlant());
      console.error("Failed to update plant collection:", error);
    }
  };

  const formatCareText = (text) => {
    return <span className={styles.careText}>{text}</span>;
  };

  // Handle loading state
  if (loading && !plant) {
    return <div className={styles.loading}>Loading plant details...</div>;
  }
  // Handle error state
  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }
  // Handle case where plant is not found
  if (!plant) {
    return <div className={styles.error}>Plant not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.imageContainer}>
          <img 
            src={plant.image || '/placeholder-plant.jpg'} 
            alt={plant.name}
            className={styles.image}
          />
        </div>
        
        <div className={styles.headerInfo}>
          <h1 className={styles.name}>{plant.name}</h1>
          <p className={styles.scientificName}>{plant.scientificName}</p>
          
          <div className={styles.tags}>
            <span className={`${styles.tag} ${styles[plant.difficulty.toLowerCase()]}`}>
              {plant.difficulty} Care
            </span>
            <span className={`${styles.tag} ${styles[plant.type.toLowerCase()]}`}>
              {plant.type}
            </span>
          </div>

          <button
            onClick={handleAddRemovePlant}
            className={`${styles.actionButton} ${isInUserCollection ? styles.remove : styles.add}`}
          >
            {isInUserCollection ? 'Remove from My Plants' : 'Add to My Plants'}
          </button>
          
          {/* Debug display */}
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0', fontSize: '12px' }}>
            <p>DEBUG INFO:</p>
            <p>Plant ID: {id}</p>
            <p>isInUserCollection: {String(isInUserCollection)}</p>
            <p>UserPlants count: {userPlants.length}</p>
            <p>Auth status: {isAuthenticated ? 'Logged in' : 'Not logged in'}</p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.description}>{plant.description}</p>
          <div className={styles.basicInfo}>
            <div className={styles.infoItem}>
              <h3>Mature Size</h3>
              {formatCareText(plant.matureSize)}
            </div>
            <div className={styles.infoItem}>
              <h3>Toxicity</h3>
              {formatCareText(plant.toxicity)}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Care Instructions</h2>
          
          <div className={styles.careGrid}>
            <div className={styles.careItem}>
              <span className={styles.careIcon}>☀️</span>
              <h3 className={styles.careTitle}>Light</h3>
              {formatCareText(plant.lightNeeds)}
            </div>

            <div className={styles.careItem}>
              <span className={styles.careIcon}>💧</span>
              <h3 className={styles.careTitle}>Water</h3>
              {formatCareText(plant.waterNeeds)}
            </div>

            <div className={styles.careItem}>
              <span className={styles.careIcon}>💨</span>
              <h3 className={styles.careTitle}>Humidity</h3>
              {formatCareText(plant.humidity)}
            </div>

            <div className={styles.careItem}>
              <span className={styles.careIcon}>🌡️</span>
              <h3 className={styles.careTitle}>Temperature</h3>
              {formatCareText(plant.temperatureRange)}
            </div>
          </div>

          <div className={styles.detailedCare}>
            <h3 className={styles.subSectionTitle}>Detailed Care Instructions</h3>
            <p className={styles.careInstructions}>{plant.careInstructions}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlantDetails;



// import { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { 
//   fetchPlantDetails, 
//   addUserPlant, 
//   removeUserPlant, 
//   fetchUserPlants
// } from '../../features/plants/plantsSlice';
// import styles from './PlantDetails.module.css';


// const PlantDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   // Get the current user from the auth slice
//   const user = useSelector((state) => state.auth?.user);
//   const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
//   const loading = useSelector((state) => state.plants.loading);
//   const error = useSelector((state) => state.plants.error);

//   const plant = useSelector((state) => {
//     console.log('Current state:', state.plants);
//     console.log('Looking for plant with ID:', id);
//     return state.plants.encyclopediaPlants.find(p => p._id === id);
//   });

//   const isUserPlant = useSelector((state) => {
//     if (!isAuthenticated) return false;
//     const result = state.plants.userPlants.some(p => p._id === id);
//     console.log('isUserPlant updated:', result, 'for Plant ID:', id);
//     return result;
//   });

//   const userPlants = useSelector(state => state.plants.userPlants);

//   useEffect(() => {
//     console.log('PlantDetails re-rendered due to userPlants change');
//     console.log('Updated userPlants:', userPlants);
//     console.log('Updated isUserPlant:', isUserPlant);
//   }, [userPlants, isUserPlant]);

//   useEffect(() => {
//     console.log('Fetching user plants for user:', user?._id);
//     if (user && user._id) {
//       dispatch(fetchUserPlants(user._id));
//     }
//   }, [user, dispatch]);

//     // Fetch plant details if not in store
//   useEffect(() => {
//     console.log('Effect running with ID:', id);
//     if (!plant) {
//       dispatch(fetchPlantDetails(id));
//     }
//   }, [id, plant, dispatch, loading]);




//     // Handle loading state
//     if (loading) {
//       return <div className={styles.loading}>Loading plant details...</div>;
//     }
//       // Handle error state
//       if (error) {
//         return <div className={styles.error}>Error: {error}</div>;
//       }
//     // Handle case where plant is not found
//     if (!plant) {
//       return <div className={styles.error}>Plant not found</div>;
//     }
  
//     const handleAddRemovePlant = () => {
//       if (!user) {
//           navigate('/login', { state: { from: `/plant/${id}` } });
//           return;
//       }
  
//       if (isUserPlant) {
//           dispatch(removeUserPlant({ 
//               userId: user._id, 
//               plantId: id 
//           })).then(() => {
//               dispatch(fetchUserPlants(user._id)); // Fetch updated user plants
//           });
//       } else {
//           dispatch(addUserPlant({ 
//               userId: user._id, 
//               plantId: id 
//           })).then(() => {
//               dispatch(fetchUserPlants(user._id)); // Fetch updated user plants
//           });
//       }
//   };

//   const formatCareText = (text) => {
//     return <span className={styles.careText}>{text}</span>;
//   };
  

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <div className={styles.imageContainer}>
//           <img 
//             src={plant.image || '/placeholder-plant.jpg'} 
//             alt={plant.name}
//             className={styles.image}
//           />
//         </div>
        
//         <div className={styles.headerInfo}>
//           <h1 className={styles.name}>{plant.name}</h1>
//           <p className={styles.scientificName}>{plant.scientificName}</p>
          
//           <div className={styles.tags}>
//             <span className={`${styles.tag} ${styles[plant.difficulty.toLowerCase()]}`}>
//               {plant.difficulty} Care
//             </span>
//             <span className={`${styles.tag} ${styles[plant.type.toLowerCase()]}`}>
//               {plant.type}
//             </span>
//           </div>

//           <button
//             onClick={handleAddRemovePlant}
//             className={`${styles.actionButton} ${isUserPlant ? styles.remove : styles.add}`}
//           >
//             {isUserPlant ? 'Remove from My Plants' : 'Add to My Plants'}
//           </button>
//         </div>
//       </div>

//       <div className={styles.content}>
//         <section className={styles.section}>
//           <h2 className={styles.sectionTitle}>About</h2>
//           <p className={styles.description}>{plant.description}</p>
//           <div className={styles.basicInfo}>
//             <div className={styles.infoItem}>
//               <h3>Mature Size</h3>
//               {formatCareText(plant.matureSize)}
//             </div>
//             <div className={styles.infoItem}>
//               <h3>Toxicity</h3>
//               {formatCareText(plant.toxicity)}
//             </div>
//           </div>
//         </section>

//         <section className={styles.section}>
//           <h2 className={styles.sectionTitle}>Care Instructions</h2>
          
//           <div className={styles.careGrid}>
//             <div className={styles.careItem}>
//               <span className={styles.careIcon}>☀️</span>
//               <h3 className={styles.careTitle}>Light</h3>
//               {formatCareText(plant.lightNeeds)}
//             </div>

//             <div className={styles.careItem}>
//               <span className={styles.careIcon}>💧</span>
//               <h3 className={styles.careTitle}>Water</h3>
//               {formatCareText(plant.waterNeeds)}
//             </div>

//             <div className={styles.careItem}>
//               <span className={styles.careIcon}>💨</span>
//               <h3 className={styles.careTitle}>Humidity</h3>
//               {formatCareText(plant.humidity)}
//             </div>

//             <div className={styles.careItem}>
//               <span className={styles.careIcon}>🌡️</span>
//               <h3 className={styles.careTitle}>Temperature</h3>
//               {formatCareText(plant.temperatureRange)}
//             </div>
//           </div>

//           <div className={styles.detailedCare}>
//             <h3 className={styles.subSectionTitle}>Detailed Care Instructions</h3>
//             <p className={styles.careInstructions}>{plant.careInstructions}</p>
//           </div>
//         </section>
//       </div>
//     </div>
//   );

// };

// export default PlantDetails;