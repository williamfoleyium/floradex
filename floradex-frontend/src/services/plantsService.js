import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/plants';

export const plantsService = {
  fetchPlants: async () => {
    try {
      const response = await axios.get(BASE_URL);
      console.log('Fetched plants:', response.data); 
      return response.data;
    } catch (error) {
      console.error('Error fetching plants:', error);
      throw error;
    }
  },

  getPlantById: async (id) => {
    try {
      // Add console log to debug the URL being called
      console.log('Fetching plant with URL:', `${BASE_URL}/${id}`);
      const response = await axios.get(`${BASE_URL}/${id}`);
      console.log('Fetched plant details:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  }
};

export default plantsService;