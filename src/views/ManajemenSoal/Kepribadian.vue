<template>
  <div class="d-flex flex-column">
    <transition name="slide-fade" mode="out-in">
      <keep-alive>
        <component
          @on-change="isComponent = $event"
          :is="isComponent"
          :kepribadianSecureId="kepribadianSecureId"
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
  props: {
    query: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  components: {
    KepribadianGroup,
    KepribadianQuestion,
  },
  data() {
    return {
      id: this.$route.query?.kepribadianSecureId,
      kepribadianSecureId: "",
      isComponent: "KepribadianGroup",
    };
  },
  mounted() {
    this.id
      ? (this.isComponent = "KepribadianQuestion")
      : (this.isComponent = "KepribadianGroup");
  },
  watch: {
    query: {
      handler(val) {
        this.kepribadianSecureId = val?.kepribadianSecureId || "";
      },
    },
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
