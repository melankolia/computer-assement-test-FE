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
      :class="{ 'height-is-completed': isCompleted && visible }"
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
    <v-expand-transition>
      <div
        v-if="!visible"
        class="d-flex flex-row justify-space-between"
        style="height: 100%"
      >
        <!-- Answering Mode -->
        <div
          class="
            d-flex
            flex-column
            justify-space-between
            white
            ma-10
            pa-12
            rounded-lg
          "
          style="width: 71%; max-height: 800px"
        >
          <div class="d-flex flex-column ma-0">
            <p class="header-3 mb-12 text-center">{{ kepribadian.title }}</p>
            <transition name="slide-fade" mode="out-in">
              <Answer
                :data="questions[questionIndex]"
                :disabled="isCompleted"
              />
            </transition>
          </div>
          <div
            class="
              d-flex
              flex-row
              justify-space-between
              align-center
              pt-12
              mt-12
            "
          >
            <v-btn
              color="primary"
              class="no-uppercase"
              @click="handlePrev"
              text
              :disabled="loading"
            >
              Kembali
            </v-btn>
            <v-btn
              color="primary"
              class="no-uppercase"
              @click="handleNext"
              text
              :loading="loading"
            >
              {{ isLast ? "Submit" : "Lanjut" }}
            </v-btn>
          </div>
        </div>
        <div
          class="d-flex flex-column white py-6 my-10 mr-10 rounded-lg"
          style="width: 29%"
        >
          <p class="ma-0 daftar-soal-font mb-8">Daftar Soal</p>
          <div class="d-flex flex-row flex-wrap mx-11">
            <div
              @click="() => handlePick(i)"
              v-for="(e, i) in questions"
              class="
                number-answer
                answered
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
                  questions[i].answer &&
                  questions[i].answer.answer == null &&
                  i != questionIndex,
                'number-answer-active': i == questionIndex,
              }"
              :key="i"
            >
              <p
                class="mb-0 number-font"
                :class="{
                  'number-font-not-answered-yet':
                    questions[i].answer &&
                    questions[i].answer.answer == null &&
                    i != questionIndex,
                  'number-font-active': i == questionIndex,
                }"
              >
                {{ i + 1 }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </v-expand-transition>
    <CompletedPopUp
      :dialog="visible"
      :totalAnswer="totalAnswer"
      :handleSelesai="handleSelesai"
      :title="title"
    />
  </div>
</template>

<script>
import { mapKepribadianField } from "@/store/helpers";
import { mapGetters, mapMutations } from "vuex";
import { PURGE_QUESTION } from "@/store/constants/mutations.type";
import { DATA_SOAL } from "@/router/name.types";
import SoalService from "@/services/resources/soal.service";
const Answer = () => import("./Answer");
const CompletedPopUp = () => import("@/components/Dialog/Completed");

export default {
  components: {
    Answer,
    CompletedPopUp,
  },
  data() {
    return {
      visible: false,
      loading: false,
    };
  },
  computed: {
    ...mapKepribadianField({
      kepribadian: "kepribadian",
      title: "kepribadian.title",
      duration: "kepribadian.duration",
      timer: "kepribadian.timer",
      minutes: "kepribadian.minutes",
      seconds: "kepribadian.seconds",
      nowDate: "kepribadian.nowDate",
      nowHour: "kepribadian.nowHour",
      totalAnswer: "kepribadian.totalAnswer",
      questions: "kepribadian.questions",
      questionIndex: "kepribadian.questionIndex",
    }),
    ...mapGetters(["getProfile"]),
    countMinutes() {
      return this.minutes;
    },
    isCompleted() {
      return this.totalAnswer != null;
    },
    isLast() {
      return this.questions.length - 1 == this.questionIndex;
    },
    now() {
      return this.nowDate;
    },
    nowHourComputed() {
      return this.nowHour;
    },
    isResume() {
      return this.kejiwaan?.secureId;
    },
  },
  mounted() {
    if (this.isCompleted) this.visible = true;
    if (!this.isResume) clearInterval(this.counterFunction);

    this.startCountDown();
    this.getDate();
  },
  methods: {
    ...mapMutations({
      purgeData: `kepribadian/${PURGE_QUESTION.KEPRIBADIAN}`,
    }),
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
          this.handleForceSubmit();
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
    handlePick(i) {
      this.questionIndex = i;
    },
    handlePrev() {
      if (this.questionIndex > 0) {
        this.questionIndex--;
      } else {
        this.confirmBack();
      }
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
    calculateAnswer() {
      this.totalAnswer = this.questions.reduce(
        (acc, cur) => +acc + +cur?.answer?.value,
        0
      );
    },
    requestInsert() {
      this.lading = true;
      SoalService.insertNilai({
        userSecureId: this.getProfile.secureId,
        type_nilai: "kepribadian",
        paket_soal: this.title,
        nilai: this.totalAnswer,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.visible = true;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil input nilai Kepribadian",
              color: "success",
            });
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal input nilai Kepribadian",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal input nilai Kepribadian",
            color: "error",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleNext() {
      if (this.isLast) {
        this.$confirm({
          title: "Confirm",
          message: `Are you sure you want to <b>submit</b> your answer's ?`,
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
      } else this.questionIndex++;
    },
    handleSelesai() {
      this.kepribadian.secureId = null;
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
    handleSubmit() {
      this.calculateAnswer();
      this.requestInsert();
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
</style>
