<template>
  <div class="d-flex flex-column">
    <p class="text-h5 mb-3" style="font-family: Inter !important">
      {{ detail.title }}
    </p>
    <p class="text-caption label-caption mb-5">
      {{ detail.description }}
    </p>
    <ContentNotFound
      message="Kecerdasan Question's Not Found"
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
            <p
              v-if="e.question.type == 'text'"
              class="font-question font-inter mb-8"
            >
              {{ i + 1 }}. {{ e.question.question }}
            </p>
            <div v-else class="font-question font-inter mb-8 d-flex flex-row">
              <p class="mr-2">{{ i + 1 }}.</p>
              <img :src="e.question.question" height="100px" />
            </div>
            <div
              v-for="(e2, i2) in e.answerList"
              :key="`answer-${i2}`"
              class="d-flex flex-row mx-5 justify-space-between my-2"
            >
              <p v-if="e2.type == 'text'" class="font-answer font-inter">
                {{ e2.symbol }}. {{ e2.answer }}
              </p>
              <div v-else class="d-flex flex-row">
                <p class="font-answer font-inter mr-2">{{ e2.symbol }}.</p>
                <img :src="e2.answer" height="40px" />
              </div>
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
              <input
                accept="image/jpg"
                type="file"
                :ref="`dataFile-question-${i}`"
                id="dataFile"
                hidden
                :value="file"
                @change="
                  (event) => handleUploadImageEdit('question', event, i + 1)
                "
              />
              <v-textarea
                v-if="edited.question.type == 'text'"
                v-model="edited.question.question"
                hide-details
                filled
                outlined
                dense
                class="rounded"
              >
                <template #append>
                  <v-icon
                    @click="() => $refs[`dataFile-question-${i}`][0].click()"
                    class="answered"
                  >
                    mdi-upload
                  </v-icon>
                </template>
              </v-textarea>
              <div v-else class="font-question font-inter mb-8 d-flex flex-row">
                <p class="mr-2">{{ i + 1 }}.</p>
                <div class="d-flex flex-row">
                  <img
                    height="100px"
                    :src="edited.question.question"
                    alt="answer image"
                  />
                  <v-btn
                    @click="() => handleRemoveImageEdit('question', i + 1)"
                    class="mx-2"
                    color="red"
                    icon
                    :loading="edited.question.loadingUpload"
                  >
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                </div>
              </div>
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
              <template v-if="ed.type == 'text'">
                <input
                  accept="image/jpg"
                  type="file"
                  :ref="`dataFile-answer-${index}`"
                  id="dataFile"
                  hidden
                  :value="file"
                  @change="
                    (event) =>
                      handleUploadImageEdit('answer', event, i + 1, index)
                  "
                />
                <v-text-field
                  v-model="ed.answer"
                  hide-details
                  filled
                  outlined
                  dense
                  class="rounded"
                >
                  <template #append>
                    <v-icon
                      @click="
                        () => $refs[`dataFile-answer-${index}`][0].click()
                      "
                      class="answered"
                    >
                      mdi-upload
                    </v-icon>
                  </template>
                </v-text-field>
              </template>
              <template v-else>
                <img
                  height="40px"
                  width="40px"
                  :src="ed.answer"
                  alt="answer image"
                />
                <v-btn
                  @click="() => handleRemoveImageEdit('answer', i + 1, index)"
                  class="mx-2"
                  color="red"
                  icon
                  :loading="edited.answerList[index].loadingUpload"
                >
                  <v-icon> mdi-close </v-icon>
                </v-btn>
              </template>
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
              <template v-if="item.question.type == 'text'">
                <input
                  accept="image/jpg"
                  type="file"
                  ref="dataFile"
                  id="dataFile"
                  hidden
                  :value="file"
                  @change="
                    (event) =>
                      handleUploadImageAdd('question', event, questionLength)
                  "
                />
                <v-textarea
                  v-model="item.question.question"
                  hide-details
                  filled
                  outlined
                  dense
                  class="rounded"
                  :loading="item.question.loadingUpload"
                >
                  <template #append>
                    <v-icon
                      @click="() => $refs.dataFile.click()"
                      class="answered"
                    >
                      mdi-upload
                    </v-icon>
                  </template>
                </v-textarea>
              </template>
              <div v-else class="d-flex flex-row">
                <img
                  height="100px"
                  :src="item.question.question"
                  alt="answer image"
                />
                <v-btn
                  @click="
                    () => handleRemoveImageAdd('question', questionLength)
                  "
                  class="mx-2"
                  color="red"
                  icon
                  :loading="item.question.loadingUpload"
                >
                  <v-icon> mdi-close </v-icon>
                </v-btn>
              </div>
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
              <template v-if="payload.type == 'text'">
                <input
                  accept="image/jpg"
                  type="file"
                  :ref="`dataFile-answer-${index}`"
                  id="dataFile"
                  hidden
                  :value="file"
                  @change="
                    (event) =>
                      handleUploadImageAdd(
                        'answer',
                        event,
                        questionLength,
                        index
                      )
                  "
                />
                <v-text-field
                  v-model="payload.answer"
                  hide-details
                  filled
                  outlined
                  dense
                  class="rounded"
                  :loading="payload.loadingUpload"
                >
                  <template #append>
                    <v-icon
                      @click="
                        () => $refs[`dataFile-answer-${index}`][0].click()
                      "
                      class="answered"
                    >
                      mdi-upload
                    </v-icon>
                  </template>
                </v-text-field>
              </template>
              <template v-else>
                <img
                  height="40px"
                  width="40px"
                  :src="payload.answer"
                  alt="answer image"
                />
                <v-btn
                  @click="
                    () => handleRemoveImageAdd('answer', questionLength, index)
                  "
                  class="mx-2"
                  color="red"
                  icon
                  :loading="item.answerList[index].loadingUpload"
                >
                  <v-icon> mdi-close </v-icon>
                </v-btn>
              </template>
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
import QuestionService from "@/services/resources/Questions/kecerdasan.service";
const ContentNotFound = () => import("@/components/Content/NotFound");

export default {
  components: {
    ContentNotFound,
  },
  props: {
    kecerdasanSecureId: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      id: this.$route.query?.kecerdasanSecureId,
      file: null,
      lastMod: 0,
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
          type: "text",
          loadingUpload: false,
        },
        modeAdd: false,
        answerList: [
          {
            symbol: "A",
            answer: null,
            value: 0,
            type: "text",
            loadingUpload: false,
          },
          {
            symbol: "B",
            answer: null,
            value: 0,
            type: "text",
            loadingUpload: false,
          },
          {
            symbol: "C",
            answer: null,
            value: 0,
            type: "text",
            loadingUpload: false,
          },
          {
            symbol: "D",
            answer: null,
            value: 0,
            type: "text",
            loadingUpload: false,
          },
          {
            symbol: "E",
            answer: null,
            value: 0,
            type: "text",
            loadingUpload: false,
          },
        ],
      },
      edited: {
        groupSecureId: null,
        question: {
          question: null,
          secureId: null,
          type: "text",
          loadingUpload: false,
        },
        modeAdd: false,
        loadingDelete: false,
        answerList: [
          {
            symbol: "A",
            answer: null,
            value: 0,
            type: "text",
            loadingUpload: false,
          },
          {
            symbol: "B",
            answer: null,
            value: 0,
            type: "text",
            loadingUpload: false,
          },
          {
            symbol: "C",
            answer: null,
            value: 0,
            type: "text",
            loadingUpload: false,
          },
          {
            symbol: "D",
            answer: null,
            value: 0,
            type: "text",
            loadingUpload: false,
          },
          {
            symbol: "E",
            answer: null,
            value: 0,
            type: "text",
            loadingUpload: false,
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
        secureId: this.kecerdasanSecureId || this.id,
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
              message: result || "Gagal memuat data Kecerdasan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal memuat data Kecerdasan",
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
          type: "text",
        },
        groupSecureId: null,
        answerList: [
          {
            symbol: "A",
            answer: null,
            value: 0,
            type: "text",
          },
          {
            symbol: "B",
            answer: null,
            value: 0,
            type: "text",
          },
          {
            symbol: "C",
            answer: null,
            value: 0,
            type: "text",
          },
          {
            symbol: "D",
            answer: null,
            value: 0,
            type: "text",
          },
          {
            symbol: "E",
            answer: null,
            value: 0,
            type: "text",
          },
        ],
      });
    },
    resetEditVariable() {
      this.edited = this.$_.cloneDeep({
        question: {
          question: null,
          secureId: null,
          type: "text",
        },
        groupSecureId: null,
        loadingDelete: false,
        modeAdd: false,
        answerList: [
          {
            symbol: "A",
            answer: null,
            value: 0,
            type: "text",
          },
          {
            symbol: "B",
            answer: null,
            value: 0,
            type: "text",
          },
          {
            symbol: "C",
            answer: null,
            value: 0,
            type: "text",
          },
          {
            symbol: "D",
            answer: null,
            value: 0,
            type: "text",
          },
          {
            symbol: "E",
            answer: null,
            value: 0,
            type: "text",
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
      GroupService.activationKecerdasan({
        secureId: this.kecerdasanSecureId || this.id,
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
        groupSecureId: this.kecerdasanSecureId || this.id,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil mengubah data soal Kecerdasan",
              color: "success",
            });
            this.modeEdit = false;
            this.questions[i] = { ...result };
            this.resetEditVariable();
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal mengubah data soal Kecerdasan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal mengubah data soal Kecerdasan",
            color: "error",
          });
        })
        .finally(() => (this.loadingSubmit = false));
    },
    requestSubmit() {
      this.loadingSubmit = true;
      QuestionService.insertData({
        ...this.item,
        groupSecureId: this.kecerdasanSecureId || this.id,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menambahkan data soal Kecerdasan",
              color: "success",
            });
            this.modeAdd = false;
            this.resetVariable();
            this.questions.push(result);
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menambahkan data soal Kecerdasan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menambahkan data soal Kecerdasan",
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
        groupSecureId: this.id,
        secureId: item?.question?.secureId,
        question: `Pertanyaan-${index + 1}`,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menghapus data Kecerdasan",
              color: "success",
            });
            this.questions.splice(index, 1);
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menghapus data Kecerdasan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menghapus data Kecerdasan",
            color: "error",
          });
        })
        .finally(() => (this.loadingDelete = false));
    },
    deleteGroup() {
      this.loadingDeleteGroup = true;
      GroupService.deleteKecerdasan(this.kecerdasanSecureId || this.id)
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menghapus data Kecerdasan",
              color: "success",
            });
            this.$router.replace({ query: null });
          } else {
            this.loadingDeleteGroup = false;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menghapus data Kecerdasan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.loadingDeleteGroup = false;
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menghapus data Kecerdasan",
            color: "error",
          });
        });
    },
    async uploadImage(no, file, fileName, loading, callback) {
      let formData = new FormData();
      formData.append("file", file);
      loading && loading(true);

      QuestionService.uploadPhoto(formData, {
        secureId: this.id,
        question: `Pertanyaan-${no}`,
        fileName,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            callback && callback(result);
          } else {
            console.error(result);
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Gagal upload gambar",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal upload gambar",
            color: "error",
          });
        })
        .finally(() => {
          loading && loading(false);
        });
    },
    async deleteImage(no, fileName, loading, callback) {
      loading && loading(true);
      QuestionService.deletePhoto({
        secureId: this.id,
        question: `Pertanyaan-${no}`,
        fileName,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            callback && callback();
          } else {
            console.error(result);
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Gagal upload gambar",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal upload gambar",
            color: "error",
          });
        })
        .finally(() => {
          loading && loading(false);
        });
    },
    handleUploadImageAdd(type = "question", event, pertanyaanNo, index = 0) {
      const file = event.target.files?.[0];

      if (type == "question") {
        this.uploadImage(
          pertanyaanNo,
          file,
          `pertanyaan.jpg`,
          (data) => {
            this.item.question = { ...this.item.question, loadingUpload: data };
          },
          (data) => {
            this.item.question.type = "image";
            this.item.question.question = `${data.imageUri}?lastMod=${this
              .lastMod++}`;
          }
        );
      } else {
        this.uploadImage(
          pertanyaanNo,
          file,
          `jawaban-${index + 1}.jpg`,
          (data) => {
            this.item.answerList.splice(index, 1, {
              ...this.item.answerList[index],
              loadingUpload: data,
            });
          },
          (data) => {
            this.item.answerList[index].type = "image";
            this.item.answerList[index].answer = `${
              data.imageUri
            }?lastMod=${this.lastMod++}`;
          }
        );
      }
    },
    handleRemoveImageAdd(type = "question", pertanyaanNo, index = 0) {
      if (type == "question") {
        const fileName =
          this.item.question.question.split("/")[
            this.item.question.question.split("/").length - 1
          ];
        this.deleteImage(
          pertanyaanNo,
          fileName,
          (data) => {
            this.item.question.loadingUpload = data;
          },
          () => {
            this.item.question.type = "text";
            this.item.question.question = null;
          }
        );
      } else {
        const fileName =
          this.item.answerList[index].answer.split("/")[
            this.item.answerList[index].answer.split("/").length - 1
          ];
        this.deleteImage(
          pertanyaanNo,
          fileName,
          (data) => {
            this.item.answerList[index].loadingUpload = data;
          },
          () => {
            this.item.answerList[index].type = "text";
            this.item.answerList[index].answer = null;
          }
        );
      }
    },
    handleUploadImageEdit(type = "question", event, pertanyaanNo, index = 0) {
      const file = event.target.files?.[0];
      console.log(event.target.files);
      if (type == "question") {
        this.uploadImage(
          pertanyaanNo,
          file,
          `pertanyaan.jpg`,
          (data) => {
            this.edited.question = {
              ...this.edited.question,
              loadingUpload: data,
            };
          },
          (data) => {
            this.edited.question.type = "image";
            this.edited.question.question = `${data.imageUri}?lastMod=${this
              .lastMod++}`;
          }
        );
      } else {
        this.uploadImage(
          pertanyaanNo,
          file,
          `jawaban-${index + 1}.jpg`,
          (data) => {
            this.edited.answerList.splice(index, 1, {
              ...this.edited.answerList[index],
              loadingUpload: data,
            });
          },
          (data) => {
            this.edited.answerList[index].type = "image";
            this.edited.answerList[index].answer = `${
              data.imageUri
            }?lastMod=${this.lastMod++}`;
          }
        );
      }
    },
    handleRemoveImageEdit(type = "question", pertanyaanNo, index = 0) {
      if (type == "question") {
        this.edited.question.type = "text";
        this.edited.question.question = null;
      } else {
        this.edited.answerList[index].type = "text";
        this.edited.answerList[index].answer = null;
      }
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
  watch: {
    file: {
      handler(val) {
        console.log(val);
      },
      deep: true,
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
