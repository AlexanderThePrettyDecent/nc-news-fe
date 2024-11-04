import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://nc-news-xander.onrender.com/api/",
  timeout: 1000,
});

export default apiClient;
