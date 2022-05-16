// Extentions //

// End Point //
// Auth
export const AUTH_ME = `auth/me`;
export const AUTH_LOGIN = `auth/login`;
export const AUTH_REGISTER = `auth/register`;
export const RESET_PASSWORD = `auth/reset-password`;
export const CHANGE_PASSWORD = `auth/me/change-password`;
export const LOGIN = `users/login`;
export const LOGOUT = `users/logout`;
export const REFRESH_TOKEN = `refresh-token`;

export const PERATURAN = `peraturan`;

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
  NEW_KECERMATAN: {
    LIST: `${groups}/new-kecermatan`,
    INSERT: `${groups}/new-kecermatan`,
    DELETE: `${groups}/new-kecermatan`,
    ACTIVATION: `${groups}/new-kecermatan/activation`,
  },
};

const questions = `questions`;
export const QUESTIONS = {
  KECERDASAN: {
    DETAIL: `${questions}/kecerdasan`,
    INSERT: `${questions}/kecerdasan`,
    DELETE: `${questions}/kecerdasan`,
    ACTIVATION: `${questions}/kecerdasan/activation`,
    UPLOAD: `${questions}/kecerdasan/upload`,
    DELETE_PHOTO: `${questions}/kecerdasan/delete-photo`,
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
  NEW_KECERMATAN: {
    DETAIL: `${questions}/new-kecermatan`,
    INSERT_SECTION: `${questions}/new-kecermatan/section`,
    INSERT_QUESTION: `${questions}/new-kecermatan/question`,
    DELETE_SECTION: `${questions}/new-kecermatan/section`,
    DELETE_QUESTION: `${questions}/new-kecermatan/question`,
    ACTIVATION: `${questions}/new-kecermatan/activation`,
  },
};

const soal = `soal`;
export const SOAL = {
  LIST: `${soal}/list`,
  COVER: `${soal}/cover`,
};

const nilai = `nilai`;
export const NILAI = {
  LIST: `${nilai}`,
  LIST_KECERMATAN: `${nilai}/kecermatan`,
  LIST_NEW_KECERMATAN: `${nilai}/new-kecermatan`,
  INSERT: `${nilai}`,
  INSERT_KECERMATAN: `${nilai}/kecermatan`,
  INSERT_NEW_KECERMATAN: `${nilai}/new-kecermatan`,
  DELETE: `${nilai}`,
};
