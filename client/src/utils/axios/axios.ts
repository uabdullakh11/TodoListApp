import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:5000",
});
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
})

api.interceptors.request.use(async (request) => {
  const refresh_token = sessionStorage.getItem("REFRESH_TOKEN");
  const accessTokenExpDate = Number(sessionStorage.getItem("expires_in"));
  const nowTime = Math.floor(new Date().getTime() / 1000) - 3600;
  if (refresh_token && accessTokenExpDate <= nowTime) {
    return axios
      .post("http://localhost:5000/api/auth/refresh", {
        refreshToken: refresh_token,
      })
      .then((res) => {
        request.headers["Authorization"] = `Bearer ${res.data.ACCESS_TOKEN}`;
        sessionStorage.setItem("ACCESS_TOKEN", res.data.ACCESS_TOKEN);
        sessionStorage.setItem("expires_in", res.data.expires_in);
        sessionStorage.setItem("REFRESH_TOKEN", res.data.REFRESH_TOKEN);
        return request;
      })
      .catch((err) => console.error(err));
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
  (error) => {
    if (error.response.status === 401) {
      const refresh_token = sessionStorage.getItem("REFRESH_TOKEN");
      return axios
        .post("http://localhost:5000/api/auth/refresh", {
          refreshToken: refresh_token,
        })
        .then((res) => {
          sessionStorage.setItem("ACCESS_TOKEN", res.data.ACCESS_TOKEN);
          sessionStorage.setItem("expires_in", res.data.expires_in);
          sessionStorage.setItem("REFRESH_TOKEN", res.data.REFRESH_TOKEN);
          return res;
        })
        .catch((err) => console.error(err));
    }
    else {
      return Promise.reject(error)
    }
  }
);
