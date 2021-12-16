const base_uri = process.env.VUE_APP_BASE_URI;
const debug = process.env.VUE_APP_DEBUG;

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/image": {
        target: base_uri,
        changeOrigin: debug,
        secure: debug,
        logLevel: debug ? "debug" : "silent",
        pathRewrite: { "^/image": "/image" },
      },
    },
  },
};
