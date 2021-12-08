<template>
  <v-main>
    <Sidebar />
    <FloatingScrollButton />
    <v-container class="pa-0" style="background: #f8f6fb; height: 100%" fluid>
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
    </v-container>
    <div id="last-section" />
  </v-main>
</template>

<script>
const FloatingScrollButton = () => import("@/components/Button/FloatingScroll");
const Sidebar = () => import("./SideBar");

export default {
  components: {
    Sidebar,
    FloatingScrollButton,
  },
};
</script>

<style></style>
