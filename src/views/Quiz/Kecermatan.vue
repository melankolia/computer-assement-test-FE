<template>
  <div class="d-flex flex-column" style="background: #f8f6fb; height: 100%">
    <div
      class="
        d-flex
        flex-row
        white
        justify-space-between
        align-center
        py-5
        px-10
      "
      :class="{ 'height-is-completed': isCompleted }"
    >
      <!-- Answering Mode -->
      <template v-if="!isCompleted">
        <div class="d-flex flex-column">
          <p class="ma-0 timer-date-subtitle-font">{{ nowDate || "-" }}</p>
          <p class="ma-0 timer-date-font">{{ nowHourComputed || "-" }}</p>
        </div>
        <div class="d-flex flex-row align-center">
          <img width="20" height="22" src="@/assets/icons/time.svg" />
          <p class="timer-font mb-0 mx-2">{{ minutes }}:{{ seconds }}</p>
        </div>
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
              <p class="selection-item ma-0">Keluar</p>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </div>
    <v-expand-transition>
      <div
        v-if="!isCompleted"
        class="d-flex flex-row justify-space-between"
        style="max-height: 700px"
      >
        <!-- Answering Mode -->
        <div
          class="d-flex flex-column ma-10 pb-12"
          style="width: 71%; overflow: scroll"
        >
          <div
            class="
              d-flex
              flex-column
              align-center
              justify-center
              mx-0
              mt-0
              white
              rounded-lg
            "
          >
            <p class="header-3 my-6 text-center">Tes Kecermatan</p>
          </div>
          <template>
            <div class="d-flex flex-row align-center justify-center mb-5 mt-12">
              <v-divider />
              <p class="section-font mx-4 mb-0">
                {{ sections[sectionIndex].title }}
              </p>
              <v-divider />
            </div>
            <div
              class="
                d-flex
                flex-column
                justify-center
                white
                rounded-lg
                black-border
              "
            >
              <div
                class="
                  d-flex
                  flex-column
                  align-center
                  white
                  pt-5
                  pb-10
                  rounded-lg
                "
              >
                <p class="tabel-kolom-font">
                  {{ sections[sectionIndex].tableName }}
                </p>
                <table>
                  <tr>
                    <td
                      v-for="(firstRow, iFirstRow) in sections[sectionIndex]
                        .firstRow"
                      class="px-4 py-2"
                      :key="`first-row-${iFirstRow}`"
                    >
                      {{ firstRow }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      v-for="(secondRow, iSecondRow) in sections[sectionIndex]
                        .secondRow"
                      class="px-4 py-2"
                      :key="`second-row-${iSecondRow}`"
                    >
                      {{ secondRow }}
                    </td>
                  </tr>
                </table>
              </div>
              <v-divider />
              <v-row
                v-for="(q, qIndex) in sections[sectionIndex].question"
                :key="`qIndex-${qIndex}`"
                no-gutters
                align="center"
                justify="center"
              >
                <v-col cols="6" sm="6" class="px-12 py-2">
                  <div class="d-flex flex-column align-end">
                    <p v-if="qIndex == 0" class="mb-4 kecermatan-section-font">
                      Soal
                    </p>
                    <div class="d-flex flex-row align-end">
                      <p class="kecermatan-section-font mr-4">
                        {{ qIndex + 1 }}.
                      </p>
                      <table>
                        <tr>
                          <td
                            v-for="(qTitle, qTitleIndex) in q.title"
                            :key="`title-${qTitleIndex}`"
                            class="px-5 py-3"
                          >
                            {{ qTitle }}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </v-col>
                <v-divider vertical />
                <v-col cols="6" sm="6" class="px-12">
                  <div class="d-flex flex-column align-start py-2">
                    <p
                      v-if="qIndex == 0"
                      class="mb-4 kecermatan-section-font mt-n2"
                    >
                      Jawaban
                    </p>
                    <div class="d-flex flex-row align-end ml-n4">
                      <v-btn-toggle v-model="q.answer" tile group>
                        <div
                          v-for="(answer, aIndex) in q.answerList"
                          :key="`answer-${aIndex}`"
                          class="d-flex flex-row align-center ml-4"
                          style="height: 40px; width: 40px"
                        >
                          <v-btn
                            depressed
                            :value="answer"
                            :class="{
                              active: q.answer.secureId == answer.secureId,
                              'active-font':
                                q.answer.secureId == answer.secureId,
                            }"
                            >{{ answer.symbol }}</v-btn
                          >
                        </div>
                      </v-btn-toggle>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
            <v-btn
              @click="handleSubmit"
              v-if="isLast"
              class="mt-8 no-uppercase"
              color="primary"
              depressed
              block
            >
              Submit
            </v-btn>
          </template>
        </div>
        <div
          class="d-flex flex-column white my-10 mr-10 rounded-lg"
          style="width: 29%"
        >
          <p class="ma-0 daftar-soal-font mt-6 mb-8">Daftar Soal</p>
          <div
            v-for="(e, iSections) in sections"
            class="d-flex flex-column"
            :key="`sections-${iSections}`"
          >
            <p class="ma-0 kecermatan-font mx-11 px-2 mb-2">{{ e.title }}</p>
            <div class="d-flex flex-row flex-wrap mx-11">
              <div
                @click="() => handlePick(iSections)"
                v-for="(e2, i2) in e.question"
                class="
                  number-answer
                  rounded
                  d-flex
                  flex-column
                  align-center
                  justify-center
                  mx-2
                  mb-3
                "
                :class="{
                  'number-answer-not-answered-yet':
                    sections[iSections].question[i2].answer.secureId == null,
                  'number-answer-active':
                    sections[iSections].question[i2].answer.secureId != null &&
                    iSections == sectionIndex,
                }"
                :key="`question-kecermatan-${i2}`"
              >
                <p
                  class="mb-0 number-font"
                  :class="{
                    'number-font-not-answered-yet':
                      sections[iSections].question[i2].answer.secureId == null,
                    'number-font-active':
                      sections[iSections].question[i2].answer.secureId !=
                        null && iSections == sectionIndex,
                  }"
                >
                  {{ i2 + 1 }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-expand-transition>
    <div v-if="isCompleted" class="d-flex flex-column align-center pa-12">
      <div
        class="d-flex flex-column align-center white pa-12 rounded-lg"
        style="width: 450px"
      >
        <p class="nilai-akhir-font mb-5">Nilai Akhir</p>
        <p class="nilai-subtitle-font">Test Kepribadian 1</p>
        <p class="nilai-number-font my-12">{{ totalAnswer || "-" }}</p>
        <v-btn
          color="primary"
          class="no-uppercase"
          block
          @click="handleSelesai"
        >
          Selesai
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
// const Section = () => import("./Sections");

export default {
  components: {
    // Section,
  },
  data() {
    return {
      duration: 240,
      timer: 240,
      minutes: "--",
      seconds: "--",
      nowDate: null,
      nowHour: null,
      totalAnswer: null,
      sectionIndex: 0,
      sections: [
        {
          secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2d1",
          title: "Section 1",
          tableName: "Kolom Acuan Soal",
          firstRow: ["A", "B", "C", "D", "E"],
          secondRow: ["3", "6", "7", "9", "2"],
          question: [
            {
              secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff3c9",
              title: ["5", "9", "8", "5"],
              answer: {
                secureId: null,
                symbol: null,
                value: null,
              },
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
              answer: {
                secureId: null,
                symbol: null,
                value: null,
              },
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
          question: [
            {
              secureId: "a9e9e79b-5d29-42fc-ae35-6139619eeff",
              title: ["5", "9", "8", "4"],
              answer: {
                secureId: null,
                symbol: null,
                value: null,
              },
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
              title: ["5", "9", "8", "4"],
              answer: {
                secureId: null,
                symbol: null,
                value: null,
              },
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
              answer: {
                secureId: null,
                symbol: null,
                value: null,
              },
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
  computed: {
    countMinutes() {
      return this.minutes;
    },
    isCompleted() {
      return this.totalAnswer != null;
    },
    now() {
      return this.nowDate;
    },
    nowHourComputed() {
      return this.nowHour;
    },
    isLast() {
      return this.sections.length == this.sectionIndex + 1;
    },
  },
  mounted() {
    this.startCountDown();
    this.getDate();
  },
  watch: {
    totalAnswer(val) {
      console.log(val);
    },
  },
  methods: {
    startCountDown() {
      this.counterFunction = setInterval(() => {
        this.minutes = parseInt(this.timer / 60, 10);
        this.seconds = parseInt(this.timer % 60, 10);

        this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
        this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

        this.timer--;
        if (this.timer < 0) {
          this.timer = this.duration;
          clearInterval(this.counterFunction);
        }
      }, 1000);
    },
    handleSubmit() {
      this.$confirm({
        title: "Confirm",
        message: `Are you sure you want to submit your answer's ?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            this.calculateAnswer();
          }
        },
      });
    },
    calculateAnswer() {
      let total = 0;
      this.sections.forEach((section) => {
        section.question.forEach((question) => {
          total += question.answer.value;
        });
      });
      this.totalAnswer = total;
    },
    handlePick(i) {
      this.$confirm({
        title: "Confirm",
        message: `Are you sure you want to change section's ?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            this.sectionIndex = i;
          }
        },
      });
    },
    handleSelesai() {
      this.$router.replace({ path: "/data-soal" });
    },
    getDate() {
      this.counterFunction = setInterval(() => {
        const now = new Date().toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        const hour = new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          hour12: true,
          minute: "2-digit",
        });
        this.nowDate = now;
        this.nowHour = hour;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.height-is-completed {
  height: 82px;
}

.nilai-akhir-font {
  font-family: Inter !important;
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 32px;
  line-height: 120%;
  color: #814feb;
}

.nilai-subtitle-font {
  font-family: Inter !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;

  /* Primary/Black3 */

  color: #8e8e8e;
}

.nilai-number-font {
  font-family: Inter !important;
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 90px;
  line-height: 120%;
  /* identical to box height, or 144px */

  display: flex;
  align-items: center;

  /* Primary/Black1 */

  color: #141414;
}

.kecermatan-font {
  font-family: Inter !important;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 160%;
  /* or 19px */
  letter-spacing: 0.01em;
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

.tabel-kolom-font {
  font-family: Inter !important;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  /* identical to box height, or 28px */

  text-align: center;
}

table,
td,
th {
  border: 1px solid #e0e0e0 !important;
}

.black-border {
  border: 1px solid #e0e0e0 !important;
}

.border-question-right {
  border-right: 1px solid #e0e0e0 !important;
}

.kecermatan-section-font {
  font-family: Inter !important;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
}

.active {
  background-color: #ae8ef2 !important;
}

.active-font {
  color: #53319a !important;
}
</style>
