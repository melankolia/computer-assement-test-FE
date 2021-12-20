<template>
  <div class="px-6 py-12">
    <p class="text-h4 font-weight-bold mt-0 mb-9 font-inter">Daftar Soal</p>
    <v-row class="mb-12">
      <v-col cols="12" class="py-2">
        <v-btn-toggle
          v-model="questionType"
          mandatory
          borderless
          color="deep-purple accent-3"
          background-color="white"
        >
          <v-btn class="no-uppercase" small value="Kecerdasan">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kecerdasan
            </p>
          </v-btn>
          <v-btn class="no-uppercase" small value="Kepribadian">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kepribadian
            </p>
          </v-btn>
          <v-btn class="no-uppercase" small value="Kejiwaan">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kejiwaan
            </p>
          </v-btn>
          <v-btn class="no-uppercase" small value="Kecermatan">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kecermatan
            </p>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-expand-transition>
      <ContentNotFound
        :message="`${questionType} Question's Not Found`"
        :loading="loading"
        v-if="!isAvailable"
      >
        <template v-slot:action>
          <v-btn
            depressed
            @click="() => getList()"
            color="default"
            class="px-10"
          >
            <v-icon class="mr-1" small>mdi-reload</v-icon>
            Reload
          </v-btn>
        </template>
      </ContentNotFound>
      <div v-else class="d-flex flex-row flex-wrap">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="
            d-flex
            flex-column
            justify-space-between
            white
            px-10
            pb-10
            pt-12
            mr-9
            mb-9
            rounded-lg
            shadowing
          "
          style="width: 300px"
        >
          <div class="d-flex flex-column mb-12">
            <p class="header-3 mb-4">{{ item.title }}</p>
            <p class="text-subtitle-2 font-weight-light subtitlegraytext--text">
              {{ item.description || "-" }}
            </p>
          </div>
          <div class="d-flex flex-column mt-12">
            <div class="d-flex flex-row mr-6 mb-3">
              <img class="mr-2" src="@/assets/icons/sheet.svg" />
              <p class="selection-item font-weight-medium ma-0">
                {{ item.soal }} Soal
                <span v-if="questionType == 'Kepribadian'">
                  ({{ item.type }} Jawaban)
                </span>
              </p>
            </div>
            <div class="d-flex flex-row mr-6 mb-3">
              <img class="mr-2" src="@/assets/icons/time.svg" />
              <p class="selection-item font-weight-medium ma-0">
                <span v-if="questionType != 'Kecermatan'">
                  {{ item.time }} Menit
                </span>
                <span v-else>
                  {{ item.totalMinutes }} Menit {{ item.totalSeconds }} Detik
                  <br />
                  ({{ item.minutes }} Menit {{ item.seconds }} Detik/ Section)
                </span>
              </p>
            </div>
            <div
              v-if="questionType == 'Kecermatan'"
              class="d-flex flex-row mr-6 mb-3"
            >
              <img class="mr-2" src="@/assets/icons/three-line.svg" />
              <p class="selection-item font-weight-medium ma-0">
                {{ item.section }} Bagian
              </p>
            </div>
            <v-btn
              @click="() => handleMulai(item)"
              block
              color="primary"
              class="no-uppercase align-self-end mt-10"
            >
              Mulai
            </v-btn>
          </div>
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
import { RULES } from "@/router/name.types";
import SoalService from "@/services/resources/soal.service";
const ContentNotFound = () => import("@/components/Content/NotFound");

export default {
  components: {
    ContentNotFound,
  },
  data() {
    return {
      questionType: "Kecerdasan",
      loading: false,
      items: [],
    };
  },
  mounted() {
    this.getDetail(this.questionType);
  },
  watch: {
    questionType(val) {
      val && this.getDetail(val);
    },
  },
  computed: {
    isAvailable() {
      return this.items.length > 0;
    },
  },
  methods: {
    getDetail(type) {
      this.items = [];
      this.loading = true;
      SoalService.getAll({ type: type?.toLowerCase() })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            if (this.questionType == "Kecermatan") {
              result.map((e) => {
                let totalTime = e.time * e.section;
                e.totalMinutes = parseInt(totalTime / 60, 10);
                e.totalSeconds = parseInt(totalTime % 60, 10);
                e.minutes = parseInt(e.time / 60, 10);
                e.seconds = parseInt(e.time % 60, 10);
              });
            }
            this.items = [...result];
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || `Gagal memuat data ${this.questionType}`,
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: `Gagal memuat data ${this.questionType}`,
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
    handleMulai(item) {
      this.$router.replace({
        name: RULES,
        params: { secureId: item.secureId },
        query: { type: this.questionType },
      });
    },
  },
};
</script>

<style></style>
