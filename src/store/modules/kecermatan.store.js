import { initialKecerdasanQuestion } from "../states";
import { getField, updateField } from "vuex-map-fields";
import { GET_LIST_QUESTION } from "../constants/actions.type";
import { SET_QUESTION, PURGE_QUESTION } from "../constants/mutations.type";
import QuizService from "@/services/resources/Quiz/kecerdasan.service";

const state = {
  kecerdasan: initialKecerdasanQuestion(),
};

const getters = {
  getRootField(state) {
    return getField(state);
  },
  getKecerdasan(state) {
    return state.kecerdasan;
  },
};

const mutations = {
  updateRootField(state, field) {
    updateField(state, field);
  },
  [SET_QUESTION.KECERDASAN](state, payload) {
    state.kecerdasan = { ...initialKecerdasanQuestion(), ...payload };
  },
  [PURGE_QUESTION.KECERDASAN](state) {
    clearInterval(this.counterFunction);
    Object.assign(state.kecerdasan, initialKecerdasanQuestion());
  },
};

const actions = {
  [GET_LIST_QUESTION.KECERDASAN]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      QuizService.getList(payload)
        .then(({ data: { message, result } }) => {
          if (message == "OK") {
            const Payload = {
              secureId: result.secureId,
              title: result.title,
              timer: result.time * 60,
              questions: result.result,
            };
            commit(SET_QUESTION.KECERDASAN, Payload);
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
