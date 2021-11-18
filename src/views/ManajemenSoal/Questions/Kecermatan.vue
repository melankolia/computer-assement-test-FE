<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row align-center justify-space-between">
      <div class="d-flex flex-column">
        <p class="text-h5 mb-3" style="font-family: Inter !important">
          Test Kecermatan 1
        </p>
        <p class="text-caption label-caption mb-5">
          Tema Soal pada Kecermatan 2 adalah Tentang Negara dan Ibu kota
        </p>
      </div>
      <v-btn
        @click="handleAddSection"
        text
        class="no-uppercase"
        color="primary"
      >
        <v-icon small>mdi-plus</v-icon>
        <p class="mb-0">Tambah Section</p>
      </v-btn>
    </div>
    <div
      class="d-flex flex-row justify-space-between white py-2 px-9 rounded-lg"
    >
      <div class="d-flex flex-row align-center">
        <div class="d-flex flex-row align-center mr-6">
          <img class="mr-2" src="@/assets/icons/sheet.svg" />
          <p class="selection-item font-weight-medium ma-0">
            {{ totalQuestion }} Soal
          </p>
        </div>
        <div class="d-flex flex-row align-center mr-6">
          <img class="mr-2" src="@/assets/icons/time.svg" />
          <p class="selection-item font-weight-medium ma-0">50 Menit</p>
        </div>
        <div class="d-flex flex-row align-center">
          <img class="mr-2" src="@/assets/icons/three-line.svg" />
          <p class="selection-item font-weight-medium ma-0">
            {{ totalSection }} Section
          </p>
        </div>
      </div>
      <div class="d-flex flex-row align-center">
        <p class="label-style mb-0 mx-4">
          {{ !item.is_active ? "Tidak Aktif" : "Aktif" }}
        </p>
        <v-switch v-model="item.is_active" dense color="greentext" inset />
        <v-menu rounded left min-width="188px">
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              small
              depressed
              icon
              class="rounded-lg"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link>
              <img class="mr-4" src="@/assets/icons/delete-outlined.svg" />
              <p class="selection-item ma-0">Hapus Data</p>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <template v-for="(e, i) in sections">
      <div class="d-flex flex-row align-center" :key="`part-1-${i}`">
        <p class="section-font mb-0 mr-6">{{ e.title }}</p>
        <v-divider class="my-10" />
      </div>
      <div
        :key="`question-${i}`"
        class="d-flex flex-column white pt-12 rounded-lg"
      >
        <div class="d-flex flex-row justify-space-between px-12">
          <p v-if="!e.modeAdd" class="section-title-font mb-0">{{ e.title }}</p>
          <div v-else style="width: 344px">
            <v-text-field v-model="e.title" hide-details />
          </div>
          <div class="d-flex flex-row align-center">
            <div class="d-flex flex-row align-center mr-6">
              <img class="mr-2" src="@/assets/icons/sheet.svg" />
              <p class="selection-item font-weight-medium ma-0">5 Soal</p>
            </div>
            <div class="d-flex flex-row align-center mr-6">
              <img class="mr-2" src="@/assets/icons/time.svg" />
              <p class="selection-item font-weight-medium ma-0">50 Menit</p>
            </div>
          </div>
        </div>
        <v-divider class="mt-7 mb-6" />
        <div class="d-flex flex-column px-12 pb-12">
          <div class="d-flex flex-row justify-space-between mb-6">
            <p class="kolom-induk-font mb-0">Tabel Kolom Induk</p>
            <v-menu rounded left min-width="188px">
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  small
                  depressed
                  icon
                  class="rounded-lg"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="() => handleEditSection(i)" link>
                  <img class="mr-4" src="@/assets/icons/edit-outlined.svg" />
                  <p class="selection-item ma-0">Edit Data</p>
                </v-list-item>
                <v-list-item
                  @click="() => handleRemoveSection(i, 'remove')"
                  link
                >
                  <img class="mr-4" src="@/assets/icons/delete-outlined.svg" />
                  <p class="selection-item ma-0">Hapus Data</p>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="d-flex flex-column caption-label">
            <div class="d-flex flex-row justify-space-between">
              <div class="d-flex flex-column">
                <div class="d-flex flex-row align-center mb-3">
                  <p class="mb-0 pr-5">Baris 1</p>
                  <div
                    class="d-flex flex-row align-center"
                    style="max-width: 253px"
                  >
                    <v-text-field
                      v-for="(input, index) in e.firstRow"
                      :key="`first-row-${index}`"
                      v-model="sections[i].firstRow[index]"
                      hide-details
                      outlined
                      solo
                      dense
                      class="rounded mr-3"
                      :disabled="!e.modeAdd"
                    />
                  </div>
                </div>
                <div class="d-flex flex-row align-center">
                  <p class="mb-0 pr-5">Baris 2</p>
                  <div
                    class="d-flex flex-row align-center"
                    style="max-width: 253px"
                  >
                    <v-text-field
                      v-for="(input, index) in e.secondRow"
                      :key="`second-row-${index}`"
                      v-model="sections[i].secondRow[index]"
                      hide-details
                      outlined
                      solo
                      dense
                      class="rounded mr-3"
                      :disabled="!e.modeAdd"
                    />
                  </div>
                </div>
              </div>
              <div v-if="e.modeAdd" class="d-flex flex-row align-end">
                <v-btn
                  @click="() => handleRemoveSection(i)"
                  class="no-uppercase mr-7"
                  color="primary"
                  depressed
                  outlined
                >
                  Batal
                </v-btn>
                <v-btn
                  @click="() => handleSaveSection(i)"
                  class="no-uppercase"
                  color="primary"
                  depressed
                >
                  Simpan
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          d-flex
          flex-row
          white
          py-6
          px-12
          mt-5
          rounded-lg
          justify-space-between
        "
        v-for="(q, j) in e.question"
        :key="`part-2-${i}-${j}`"
      >
        <div class="d-flex flex-row">
          <div class="d-flex flex-row align-center px-6">
            <p class="pr-5 mb-3 align-self-end no-question">{{ j + 1 }}.</p>
            <div class="d-flex flex-column">
              <p class="caption-label mb-3">Soal</p>
              <div
                class="d-flex flex-row align-center"
                style="max-width: 203px"
              >
                <v-text-field
                  v-for="(textField, k) in q.title"
                  :key="`first-row-${k}`"
                  v-model="sections[i].question[j].title[k]"
                  hide-details
                  outlined
                  solo
                  dense
                  class="rounded mr-3"
                  :disabled="!q.modeAdd"
                />
              </div>
            </div>
          </div>
          <div class="d-flex flex-row align-center px-6">
            <div class="d-flex flex-column">
              <p class="caption-label mb-3">Jawaban (Poin)</p>
              <div
                class="d-flex flex-row align-center"
                style="max-width: 380px"
              >
                <template v-for="(textField, k) in q.answerList">
                  <p
                    class="pr-3 mb-3 align-self-end no-question"
                    :key="`symbol-${k}`"
                  >
                    {{ textField.symbol }}.
                  </p>
                  <v-text-field
                    :key="`value-${k}`"
                    v-model="textField.value"
                    hide-details
                    outlined
                    solo
                    dense
                    class="rounded mr-3"
                    :disabled="!q.modeAdd"
                  />
                </template>
              </div>
            </div>
          </div>
        </div>
        <div v-if="q.modeAdd" class="d-flex flex-row align-end">
          <v-btn
            @click="() => handleCancel(i, j)"
            class="no-uppercase mr-7"
            color="primary"
            depressed
            outlined
          >
            Batal
          </v-btn>
          <v-btn
            @click="() => handleSaveQuestion(i, j)"
            class="no-uppercase"
            color="primary"
            depressed
          >
            Simpan
          </v-btn>
        </div>
        <v-menu v-else rounded left min-width="188px">
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              small
              depressed
              icon
              class="rounded-lg"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="() => handleEdit(i, j)" link>
              <img class="mr-4" src="@/assets/icons/edit-outlined.svg" />
              <p class="selection-item ma-0">Edit Data</p>
            </v-list-item>
            <v-list-item @click="() => handleCancel(i, j, 'remove')" link>
              <img class="mr-4" src="@/assets/icons/delete-outlined.svg" />
              <p class="selection-item ma-0">Hapus Data</p>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-expand-transition :key="`part-3-${i}`">
        <v-btn
          v-if="!e.modeAdd"
          @click="() => handleAddSoal(i)"
          color="primary"
          class="no-uppercase my-5"
          outlined
        >
          Tambahkan Soal
        </v-btn>
      </v-expand-transition>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modeAdd: false,
      loadingSubmit: false,
      item: {
        question: null,
        is_active: false,
        answerList: [
          {
            symbol: "A",
            answer: null,
            value: 0,
          },
          {
            symbol: "B",
            answer: null,
            value: 0,
          },
        ],
      },
      sections: [
        {
          secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2d1",
          title: "Section 1",
          tableName: "Kolom Acuan Soal",
          firstRow: ["A", "B", "C", "D", "E"],
          secondRow: ["3", "6", "7", "9", "2"],
          modeAdd: false,
          question: [
            {
              secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff3c9",
              title: ["5", "9", "8", "5"],
              modeAdd: false,
              answerList: [
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e2",
                  symbol: "A",
                  value: 0,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e3",
                  symbol: "B",
                  value: 0,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e4",
                  symbol: "C",
                  value: 0,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e5",
                  symbol: "D",
                  value: 0,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e6",
                  symbol: "E",
                  value: 1,
                },
              ],
            },
            {
              secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff3d8",
              title: ["5", "9", "8", "4"],
              modeAdd: false,
              answerList: [
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e2",
                  symbol: "A",
                  value: 0,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e3",
                  symbol: "B",
                  value: 1,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e4",
                  symbol: "C",
                  value: 0,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e5",
                  symbol: "D",
                  value: 0,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e6",
                  symbol: "E",
                  value: 0,
                },
              ],
            },
          ],
        },
        {
          secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2d2",
          title: "Section 2",
          tableName: "Kolom Acuan Soal",
          firstRow: ["A", "B", "C", "D", "E"],
          secondRow: ["6", "6", "6", "6", "2"],
          modeAdd: false,
          question: [
            {
              secureId: "a9e9e79b-5d29-42fc-ae35-6139619eeff",
              title: ["6", "6", "6", "6"],
              modeAdd: false,
              answerList: [
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e2",
                  symbol: "A",
                  value: 0,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e3",
                  symbol: "B",
                  value: 1,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e4",
                  symbol: "C",
                  value: 0,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e5",
                  symbol: "D",
                  value: 0,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e6",
                  symbol: "E",
                  value: 0,
                },
              ],
            },
            {
              secureId: "a9e9e79b-5d29-42fc-ae35-6139619ccdd",
              title: ["7", "8", "9", "2"],
              modeAdd: false,
              answerList: [
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e2",
                  symbol: "A",
                  value: 0,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e3",
                  symbol: "B",
                  value: 1,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e4",
                  symbol: "C",
                  value: 0,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e5",
                  symbol: "D",
                  value: 0,
                },
                {
                  secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2e6",
                  symbol: "E",
                  value: 0,
                },
              ],
            },
            {
              secureId: "74b57af2-ab3b-4203-bdef-c3405cb15266",
              title: ["69", "1", "1", "3"],
              modeAdd: false,
              answerList: [
                {
                  secureId: "b7c66a7e-a43b-4ed4-8cce-9e6611239e6d",
                  symbol: "A",
                  value: 69,
                },
                {
                  secureId: "c45b07c1-d8ae-41d7-baa1-1c73fb4d5150",
                  symbol: "B",
                  value: 2,
                },
                {
                  secureId: "9b9fdb86-a94c-4f19-9cd9-30d92a193eba",
                  symbol: "C",
                  value: 2,
                },
                {
                  secureId: "27eb661f-6b7f-47d5-9d0c-57361e1c4ece",
                  symbol: "D",
                  value: 2,
                },
                {
                  secureId: "f18ae936-62c0-4c46-9e6a-0f18b8636493",
                  symbol: "E",
                  value: 9999,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleBack() {
      this.$router.replace({ query: null });
    },
    handleReset() {
      this.item = {
        question: null,
        is_active: false,
        answerList: [
          {
            symbol: "A",
            answer: null,
            value: 0,
          },
          {
            symbol: "B",
            answer: null,
            value: 0,
          },
        ],
      };
    },
    handleSaveQuestion(i, j) {
      this.sections[i].question[j].modeAdd = false;
    },
    handleSaveSection(i) {
      this.sections[i].modeAdd = false;
    },
    handleRemoveSection(i, type = "edit") {
      if (this.sections[i]?.secureId && type == "edit") {
        this.sections[i].modeAdd = false;
      } else {
        this.sections.splice(i, 1);
      }
    },
    handleEditSection(i) {
      this.sections[i].modeAdd = true;
    },
    handleSubmit() {
      this.loadingSubmit = true;
      setTimeout(() => {
        this.loadingSubmit = false;
        this.questions.push(this.item);
        this.modeAdd = false;
        this.handleReset();
      }, 2000);
    },
    handleAddSoal(i) {
      this.sections[i].question.push({
        title: [0, 0, 0, 0],
        modeAdd: true,
        answerList: [
          {
            symbol: this.sections[i].firstRow[0],
            value: 0,
          },
          {
            symbol: this.sections[i].firstRow[1],
            value: 0,
          },
          {
            symbol: this.sections[i].firstRow[2],
            value: 0,
          },
          {
            symbol: this.sections[i].firstRow[3],
            value: 0,
          },
          {
            symbol: this.sections[i].firstRow[4],
            value: 0,
          },
        ],
      });
    },
    handleEdit(i, j) {
      this.sections[i].question[j].modeAdd = true;
    },
    handleCancel(i, j, type = "edit") {
      if (this.sections[i].question[j]?.secureId && type == "edit") {
        this.sections[i].question[j].modeAdd = false;
      } else {
        this.sections[i].question.splice(j, 1);
      }
    },
    handleAddSection() {
      this.sections.push({
        title: null,
        tableName: "Kolom Acuan Soal",
        firstRow: ["A", "B", "C", "D", "E"],
        secondRow: [0, 0, 0, 0, 0],
        modeAdd: true,
        question: [],
      });
    },
  },
  computed: {
    sectionLength() {
      return this.sections.length + 1;
    },
    totalSection() {
      return this.sections.length;
    },
    totalQuestion() {
      return 50;
    },
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: transparent;
  background: #f8f6fb;
}

.label-style {
  font-family: Inter !important;
  color: #9b9b9b !important;
}
.label-caption {
  font-family: Inter !important;
  color: #808080 !important;
}

.font-question {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 150%;
}

.font-answer {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
}

.font-question-add {
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
}

.font-answer-add {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
}

.section-font {
  text-transform: uppercase;
  font-family: Inter !important;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #a8a4b1;
}

.section-title-font {
  font-family: Inter !important;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 120%;
}

.kolom-induk-font {
  font-family: Inter !important;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
}

.caption-label {
  font-family: Inter !important;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 160%;
  /* or 19px */

  letter-spacing: 0.01em;
}

.no-question {
  font-family: Inter !important;
  font-style: normal;
  font-size: 14px;
  line-height: 140%;
}
</style>
