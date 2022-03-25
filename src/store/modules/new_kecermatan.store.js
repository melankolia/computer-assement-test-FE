import { initialNewKecermatanQuestion } from "../states";
import { getField, updateField } from "vuex-map-fields";
import { GET_LIST_QUESTION } from "../constants/actions.type";
import { SET_QUESTION, PURGE_QUESTION } from "../constants/mutations.type";
import QuizService from "@/services/resources/Quiz/new-kecermatan.service";

const state = {
  new_kecermatan: initialNewKecermatanQuestion(),
};

const getters = {
  getRootField(state) {
    return getField(state);
  },
  getNewKecermatan(state) {
    return state.new_kecermatan;
  },
};

const mutations = {
  updateRootField(state, field) {
    updateField(state, field);
  },
  [SET_QUESTION.NEW_KECERMATAN](state, payload) {
    state.new_kecermatan = { ...initialNewKecermatanQuestion(), ...payload };
  },
  [PURGE_QUESTION.NEW_KECERMATAN](state) {
    clearInterval(this.counterFunction);
    clearInterval(this.counterAcuanFunction);
    clearInterval(this.counterQuestionFunction);
    Object.assign(state.new_kecermatan, initialNewKecermatanQuestion());
  },
};

const actions = {
  [GET_LIST_QUESTION.NEW_KECERMATAN]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      QuizService.getList(payload)
        .then(({ data: { message, result } }) => {
          if (message == "OK") {
            const Payload = {
              secureId: result.secureId,
              title: result.title,
              timer: result.time,
              duration: result.time,
              questionTimer: result.time_interval,
              questionDuration: result.time_interval,
              sections: result.result,
            };
            commit(SET_QUESTION.NEW_KECERMATAN, Payload);
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
