const removeToken = () => {
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("REFRESH_TOKEN");
  localStorage.removeItem("expires_in");
};

const saveToken = (accessToken:string,expiresIn:string,refreshToken:string ) => {
  localStorage.setItem("ACCESS_TOKEN", accessToken);
  localStorage.setItem("expires_in", expiresIn);
  localStorage.setItem("REFRESH_TOKEN", refreshToken);
};

const isToken = () => !!localStorage.getItem('ACCESS_TOKEN')

const isExpired = () => {
    const refresh_token = localStorage.getItem("REFRESH_TOKEN");
    const accessTokenExpDate = Number(localStorage.getItem("expires_in"));
    const nowTime = Math.floor(new Date().getTime() / 1000) - 1800;
    return refresh_token && accessTokenExpDate <= nowTime
};
export { removeToken, saveToken, isExpired, isToken };
