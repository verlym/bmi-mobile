import axios from 'axios';

const API_URL = 'http://localhost:3000/api/bmi'; // Use your API URL here

export const calculateBMI = async (height, weight) => {
    try {
      console.log('Sending request to:', `${API_URL}/calculate`);
      console.log('Request data:', { height, weight });
      const response = await axios.post(`${API_URL}/calculate`, { height, weight });
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error calculating BMI:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

export const getBMIRecords = async () => {
  try {
    const response = await axios.get(`${API_URL}/records`);
    return response.data;
  } catch (error) {
    console.error('Error fetching BMI records:', error);
    throw error;
  }
};