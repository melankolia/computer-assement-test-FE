<template>
  <div v-scroll="onScroll">
    <v-expand-transition>
      <div
        class="d-flex flex-row white align-center fixed-div-soal"
        :class="{ 'div-box-shadow': floating }"
        v-show="!isShown"
      >
        <v-btn
          @click="handleBack"
          color="primary"
          depressed
          text
          class="rounded-lg no-uppercase my-1"
        >
          <p class="ma-0">
            <v-icon class="mr-1" small>mdi-chevron-left</v-icon>
            Back
          </p>
        </v-btn>
      </div>
    </v-expand-transition>
    <div class="px-6 py-12 mt-6">
      <p class="text-h4 font-weight-bold mt-0 mb-9 font-inter">
        Manajemen Soal
      </p>
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
              <p
                class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter"
              >
                Kecerdasan
              </p>
            </v-btn>
            <v-btn class="no-uppercase" small value="Kepribadian">
              <p
                class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter"
              >
                Kepribadian
              </p>
            </v-btn>
            <v-btn class="no-uppercase" small value="Kejiwaan">
              <p
                class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter"
              >
                Kejiwaan
              </p>
            </v-btn>
            <v-btn class="no-uppercase" small value="Kecermatan">
              <p
                class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter"
              >
                Kecermatan
              </p>
            </v-btn>
            <v-btn class="no-uppercase" small value="NewKecermatan">
              <p
                class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter"
              >
                New Kecermatan
              </p>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <transition name="slide-fade" mode="out-in">
        <component :query="query" :is="isComponent" class="mt-6" />
      </transition>
    </div>
  </div>
</template>

<script>
const Kecerdasan = () => import("./Kecerdasan");
const Kepribadian = () => import("./Kepribadian");
const Kejiwaan = () => import("./Kejiwaan");
const Kecermatan = () => import("./Kecermatan");
const NewKecermatan = () => import("./NewKecermatan");

export default {
  components: {
    Kecerdasan,
    Kepribadian,
    Kejiwaan,
    Kecermatan,
    NewKecermatan,
  },
  data() {
    return {
      isComponent: "Kecerdasan",
      floating: false,
      query: {},
    };
  },
  methods: {
    handleBack() {
      this.$router.replace({ query: null });
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.floating = top > 40;
    },
  },
  computed: {
    isShown() {
      const query = { ...this.$route.query };
      return Object.keys(query).length === 0 && query.constructor === Object;
    },
  },
  watch: {
    $route: {
      handler(val) {
        val?.query && (this.query = val?.query);
      },
      deep: true,
    },
    isComponent() {
      const query = { ...this.$route.query };
      if (!(Object.keys(query).length === 0 && query.constructor === Object)) {
        this.$router.replace({ query: null });
      }
    },
  },
};
</script>

<style scoped>
.font-inter {
  font-family: Inter !important;
}
</style>
