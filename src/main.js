import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import "./config/cookie.config";

// Filter
import "./filter/case.filter";

// Constant
import { FORCE_LOGOUT, CHECK_AUTH } from "./store/constants/actions.type";
import { LOGIN, HOME, DATA_PESERTA, DATA_SOAL } from "./router/name.types";

// Component
import DialogConfirm from "./components/Confirm";
Vue.use(DialogConfirm);

// Vue Mixin
import "./mixin";

import _ from "lodash";
Object.defineProperty(Vue.prototype, "$_", { value: _ });

Vue.config.productionTip = false;

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) => {
  if (to.name == HOME) {
    store.getters.isAdmin
      ? next({ name: DATA_PESERTA })
      : next({ name: DATA_SOAL });
  }

  // Authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isAuthenticated) {
      store.dispatch(FORCE_LOGOUT).then(() => {
        const loginpath = window.location.pathname;
        const loginsearch = window.location.search;
        next({
          name: LOGIN,
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
    } else {
      Promise.all([store.dispatch(CHECK_AUTH)]).then(next);
    }

    if (to.meta?.privileges == "admin" && !store.getters.isAdmin) {
      next({ name: HOME });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
