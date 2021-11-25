<template>
  <div class="d-flex flex-column">
    <transition name="slide-fade" mode="out-in">
      <keep-alive>
        <component
          @on-change="isComponent = $event"
          :is="isComponent"
          :kecerdasanSecureId="kecerdasanSecureId"
          class="mt-6"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
const KecerdasanGroup = () => import("@/views/ManajemenSoal/Group/Kecerdasan");
const KecerdasanQuestion = () =>
  import("@/views/ManajemenSoal/Questions/Kecerdasan");

export default {
  props: {
    query: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  components: {
    KecerdasanGroup,
    KecerdasanQuestion,
  },
  data() {
    return {
      id: this.$route.query?.kecerdasanSecureId,
      kecerdasanSecureId: "",
      isComponent: "KecerdasanGroup",
    };
  },
  mounted() {
    this.id
      ? (this.isComponent = "KecerdasanQuestion")
      : (this.isComponent = "KecerdasanGroup");
  },
  watch: {
    query: {
      handler(val) {
        this.kecerdasanSecureId = val?.kecerdasanSecureId || "";
      },
    },
    $route: {
      handler(val) {
        if (val?.query?.kecerdasanSecureId) {
          this.isComponent = "KecerdasanQuestion";
        } else {
          this.isComponent = "KecerdasanGroup";
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
