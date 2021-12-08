<template>
  <transition name="slide-fade" mode="out-in">
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      small
      color="primary"
      @click="toTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      fab: false,
      checkPoint: 0,
    };
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      if (this.checkPoint < top && top > 40) {
        this.fab = true;
      } else {
        this.fab = false;
      }
      this.checkPoint = top;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    handleScroll() {
      this.scrolled = window.scrollY;
    },
  },
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.5, 1, 1, 0.8);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(7px);
  opacity: 0;
}
.v-btn--absolute.v-btn--bottom,
.v-btn--fixed.v-btn--bottom {
  bottom: 64px;
}
.v-btn--fab.v-btn--fixed,
.v-btn--fab.v-btn--absolute {
  z-index: 10;
}
</style>
