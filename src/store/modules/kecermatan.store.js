import { initialKecermatanQuestion } from "../states";
import { getField, updateField } from "vuex-map-fields";
import { GET_LIST_QUESTION } from "../constants/actions.type";
import { SET_QUESTION, PURGE_QUESTION } from "../constants/mutations.type";
import QuizService from "@/services/resources/Quiz/kecermatan.service";

const state = {
  kecermatan: initialKecermatanQuestion(),
};

const getters = {
  getRootField(state) {
    return getField(state);
  },
  getKecermatan(state) {
    return state.kecermatan;
  },
};

const mutations = {
  updateRootField(state, field) {
    updateField(state, field);
  },
  [SET_QUESTION.KECERMATAN](state, payload) {
    state.kecermatan = { ...initialKecermatanQuestion(), ...payload };
  },
  [PURGE_QUESTION.KECERMATAN](state) {
    clearInterval(this.counterFunction);
    Object.assign(state.kecermatan, initialKecermatanQuestion());
  },
};

const actions = {
  [GET_LIST_QUESTION.KECERMATAN]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      QuizService.getList(payload)
        .then(({ data: { message, result } }) => {
          if (message == "OK") {
            const Payload = {
              secureId: result.secureId,
              title: result.title,
              timer: result.time,
              duration: result.time,
              sections: result.result,
            };
            commit(SET_QUESTION.KECERMATAN, Payload);
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
