import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://travel-exotica-api.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
