import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For Android emulator use 10.0.2.2, for real device use your PC IP
export const BASE_URL = 'http://http://localhost:8081/api';

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;