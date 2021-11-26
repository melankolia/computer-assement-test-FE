<template>
  <div class="d-flex flex-column">
    <transition name="slide-fade" mode="out-in">
      <keep-alive>
        <component
          @on-change="isComponent = $event"
          :is="isComponent"
          :kecermatanSecureId="kecermatanSecureId"
          class="mt-6"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
const KecermatanGroup = () => import("@/views/ManajemenSoal/Group/Kecermatan");
const KecermatanQuestion = () =>
  import("@/views/ManajemenSoal/Questions/Kecermatan");

export default {
  props: {
    query: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  components: {
    KecermatanGroup,
    KecermatanQuestion,
  },
  data() {
    return {
      id: this.$route.query?.kecermatanSecureId,
      kecermatanSecureId: "",
      isComponent: "KecermatanGroup",
    };
  },
  mounted() {
    this.id
      ? (this.isComponent = "KecermatanQuestion")
      : (this.isComponent = "KecermatanGroup");
  },
  watch: {
    query: {
      handler(val) {
        this.kecermatanSecureId = val?.kecermatanSecureId || "";
      },
    },
    $route: {
      handler(val) {
        if (val?.query?.kecermatanSecureId) {
          this.isComponent = "KecermatanQuestion";
        } else {
          this.isComponent = "KecermatanGroup";
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
