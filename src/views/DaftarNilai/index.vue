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
    <v-row>
      <v-col cols="12" xs="12" sm="7" class="py-2">
        <v-data-table
          :headers="isKecermatan ? kecermatanHeaders : headers"
          :items="items"
          hide-default-footer
          item-key="nama"
          style="border-spacing: 10px !important"
        >
          <template #item.title="{ item }">
            <p class="ma-0 paket-soal-font">
              {{ item.title }}
            </p>
          </template>
          <template #item.section="{ item }">
            <tr v-for="(e, i) in item.section" :key="`section-${i}`">
              <td
                :class="{
                  'pt-4': i == 0 % 2,
                  'pb-4': i == item.section.length - 1,
                }"
              >
                {{ e.title }}
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
                {{ e.total }}
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
export default {
  data() {
    return {
      questionType: "Kecerdasan",
      headers: [
        {
          text: "Paket Soal",
          value: "title",
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
          value: "date",
          sortable: false,
          width: "33%",
        },
      ],
      kecermatanHeaders: [
        {
          text: "Paket Soal",
          value: "title",
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
  computed: {
    isKecermatan() {
      return this.questionType == "Kecermatan";
    },
  },
  watch: {
    questionType(val) {
      if (val == "Kecerdasan") {
        this.items = [
          {
            title: "Tes Kecerdasan",
            nilai: "80",
            date: "19/08/2021   8.42 AM",
          },
          {
            title: "Tes Kecerdasan",
            nilai: "20",
            date: "19/08/2021   8.42 AM",
          },
          {
            title: "Tes Kecerdasan",
            nilai: "80",
            date: "19/08/2021   8.42 AM",
          },
          {
            title: "Tes Kecerdasan",
            nilai: "80",
            date: "19/08/2021   8.42 AM",
          },
        ];
      } else if (val == "Kepribadian") {
        this.items = [
          {
            title: "Tes Kepribadian",
            nilai: "80",
            date: "19/08/2021   8.42 AM",
          },
          {
            title: "Tes Kepribadian",
            nilai: "20",
            date: "19/08/2021   8.42 AM",
          },
          {
            title: "Tes Kepribadian",
            nilai: "80",
            date: "19/08/2021   8.42 AM",
          },
          {
            title: "Tes Kepribadian",
            nilai: "80",
            date: "19/08/2021   8.42 AM",
          },
        ];
      } else if (val == "Kejiwaan") {
        this.items = [
          {
            title: "Tes Kejiwaan",
            nilai: "80",
            date: "19/08/2021   8.42 AM",
          },
          {
            title: "Tes Kejiwaan",
            nilai: "20",
            date: "19/08/2021   8.42 AM",
          },
          {
            title: "Tes Kejiwaan",
            nilai: "80",
            date: "19/08/2021   8.42 AM",
          },
          {
            title: "Tes Kejiwaan",
            nilai: "80",
            date: "19/08/2021   8.42 AM",
          },
        ];
      } else if (val == "Kecermatan") {
        this.items = [
          {
            title: "Tes Kecermatan",
            grandTotal: 10,
            nilai: "80",
            section: [
              {
                title: "Section 1",
                benar: 8,
                salah: 2,
                total: 80,
              },
              {
                title: "Section 2",
                benar: 8,
                salah: 2,
                total: 80,
              },
              {
                title: "Section 3",
                benar: 8,
                salah: 2,
                total: 80,
              },
            ],
            date: "19/08/2021   8.42 AM",
          },
          {
            title: "Tes Kecermatan",
            grandTotal: 10,
            nilai: "20",
            section: [
              {
                title: "Section 1",
                benar: 8,
                salah: 2,
                total: 80,
              },
              {
                title: "Section 2",
                benar: 8,
                salah: 2,
                total: 80,
              },
              {
                title: "Section 3",
                benar: 8,
                salah: 2,
                total: 80,
              },
            ],
            date: "19/08/2021   8.42 AM",
          },
          {
            title: "Tes Kecermatan",
            grandTotal: 10,
            nilai: "80",
            section: [
              {
                title: "Section 1",
                benar: 8,
                salah: 2,
                total: 80,
              },
              {
                title: "Section 2",
                benar: 8,
                salah: 2,
                total: 80,
              },
              {
                title: "Section 3",
                benar: 8,
                salah: 2,
                total: 80,
              },
            ],
            date: "19/08/2021   8.42 AM",
          },
          {
            title: "Tes Kecermatan",
            grandTotal: 10,
            nilai: "80",
            section: [
              {
                title: "Section 1",
                benar: 8,
                salah: 2,
                total: 80,
              },
              {
                title: "Section 2",
                benar: 8,
                salah: 2,
                total: 80,
              },
              {
                title: "Section 3",
                benar: 8,
                salah: 2,
                total: 80,
              },
            ],
            date: "19/08/2021   8.42 AM",
          },
        ];
      }
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
