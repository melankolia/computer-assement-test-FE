<template>
  <div class="d-flex flex-column">
    <transition name="slide-fade" mode="out-in">
      <keep-alive>
        <component
          @on-change="isComponent = $event"
          :is="isComponent"
          class="mt-6"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
const KejiwaanGroup = () => import("@/views/ManajemenSoal/Group/Kejiwaan");
const KejiwaanQuestion = () =>
  import("@/views/ManajemenSoal/Questions/Kejiwaan");

export default {
  components: {
    KejiwaanGroup,
    KejiwaanQuestion,
  },
  data() {
    return {
      id: this.$route.query?.kejiwaanSecureId,
      isComponent: "KejiwaanGroup",
    };
  },
  mounted() {
    this.id
      ? (this.isComponent = "KejiwaanQuestion")
      : (this.isComponent = "KejiwaanGroup");
  },
  watch: {
    $route: {
      handler(val) {
        if (val?.query?.kejiwaanSecureId) {
          this.isComponent = "KejiwaanQuestion";
        } else {
          this.isComponent = "KejiwaanGroup";
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
