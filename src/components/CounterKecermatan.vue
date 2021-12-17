<template>
  <div
    class="d-flex flex-row quantity-count rounded align-center justify-center"
    style="width: 124px"
  >
    <v-icon small @click="handleClickMinus" color="black" class="ma-1">
      mdi-minus
    </v-icon>
    <v-text-field
      v-model="dataComputed"
      dense
      filled
      outlined
      hide-details
      single-line
      type="number"
    />
    <v-icon small @click="handleClickPlus" color="black" class="ma-1">
      mdi-plus
    </v-icon>
  </div>
</template>

<script>
export default {
  props: {
    data: { default: 1 },
    type: { default: "seconds" },
  },
  methods: {
    handleClickMinus() {
      let data = +this.data - 1;
      this.$emit("on-change", +data);
    },
    handleClickPlus() {
      let data = +this.data + 1;
      this.$emit("on-change", +data);
    },
  },
  computed: {
    dataComputed: {
      get() {
        return +this.data;
      },
      set(val) {
        this.$emit("on-change", +val);
      },
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
