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
      shadowing
    "
    style="width: 70%"
  >
    <ContentNotFound
      message="Kecermatan Rules Not Found"
      :loading="loading"
      v-if="!isAvailable"
    >
      <template v-slot:action>
        <v-btn
          depressed
          @click="() => getDetail()"
          color="default"
          class="px-10"
        >
          <v-icon class="mr-1" small>mdi-reload</v-icon>
          Reload
        </v-btn>
      </template>
    </ContentNotFound>
    <template v-else>
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
        <v-col cols="12" xs="12" sm="4">
          <v-btn
            @click="() => handleMulai()"
            :loading="loadingNext"
            color="red accent-3"
            class="no-uppercase white--text"
            block
            x-large
          >
            Mulai
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import { QUIZ } from "@/router/name.types";
import CoverService from "@/services/resources/cover.service";
import { mapActions } from "vuex";
const ContentNotFound = () => import("@/components/Content/NotFound");
const Cover = () => import("./Peraturan/Cover");
const Soal = () => import("./Peraturan/Soal");
const Siswa = () => import("./Peraturan/Siswa");

export default {
  components: {
    ContentNotFound,
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
        title: null,
        description: null,
        soal: null,
        time: null,
        section: null,
      },
      rules: {
        soal: null,

        siswa: null,
      },
      loading: false,
      loadingNext: false,
      loadingPrev: false,
    };
  },
  methods: {
    ...mapActions({
      getList: "kecermatan/getListKecermatanQuestion",
    }),
    getDetail() {
      this.loading = true;
      CoverService.findCover({
        secureId: this.id,
        type: "kecermatan",
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.item = { ...result.group };
            this.rules = { ...result.rules };
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal memuat data Kecermatan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal memuat data Kecermatan",
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
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
      this.loadingNext = true;
      this.getList({
        secureId: this.id,
      })
        .then(() => {
          this.$router.replace({
            name: QUIZ.KECERMATAN,
            params: { secureId: this.id },
          });
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal memuat Soal Kecermatan",
            color: "error",
          });
        })
        .finally(() => (this.loadingNext = false));
    },
  },
  mounted() {
    this.getDetail();
  },
  computed: {
    isLast() {
      return this.types[this.index] == "Siswa";
    },
    isAvailable() {
      return this.item?.secureId;
    },
  },
};
</script>

<style></style>
