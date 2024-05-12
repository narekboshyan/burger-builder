import axios from "axios";

export const $apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_FIREBASE_URL,
});

$apiClient.interceptors.response.use((response) => response.data);
