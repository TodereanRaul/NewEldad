
// Import environment variables
import Constants from 'expo-constants';

// Get the API URL from environment variables
const getApiUrl = () => {
  if (__DEV__) {
    return 'https://4a45368cbff3.ngrok-free.app/api/v1';
  }
  return 'https://your-production-domain.com/api/v1';
};

export const API_BASE_URL = getApiUrl();