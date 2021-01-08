import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8090"
})

const token = window.sessionStorage.getItem("token");

if (token) {
  api.defaults.headers.authorization = `Bearer ${token}`;
}

export default api;