import { isExpired, isToken, saveToken } from "@/helpers/token";
import axios from "axios";
import { refreshToken } from "../services/auth.service";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use(async (request) => {
  if (isExpired()) {
    const res = await refreshToken();
    request.headers["Authorization"] = `Bearer ${res.ACCESS_TOKEN}`;
    return request;
  } else {
    isToken()
      ? (request.headers["Authorization"] = `Bearer ${sessionStorage.getItem(
          "ACCESS_TOKEN"
        )}`)
      : false;
    return request;
  }
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const res = await refreshToken();
      return res;
    } else {
      return Promise.reject(error);
    }
  }
);
