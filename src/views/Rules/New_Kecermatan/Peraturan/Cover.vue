<template>
  <div class="ma-0">
    <p
      class="
        text-subtitle-2 text-center
        font-weight-light
        subtitlegraytext--text
        mb-12
        pb-2
      "
    >
      {{ item.description }}
    </p>
    <div class="d-flex flex-row justify-center mb-12 pb-12">
      <div class="d-flex flex-row align-center mr-6">
        <img class="mr-2" src="@/assets/icons/sheet.svg" />
        <p class="selection-item font-weight-medium ma-0">
          {{ item.total_soal }} Soal
        </p>
      </div>
      <div class="d-flex flex-row align-center mr-6">
        <img class="mr-2" src="@/assets/icons/time.svg" />
        <p class="selection-item font-weight-medium ma-0">
          {{ item.minutes }} Menit {{ item.seconds }} Detik
        </p>
      </div>
      <div class="d-flex flex-row align-center mr-6">
        <v-icon class="mr-1">mdi-timelapse</v-icon>
        <p class="selection-item font-weight-medium ma-0">
          {{ item.time_interval }} Interval
        </p>
      </div>
      <div class="d-flex flex-row align-center mr-6">
        <img class="mr-2" src="@/assets/icons/three-line.svg" />
        <p class="selection-item font-weight-medium ma-0">
          {{ item.total_section }} Section
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
