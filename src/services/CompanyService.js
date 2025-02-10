// services/companyService.js
import axios from "axios";
import { baseUrl } from "../constants";

export const createCompanyProfile = async (companyData) => {
  try {
    const response = await axios.post(`${baseUrl}/company`, {
      name: companyData.companyName,
      email: companyData.email,
      password: companyData.password
    });

    return response.data;
  } catch (error) {
    console.error("Error creating company profile:", error.message);
    throw error;
  }
};

// You can add more company-related API calls here
