export const setUserToken = (token: string, userInfo = "") => {
  sessionStorage.setItem("userToken", token);
  sessionStorage.setItem("userInfo", userInfo);
};

export const getUserToken = () => {
  return sessionStorage.getItem("userToken");
};
export const getUserInfo = () => {
  const str = sessionStorage.getItem("userInfo");
  return str ? JSON.parse(str) : "";
};

