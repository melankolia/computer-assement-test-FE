<template>
  <div
    class="d-flex flex-column pb-12"
    style="background: #f8f6fb; height: 100%"
  >
    <div class="d-flex flex-row white justify-space-between align-center py-5">
      <v-btn-toggle
        v-model="isComponent"
        mandatory
        borderless
        color="deep-purple accent-3"
        background-color="white"
        class="mx-auto"
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
      <div class="mr-6">
        <v-menu rounded left min-width="188px">
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              small
              depressed
              icon
              class="rounded-lg"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link>
              <p class="selection-item ma-0">Keluar</p>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div class="d-flex flex-column align-center justify-center">
      <transition name="slide-fade" mode="out-in">
        <keep-alive>
          <component :is="isComponent" class="mt-6" />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
const Kecerdasan = () => import("./Kecerdasan");
const Kecermatan = () => import("./Kecermatan");
const Kepribadian = () => import("./Kepribadian");
const Kejiwaan = () => import("./Kejiwaan");

export default {
  components: {
    Kecerdasan,
    Kecermatan,
    Kepribadian,
    Kejiwaan,
  },
  data() {
    return {
      isComponent: "Kecerdasan",
      isType: this.$route.query?.type,
    };
  },
  mounted() {
    this.isComponent = this.isType || "Kecerdasan";
  },
  watch: {
    isComponent(val) {
      if (val == "Kecermatan") {
        this.item = {
          title: "Test Kecermatan",
          desc: `ulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum. Nulla Lorem mollit cupidatat irure.
          Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation
          incididunt aliquip deserunt reprehenderit elit laborum.`,
          soal: 50,
          time: 50,
          section: 4,
        };
      }
    },
  },
};
</script>
