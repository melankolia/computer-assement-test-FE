import Vue from "vue";
Vue.mixin({
  data() {
    return {
      cancelRequest: null,
    };
  },
  methods: {
    cancelReq() {
      this.cancelRequest && this.cancelRequest.cancel("Cancel");
    },
    createToken(callback) {
      callback && (this.cancelRequest = callback);
    },
    fetchListDebounce(callback) {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        callback();
      }, 500);
      this.cancelRequest && this.cancelReq();
    },
    debounce(callback) {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        callback();
      }, 500);
    },
  },
});
