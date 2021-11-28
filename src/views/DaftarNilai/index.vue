<template>
  <div class="px-6 py-12 mt-6">
    <p class="text-h4 font-weight-bold mt-0 mb-9 font-inter">Daftar Nilai</p>
    <v-row class="mb-4">
      <v-col cols="12" xs="12" sm="6" class="py-2">
        <v-btn-toggle
          v-model="questionType"
          mandatory
          borderless
          color="deep-purple accent-3"
          background-color="white"
        >
          <v-btn class="no-uppercase" small value="kecerdasan">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kecerdasan
            </p>
          </v-btn>
          <v-btn class="no-uppercase" small value="kepribadian">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kepribadian
            </p>
          </v-btn>
          <v-btn class="no-uppercase" small value="kejiwaan">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kejiwaan
            </p>
          </v-btn>
          <v-btn class="no-uppercase" small value="kecermatan">
            <p class="ma-0 mx-4 text-subtitle-2 font-weight-regular font-inter">
              Kecermatan
            </p>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" sm="7" class="py-2">
        <v-data-table
          :headers="isKecermatan ? kecermatanHeaders : headers"
          :items="items"
          hide-default-footer
          item-key="nama"
          style="border-spacing: 10px !important"
        >
          <template #item.paket_soal="{ item }">
            <p class="ma-0 paket-soal-font">
              {{ item.paket_soal | firstCapital }}
            </p>
          </template>
          <template #item.nilai="{ item }">
            <span>{{ item.nilai || "-" }}</span>
          </template>
          <template #item.createdDate="{ item }">
            <span>{{ item.createdDate | date }}</span>
          </template>
          <template #item.section="{ item }">
            <tr v-for="(e, i) in item.section" :key="`section-${i}`">
              <td
                :class="{
                  'pt-4': i == 0 % 2,
                  'pb-4': i == item.section.length - 1,
                }"
              >
                {{ e.title | firstCapital }}
              </td>
            </tr>
          </template>
          <template #item.benar="{ item }">
            <tr v-for="(e, i) in item.section" :key="`section-${i}`">
              <td
                :class="{
                  'pt-4': i == 0 % 2,
                  'pb-4': i == item.section.length - 1,
                }"
              >
                {{ e.benar }}
              </td>
            </tr>
          </template>
          <template #item.salah="{ item }">
            <tr v-for="(e, i) in item.section" :key="`section-${i}`">
              <td
                :class="{
                  'pt-4': i == 0 % 2,
                  'pb-4': i == item.section.length - 1,
                }"
              >
                {{ e.salah }}
              </td>
            </tr>
          </template>
          <template #item.total="{ item }">
            <tr v-for="(e, i) in item.section" :key="`section-${i}`">
              <td
                :class="{
                  'pt-4': i == 0 % 2,
                  'pb-4': i == item.section.length - 1,
                }"
              >
                {{ e.benar * 10 }}
              </td>
            </tr>
          </template>
          <template #item.grandTotal="{ item }">
            <p class="mb-0 grand-total-font">
              {{ item.grandTotal }}
            </p>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SoalService from "@/services/resources/soal.service";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false,
      questionType: "kecerdasan",
      headers: [
        {
          text: "Paket Soal",
          value: "paket_soal",
          sortable: false,
          width: "33%",
        },
        {
          text: "Nilai",
          value: "nilai",
          sortable: false,
          width: "33%",
        },
        {
          text: "Waktu",
          value: "createdDate",
          sortable: false,
          width: "33%",
        },
      ],
      kecermatanHeaders: [
        {
          text: "Paket Soal",
          value: "paket_soal",
          sortable: false,
        },
        {
          text: "Section",
          value: "section",
          sortable: false,
        },
        {
          text: "Benar",
          value: "benar",
          sortable: false,
        },
        {
          text: "Salah",
          value: "salah",
          sortable: false,
        },
        {
          text: "Total",
          value: "total",
          sortable: false,
        },
        {
          text: "Grand Total",
          value: "grandTotal",
          sortable: false,
        },
      ],
      items: [],
    };
  },
  methods: {
    getList(type) {
      this.loading = true;
      SoalService.getListNilai({
        secureId: this.getProfile.secureId,
        type,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.items = [...result];
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Gagal memuat data nilai",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal memuat data nilai",
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
    getListKecermatan() {
      this.loading = true;
      SoalService.getListNilaiKecermatan({
        secureId: this.getProfile.secureId,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.items = [...result];
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Gagal memuat data nilai",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal memuat data nilai",
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.getList(this.questionType);
  },
  computed: {
    ...mapGetters(["getProfile"]),
    isKecermatan() {
      return this.questionType == "kecermatan";
    },
  },
  watch: {
    questionType(val) {
      if (val != "kecermatan") this.getList(val);
      else this.getListKecermatan();
    },
  },
};
</script>

<style scoped>
.paket-soal-font {
  font-family: Inter !important;
  font-style: normal;
  font-weight: bold !important;
  font-size: 16px;
  line-height: 150%;
}

.grand-total-font {
  font-family: Inter !important;
  font-style: normal;
  font-weight: 500 !important;
  font-size: 28px;
  line-height: 120%;
}
</style>
