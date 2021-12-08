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
      <div class="d-flex flex-row align-center justify-space-between">
        <div class="d-flex flex-column">
          <p class="text-h5 mb-3" style="font-family: Inter !important">
            {{ detail.title }}
          </p>
          <p class="text-caption label-caption mb-5">
            {{ detail.description }}
          </p>
        </div>
        <v-expand-transition>
          <v-btn
            v-if="!modeAdd"
            @click="handleAddSection"
            text
            class="no-uppercase"
            color="primary"
          >
            <v-icon small>mdi-plus</v-icon>
            <p class="mb-0">Tambah Section</p>
          </v-btn>
        </v-expand-transition>
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
            <p class="selection-item font-weight-medium ma-0">
              {{ detail.time }} Menit
            </p>
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
                :disabled="loadingDelete"
                @click="() => handleDelete()"
                link
              >
                <img
                  v-if="!item.loadingDelete"
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
      <!-- Section Area -->
      <template v-for="(e, i) in sections">
        <div class="d-flex flex-row align-center" :key="`part-1-${i}`">
          <p class="section-font mb-0 mr-6">{{ e.title }}</p>
          <v-divider class="my-10" />
        </div>
        <div
          :key="`question-${i}`"
          class="d-flex flex-column white pt-12 rounded-lg mb-4"
        >
          <div class="d-flex flex-row justify-space-between px-12">
            <p v-if="!e.modeAdd" class="section-title-font mb-0">
              {{ e.title }}
            </p>
            <div v-else style="width: 344px">
              <v-text-field v-model="editedSection.title" hide-details />
            </div>
            <div class="d-flex flex-row align-center">
              <div class="d-flex flex-row align-center mr-6">
                <img class="mr-2" src="@/assets/icons/sheet.svg" />
                <p class="selection-item font-weight-medium ma-0">
                  {{ e.question.length }} Soal
                </p>
              </div>
              <div class="d-flex flex-row align-center mr-6">
                <img class="mr-2" src="@/assets/icons/time.svg" />
                <p class="selection-item font-weight-medium ma-0">
                  {{ detail.time }} Menit
                </p>
              </div>
            </div>
          </div>
          <v-divider class="mt-7 mb-6" />
          <div class="d-flex flex-column px-12 pb-12">
            <div class="d-flex flex-row justify-space-between mb-6">
              <p class="kolom-induk-font mb-0">Tabel Kolom Induk</p>
              <v-expand-transition>
                <v-menu v-if="!e.modeAdd" rounded left min-width="188px">
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
                    <v-list-item @click="() => handleEditSection(e, i)" link>
                      <img
                        class="mr-4"
                        src="@/assets/icons/edit-outlined.svg"
                      />
                      <p class="selection-item ma-0">Edit Data</p>
                    </v-list-item>
                    <v-list-item
                      :disabled="item.loadingDelete"
                      @click="() => handleDeleteSection(i)"
                      link
                    >
                      <img
                        v-if="!item.loadingDelete"
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
              </v-expand-transition>
            </div>
            <div class="d-flex flex-column caption-label">
              <div class="d-flex flex-row justify-space-between">
                <div class="d-flex flex-column">
                  <div class="d-flex flex-row align-center mb-3">
                    <p class="mb-0 pr-5">Baris 1</p>
                    <div
                      class="d-flex flex-row align-center"
                      style="max-width: 253px"
                      v-if="!e.modeAdd"
                    >
                      <v-text-field
                        v-for="(input, iInput) in e.firstRow"
                        :key="`first-row-${iInput}`"
                        v-model="sections[i].firstRow[iInput]"
                        hide-details
                        outlined
                        solo
                        dense
                        class="rounded mr-3"
                        disabled
                      />
                    </div>
                    <div
                      class="d-flex flex-row align-center"
                      style="max-width: 253px"
                      v-else
                    >
                      <v-text-field
                        v-for="(edit, iEdit) in editedSection.firstRow"
                        :key="`first-row-edit-${iEdit}`"
                        v-model="editedSection.firstRow[iEdit]"
                        hide-details
                        outlined
                        solo
                        dense
                        class="rounded mr-3"
                      />
                    </div>
                  </div>
                  <div class="d-flex flex-row align-center">
                    <p class="mb-0 pr-5">Baris 2</p>
                    <div
                      class="d-flex flex-row align-center"
                      style="max-width: 253px"
                      v-if="!e.modeAdd"
                    >
                      <v-text-field
                        v-for="(input2, iInput2) in e.secondRow"
                        :key="`second-row-${iInput2}`"
                        v-model="sections[i].secondRow[iInput2]"
                        hide-details
                        outlined
                        solo
                        dense
                        class="rounded mr-3"
                        disabled
                      />
                    </div>
                    <div
                      class="d-flex flex-row align-center"
                      style="max-width: 253px"
                      v-else
                    >
                      <v-text-field
                        v-for="(edited2, iEdit2) in editedSection.secondRow"
                        :key="`second-edot-row-${iEdit2}`"
                        v-model="editedSection.secondRow[iEdit2]"
                        hide-details
                        outlined
                        solo
                        dense
                        class="rounded mr-3"
                      />
                    </div>
                  </div>
                </div>
                <v-expand-transition>
                  <div v-if="e.modeAdd" class="d-flex flex-row align-end">
                    <v-btn
                      @click="() => handleCancelSection(i)"
                      class="no-uppercase mr-7"
                      color="primary"
                      depressed
                      outlined
                      :disabled="e.loadingSubmit"
                    >
                      Batal
                    </v-btn>
                    <v-btn
                      @click="() => handleSaveSection(i)"
                      :loading="e.loadingSubmit"
                      class="no-uppercase"
                      color="primary"
                      depressed
                    >
                      Simpan
                    </v-btn>
                  </div>
                </v-expand-transition>
              </div>
            </div>
          </div>
        </div>
        <!-- Question Area -->
        <div
          class="
            d-flex
            flex-row
            white
            py-3
            px-12
            mb-1
            rounded-lg
            justify-space-between
            black-border
            align-center
          "
          v-for="(q, j) in e.question"
          :key="`part-2-${i}-${j}`"
        >
          <div class="d-flex flex-row">
            <div class="d-flex flex-row align-center px-6">
              <p class="pr-5 mb-3 align-self-end no-question">{{ j + 1 }}.</p>
              <div class="d-flex flex-column">
                <p v-if="j == 0" class="caption-label mb-3">Soal</p>
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
                <p v-if="j == 0" class="caption-label mb-3">Jawaban (Poin)</p>
                <div
                  class="d-flex flex-row align-center"
                  style="max-width: 490px"
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
                      class="rounded mr-8"
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
              :disabled="sections[i].question[j].loadingSubmit"
            >
              Batal
            </v-btn>
            <v-btn
              :loading="sections[i].question[j].loadingSubmit"
              @click="() => handleSaveQuestion(q, i, j)"
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
              <v-list-item @click="() => handleEdit(q, i, j)" link>
                <img class="mr-4" src="@/assets/icons/edit-outlined.svg" />
                <p class="selection-item ma-0">Edit Data</p>
              </v-list-item>
              <v-list-item
                :disabled="q.loadingDelete"
                @click="() => handleDeleteQuestion(i, j)"
                link
              >
                <img
                  v-if="!q.loadingDelete"
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
        <v-expand-transition :key="`part-3-${i}`">
          <v-btn
            v-if="e.question.every((e2) => e2.modeAdd == false)"
            @click="() => handleAddSoal(i)"
            color="primary"
            class="no-uppercase my-5"
            outlined
          >
            Tambahkan Soal
          </v-btn>
        </v-expand-transition>
      </template>
    </template>
  </div>
</template>

<script>
import QuestionService from "@/services/resources/Questions/kecermatan.service";
import GroupService from "@/services/resources/group.service";
const ContentNotFound = () => import("@/components/Content/NotFound");

export default {
  components: {
    ContentNotFound,
  },
  props: {
    kecermatanSecureId: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      id: this.$route.query?.kecermatanSecureId,
      modeAdd: false,
      loading: false,
      loadingSubmit: false,
      loadingDelete: false,
      loadingActivate: false,
      detail: {
        secureId: null,
        title: null,
        time: 0,
        description: null,
        is_active: false,
      },

      // Default Value Properties
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

      // Edited Section Value Properties
      editedSection: {
        secureId: null,
        title: null,
        tableName: "Kolom Acuan Soal",
        firstRow: ["A", "B", "C", "D", "E"],
        secondRow: ["0", "0", "0", "0", "0"],
        question: [],
        modeAdd: false,
        loadingSubmit: false,
        loadingDelete: false,
      },
      defaultSection: {
        secureId: null,
        title: null,
        tableName: "Kolom Acuan Soal",
        firstRow: ["A", "B", "C", "D", "E"],
        secondRow: ["0", "0", "0", "0", "0"],
        modeAdd: false,
        loadingSubmit: false,
        loadingDelete: false,
      },

      // Edited Question Value Properties
      editedQuestion: {
        secureId: null,
        title: [0, 0, 0, 0],
        modeAdd: false,
        answerList: [
          {
            symbol: null,
            value: 0,
          },
          {
            symbol: null,
            value: 0,
          },
          {
            symbol: null,
            value: 0,
          },
          {
            symbol: null,
            value: 0,
          },
          {
            symbol: null,
            value: 0,
          },
        ],
      },
      defaultQuestion: {
        secureId: null,
        title: [0, 0, 0, 0],
        modeAdd: false,
        answerList: [
          {
            symbol: null,
            value: 0,
          },
          {
            symbol: null,
            value: 0,
          },
          {
            symbol: null,
            value: 0,
          },
          {
            symbol: null,
            value: 0,
          },
          {
            symbol: null,
            value: 0,
          },
        ],
      },

      // Data Sections Propertes
      sections: [],
    };
  },
  activated() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.loading = true;
      QuestionService.getDetail({
        secureId: this.kecermatanSecureId || this.id,
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
            this.sections = [...result.result];
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal memuat data Kecermatan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal memuat data Kecermatan",
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
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
    handleSaveQuestion(q, i, j) {
      this.sections[i].question.splice(j, 1, {
        ...this.sections[i].question[j],
        loadingSubmit: true,
      });

      QuestionService.insertQuestion({
        sectionSecureId: this.sections[i].secureId,
        secureId: q.secureId,
        question: q.title.join(", "),
        answerList: [...q.answerList],
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.sections[i].question.splice(j, {
              ...result,
            });
            this.sections[i].question[j].modeAdd = false;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menyimpan data Kecermatan",
              color: "success",
            });
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menyimpan data Kecermatan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menyimpan data Kecermatan",
            color: "error",
          });
        })
        .finally(() => {
          this.sections[i].question.splice(j, 1, {
            ...this.sections[i].question[j],
            loadingSubmit: false,
          });
        });
    },
    handleSaveSection(i) {
      const Payload = {
        groupSecureId: this.kecermatanSecureId || this.id,
        secureId: this.editedSection.secureId,
        title: this.editedSection.title,
        table_name: this.editedSection.tableName,
        first_row: this.editedSection.firstRow.join(", "),
        second_row: this.editedSection.secondRow.join(", "),
        modeAdd: this.editedSection.modeAdd,
        loadingSubmit: this.editedSection.loadingSubmit,
        loadingDelete: this.editedSection.loadingDelete,
      };

      this.requestInsert(Payload, i);
    },
    requestInsert(payload, i) {
      this.sections.splice(i, 1, {
        ...this.sections[i],
        loadingSubmit: true,
      });
      QuestionService.insertSection({ ...payload })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            // Insert Variable
            this.sections.splice(i, 1, {
              ...this.sections[i],
              secureId: result.secureId,
              title: result.title,
              firstRow: result.first_row,
              tableName: result.table_name,
              secondRow: result.second_row,
            });

            // Cleansing Data
            if (this.modeAdd) this.modeAdd = false;
            else this.resetEditSectionVariable();
            this.sections.splice(i, 1, {
              ...this.sections[i],
              modeAdd: false,
            });

            // Show snackbar
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Data berhasil disimpan",
              color: "success",
            });
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menyimpan data",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menyimpan data",
            color: "error",
          });
        })
        .finally(() => {
          this.sections.splice(i, 1, {
            ...this.sections[i],
            loadingSubmit: false,
          });
        });
    },
    handleCancelSection(i, type = "edit") {
      if (this.sections[i]?.secureId && type == "edit") {
        this.sections[i].modeAdd = false;
        this.resetEditSectionVariable();
      } else {
        this.sections.splice(i, 1);
        this.$vuetify.goTo(0, {
          duration: 500,
          offset: 0,
          easing: "easeInOutCubic",
        });
        this.modeAdd = false;
      }
    },
    handleEditSection(element, i) {
      this.sections.map((e2) => {
        e2.modeAdd = false;
        e2.question.map((e3) => {
          e3.modeAdd = false;
        });
      });

      this.sections.splice(i, 1, {
        ...this.sections[i],
        modeAdd: true,
      });

      this.editedSection = this.$_.cloneDeep(element);
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
    handleEdit(q, i, j) {
      this.sections.map((e, i2) => {
        e.modeAdd = false;
        e.question.map((e2, i3) => {
          if (e2.modeAdd == true) {
            if (this.sections[i2].question[i3].secureId) {
              this.sections[i2].question[i3] = {
                ...this.editedQuestion,
              };
            } else this.sections[i2].question.splice(i3, 1);
          }
          e2.modeAdd = false;
        });
      });

      this.sections[i].question.splice(j, 1, {
        ...this.sections[i].question[j],
        modeAdd: true,
      });

      this.editedQuestion = this.$_.cloneDeep(q);
    },
    handleCancel(i, j, type = "edit") {
      if (this.sections[i].question[j]?.secureId && type == "edit") {
        this.sections[i].question.splice(j, 1, {
          ...this.editedQuestion,
          modeAdd: false,
        });
        this.resetEditQuestionVariable();
      } else {
        this.sections[i].question.splice(j, 1);
      }
    },
    handleAddSection() {
      this.modeAdd = true;
      this.sections.push({
        title: null,
        tableName: "Kolom Acuan Soal",
        firstRow: ["A", "B", "C", "D", "E"],
        secondRow: [0, 0, 0, 0, 0],
        modeAdd: true,
        question: [],
      });

      // Going to the last section of the website
      this.$vuetify.goTo("#last-section", {
        duration: 1500,
        offset: 0,
        easing: "easeInOutCubic",
      });
    },
    resetEditSectionVariable() {
      this.editedSection = {
        secureId: this.defaultSection.secureId,
        title: this.defaultSection.title,
        tableName: this.defaultSection.tableName,
        firstRow: [...this.defaultSection.firstRow],
        secondRow: [...this.defaultSection.secondRow],
        modeAdd: this.defaultSection.modeAdd,
        loadingSubmit: this.defaultSection.loadingSubmit,
        loadingDelete: this.defaultSection.loadingDelete,
      };
    },
    resetEditQuestionVariable() {
      this.editedQuestion = {
        secureId: this.defaultQuestion.secureId,
        title: this.defaultQuestion.title,
        modeAdd: this.defaultQuestion.modeAdd,
        answerList: [...this.defaultQuestion.answerList],
      };
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
      GroupService.activationKecermatan({
        secureId: this.kecermatanSecureId || this.id,
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
    handleDelete(item, index) {
      this.$confirm({
        title: "Confirm",
        message: `Are you sure you want to delete this data ?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            this.deleteData(item, index);
          }
        },
      });
    },
    deleteData() {
      this.loadingDelete = true;
      GroupService.deleteKecermatan(this.kecermatanSecureId || this.id)
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menghapus data Kecermatan",
              color: "success",
            });
            this.$router.replace({ query: null });
          } else {
            this.loadingDelete = false;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menghapus data Kecermatan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.loadingDelete = false;
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menghapus data Kecermatan",
            color: "error",
          });
        });
    },
    handleDeleteSection(index) {
      this.$confirm({
        title: "Confirm",
        message: `Are you sure you want to delete this Section ?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            this.deleteDataSection(index);
          }
        },
      });
    },
    deleteDataSection(i) {
      this.sections[i].loadingDelete = true;
      QuestionService.deleteSection({ secureId: this.sections[i].secureId })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menghapus data Section's Kecermatan",
              color: "success",
            });
            this.sections.splice(i, 1);
          } else {
            this.sections[i].loadingDelete = true;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menghapus data Section's Kecermatan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.sections[i].loadingDelete = true;
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menghapus data Section's Kecermatan",
            color: "error",
          });
        });
    },
    handleDeleteQuestion(index, jndex) {
      this.$confirm({
        title: "Confirm",
        message: `Are you sure you want to delete this Question ?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            this.deleteDataQuestion(index, jndex);
          }
        },
      });
    },
    deleteDataQuestion(i, j) {
      this.sections[i].question[j].loadingDelete = true;
      QuestionService.deleteQuestion({
        secureId: this.sections[i].question[j].secureId,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menghapus data Question's Kecermatan",
              color: "success",
            });
            this.sections[i].question.splice(j, 1);
          } else {
            this.sections[i].loadingDelete = true;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menghapus data Question's Kecermatan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.sections[i].loadingDelete = true;
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menghapus data Question's Kecermatan",
            color: "error",
          });
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
      let total = 0;
      this.sections.map((e) => {
        total += e.question.length;
      });
      return total;
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
