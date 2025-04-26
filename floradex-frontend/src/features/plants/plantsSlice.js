//plantsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { plantsService } from '../../services/plantsService';
import axios from 'axios';

// Replace the simulated fetchPlantsFromAPI with the service method
export const fetchEncyclopediaPlants = createAsyncThunk(
  'plants/fetchEncyclopediaPlants',
  async (_, { rejectWithValue }) => {
    try {
      const plants = await plantsService.fetchPlants();
      //Null check for plants
      if (!plants) {
        throw new Error('No plants data received');
      }
      
      const BACKEND_URL = 'http://localhost:5000'; // adjust this to match your backend URL
      const plantsWithImages = plants.map(plant => ({
        ...plant,
        image: plant.image ? `${BACKEND_URL}${plant.image}` : `${BACKEND_URL}/images/plants/default.jpg`
      }));
      
      return plantsWithImages;
    } catch (error) {
      // Properly handle API errors
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchPlantDetails = createAsyncThunk(
  'plants/fetchPlantDetails',
  async (id) => {
      const response = await fetch(`http://localhost:5000/api/plants/${id}`); // Use the correct backend URL
      if (!response.ok) {
          throw new Error('Could not fetch plant details');
      }
      return response.json();
  }
);

//Fetch user's saved plants from backed
export const fetchUserPlants = createAsyncThunk(
  'plants/fetchUserPlants',
  async (userId) => {
    const response = await axios.get(`/api/users/my-plants/${userId}`);
    return response.data;
  }
);

// Add plants to "My Plants" in MongoDB

export const addUserPlant = createAsyncThunk(
  'plants/addUserPlant', 
  async ({ userId, plantId }, { rejectWithValue }) => {
    try {
      console.log("Attempting to add plant:", { userId, plantId });

      const response = await axios.post('/api/users/my-plants', 
        { userId, plantId },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Server response:", response.data);
      // Return the plantId so the reducer can use it
      return plantId; // Make sure this is just the ID string
    } catch (error) {
      console.error("Error adding plant:", {
        message: error.response?.data?.message,
        status: error.response?.status,
        data: error.response?.data
      });

      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to add plant',
        status: error.response?.status,
        details: error.response?.data
      });
    }
  }
);

// export const addUserPlant = createAsyncThunk(
//   'plants/addUserPlant', 
//   async ({ userId, plantId }, { rejectWithValue }) => {
//     try {
//       console.log("Attempting to add plant:", { userId, plantId });

//       const response = await axios.post('/api/users/my-plants', 
//         { userId, plantId },
//         {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log("Server response:", response.data);
//       return plantId;
//     } catch (error) {
//       console.error("Error adding plant:", {
//         message: error.response?.data?.message,
//         status: error.response?.status,
//         data: error.response?.data
//       });

//       return rejectWithValue({
//         message: error.response?.data?.message || 'Failed to add plant',
//         status: error.response?.status,
//         details: error.response?.data
//       });
//     }
//   }
// );

// Remove plant from "My Plants" in MongoDB
export const removeUserPlant = createAsyncThunk(
  'plants/removeUserPlant', 
  async ({ userId, plantId }, { rejectWithValue }) => {
    try {
      console.log("Attempting to remove plant:", { userId, plantId });

      const response = await axios.delete('/api/users/my-plants', { 
        data: { userId, plantId }
      });

      console.log("Server response for remove:", response.data);
      return plantId;
    } catch (error) {
      console.error("Error removing plant:", {
        message: error.response?.data?.message,
        status: error.response?.status,
        data: error.response?.data
      });

      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to remove plant',
        status: error.response?.status,
        details: error.response?.data
      });
    }
  }
);


const initialState = {
  encyclopediaPlants: [],
  userPlants: [],
  loading: false,
  error: null,
  filters: {
    light: [],
    water: [],
    difficulty: [],
    type: []
  },
  searchTerm: '',
  favorites: []
};



export const plantsSlice = createSlice({
  name: 'plants',
  initialState: {
    encyclopediaPlants: [],
    userPlants: [],
    loading: false,
    error: null,
    filters: {
      light: [],
      water: [],
      difficulty: [],
      type: []
    },
    searchTerm: '',
    favorites: []
  },
  reducers: {
    setPlants: (state, action) => {
      state.encyclopediaPlants = action.payload;
    },
    addUserPlant: (state, action) => {
      console.log('Adding plant to userPlants:', action.payload);
      const plantToAdd = state.encyclopediaPlants.find(p => p._id === action.payload);
      if (plantToAdd && !state.userPlants.some(p => p._id === action.payload)) {
        // Ensure the image URL is properly formatted
        const BACKEND_URL = 'http://localhost:5000'; // adjust this to match your backend URL
        const userPlant = {
          ...plantToAdd,
          lastWatered: new Date().toISOString(),
          careLevel: plantToAdd.difficulty?.toLowerCase() || 'moderate',
          // Ensure image URL is properly formatted
          image: plantToAdd.image ? 
            (plantToAdd.image.startsWith('http') ? plantToAdd.image : `${BACKEND_URL}${plantToAdd.image}`) :
            `${BACKEND_URL}/images/plants/default.jpg`
        };
        state.userPlants.push(userPlant);
      }
    },
    removeUserPlant: (state, action) => {
      console.log('Removing plant from userPlants:', action.payload);
      state.userPlants = state.userPlants.filter(p => p._id !== action.payload);
    },
    updateLastWatered: (state, action) => {
      const plant = state.userPlants.find(p => p._id === action.payload);
      if (plant) {
        plant.lastWatered = new Date().toISOString();
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    updateFilters: (state, action) => {
      const { filterType, values } = action.payload;
      state.filters[filterType] = values;
    },
    toggleFavorite: (state, action) => {
      const plantId = action.payload;
      const index = state.favorites.indexOf(plantId);
      if (index === -1) {
        state.favorites.push(plantId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearSearch: (state) => {
      state.searchTerm = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEncyclopediaPlants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEncyclopediaPlants.fulfilled, (state, action) => {
        state.loading = false;
        state.encyclopediaPlants = action.payload;
      })
      .addCase(fetchEncyclopediaPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPlantDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlantDetails.fulfilled, (state, action) => {
        state.loading = false;
        const plantIndex = state.encyclopediaPlants.findIndex(p => p._id === action.payload._id);
        if (plantIndex >= 0) {
          state.encyclopediaPlants[plantIndex] = action.payload;
        } else {
          state.encyclopediaPlants.push(action.payload);
        }
      })
      .addCase(fetchPlantDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserPlants.fulfilled, (state, action) => {
        state.userPlants = action.payload;
      })
      .addCase(removeUserPlant.fulfilled, (state, action) => {
        const plantId = action.payload; // Backend returns the removed plant's ID
        state.userPlants = state.userPlants.filter(plant => plant._id !== plantId);
      })
      .addCase(removeUserPlant.rejected, (state, action) => {
        console.log('Removed plant from userPlants:', action.payload);
        state.error = action.payload?.message || 'Failed to remove plant';
        console.error("Failed to remove plant:", action.payload);
      })
      .addCase(addUserPlant.fulfilled, (state, action) => {
        // The plantId from the action payload
        const plantId = action.payload;
        console.log("Processing fulfilled addUserPlant with plantId:", plantId);
        
        // Find the plant in encyclopediaPlants
        const plantToAdd = state.encyclopediaPlants.find(p => p._id === plantId);
        console.log("Found plant to add:", plantToAdd ? true : false);
        
        // Check if plant already exists in userPlants
        const exists = state.userPlants.some(p => p._id === plantId);
        console.log("Plant already exists in userPlants:", exists);
        
        if (plantToAdd && !exists) {
          const BACKEND_URL = 'http://localhost:5000';
          const userPlant = {
            ...plantToAdd,
            lastWatered: new Date().toISOString(),
            careLevel: plantToAdd.difficulty?.toLowerCase() || 'moderate',
            image: plantToAdd.image ? 
              (plantToAdd.image.startsWith('http') ? plantToAdd.image : `${BACKEND_URL}${plantToAdd.image}`) :
              `${BACKEND_URL}/images/plants/default.jpg`
          };
          console.log("Adding plant to userPlants:", userPlant._id);
          state.userPlants.push(userPlant);
        }
      })
      .addCase(addUserPlant.rejected, (state, action) => {
        console.error("Failed to add plant:", action.payload);
        state.error = action.payload?.message || 'Failed to add plant';
      });
  }
});



// Export actions
export const {
  setPlants,
  // addUserPlant,
  // removeUserPlant,
  updateLastWatered,
  setSearchTerm,
  updateFilters,
  toggleFavorite,
  clearFilters,
  clearSearch
} = plantsSlice.actions;

// Selectors
export const selectEncyclopediaPlants = (state) => state.plants.encyclopediaPlants;
export const selectUserPlants = (state) => state.plants.userPlants;
export const selectLoading = (state) => state.plants.loading;
export const selectError = (state) => state.plants.error;
export const selectFilters = (state) => state.plants.filters;
export const selectSearchTerm = (state) => state.plants.searchTerm;
export const selectFavorites = (state) => state.plants.favorites;

export default plantsSlice.reducer;