import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import store from '../store';
import config from '../config';
import { 
  setInternetMessageModal
} from '../store/global';

class HttpService {
  constructor(options = {}) {
    this.client = axios.create(options);
    this.client.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
    this.client.interceptors.request.use(async (config) => {
      config.baseURL = await this.getBaseUrl();
      return config;
    }, error => {
      Promise.reject(error)
    });

    this.unauthorizedCallback = () => { };
  }

  getBaseUrl = async () => {
    try {
      const siteToAccessURL = await AsyncStorage.getItem('siteToAccessURL');
      // const parsedJSON = JSON.parse(CompanyorService);
      console.log(siteToAccessURL, "<<<< siteToAccessURL URL >>>>");
      return siteToAccessURL || '';
    }
    catch (e) {
      console.log(e)
    }
  }
  attachHeaders(headers) {
    Object.assign(this.client.defaults.headers, headers);
  }

  removeHeaders(headerKeys) {
    headerKeys.forEach(key => delete this.client.defaults.headers[key]);
  }

  handleSuccessResponse = async (response) => {
    // alert(JSON.stringify({success: response}));
    return response;
  }

  handleErrorResponse = error => {
    try {
      const { status } = error.response;

      switch (status) {
        case 401:
          this.unauthorizedCallback();
          break;
        default:
          break;
      }
      // alert(JSON.stringify({error: error}));
      return error;
    } catch (e) {
      if (error?.message === "Network Error") {
        store.dispatch(setInternetMessageModal(true, ""));
      }
      // alert(JSON.stringify({error: error}));
      return error
    }
  };

  setUnauthorizedCallback(callback) {
    this.unauthorizedCallback = callback;
  }
}
const httpService = new HttpService();

export default httpService;