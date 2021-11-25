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
  KEPRIBADIAN: {
    LIST: `${groups}/kepribadian`,
    INSERT: `${groups}/kepribadian`,
    DELETE: `${groups}/kepribadian`,
    ACTIVATION: `${groups}/kepribadian/activation`,
  },
  KEJIWAAN: {
    LIST: `${groups}/kejiwaan`,
    INSERT: `${groups}/kejiwaan`,
    DELETE: `${groups}/kejiwaan`,
    ACTIVATION: `${groups}/kejiwaan/activation`,
  },
  KECERMATAN: {
    LIST: `${groups}/kecermatan`,
    INSERT: `${groups}/kecermatan`,
    DELETE: `${groups}/kecermatan`,
    ACTIVATION: `${groups}/kecermatan/activation`,
  },
};

const questions = `questions`;
export const QUESTIONS = {
  KECERDASAN: {
    DETAIL: `${questions}/kecerdasan`,
    INSERT: `${questions}/kecerdasan`,
    DELETE: `${questions}/kecerdasan`,
    ACTIVATION: `${questions}/kecerdasan/activation`,
  },
  KEPRIBADIAN: {
    DETAIL: `${questions}/kepribadian`,
    INSERT: `${questions}/kepribadian`,
    DELETE: `${questions}/kepribadian`,
    ACTIVATION: `${questions}/kepribadian/activation`,
  },
  KEJIWAAN: {
    DETAIL: `${questions}/kejiwaan`,
    INSERT: `${questions}/kejiwaan`,
    DELETE: `${questions}/kejiwaan`,
    ACTIVATION: `${questions}/kejiwaan/activation`,
  },
  KECERMATAN: {
    DETAIL: `${questions}/kecermatan`,
    INSERT_SECTION: `${questions}/kecermatan/section`,
    INSERT_QUESTION: `${questions}/kecermatan/question`,
    DELETE_SECTION: `${questions}/kecermatan/section`,
    DELETE_QUESTION: `${questions}/kecermatan/question`,
    ACTIVATION: `${questions}/kecermatan/activation`,
  },
};
