import axios from "axios";
import dayjs from "dayjs";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use(async (request) => {
  const refresh_token = sessionStorage.getItem("REFRESH_TOKEN");
  const accessTokenExpDate = Number(sessionStorage.getItem("expires_in"));
  const nowTime = Math.floor(new Date().getTime() / 1000) - 1800;

  const isExpired = dayjs.unix(accessTokenExpDate).diff(dayjs()) < 1800;
  // console.log(isExpired)

  if (refresh_token && accessTokenExpDate <= nowTime) {
    const res = await axiosInstance.post("/api/auth/refresh", {
      refreshToken: refresh_token,
    });
    request.headers["Authorization"] = `Bearer ${res.data.ACCESS_TOKEN}`;
    sessionStorage.setItem("ACCESS_TOKEN", res.data.ACCESS_TOKEN);
    sessionStorage.setItem("expires_in", res.data.expires_in);
    sessionStorage.setItem("REFRESH_TOKEN", res.data.REFRESH_TOKEN);
    return request;
  } else {
    const token = sessionStorage.getItem("ACCESS_TOKEN");
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  }
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const refresh_token = sessionStorage.getItem("REFRESH_TOKEN");
      const res = await axiosInstance.post("/api/auth/refresh", {
        refreshToken: refresh_token,
      });
      sessionStorage.setItem("ACCESS_TOKEN", res.data.ACCESS_TOKEN);
      sessionStorage.setItem("expires_in", res.data.expires_in);
      sessionStorage.setItem("REFRESH_TOKEN", res.data.REFRESH_TOKEN);
      return res;
    } else {
      return Promise.reject(error);
    }
  }
);
