import { ID_TOKEN_KEY, REFRESH_TOKEN } from "./constants";
import Vue from "vue";

const get = (key) => {
  return Vue.$cookies.get(key);
};

const set = (key, data) => {
  Vue.$cookies.set(key, data);
};

const remove = (key) => {
  Vue.$cookies.remove(key);
};

// Token
export const getToken = () => {
  return get(ID_TOKEN_KEY);
};

export const saveToken = (data) => {
  set(ID_TOKEN_KEY, data);
};

export const destroyToken = () => {
  remove(ID_TOKEN_KEY);
};

// Token
export const getRefreshToken = () => {
  return get(REFRESH_TOKEN);
};

export const saveRefreshToken = (data) => {
  set(REFRESH_TOKEN, data);
};

export const destroyRefreshToken = () => {
  remove(REFRESH_TOKEN);
};

export default {
  getToken,
  saveToken,
  destroyToken,
  getRefreshToken,
  saveRefreshToken,
  destroyRefreshToken,
};
