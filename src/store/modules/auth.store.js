import { initialAuthState } from "../states";
import JwtService from "@/common/JwtService";
import { LOGIN } from "../constants/actions.type";
import {
  SET_AUTH,
  PURGE_AUTH,
  PURGE_PROFILE,
  SET_PROFILE,
} from "../constants/mutations.type";
import { FORCE_LOGOUT, LOGOUT, CHECK_AUTH } from "../constants/actions.type";

import AuthService from "@/services/resources/auth.service";

const state = {
  auth: initialAuthState(),
};

const getters = {
  getToken(state) {
    return state.auth.token;
  },
  isAuthenticated(state) {
    return state.auth.isAuthenticated;
  },
};

const mutations = {
  [SET_AUTH](state, payload) {
    state.auth = {
      ...payload,
      isAuthenticated: true,
    };
    JwtService.saveToken(payload.token);
  },
  [PURGE_AUTH](state) {
    Object.assign(state.auth, initialAuthState());
  },
};

const actions = {
  [LOGIN](context, payload) {
    return new Promise((resolve, reject) => {
      AuthService.login({
        username: payload.username,
        password: payload.password,
      })
        .then(({ data: { message, result } }) => {
          if (message == "OK") {
            const acronymName = result.nama_lengkap
              ? result.nama_lengkap
                  .match(/\b(\w)/g)
                  .join("")
                  .substring(0, 2)
              : "Anonymous";
            context.commit(SET_AUTH, {
              secureId: result.secureId,
              username: result.username,
              nama_lengkap: result.nama_lengkap,
              type: result.type,
              isAuthenticated: true,
              token: result.token,
              acronymName,
            });
            context.commit(SET_PROFILE, {
              secureId: result.secureId,
              username: result.username,
              nama_lengkap: result.nama_lengkap,
              type: result.type,
              isAuthenticated: true,
              token: result.token,
              acronymName,
            });
            resolve(result);
          } else {
            reject(message);
          }
        })
        .catch(
          ({
            response: {
              data: { result },
            },
          }) => {
            reject(result);
          }
        );
    });
  },
  [LOGOUT](context, payload) {
    return new Promise((resolve, reject) => {
      AuthService.logout({
        username: payload.username,
      })
        .then(({ data: { message, result } }) => {
          if (message == "OK") {
            resolve(result);
          } else {
            reject(message);
          }
        })
        .catch(
          ({
            response: {
              data: { result },
            },
          }) => {
            reject(result);
          }
        )
        .finally(() => {
          context.commit(PURGE_AUTH);
          context.commit(PURGE_PROFILE);
        });
    });
  },
  [FORCE_LOGOUT](context) {
    context.commit(PURGE_AUTH);
    context.commit(PURGE_PROFILE);
  },
  [CHECK_AUTH](context) {
    if (!JwtService.getToken()) {
      context.commit(PURGE_AUTH);
      context.commit(PURGE_PROFILE);
    }
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
