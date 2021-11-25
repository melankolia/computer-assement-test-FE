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
          style="width: 71%"
        >
          <div class="d-flex flex-column ma-0">
            <p class="header-3 mb-12 text-center">Tes Kejiwaan 1</p>
            <transition name="slide-fade" mode="out-in">
              <Answer :data="questions[questionIndex]" />
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
            >
              Kembali
            </v-btn>
            <v-btn
              color="primary"
              class="no-uppercase"
              @click="handleNext"
              text
            >
              {{ isLast ? "Submit" : "Lanjut" }}
            </v-btn>
          </div>
        </div>
        <div
          class="d-flex flex-column white my-10 mr-10 rounded-lg"
          style="width: 29%"
        >
          <p class="ma-0 daftar-soal-font mt-6 mb-8">Daftar Soal</p>
          <div class="d-flex flex-row flex-wrap mx-11">
            <div
              @click="() => handlePick(i)"
              v-for="(e, i) in questions"
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
                  questions[i].answer.answer == null && i != questionIndex,
                'number-answer-active': i == questionIndex,
              }"
              :key="i"
            >
              <p
                class="mb-0 number-font"
                :class="{
                  'number-font-not-answered-yet':
                    questions[i].answer.answer == null && i != questionIndex,
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
    <v-expand-transition>
      <div v-if="isCompleted" class="d-flex flex-column align-center pa-12">
        <div
          class="d-flex flex-column align-center white pa-12 rounded-lg"
          style="width: 450px"
        >
          <p class="nilai-akhir-font mb-5">Nilai Akhir</p>
          <p class="nilai-subtitle-font">Test Kejiwaan 1</p>
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
    </v-expand-transition>
  </div>
</template>

<script>
const Answer = () => import("./Answer");

export default {
  components: {
    Answer,
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
      questionIndex: 0,
      questions: [
        {
          secureId: "50d7e340-e15c-4ad9-9e6e-a138e5cb76a3",
          sessionTime: 12,
          question: {
            secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2c5",
            question: "Pertanyaan Testing",
          },
          answer: {
            answer: null,
            symbol: null,
            value: null,
          },
          answerList: [
            {
              secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2c5",
              symbol: "A",
              answer: "6 Gram",
              value: 1,
            },
            {
              secureId: "af98ecb2-9d39-454f-b2b7-f29c0e0ea351",
              symbol: "B",
              answer: "8 Gram",
              value: 0,
            },
            {
              secureId: "dacc262d-a01f-4d61-a017-e9eac49b18b4",
              symbol: "C",
              answer: "12 Gram",
              value: 0,
            },
            {
              secureId: "efdb6751-d22b-4e7c-b156-ee2cf5f10f32",
              symbol: "D",
              answer: "16 Gram",
              value: 0,
            },
          ],
        },
        {
          secureId: "50d7e340-e15c-4ad9-9e6e-a138e5cb76a3",
          sessionTime: 12,
          question: {
            secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2c5",
            question: "Pertanyaan Testing",
          },
          answer: {
            answer: null,
            symbol: null,
            value: null,
          },
          answerList: [
            {
              secureId: "a9e9e79b-5d29-42fc-ae35-6139619ff2c5",
              symbol: "A",
              answer: "6 Gram",
              value: 1,
            },
            {
              secureId: "af98ecb2-9d39-454f-b2b7-f29c0e0ea351",
              symbol: "B",
              answer: "8 Gram",
              value: 0,
            },
            {
              secureId: "dacc262d-a01f-4d61-a017-e9eac49b18b4",
              symbol: "C",
              answer: "12 Gram",
              value: 0,
            },
            {
              secureId: "efdb6751-d22b-4e7c-b156-ee2cf5f10f32",
              symbol: "D",
              answer: "16 Gram",
              value: 0,
            },
          ],
        },
        {
          secureId: "50d7e340-e15c-4ad9-9e6e-a138e5cb76a3",
          sessionTime: 12,
          question: {
            secureId: "f11040ac-c7d0-41c3-b6a2-13505593002e",
            question: "Testing Update New Method Answer Dari Postman",
          },
          answer: {
            answer: null,
            symbol: null,
            value: null,
          },
          answerList: [
            {
              secureId: "2b037e7c-e4c3-406c-89f1-6ba3a37105f4",
              symbol: "D",
              answer: "69 Gram",
              value: 100,
            },
            {
              secureId: "f6e593b8-802e-44ee-90b5-9385dcec66eb",
              symbol: "C",
              answer: "2 Gram",
              value: 2,
            },
            {
              secureId: "b50a4aa6-320f-4668-80c6-d6305926d0de",
              symbol: "A",
              answer: "30 Gram",
              value: 73,
            },
            {
              secureId: "71379192-631b-4575-a137-4e5b58f8f436",
              symbol: "B",
              answer: "99 Gram",
              value: 23,
            },
            {
              secureId: "ebc9d8db-dc1a-4458-b363-b321edd59519",
              symbol: "E",
              answer: "60 Gram",
              value: 2,
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
    isLast() {
      return this.questions.length - 1 == this.questionIndex;
    },
    now() {
      return this.nowDate;
    },
    nowHourComputed() {
      return this.nowHour;
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
    handlePick(i) {
      this.questionIndex = i;
    },
    handlePrev() {
      if (this.questionIndex > 0) {
        this.questionIndex--;
      }
    },
    calculateAnswer() {
      this.totalAnswer = this.questions.reduce(
        (acc, cur) => acc + cur.answer.value,
        0
      );
      console.log(this.totalAnswer);
    },
    handleNext() {
      if (this.isLast) {
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
      } else this.questionIndex++;
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
</style>
