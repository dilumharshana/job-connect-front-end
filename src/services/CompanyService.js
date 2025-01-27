// services/companyService.js
import axios from 'axios';

const API_BASE_URL = 'https://api.yourcompany.com/v1'; // Replace with your actual API base URL

export const createCompanyProfile = async (companyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/companies`, {
      name: companyData.companyName,
      email: companyData.email,
      password: companyData.password
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating company profile:', error);
    throw error;
  }
};

// You can add more company-related API calls here