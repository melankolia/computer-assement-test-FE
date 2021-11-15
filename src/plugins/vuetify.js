import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#7C48EA",
        secondary: "#EFE9FC",
        accent: "#EA8E1C",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        greencs: "#d7f6d7",
        greentext: "#3ad536",
        graycs: "#f5f5f5",
        graytext: "#e0e0e0",
        addbg: "#E9E5F2",
        subtitlegraytext: "#808080",
      },
    },
  },
});
