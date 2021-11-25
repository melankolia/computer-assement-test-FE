<template>
  <div
    class="
      d-flex
      flex-column
      justify-center
      my-12
      mx-12
      pt-12
      pb-10
      px-12
      white
    "
    style="width: 70%"
  >
    <p class="header-3 mb-8 text-center">{{ item.title }}</p>
    <transition name="slide-fade" mode="out-in">
      <component :item="item" :rules="rules" :is="types[index]" />
    </transition>
    <div
      v-if="!isLast"
      class="d-flex flex-row justify-space-between align-center pt-12 mt-12"
    >
      <v-btn
        :loading="loadingPrev"
        @click="handleBack"
        color="primary"
        class="no-uppercase"
        text
      >
        Kembali
      </v-btn>
      <v-btn
        :loading="loadingNext"
        @click="handleNext"
        color="primary"
        class="no-uppercase"
        outlined
      >
        Lanjut
      </v-btn>
    </div>
    <v-row v-else align="center" justify="center" class="mt-12">
      <v-col cols="12" xs="12" sm="3">
        <v-btn
          @click="() => handleMulai()"
          color="primary"
          class="no-uppercase"
          block
        >
          Mulai
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { QUIZ } from "@/router/name.types";
const Cover = () => import("./Peraturan/Cover");
const Soal = () => import("./Peraturan/Soal");
const Siswa = () => import("./Peraturan/Siswa");

export default {
  components: {
    Cover,
    Soal,
    Siswa,
  },
  data() {
    return {
      id: this.$route.params?.secureId,
      index: 0,
      types: ["Cover", "Soal", "Siswa"],
      item: {
        title: "Test Kejiwaan",
        desc: `ulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
                cillum dolor. Voluptate exercitation incididunt aliquip deserunt
                reprehenderit elit laborum. Nulla Lorem mollit cupidatat irure.
                Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation
                incididunt aliquip deserunt reprehenderit elit laborum.`,
        soal: 50,
        time: 50,
      },
      rules: {
        soal: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.`,

        siswa: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.`,
      },
      loading: false,
      loadingNext: false,
      loadingPrev: false,
    };
  },
  methods: {
    handleBack() {
      if (this.index != 0) {
        this.loadingPrev = true;
        setTimeout(() => {
          this.index--;
          this.loadingPrev = false;
        }, 2000);
      } else this.$router.replace({ path: "/data-soal" });
    },
    handleNext() {
      if (this.index == this.types.length - 1) return;
      else {
        this.loadingNext = true;
        setTimeout(() => {
          this.index++;
          this.loadingNext = false;
        }, 2000);
      }
    },
    handleMulai() {
      this.$router.push({
        name: QUIZ.KEJIWAAN,
        params: { secureId: this.id },
      });
    },
  },
  computed: {
    isLast() {
      return this.types[this.index] == "Siswa";
    },
  },
};
</script>

<style></style>
