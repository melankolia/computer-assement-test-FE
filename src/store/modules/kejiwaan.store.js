import { initialKejiwaanQuestion } from "../states";
import { getField, updateField } from "vuex-map-fields";
import { GET_LIST_QUESTION } from "../constants/actions.type";
import { SET_QUESTION, PURGE_QUESTION } from "../constants/mutations.type";
import QuizService from "@/services/resources/Quiz/kejiwaan.service";

const state = {
  kejiwaan: initialKejiwaanQuestion(),
};

const getters = {
  getRootField(state) {
    return getField(state);
  },
  getKejiwaan(state) {
    return state.kejiwaan;
  },
};

const mutations = {
  updateRootField(state, field) {
    updateField(state, field);
  },
  [SET_QUESTION.KEJIWAAN](state, payload) {
    state.kejiwaan = { ...initialKejiwaanQuestion(), ...payload };
  },
  [PURGE_QUESTION.KEJIWAAN](state) {
    clearInterval(this.counterFunction);
    Object.assign(state.kejiwaan, initialKejiwaanQuestion());
  },
};

const actions = {
  [GET_LIST_QUESTION.KEJIWAAN]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      QuizService.getList(payload)
        .then(({ data: { message, result } }) => {
          if (message == "OK") {
            const Payload = {
              title: result.title,
              timer: result.time * 60,
              questions: result.result,
            };
            commit(SET_QUESTION.KEJIWAAN, Payload);
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
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
