import axios from "axios";
import JwtService from "@/common/JwtService";
import { FORCE_LOGOUT } from "@/store/constants/actions.type";
import router from "@/router";
import store from "@/store";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

instance.interceptors.request.use(function (config) {
  const token = JwtService.getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

// let isAlreadyFetchingAccessToken = false;
// let subscribers = [];

function logout() {
  store.dispatch(FORCE_LOGOUT).then(() => {
    const loginpath = window.location.pathname;
    const loginsearch = window.location.search;
    router.replace({
      name: "login",
      query: { pathname: loginpath, search: loginsearch },
    });
    setTimeout(function () {
      store.commit("snackbar/setSnack", {
        show: true,
        message: "Token Expired. Sorry you must login again",
        color: "error",
      });
    }, 500);
  });
}

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { response } = error;
    if (response.status === 401) {
      logout();
    }

    return Promise.reject(error);
  }
);

const MiddleInstance = {
  async query(resource, params) {
    return instance.get(resource, params);
  },

  async download(resource, params, type) {
    return instance.get(resource, { params, responseType: type });
  },

  async fetch(resource, slug = "", params) {
    return instance.get(`${resource}/${slug}`, params);
  },

  async post(resource, params, config) {
    return instance.post(`${resource}`, params, config);
  },

  async create(resource, slug = "", params, config) {
    return instance.post(`${resource}/${slug}`, params, config);
  },

  async update(resource, slug, params) {
    return instance.put(`${resource}/${slug}`, params);
  },

  async put(resource, params, config) {
    return instance.put(`${resource}`, params, config);
  },

  async delete(resource, config) {
    return instance.delete(resource, config);
  },

  async deleteSlug(resource, slug, config) {
    return instance.delete(`${resource}/${slug}`, config);
  },

  cancelRequest() {
    return instance.CancelToken;
  },
};

export default MiddleInstance;
