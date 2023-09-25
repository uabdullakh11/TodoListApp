import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

// api.interceptors.request.use((request) => {
//     const token = sessionStorage.getItem('token');
//     if (token) {
//         request.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return request;
// });
