<template>
  <p class="px-12 peraturan-title">
    Peraturan Siswa
    <br />
    <br />
    <span
      class="text-subtitle-2 font-weight-light subtitlegraytext--text"
      v-html="rules.siswa"
    >
    </span>
  </p>
</template>

<script>
export default {
  props: {
    rules: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.peraturan-title {
  font-family: Inter !important;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
}
</style>
