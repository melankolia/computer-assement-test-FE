<template>
  <div class="px-6 py-12 mt-6">
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
                  {{ item.time }} Menit ({{ item.time }} Menit / Section)
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
    questionTypes(val) {
      if (val == "Kecermatan") {
        this.items = [
          {
            secureId: "0e3c9ebf-ccb1-4272-93fe-f06671cd48c8",
            title: "Kecermatan Baru",
            description: "Ini adalah contoh description",
            time: 23,
            is_active: 0,
            soal: 50,
            section: 4,
          },
          {
            secureId: "65e39eef-29b3-4d41-9ce1-9ccdb40fbcff",
            title: "Kecermatan Baru",
            description: "Ini adalah contoh description",
            time: 23,
            is_active: 0,
            soal: 50,
            section: 4,
          },
        ];
      } else if (val == "Kepribadian") {
        this.items = [
          {
            secureId: "28ecd257-8acd-475f-b3df-98c699af46ff",
            title: "Kepribadian 1",
            description: "Ini adalah contoh description",
            time: 50,
            is_active: 0,
            soal: 50,
            type: "4",
          },
          {
            secureId: "c7dc938d-8606-43a5-9421-8f01fd2335aa",
            title: "Kepribadian Terakhir",
            description: "Ini adalah contoh description",
            time: 50,
            is_active: 1,
            soal: 50,
            type: "4",
          },
        ];
      } else if (val == "Kejiwaan") {
        this.items = [
          {
            secureId: "9c49b888-cabe-4867-8c29-b61ff89b370e",
            title: "Kejiwaan Terakhir",
            description: "Ini adalah contoh description",
            time: 50,
            is_active: 0,
            soal: 50,
          },
        ];
      } else if (val == "Kecerdasan") {
        this.items = [
          {
            secureId: "50d7e340-e15c-4ad9-9e6e-a138e5cb76a3",
            title: "Kecerdasan 1",
            description: "Ini adalah contoh description",
            time: 12,
            is_active: 0,
            soal: 50,
          },
          {
            secureId: "2b54af84-6894-4d62-af1d-04c815667e40",
            title: "Kecerdasan 2",
            description: "Ini adalah contoh description",
            time: 23,
            is_active: 0,
            soal: 50,
          },
          {
            secureId: "62d6c4b9-1adb-44a5-8f8e-420062e6f9f9",
            title: "Kecerdasan 1",
            description: "Ini adalah contoh description",
            time: 23,
            is_active: 0,
            soal: 50,
          },
          {
            secureId: "a4e4a4d1-cc87-475b-a347-e8c835ab27a7",
            title: "Kecerdasan 70",
            description: "Ini adalah contoh description Testing",
            time: 23,
            is_active: 0,
            soal: 50,
          },
          {
            secureId: "6216ace2-b9a2-4929-ba89-3850ffe40689",
            title: "Kecerdasan Baru Edit",
            description: "Ini adalah contoh description",
            time: 23,
            is_active: 0,
            soal: 50,
          },
        ];
      }
    },
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
