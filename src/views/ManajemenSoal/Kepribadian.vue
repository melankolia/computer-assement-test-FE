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
const KepribadianGroup = () =>
  import("@/views/ManajemenSoal/Group/Kepribadian");
const KepribadianQuestion = () =>
  import("@/views/ManajemenSoal/Questions/Kepribadian");

export default {
  components: {
    KepribadianGroup,
    KepribadianQuestion,
  },
  data() {
    return {
      id: this.$route.query?.kepribadianSecureId,
      isComponent: "KepribadianGroup",
    };
  },
  mounted() {
    this.id
      ? (this.isComponent = "KepribadianQuestion")
      : (this.isComponent = "KepribadianGroup");
  },
  watch: {
    $route: {
      handler(val) {
        if (val?.query?.kepribadianSecureId) {
          this.isComponent = "KepribadianQuestion";
        } else {
          this.isComponent = "KepribadianGroup";
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
