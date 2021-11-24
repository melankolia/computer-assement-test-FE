<template>
  <div class="px-6 py-12 mt-6">
    <p class="text-h4 font-weight-bold mt-0 mb-9 font-inter">Manajemen Soal</p>
    <v-row class="mb-12">
      <v-col cols="12" class="py-2">
        <v-btn-toggle
          v-model="isComponent"
          mandatory
          borderless
          color="deep-purple accent-3"
          background-color="white"
        >
          <v-btn class="no-uppercase" small value="Kecerdasan">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kecerdasan
            </p>
          </v-btn>
          <v-btn class="no-uppercase" small value="Kepribadian">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kepribadian
            </p>
          </v-btn>
          <v-btn class="no-uppercase" small value="Kejiwaan">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kejiwaan
            </p>
          </v-btn>
          <v-btn class="no-uppercase" small value="Kecermatan">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kecermatan
            </p>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <transition name="slide-fade" mode="out-in">
      <component :is="isComponent" class="mt-6" />
    </transition>
  </div>
</template>

<script>
const Kecerdasan = () => import("./Kecerdasan");
const Kepribadian = () => import("./Kepribadian");
const Kejiwaan = () => import("./Kejiwaan");
const Kecermatan = () => import("./Kecermatan");

export default {
  components: {
    Kecerdasan,
    Kepribadian,
    Kejiwaan,
    Kecermatan,
  },
  data() {
    return {
      isComponent: "Kecerdasan",
    };
  },
  watch: {
    isComponent() {
      this.$router.replace({ query: null });
    },
  },
};
</script>

<style scoped>
.font-inter {
  font-family: Inter !important;
}
</style>
