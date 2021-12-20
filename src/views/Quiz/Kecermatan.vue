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
          <div class="d-flex flex-row align-center">
            <img width="20" height="22" src="@/assets/icons/time.svg" />
            <p class="timer-font mb-0 mx-2">
              {{ minutes || "--" }}:{{ seconds || "--" }}
            </p>
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
        <div
          class="d-flex flex-column my-4 mx-10"
          style="width: 71%; overflow: scroll; max-height: 800px"
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
              <div
                class="d-flex flex-column align-center white py-5 rounded-lg"
              >
                <p class="tabel-kolom-font">
                  {{ sections[sectionIndex].tableName }}
                </p>
                <table style="border: 2px solid black !important">
                  <tr>
                    <td
                      v-for="(firstRow, iFirstRow) in sections[sectionIndex]
                        .firstRow"
                      class="px-4 py-2"
                      :key="`first-row-${iFirstRow}`"
                      style="
                        border: 2px solid black !important;
                        font-weight: bold;
                      "
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
                      style="
                        border: 2px solid black !important;
                        font-weight: bold;
                      "
                    >
                      {{ secondRow }}
                    </td>
                  </tr>
                </table>
              </div>
              <v-divider />
              <div
                cols="12"
                class="py-8"
                style="height: 600px; overflow: scroll"
              >
                <v-row
                  v-for="(q, qIndex) in sections[sectionIndex].question"
                  :key="`qIndex-${qIndex}`"
                  no-gutters
                  align="center"
                  justify="center"
                >
                  <v-col cols="6" sm="6" class="px-12 py-2">
                    <div class="d-flex flex-column align-end">
                      <p
                        v-if="qIndex == 0"
                        class="mb-4 kecermatan-section-font"
                      >
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
                        <v-btn-toggle
                          v-model="q.answer"
                          tile
                          group
                          v-bind="{
                            mandatory: q.answer && q.answer.value != null,
                          }"
                        >
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
                                active:
                                  q.answer &&
                                  q.answer.secureId == answer.secureId,
                                'active-font':
                                  q.answer &&
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
            </div>
            <v-btn
              @click="() => handleNext()"
              v-if="isLast"
              class="mt-8 no-uppercase"
              color="primary"
              depressed
              block
            >
              Submit
            </v-btn>
          </div>
        </div>
        <div
          class="d-flex flex-column white py-6 my-4 mr-10 rounded-lg"
          style="width: 29%"
        >
          <p class="ma-0 daftar-soal-font mb-8">Daftar Soal</p>
          <div class="d-flex flex-column" :key="`sections-active`">
            <p class="ma-0 kecermatan-font mx-11 px-2 mb-2">
              {{ sections[sectionIndex].title }}
            </p>
            <div class="d-flex flex-row flex-wrap mx-11">
              <div
                v-for="(eActive, iActive) in sections[sectionIndex].question"
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
                    sections[sectionIndex].question[iActive].answer &&
                    sections[sectionIndex].question[iActive].answer.secureId ==
                      null,
                  'number-answer-active':
                    sections[sectionIndex].question[iActive].answer &&
                    sections[sectionIndex].question[iActive].answer.secureId !=
                      null &&
                    sectionIndex == sectionIndex,
                }"
                :key="`question-kecermatan-${iActive}`"
              >
                <p
                  class="mb-0 number-font"
                  :class="{
                    'number-font-not-answered-yet':
                      sections[sectionIndex].question[iActive].answer &&
                      sections[sectionIndex].question[iActive].answer
                        .secureId == null,
                    'number-font-active':
                      sections[sectionIndex].question[iActive].answer &&
                      sections[sectionIndex].question[iActive].answer
                        .secureId != null &&
                      sectionIndex == sectionIndex,
                  }"
                >
                  {{ iActive + 1 }}
                </p>
              </div>
            </div>
          </div>
          <div
            v-for="(e, iSections) in sections"
            class="d-flex flex-column"
            :key="`sections-${iSections}`"
          >
            <template v-if="iSections !== sectionIndex">
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
                    answered: iSections >= sectionIndex,
                    'number-answer-not-answered-yet':
                      sections[iSections].question[i2].answer &&
                      sections[iSections].question[i2].answer.secureId == null,
                    'number-answer-active':
                      sections[iSections].question[i2].answer &&
                      sections[iSections].question[i2].answer.secureId !=
                        null &&
                      iSections == sectionIndex,
                  }"
                  :key="`question-kecermatan-${i2}`"
                >
                  <p
                    class="mb-0 number-font"
                    :class="{
                      'number-font-not-answered-yet':
                        sections[iSections].question[i2].answer &&
                        sections[iSections].question[i2].answer.secureId ==
                          null,
                      'number-font-active':
                        sections[iSections].question[i2].answer &&
                        sections[iSections].question[i2].answer.secureId !=
                          null &&
                        iSections == sectionIndex,
                    }"
                  >
                    {{ i2 + 1 }}
                  </p>
                </div>
              </div>
            </template>
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
import { mapKecermatanField } from "@/store/helpers";
import { mapGetters, mapMutations } from "vuex";
import { PURGE_QUESTION } from "@/store/constants/mutations.type";
import SoalService from "@/services/resources/soal.service";
import { DATA_SOAL } from "@/router/name.types";
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
    };
  },
  computed: {
    ...mapKecermatanField({
      kecermatan: "kecermatan",
      title: "kecermatan.title",
      duration: "kecermatan.duration",
      timer: "kecermatan.timer",
      minutes: "kecermatan.minutes",
      seconds: "kecermatan.seconds",
      nowDate: "kecermatan.nowDate",
      nowHour: "kecermatan.nowHour",
      totalAnswer: "kecermatan.totalAnswer",
      sections: "kecermatan.sections",
      sectionIndex: "kecermatan.sectionIndex",
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
    this.getDate();
  },
  methods: {
    ...mapMutations({
      purgeData: `kecermatan/${PURGE_QUESTION.KECERMATAN}`,
    }),
    startCountDown() {
      this.counterFunction = setInterval(() => {
        this.minutes = parseInt(this.timer / 60, 10);
        this.seconds = parseInt(this.timer % 60, 10);

        this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
        this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

        this.timer--;
        if (this.timer < 0) {
          clearInterval(this.counterFunction);
          this.timer = 0;
          this.handleNext("countDown");
        }
      }, 1000);
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
        clearInterval(this.counterFunction);
        setTimeout(() => {
          this.sectionIndex++;
          this.timer = this.duration;
          this.startCountDown();
          this.loadingChangeSection = false;
        }, 500);
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
        } else this.handleForceSubmit();
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
    handlePick(i) {
      if (i > this.sectionIndex) {
        this.$confirm({
          title: "Confirm",
          message: `Are you sure you want to change section's ?`,
          button: {
            no: "No",
            yes: "Yes",
          },
          callback: (confirm) => {
            if (confirm) {
              this.loadingChangeSection = true;
              clearInterval(this.counterFunction);
              setTimeout(() => {
                this.startCountDown();
                this.timer = this.duration;
                this.sectionIndex = i;
                this.loadingChangeSection = false;
              }, 500);
            }
          },
        });
      }
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
      SoalService.insertNilaiKecermatan({ ...payload })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.visible = true;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil input nilai Kecermatan",
              color: "success",
            });
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal input nilai Kecermatan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal input nilai Kecermatan",
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
</style>
