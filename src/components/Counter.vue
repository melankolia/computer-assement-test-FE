<template>
  <div
    class="d-flex flex-row quantity-count rounded align-center justify-center"
    style="width: 124px"
  >
    <v-icon small @click="counter--" color="black" class="ma-1">
      mdi-minus
    </v-icon>
    <v-text-field
      v-model="counter"
      dense
      filled
      outlined
      hide-details
      single-line
      type="number"
    />
    <v-icon small @click="counter++" color="black" class="ma-1">
      mdi-plus
    </v-icon>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },
  watch: {
    counter(val) {
      this.$emit("on-change", val);
    },
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: transparent;
  background: #f8f6fb;
}
</style>
