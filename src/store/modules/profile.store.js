import { initialProfileState } from "../states";
import { SET_PROFILE, PURGE_PROFILE } from "../constants/mutations.type";

const state = {
  profile: initialProfileState(),
};

const getters = {
  getProfile(state) {
    return state.profile;
  },
  isAdmin(state) {
    return state.profile?.type?.toLowerCase() == "admin";
  },
};

const mutations = {
  [SET_PROFILE](state, payload) {
    state.profile = {
      ...payload,
    };
  },
  [PURGE_PROFILE](state) {
    Object.assign(state.profile, initialProfileState());
  },
};

const actions = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
