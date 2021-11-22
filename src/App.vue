<template>
  <v-app>
    <Snackbar />
    <confirm-dialog />
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
const Snackbar = () => import("@/components/Snackbar");

export default {
  name: "App",
  components: {
    Snackbar,
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import "assets/scss/style";
</style>
