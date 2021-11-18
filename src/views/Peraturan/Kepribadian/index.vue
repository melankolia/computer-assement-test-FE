<template>
  <div class="d-flex flex-column white rounded-lg">
    <div class="d-flex flex-row justify-space-between px-4 align-center">
      <v-btn-toggle
        v-model="isComponent"
        mandatory
        borderless
        color="deep-purple accent-3"
        tile
        background-color="white"
      >
        <v-btn class="no-uppercase" value="Soal">
          <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
            Peraturan Soal
          </p>
        </v-btn>
        <v-btn class="no-uppercase" value="Siswa">
          <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
            Peraturan Siswa
          </p>
        </v-btn>
      </v-btn-toggle>
      <v-btn
        @click="handleEdit"
        small
        class="no-uppercase mx-4"
        text
        color="primary"
        :disabled="modeEdit"
      >
        <v-icon small class="mr-2">mdi-square-edit-outline</v-icon>
        <p class="mb-0">Edit Peraturan</p>
      </v-btn>
    </div>
    <v-divider class="mb-10" />
    <transition name="slide-fade" mode="out-in">
      <keep-alive>
        <component
          :is="isComponent"
          :modeEdit="modeEdit"
          @on-change="modeEdit = $event"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
const Soal = () => import("@/views/Peraturan/Kecerdasan/Soal");
const Siswa = () => import("@/views/Peraturan/Kecerdasan/Siswa");

export default {
  components: {
    Soal,
    Siswa,
  },
  data() {
    return {
      isComponent: "Soal",
      modeEdit: false,
    };
  },
  methods: {
    handleEdit() {
      this.modeEdit = true;
    },
  },
};
</script>

<style scoped>
.v-btn::before {
  background-color: transparent !important;
}

.paragraph-font {
  font-family: Inter !important;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 160%;
}
</style>
