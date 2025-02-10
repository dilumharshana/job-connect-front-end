// services/companyService.js
import axios from "axios";
import { baseUrl } from "../constants";

export const userLogin = async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      email: credentials.email,
      password: credentials.password
    });

    return response.data;
  } catch (error) {
    console.error("Error creating company profile:", error);
    throw error;
  }
};

// You can add more company-related API calls here
