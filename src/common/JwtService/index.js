import CookieService from "@/common/CookieService";

// Token
export const getToken = () => {
  return CookieService.getToken();
};

export const saveToken = (token) => {
  CookieService.saveToken(token);
};

export const destroyToken = () => {
  CookieService.destroyToken();
};

// Refresh Token
export const getRefreshToken = () => {
  return CookieService.getRefreshToken();
};

export const saveRefreshToken = (token) => {
  CookieService.saveRefreshToken(token);
};

export const destroyRefreshToken = () => {
  CookieService.destroyRefreshToken();
};

export const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export default {
  getToken,
  saveToken,
  destroyToken,
  getRefreshToken,
  saveRefreshToken,
  destroyRefreshToken,
  parseJwt,
};
