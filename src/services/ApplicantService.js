// services/applicantService.js
import axios from 'axios';

const API_BASE_URL = 'https://api.yourcompany.com/v1'; // Replace with your actual API base URL

export const registerApplicant = async (applicantData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/applicants/register`, {
      fullName: applicantData.fullName,
      email: applicantData.email,
      password: applicantData.password
    });
    
    return response.data;
  } catch (error) {
    // Handle specific error cases
    if (error.response) {
      switch (error.response.status) {
        case 409:
          throw new Error('An account with this email already exists');
        case 400:
          throw new Error('Invalid input data. Please check your information');
        default:
          throw new Error('Registration failed. Please try again later');
      }
    }
    throw error;
  }
};

// Additional applicant-related services
export const verifyEmail = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/applicants/verify-email`, { token });
    return response.data;
  } catch (error) {
    throw new Error('Email verification failed');
  }
};

export const resendVerificationEmail = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/applicants/resend-verification`, { email });
    return response.data;
  } catch (error) {
    throw new Error('Failed to resend verification email');
  }
};