import axios from 'axios';
import config from '../config';
import { get } from '../assets/styles/storage';

const AuthenticationInstance = axios.create({
  baseURL: '', // Replace with your API's base URL
  timeout: 5000, // Set a request timeout (optional)
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here
  },
});

// Request Interceptor
AuthenticationInstance.interceptors.request.use(
  async(config:any) => {
    config.baseURL = await getBaseUrl();
    // Modify request config here if needed (e.g., add an authentication token)
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Response Interceptor
AuthenticationInstance.interceptors.response.use(
  (response) => {
    // Preprocess the response data here if needed
    return response;
  },
  (error) => {
    // Handle response error here
      // Handle response error here
      if (error.response) {
        // The request was made, but the server responded with an error status code
        console.log('Response Error:', error.response.status);
        console.log('Response Data:', error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.log('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log('Error:', error.message);
      }
    return Promise.reject(error);
  }
);
  const getBaseUrl = async () => {
    try {
      const env:any = await get('environment');
      console.log(env, "<<<< URL >>>>");
      console.log(`${config[env]}WebApi/Auth/`, "<<<< URL >>>>");
      return `${config[env]}WebApi/Auth/`;
    }
    catch (e) {
      console.log(e)
    }
  }
export default AuthenticationInstance;