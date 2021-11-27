import { initialKepribadianQuestion } from "../states";
import { getField, updateField } from "vuex-map-fields";
import { GET_LIST_QUESTION } from "../constants/actions.type";
import { SET_QUESTION, PURGE_QUESTION } from "../constants/mutations.type";
import QuizService from "@/services/resources/Quiz/kepribadian.service";

const state = {
  kepribadian: initialKepribadianQuestion(),
};

const getters = {
  getRootField(state) {
    return getField(state);
  },
  getKepribadian(state) {
    return state.kepribadian;
  },
};

const mutations = {
  updateRootField(state, field) {
    updateField(state, field);
  },
  [SET_QUESTION.KEPRIBADIAN](state, payload) {
    state.kepribadian = { ...initialKepribadianQuestion(), ...payload };
  },
  [PURGE_QUESTION.KEPRIBADIAN](state) {
    clearInterval(this.counterFunction);
    Object.assign(state.kepribadian, initialKepribadianQuestion());
  },
};

const actions = {
  [GET_LIST_QUESTION.KEPRIBADIAN]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      QuizService.getList(payload)
        .then(({ data: { message, result } }) => {
          if (message == "OK") {
            const Payload = {
              title: result.title,
              timer: result.time * 60,
              questions: result.result,
            };
            commit(SET_QUESTION.KEPRIBADIAN, Payload);
            resolve();
          } else {
            reject(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  [PURGE_QUESTION.KEPRIBADIAN](state) {
    Object.assign(state.kepribadian, initialKepribadianQuestion());
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
