<template>
  <div
    v-scroll="onScroll"
    class="d-flex flex-column"
    style="background: #f8f6fb; height: 100%"
  >
    <v-expand-transition>
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
        :class="{
          'height-is-completed': isCompleted && visible,
          'fixed-div': floating,
        }"
      >
        <!-- Answering Mode -->
        <template v-if="!visible">
          <div class="d-flex flex-column">
            <p class="ma-0 timer-date-subtitle-font">{{ nowDate || "-" }}</p>
            <p class="ma-0 timer-date-font">{{ nowHourComputed || "-" }}</p>
          </div>
          <!-- <div class="d-flex flex-row align-center">
            <img width="20" height="22" src="@/assets/icons/time.svg" />
            <p class="timer-font mb-0 mx-2">
              {{ minutes || "--" }}:{{ seconds || "--" }}
            </p>
          </div> -->
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
              <v-list-item @click="confirmBack" link>
                <p class="selection-item ma-0">Keluar</p>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </div>
    </v-expand-transition>
    <v-expand-transition>
      <div
        v-if="!visible"
        class="d-flex flex-row justify-space-between"
        :class="{
          marginized: floating,
        }"
      >
        <!-- Answering Mode -->
        <div class="d-flex flex-column my-4 mx-10" style="width: 100%">
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
            <p class="header-3 my-6 text-center">{{ kecermatan.title }}</p>
          </div>
          <DefaultLoader
            v-if="loadingChangeSection"
            :loading="loadingChangeSection"
          />
          <div v-else class="ma-0">
            <div class="d-flex flex-row align-center justify-center mb-5 mt-5">
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
              <v-row class="py-5" align="end">
                <v-col cols="12" sm="4"> </v-col>
                <v-col cols="12" sm="4" class="white rounded-lg">
                  <div
                    class="
                      d-flex
                      flex-column
                      align-center
                      justify-center
                      mx-auto
                    "
                  >
                    <table style="border: 2px solid black !important">
                      <tr>
                        <td
                          v-for="(secondRow, iSecondRow) in sections[
                            sectionIndex
                          ].secondRow"
                          class="px-4 py-2 text-center"
                          :key="`second-row-${iSecondRow}`"
                          style="
                            border: 2px solid black !important;
                            font-weight: bold;
                            min-width: 78px;
                          "
                        >
                          <p class="ma-0 text-h2 font-weight-medium">
                            {{ secondRow }}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          v-for="(firstRow, iFirstRow) in sections[sectionIndex]
                            .firstRow"
                          class="px-4 py-2"
                          :key="`first-row-${iFirstRow}`"
                          style="
                            border: 2px solid black !important;
                            font-weight: bold;
                            min-width: 78px;
                          "
                        >
                          <p
                            class="ma-0 text-center text-h5 font-weight-medium"
                          >
                            {{ firstRow }}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </v-col>
                <v-col cols="12" sm="1">
                  <div
                    class="d-flex align-center justify-center pa-2"
                    style="
                      min-width: 124px;
                      background: gainsboro;
                      border-radius: 4%;
                    "
                  >
                    <img width="20" height="22" src="@/assets/icons/time.svg" />
                    <p class="timer-acuan-font mb-0 mx-2">
                      {{ minutes || "--" }}:{{ seconds || "--" }}
                    </p>
                  </div>
                </v-col>
              </v-row>
              <v-divider class="primary mb-12" style="border-width: 2px" />
              <div cols="12" class="py-8">
                <v-row no-gutters align="center" justify="center">
                  <div class="d-flex flex-column px-12 py-2">
                    <table style="border: 2px solid black !important">
                      <tr>
                        <td
                          v-for="(qTitle, qIndex) in sections[sectionIndex]
                            .question[questionIndex].title"
                          :key="qIndex"
                          style="
                            border: 2px solid black !important;
                            font-weight: bold;
                            min-width: 160px !important;
                          "
                          class="text-center px-4"
                        >
                          <p class="text-answer-title font-weight-medium ma-0">
                            {{ qTitle }} {{ questionIndex }}
                          </p>
                        </td>
                      </tr>
                    </table>
                    <div class="d-flex flex-column pb-2 pt-4 align-center">
                      <v-btn-toggle
                        v-model="
                          sections[sectionIndex].question[questionIndex].answer
                        "
                        v-bind="{
                          mandatory:
                            sections[sectionIndex].question[questionIndex] &&
                            sections[sectionIndex].question[questionIndex]
                              .answer.value != null,
                        }"
                        style="border: 1px black solid"
                      >
                        <v-btn
                          v-for="(answer, aIndex) in sections[sectionIndex]
                            .question[questionIndex].answerList"
                          :key="`answer-${aIndex}`"
                          :value="answer"
                          :class="{
                            active:
                              sections[sectionIndex].question[questionIndex] &&
                              sections[sectionIndex].question[questionIndex]
                                .answer.secureId == answer.secureId,
                            'active-font':
                              sections[sectionIndex].question[questionIndex] &&
                              sections[sectionIndex].question[questionIndex]
                                .answer.secureId == answer.secureId,
                          }"
                          class="button-hover-answer"
                          large
                          @click="handleAnswer"
                          style="
                            border: 1px black solid !important;
                            min-height: 60px;
                          "
                        >
                          <p class="ma-0 text-h5 px-10 font-weight-medium">
                            {{ answer.symbol }}
                          </p>
                        </v-btn>
                      </v-btn-toggle>
                    </div>
                  </div>
                </v-row>
              </div>
              <v-divider class="primary" style="border-width: 2px" />
              <div class="d-flex flex-column align-center">
                <v-img :src="MalakaLogo" max-width="435px" class="my-8" />
              </div>
            </div>
            <!-- <v-btn
              @click="() => handleNext()"
              v-if="isLast"
              class="mt-8 no-uppercase"
              color="primary"
              depressed
              block
            >
              Submit
            </v-btn> -->
          </div>
        </div>
      </div>
    </v-expand-transition>
    <CompletedPopUp
      :dialog="visible"
      :totalAnswer="totalAnswer"
      :handleSelesai="handleSelesai"
      :title="title"
    >
      <template v-slot:description>
        <v-col cols="12">
          <table class="result-table text-center">
            <thead>
              <tr>
                <th style="border: none !important" class="pr-2 text-left">
                  <p class="section-row-font">Section</p>
                </th>
                <th style="border: none !important" class="px-2">
                  <p class="section-row-font">Benar</p>
                </th>
                <th style="border: none !important" class="px-2">
                  <p class="section-row-font">Salah</p>
                </th>
                <th style="border: none !important" class="px-2">
                  <p class="section-row-font">Tidak Dijawab</p>
                </th>
                <th style="border: none !important" class="px-2">
                  <p class="section-row-font">Total</p>
                </th>
              </tr>
            </thead>
            <tr v-for="(e, i) in result" :key="`description-${i}`">
              <td style="border: none !important" class="pr-2 text-left">
                <p class="section-row-font">{{ e.section }}</p>
              </td>
              <td style="border: none !important" class="px-2">
                <p class="section-row-font-result">
                  {{ e.benar }}
                </p>
              </td>
              <td style="border: none !important" class="px-2">
                <p class="section-row-font-result">
                  {{ e.salah }}
                </p>
              </td>
              <td style="border: none !important" class="px-2">
                <p class="section-row-font-result">
                  {{ e.tidak_dijawab }}
                </p>
              </td>
              <td style="border: none !important" class="px-2">
                <p class="section-row-font-result-total">
                  {{ e.total }}
                </p>
              </td>
            </tr>
          </table>
        </v-col>
      </template>
    </CompletedPopUp>
  </div>
</template>

<script>
import { mapNewKecermatanField } from "@/store/helpers";
import { mapGetters, mapMutations } from "vuex";
import { PURGE_QUESTION } from "@/store/constants/mutations.type";
import SoalService from "@/services/resources/soal.service";
import { DATA_SOAL } from "@/router/name.types";
import MalakaLogo from "@/assets/images/new_kecermatan.png";
const DefaultLoader = () => import("@/components/Loader/Default");
const CompletedPopUp = () => import("@/components/Dialog/Completed");
// const Section = () => import("./Sections");

export default {
  components: {
    DefaultLoader,
    CompletedPopUp,
    // Section,
  },
  data() {
    return {
      floating: false,
      loadingChangeSection: false,
      loading: false,
      visible: false,
      result: [
        {
          paket_soal: null,
          benar: null,
          salah: null,
          tidak_dijawab: null,
          total: null,
        },
      ],
      MalakaLogo,
    };
  },
  computed: {
    ...mapNewKecermatanField({
      kecermatan: "new_kecermatan",
      title: "new_kecermatan.title",
      duration: "new_kecermatan.duration",
      timer: "new_kecermatan.timer",
      questionTimer: "new_kecermatan.questionTimer",
      questionSeconds: "new_kecermatan.questionSeconds",
      questionDuration: "new_kecermatan.questionDuration",
      questionIndex: "new_kecermatan.questionIndex",
      minutes: "new_kecermatan.minutes",
      seconds: "new_kecermatan.seconds",
      nowDate: "new_kecermatan.nowDate",
      nowHour: "new_kecermatan.nowHour",
      totalAnswer: "new_kecermatan.totalAnswer",
      sections: "new_kecermatan.sections",
      sectionIndex: "new_kecermatan.sectionIndex",
    }),
    ...mapGetters(["getProfile"]),
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
    isResume() {
      return this.kecermatan?.secureId;
    },
  },
  mounted() {
    if (this.isCompleted) this.visible = true;

    this.startCountDown();
    this.startQuestionCountDown();
    this.getDate();
  },
  methods: {
    ...mapMutations({
      purgeData: `new_kecermatan/${PURGE_QUESTION.NEW_KECERMATAN}`,
    }),
    converterTimer() {
      this.minutes = parseInt(this.timer / 60, 10);
      this.seconds = parseInt(this.timer % 60, 10);

      this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
      this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
    },
    startCountDown() {
      this.counterFunction = setInterval(
        function myFunction() {
          this.converterTimer();
          this.timer--;
          return myFunction;
        }.bind(this),
        1000
      );
    },
    startQuestionCountDown() {
      this.counterQuestionFunction = setInterval(
        function myFunction() {
          this.questionSeconds = parseInt(this.questionTimer % 60, 10);
          this.questionTimer--;
          return myFunction;
        }.bind(this),
        1000
      );
    },
    handleForceSubmit() {
      this.$confirm({
        title: "Waktu Habis",
        message: `<br /> Klik <b>OK</b> untuk melihat nilai akhir`,
        button: {
          yes: "OK",
        },
        callback: (confirm) => {
          if (confirm) {
            this.handleSubmit();
          }
        },
      });
    },
    handleNext(type = "normal") {
      if (!this.isLast) {
        this.loadingChangeSection = true;
        this.questionTimer = this.questionDuration;
        this.timer = this.duration;
        this.minutes = 0;
        this.seconds = 0;

        clearInterval(this.counterFunction);
        clearInterval(this.counterQuestionFunction);

        setTimeout(
          function myFunction() {
            this.questionIndex = 0;
            this.sectionIndex++;
            this.startCountDown();
            this.startQuestionCountDown();
            this.loadingChangeSection = false;

            return myFunction;
          }.bind(this),
          0
        );
      } else {
        if (type == "normal") {
          this.$confirm({
            title: "Confirm",
            message: `Are you sure you want to <b>submit</b> your answer's ?`,
            button: {
              no: "No",
              yes: "Yes",
            },
            callback: (confirm) => {
              if (confirm) this.handleSubmit();
            },
          });
        } else {
          clearInterval(this.counterFunction);
          clearInterval(this.counterQuestionFunction);

          this.handleForceSubmit();
        }
      }
    },
    handleNextQuestion() {
      setTimeout(() => {
        this.questionTimer = this.questionDuration;
        this.questionIndex++;
        this.startQuestionCountDown();
      }, 0);
    },
    handleAnswer() {
      clearInterval(this.counterQuestionFunction);
      if (
        this.questionIndex + 1 ==
        this.sections[this.sectionIndex].question.length
      ) {
        clearInterval(this.counterFunction);
        this.handleNext("countDown");
      } else {
        this.handleNextQuestion();
      }
    },
    handleSubmit() {
      let payload = [];
      this.sections.forEach((section, index) => {
        payload.push({
          paket_soal: this.title,
          section: section.title,
          total: 0,
          benar: 0,
          tidak_dijawab: 0,
          salah: 0,
        });
        section?.question.forEach((question) => {
          if (question?.answer?.value) {
            payload[index].total += question?.answer?.value;
            payload[index].benar++;
          } else if (question?.answer?.value === 0) {
            payload[index].salah++;
          } else {
            payload[index].tidak_dijawab++;
          }
        });
      });

      const Payload = {
        secureId: this.getProfile.secureId,
        kecermatanVO: [...payload],
      };

      this.result = [...payload];

      // Calculate Answer
      const total = payload.reduce((a, b) => a + b.total, 0) / payload.length;
      this.totalAnswer = total.toFixed(1);

      this.visible = true;

      // handle Submit
      this.requestInsert(Payload);
    },
    handleSelesai() {
      this.kecermatan.secureId = null;
      this.$router.replace({ path: "/data-soal" });
      this.purgeData();
    },
    getDate() {
      this.dataFunction = setInterval(() => {
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
    confirmBack() {
      this.$confirm({
        title: "Confirm",
        message: `Anda akan dinyatakan <b>menyelesaikan Sections</b>, jika kembali ke halaman sebelumnya`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            this.handleSubmit();
          }
        },
      });
    },
    handleBack() {
      this.$router.replace({
        name: DATA_SOAL,
      });
    },
    requestInsert(payload) {
      this.lading = true;
      SoalService.insertNilaiNewKecermatan({ ...payload })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.visible = true;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil input nilai New Kecermatan",
              color: "success",
            });
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal input nilai New Kecermatan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal input nilai New Kecermatan",
            color: "error",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.floating = top > 40;
    },
  },
  beforeDestroy() {
    clearInterval(this.dateFunction);
    clearInterval(this.counterFunction);
    clearInterval(this.counterQuestionFunction);
  },
  watch: {
    questionTimer(val) {
      if (val <= 0) {
        clearInterval(this.counterQuestionFunction);
        if (
          this.questionIndex + 1 ==
          this.sections[this.sectionIndex].question.length
        ) {
          clearInterval(this.counterFunction);
          this.handleNext("countDown");
        } else {
          this.handleNextQuestion();
        }
      }
      console.log("Counter Question Function");
    },
    timer(val) {
      if (val < 0) {
        clearInterval(this.counterFunction);
        this.handleNext("countDown");
      }
      console.log("Counter Function");
    },
    questionIndex(val) {
      console.log({ val });
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

.table-kolom- table,
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

.section-row-font {
  font-family: Inter !important;
  font-style: normal;
  font-weight: 500 !important;
  font-size: 14px !important;
  line-height: 140%;
}

.section-row-font-result {
  font-family: Inter !important;
  font-style: normal;
  font-weight: 400 !important;
  font-size: 14px !important;
  line-height: 140%;
}

.section-row-font-result-total {
  font-family: Inter !important;
  font-style: normal;
  font-weight: 500 !important;
  font-size: 20px !important;
  line-height: 140%;
  color: #38d435;
}

.button-hover-answer:active {
  background-color: #38d435 !important;
}
</style>
