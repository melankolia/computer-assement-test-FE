// Extentions //

// End Point //
// Auth
export const AUTH_ME = `auth/me`;
export const AUTH_LOGIN = `auth/login`;
export const AUTH_REGISTER = `auth/register`;
export const RESET_PASSWORD = `auth/reset-password`;
export const CHANGE_PASSWORD = `auth/me/change-password`;
export const LOGIN = `users/login`;
export const LOGOUT = `logout`;
export const REFRESH_TOKEN = `refresh-token`;

const users = `users`;
export const USERS = {
  LIST: `${users}/list`,
  INSERT: `${users}/insert`,
  DELETE: `${users}/delete`,
};

const groups = `groups`;
export const GROUPS = {
  KECERDASAN: {
    LIST: `${groups}/kecerdasan`,
    INSERT: `${groups}/kecerdasan`,
    DELETE: `${groups}/kecerdasan`,
    ACTIVATION: `${groups}/kecerdasan/activation`,
  },
};
