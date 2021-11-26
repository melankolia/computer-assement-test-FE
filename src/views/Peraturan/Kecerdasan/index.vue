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
          @on-submit="() => handleSubmit()"
          @on-cancel="() => handleCancel()"
          :items="items"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
const items = {
  kecerdasanVO: {
    siswa: {
      secureId: null,
      description: null,
    },
    soal: {
      secureId: null,
      description: null,
    },
  },
};
const Soal = () => import("@/views/Peraturan/Kecerdasan/Soal");
const Siswa = () => import("@/views/Peraturan/Kecerdasan/Siswa");

export default {
  props: {
    items: {
      type: Object,
      required: true,
      default: () => items,
    },
  },
  components: {
    Soal,
    Siswa,
  },
  data() {
    return {
      isComponent: "Soal",
      modeEdit: false,
      editedPeraturan: items.kecerdasanVO,
    };
  },
  methods: {
    handleEdit() {
      this.editedPeraturan = this.$_.cloneDeep(this.items.kecerdasanVO);
      this.modeEdit = true;
    },
    handleSubmit() {
      this.$emit("reload");
      this.modeEdit = false;
    },
    handleCancel() {
      this.items.kecerdasanVO = {
        ...this.editedPeraturan,
      };
      this.editedPeraturan = { ...items.kecerdasanVO };
      this.modeEdit = false;
    },
  },
  watch: {
    isComponent() {
      if (this.modeEdit) {
        this.items.kecerdasanVO = {
          ...this.editedPeraturan,
        };
      }
      this.modeEdit = false;
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
