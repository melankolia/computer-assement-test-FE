<template>
  <div
    class="d-flex flex-column pb-12"
    style="background: #f8f6fb; height: 100%"
  >
    <div class="d-flex flex-row white justify-space-between align-center py-5">
      <div />
      <div class="d-flex flex-row">
        <v-btn
          color="primary"
          v-bind="{ text: !isKecerdasan }"
          :disabled="!isKecerdasan"
          class="no-uppercase"
          small
          depressed
        >
          <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
            Kecerdasan
          </p>
        </v-btn>
        <v-btn
          v-bind="{ text: !isKepribadian }"
          :disabled="!isKepribadian"
          color="primary"
          class="no-uppercase"
          small
          depressed
        >
          <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
            Kepribadian
          </p>
        </v-btn>
        <v-btn
          v-bind="{ text: !isKejiwaan }"
          :disabled="!isKejiwaan"
          color="primary"
          class="no-uppercase"
          small
          depressed
        >
          <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
            Kejiwaan
          </p>
        </v-btn>
        <v-btn
          v-bind="{ text: !isKecermatan }"
          :disabled="!isKecermatan"
          color="primary"
          class="no-uppercase"
          small
          depressed
        >
          <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
            Kecermatan
          </p>
        </v-btn>
        <v-btn
          v-bind="{ text: !isNewKecermatan }"
          :disabled="!isNewKecermatan"
          color="primary"
          class="no-uppercase"
          small
          depressed
        >
          <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
            New Kecermatan
          </p>
        </v-btn>
      </div>
      <div class="mr-6 align-self-end">
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
            <v-list-item @click="confirmBack" link>
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
const New_Kecermatan = () => import("./New_Kecermatan");

export default {
  components: {
    Kecerdasan,
    Kecermatan,
    Kepribadian,
    Kejiwaan,
    New_Kecermatan,
  },
  data() {
    return {
      isComponent: "",
      isType: this.$route.query?.type,
    };
  },
  mounted() {
    this.isComponent = this.isType || "Kecerdasan";
  },
  computed: {
    isKecerdasan() {
      return this.isComponent === "Kecerdasan";
    },
    isKepribadian() {
      return this.isComponent === "Kepribadian";
    },
    isKejiwaan() {
      return this.isComponent === "Kejiwaan";
    },
    isKecermatan() {
      return this.isComponent === "Kecermatan";
    },
    isNewKecermatan() {
      return this.isComponent === "New_Kecermatan";
    },
  },
  methods: {
    confirmBack() {
      this.$confirm({
        title: "Confirm",
        message: `Apakah anda yakin akan kembali ke halaman <b>HOME</b> ?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            this.$router.replace({ path: "/data-soal" });
          }
        },
      });
    },
  },
};
</script>
