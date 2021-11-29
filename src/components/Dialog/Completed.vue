<template>
  <v-dialog v-model="dialog" width="450" persistent>
    <div class="d-flex flex-column align-center white pa-12 rounded-lg">
      <p class="nilai-akhir-font mb-5">Nilai Akhir</p>
      <p class="nilai-subtitle-font">{{ title }}</p>
      <p class="nilai-number-font my-12">{{ totalAnswer || "0" }}</p>
      <slot name="description"></slot>
      <v-btn color="primary" class="no-uppercase" block @click="handleSelesai">
        Selesai
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog", "handleSelesai", "totalAnswer", "title"],
};
</script>

<style scoped>
.nilai-akhir-font {
  font-family: Inter !important;
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 32px;
  line-height: 120%;
  color: #814feb;
}

.nilai-subtitle-font {
  font-family: Inter !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;

  /* Primary/Black3 */

  color: #8e8e8e;
}

.nilai-number-font {
  font-family: Inter !important;
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 90px;
  line-height: 120%;
  /* identical to box height, or 144px */

  display: flex;
  align-items: center;

  /* Primary/Black1 */

  color: #141414;
}
</style>
