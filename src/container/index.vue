<template>
  <v-main>
    <Sidebar />
    <v-container fluid>
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
    </v-container>
  </v-main>
</template>

<script>
const Sidebar = () => import("./SideBar");

export default {
  components: {
    Sidebar,
  },
};
</script>

<style></style>
