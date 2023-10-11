const removeToken = () => {
  sessionStorage.removeItem("ACCESS_TOKEN");
  sessionStorage.removeItem("REFRESH_TOKEN");
  sessionStorage.removeItem("expires_in");
};

const saveToken = (accessToken:string,expiresIn:string,refreshToken:string ) => {
  sessionStorage.setItem("ACCESS_TOKEN", accessToken);
  sessionStorage.setItem("expires_in", expiresIn);
  sessionStorage.setItem("REFRESH_TOKEN", refreshToken);
};

const isToken = () => !!sessionStorage.getItem('ACCESS_TOKEN')

const isExpired = () => {
    const refresh_token = sessionStorage.getItem("REFRESH_TOKEN");
    const accessTokenExpDate = Number(sessionStorage.getItem("expires_in"));
    const nowTime = Math.floor(new Date().getTime() / 1000) - 1800;

    return refresh_token && accessTokenExpDate <= nowTime
};
export { removeToken, saveToken, isExpired, isToken };
