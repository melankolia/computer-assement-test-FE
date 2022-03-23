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
const NewKecermatanGroup = () =>
  import("@/views/ManajemenSoal/Group/NewKecermatan");
const NewKecermatanQuestion = () =>
  import("@/views/ManajemenSoal/Questions/NewKecermatan");

export default {
  props: {
    query: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  components: {
    NewKecermatanGroup,
    NewKecermatanQuestion,
  },
  data() {
    return {
      id: this.$route.query?.newKecermatanSecureId,
      kecermatanSecureId: "",
      isComponent: "NewKecermatanGroup",
    };
  },
  mounted() {
    this.id
      ? (this.isComponent = "NewKecermatanQuestion")
      : (this.isComponent = "NewKecermatanGroup");
  },
  watch: {
    query: {
      handler(val) {
        this.newKecermatanSecureId = val?.newKecermatanSecureId || "";
      },
    },
    $route: {
      handler(val) {
        if (val?.query?.newKecermatanSecureId) {
          this.isComponent = "NewKecermatanQuestion";
        } else {
          this.isComponent = "NewKecermatanGroup";
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
