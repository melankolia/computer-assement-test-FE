<template>
  <div class="d-flex flex-column">
    <p class="text-h5 mb-3" style="font-family: Inter !important">
      Test Kejiwaan 1
    </p>
    <p class="text-caption label-caption mb-5">
      Tema Soal pada Kejiwaan 2 adalah Tentang Negara dan Ibu kota
    </p>
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
        <div class="d-flex flex-row align-center">
          <img class="mr-2" src="@/assets/icons/time.svg" />
          <p class="selection-item font-weight-medium ma-0">50 Menit</p>
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
    <template v-for="(e, i) in questions">
      <div
        v-if="!e.modeAdd"
        :key="`question-${i}`"
        class="d-flex flex-column white pa-12 mt-4 rounded-lg"
      >
        <div class="d-flex flex-row justify-end">
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
              <v-list-item @click="() => handleEdit(i)" link>
                <img class="mr-4" src="@/assets/icons/edit-outlined.svg" />
                <p class="selection-item ma-0">Edit Data</p>
              </v-list-item>
              <v-list-item @click="() => handleDelete(i)" link>
                <img class="mr-4" src="@/assets/icons/delete-outlined.svg" />
                <p class="selection-item ma-0">Hapus Data</p>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="px-12">
          <p class="font-question font-inter mb-8">
            {{ i + 1 }}. {{ e.question }}
          </p>
          <div
            v-for="(e2, i2) in e.answerList"
            :key="`answer-${i2}`"
            class="d-flex flex-row mx-5 justify-space-between my-2"
          >
            <p class="font-answer font-inter">
              {{ e2.symbol }}. {{ e2.answer }}
            </p>
            <p class="font-answer font-inter">{{ e2.value }} Poin</p>
          </div>
        </div>
      </div>
      <div
        v-else
        :key="`question-${i}`"
        class="d-flex flex-column white pa-12 mt-4 rounded-lg"
      >
        <div class="d-flex flex-column px-12">
          <div class="d-flex flex-column mb-4">
            <p class="font-question-add">Pertanyaan No. {{ i + 1 }}</p>
            <v-textarea
              v-model="e.question"
              hide-details
              filled
              outlined
              dense
              class="rounded"
            />
          </div>
          <div
            v-for="(payload, index) in e.answerList"
            :key="`answer-${index}`"
            class="d-flex flex-row ml-3 my-2 align-center"
          >
            <p class="font-answer-add mr-5 mb-0">{{ payload.symbol }}.</p>
            <v-text-field
              v-model="payload.value"
              hide-details
              filled
              outlined
              dense
              class="rounded mr-3"
              style="max-width: 50px"
            />
            <v-text-field
              v-model="payload.answer"
              hide-details
              filled
              outlined
              dense
              class="rounded"
            />
          </div>
          <div class="d-flex flex-row align-self-end mt-4">
            <v-btn
              color="primary"
              @click="() => handleCancel(i, 'edit')"
              class="no-uppercase depressed mr-6"
              outlined
            >
              Batal
            </v-btn>
            <v-btn
              :loading="loadingSubmit"
              color="primary"
              @click="() => handleSubmit(i, 'edit')"
              class="no-uppercase depressed"
            >
              Simpan
            </v-btn>
          </div>
        </div>
      </div>
    </template>
    <v-expand-transition>
      <div
        v-if="modeAdd"
        class="d-flex flex-column white pa-12 mt-4 rounded-lg"
      >
        <div class="d-flex flex-column px-12">
          <div class="d-flex flex-column mb-4">
            <p class="font-question-add">Pertanyaan No. {{ questionLength }}</p>
            <v-textarea
              v-model="item.question"
              hide-details
              filled
              outlined
              dense
              class="rounded"
            />
          </div>
          <div
            v-for="(payload, index) in item.answerList"
            :key="`answer-${index}`"
            class="d-flex flex-row ml-3 my-2 align-center"
          >
            <p class="font-answer-add mr-5 mb-0">{{ payload.symbol }}.</p>
            <v-text-field
              v-model="payload.value"
              hide-details
              filled
              outlined
              dense
              class="rounded mr-3"
              style="max-width: 50px"
            />
            <v-text-field
              v-model="payload.answer"
              hide-details
              filled
              outlined
              dense
              class="rounded"
            />
          </div>
          <div class="d-flex flex-row align-self-end mt-4">
            <v-btn
              color="primary"
              @click="handleCancel"
              class="no-uppercase depressed mr-6"
              outlined
            >
              Batal
            </v-btn>
            <v-btn
              :loading="loadingSubmit"
              color="primary"
              @click="handleSubmit"
              class="no-uppercase depressed"
            >
              Simpan
            </v-btn>
          </div>
        </div>
      </div>
    </v-expand-transition>
    <v-expand-transition>
      <v-btn
        v-if="!modeAdd"
        @click="modeAdd = true"
        color="primary"
        class="no-uppercase my-5"
        outlined
      >
        Tambahkan Soal
      </v-btn>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modeAdd: false,
      loadingSubmit: false,
      item: {
        secureId: "1234",
        question: null,
        modeAdd: false,
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
      questions: [
        {
          secureId: "123",
          question: "Siapakah presiden pertama Republik Indonesia?",
          modeAdd: false,
          answerList: [
            {
              symbol: "A",
              answer: "Soekarno",
              value: 100,
            },
            {
              symbol: "B",
              answer: "Soeharto",
              value: 0,
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
        secureId: "1234",
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
    handleCancel(i, type = "add") {
      if (type == "edit" && this.questions[i]?.secureId) {
        this.questions[i].modeAdd = false;
      } else {
        this.modeAdd = false;
        this.handleReset();
      }
    },
    handleSubmit(i, type = "submit") {
      if (type == "edit" && this.questions[i]?.secureId) {
        this.questions[i].modeAdd = false;
      } else {
        this.loadingSubmit = true;
        setTimeout(() => {
          this.loadingSubmit = false;
          this.questions.push(this.item);
          this.modeAdd = false;
          this.handleReset();
        }, 2000);
      }
    },
    handleEdit(i) {
      this.questions[i].modeAdd = true;
    },
    handleDelete(i) {
      this.questions.splice(i, 1);
    },
  },
  computed: {
    questionLength() {
      return this.questions.length + 1;
    },
    totalQuestion() {
      return this.questions.length;
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
</style>
