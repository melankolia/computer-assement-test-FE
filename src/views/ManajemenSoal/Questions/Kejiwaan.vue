<template>
  <div class="d-flex flex-column">
    <ContentNotFound
      message="Kecermatan Question's Not Found"
      :loading="loading"
      v-if="!isAvailable"
    >
      <template v-slot:action>
        <v-btn
          depressed
          @click="() => getDetail()"
          color="default"
          class="px-10"
        >
          <v-icon class="mr-1" small>mdi-reload</v-icon>
          Reload
        </v-btn>
      </template>
    </ContentNotFound>
    <template v-else>
      <p class="text-h5 mb-3" style="font-family: Inter !important">
        {{ detail.title }}
      </p>
      <p class="text-caption label-caption mb-5">
        {{ detail.description }}
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
            <p class="selection-item font-weight-medium ma-0">
              {{ detail.time }} Menit
            </p>
          </div>
        </div>
        <div class="d-flex flex-row align-center">
          <p class="label-style mb-0 mx-4">
            {{ !detail.is_active ? "Tidak Aktif" : "Aktif" }}
          </p>
          <v-switch
            @change="(e) => handleClickActivation(e)"
            dense
            :disabled="loadingActivate"
            :loading="loadingActivate"
            v-model="detail.is_active"
            color="greentext"
            inset
          />
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
              <v-list-item
                :disabled="loadingDeleteGroup"
                @click="() => handleDelete()"
                link
              >
                <img
                  v-if="!loadingDeleteGroup"
                  class="mr-4"
                  src="@/assets/icons/delete-outlined.svg"
                />
                <v-progress-circular
                  v-else
                  indeterminate
                  :size="20"
                  color="primary"
                  class="mr-4"
                ></v-progress-circular>
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
          class="d-flex flex-column white pa-12 mt-4 rounded-lg question"
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
                <v-list-item @click="() => handleEdit(e, i)" link>
                  <img class="mr-4" src="@/assets/icons/edit-outlined.svg" />
                  <p class="selection-item ma-0">Edit Data</p>
                </v-list-item>
                <v-list-item
                  :disabled="e.loadingDelete"
                  @click="() => handleDelete(e, i)"
                  link
                >
                  <img
                    v-if="!e.loadingDelete"
                    class="mr-4"
                    src="@/assets/icons/delete-outlined.svg"
                  />
                  <v-progress-circular
                    v-else
                    indeterminate
                    :size="20"
                    color="primary"
                    class="mr-4"
                  ></v-progress-circular>
                  <p class="selection-item ma-0">Hapus Data</p>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="px-12">
            <p class="font-question font-inter mb-8">
              {{ i + 1 }}. {{ e.question.question }}
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
                v-model="edited.question.question"
                hide-details
                filled
                outlined
                dense
                class="rounded"
              />
            </div>
            <div
              v-for="(ed, index) in edited.answerList"
              :key="`answer-${index}`"
              class="d-flex flex-row ml-3 my-2 align-center"
            >
              <p class="font-answer-add mr-5 mb-0">{{ ed.symbol }}.</p>
              <v-text-field
                v-model="ed.value"
                hide-details
                filled
                outlined
                dense
                class="rounded mr-3"
                style="max-width: 50px"
              />
              <v-text-field
                v-model="ed.answer"
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
      <!-- Mode Add -->
      <v-expand-transition>
        <div
          v-if="modeAdd"
          class="d-flex flex-column white pa-12 mt-4 rounded-lg"
        >
          <div class="d-flex flex-column px-12">
            <div class="d-flex flex-column mb-4">
              <p class="font-question-add">
                Pertanyaan No. {{ questionLength }}
              </p>
              <v-textarea
                v-model="item.question.question"
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
          v-if="!modeAdd && !modeEdit"
          @click="handleAdd"
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
import GroupService from "@/services/resources/group.service";
import QuestionService from "@/services/resources/Questions/kejiwaan.service";
const ContentNotFound = () => import("@/components/Content/NotFound");

export default {
  components: {
    ContentNotFound,
  },
  props: {
    kejiwaanSecureId: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      id: this.$route.query?.kejiwaanSecureId,
      modeAdd: false,
      modeEdit: false,
      loading: false,
      loadingSubmit: false,
      loadingActivate: false,
      loadingDeleteGroup: false,
      detail: {
        secureId: null,
        title: null,
        description: null,
        time: null,
        is_active: false,
      },
      item: {
        groupSecureId: null,
        question: {
          question: null,
          secureId: null,
        },
        modeAdd: false,
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
      edited: {
        groupSecureId: null,
        question: {
          question: null,
          secureId: null,
        },
        modeAdd: false,
        loadingDelete: false,
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
      questions: [],
    };
  },
  activated() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.loading = true;
      QuestionService.getDetail({
        secureId: this.kejiwaanSecureId || this.id,
        type: "admin",
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.detail = {
              secureId: result.secureId,
              title: result.title,
              description: result.description,
              time: result.time,
              is_active: result.is_active,
            };
            this.questions = [...result.result];
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal memuat data Kejiwaan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal memuat data Kejiwaan",
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
    handleBack() {
      this.$router.replace({ query: null });
    },
    resetVariable() {
      this.item = this.$_.cloneDeep({
        question: {
          question: null,
          secureId: null,
        },
        groupSecureId: null,
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
      });
    },
    resetEditVariable() {
      this.edited = this.$_.cloneDeep({
        question: {
          question: null,
          secureId: null,
        },
        groupSecureId: null,
        loadingDelete: false,
        modeAdd: false,
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
      });
    },
    handleClickActivation(event) {
      this.$confirm({
        title: "Confirm",
        message: `Are you sure you want to ${
          event ? "activate" : "deactivate"
        } this data ?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            this.activateData(event);
          } else {
            this.detail.is_active = !event;
          }
        },
      });
    },
    activateData(event) {
      this.loadingActivate = true;
      GroupService.activationKejiwaan({
        secureId: this.kejiwaanSecureId || this,
        is_active: event,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.detail.is_active = event;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Berhasil ${
                event ? "mengaktifkan" : "menonaktifkan"
              } status soal`,
              color: "success",
            });
          } else {
            this.detail.is_active = !event;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message:
                result ||
                `Gagal ${event ? "mengaktifkan" : "menonaktifkan"} status soal`,
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.detail.is_active = !event;
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: `Gagal ${
              event ? "mengaktifkan" : "menonaktifkan"
            } status soal`,
            color: "error",
          });
        })
        .finally(() => (this.loadingActivate = false));
    },
    handleCancel(i, type = "add") {
      if (type == "edit" && this.questions[i]?.question?.secureId) {
        this.modeEdit = false;
        this.questions[i].modeAdd = false;
        this.resetEditVariable();
      } else {
        this.modeAdd = false;
        this.resetVariable();
      }
    },
    handleSubmit(i, type = "submit") {
      if (type == "edit" && this.questions[i]?.question?.secureId)
        this.requestEdit(i);
      else this.requestSubmit();
    },
    requestEdit(i) {
      this.loadingSubmit = true;
      QuestionService.insertData({
        ...this.edited,
        groupSecureId: this.kejiwaanSecureId || this,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil mengubah data soal Kejiwaan",
              color: "success",
            });
            this.modeEdit = false;
            this.questions[i] = { ...result };
            this.resetEditVariable();
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal mengubah data soal Kejiwaan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal mengubah data soal Kejiwaan",
            color: "error",
          });
        })
        .finally(() => (this.loadingSubmit = false));
    },
    requestSubmit() {
      this.loadingSubmit = true;
      QuestionService.insertData({
        ...this.item,
        groupSecureId: this.kejiwaanSecureId || this,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menambahkan data soal Kejiwaan",
              color: "success",
            });
            this.modeAdd = false;
            this.resetVariable();
            this.questions.push(result);
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menambahkan data soal Kejiwaan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menambahkan data soal Kejiwaan",
            color: "error",
          });
        })
        .finally(() => (this.loadingSubmit = false));
    },
    handleEdit(item, i) {
      this.questions.map((e) => (e.modeAdd = false));
      this.modeAdd = false;
      this.questions[i].modeAdd = true;
      this.modeEdit = true;
      this.edited = this.$_.cloneDeep(item);
    },
    handleAdd() {
      this.modeAdd = true;
      this.$vuetify.goTo("#last-section", {
        duration: 1500,
        offset: 0,
        easing: "easeInOutCubic",
      });
    },

    handleDelete(element, index) {
      this.$confirm({
        title: "Confirm",
        message: `Are you sure you want to delete this data ?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            element ? this.deleteData(element, index) : this.deleteGroup();
          }
        },
      });
    },
    deleteData(item, index) {
      this.questions[index].loadingDelete = true;
      QuestionService.deleteData({
        secureId: item?.question?.secureId,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menghapus data Kejiwaan",
              color: "success",
            });
            this.questions.splice(index, 1);
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menghapus data Kejiwaan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menghapus data Kejiwaan",
            color: "error",
          });
        })
        .finally(() => (this.loadingDelete = false));
    },
    deleteGroup() {
      this.loadingDeleteGroup = true;
      GroupService.deleteKejiwaan(this.kejiwaanSecureId || this)
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menghapus data Kejiwaan",
              color: "success",
            });
            this.$router.replace({ query: null });
          } else {
            this.loadingDeleteGroup = false;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menghapus data Kejiwaan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.loadingDeleteGroup = false;
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menghapus data Kejiwaan",
            color: "error",
          });
        });
    },
  },
  computed: {
    questionLength() {
      return this.questions.length + 1;
    },
    totalQuestion() {
      return this.questions.length;
    },
    isAvailable() {
      return this.detail?.secureId;
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
