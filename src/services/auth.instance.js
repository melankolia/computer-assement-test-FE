import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URI,
  timeout: 10000,
});

const AuthInstance = {
  async query(resource, params) {
    return instance.get(resource, params);
  },

  async fetch(resource, slug = "") {
    return instance.get(`${resource}/${slug}`);
  },

  async post(resource, params, config) {
    return instance.post(`${resource}`, params, config);
  },

  async create(resource, slug = "", params, config) {
    return instance.post(`${resource}/${slug}`, params, config);
  },

  async update(resource, slug = "", params) {
    return instance.put(`${resource}/${slug}`, params);
  },

  async put(resource, params) {
    return instance.put(`${resource}`, params);
  },

  async delete(resource) {
    return instance.delete(resource);
  },
};

export default AuthInstance;
