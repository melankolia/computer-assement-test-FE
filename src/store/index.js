import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import VuexPersistence from "vuex-persist";

import profile from "./modules/profile.store";
import auth from "./modules/auth.store";
import snackbar from "./modules/snackbar.store";
import kecerdasan from "./modules/kecerdasan.store";
import kejiwaan from "./modules/kejiwaan.store";

const debug = process.env.VUE_APP_DEBUG;
const debugPlugin = debug == "true" ? [createLogger()] : [];

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer(val) {
    if (val.auth.token === null) {
      return {};
    }
    return val;
  },
});

export default new Vuex.Store({
  modules: {
    auth,
    snackbar,
    profile,
    kecerdasan,
    kejiwaan,
  },
  strict: debug,
  plugins: [vuexLocal.plugin, ...debugPlugin],
});
