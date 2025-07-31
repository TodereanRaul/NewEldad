
// Import environment variables
import Constants from 'expo-constants';

// Get the API URL from environment variables
const getApiUrl = () => {
  if (__DEV__) {
    return 'https://4bce7c6d4f26.ngrok-free.app/api/v1'; // Your actual ngrok URL
  }
  return 'https://your-production-domain.com/api/v1';
};

export const API_BASE_URL = getApiUrl();