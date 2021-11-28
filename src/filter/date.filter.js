import Vue from "vue";

Vue.filter("date", (str) => {
  return str && str !== "-"
    ? new Date(str).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        hour12: true,
        minute: "2-digit",
      })
    : str;
});
