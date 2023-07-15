import axios from 'axios';

const apiUrl = 'http://localhost:4000';

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'Application/json',
  },
});

export default api;
