<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row justify-space-between align-center">
      <p class="header-3 mb-0">Kejiwaan</p>
      <v-expand-transition>
        <v-btn
          v-if="!modeAdd"
          @click="() => handleAddPaket()"
          color="primary"
          class="no-uppercase"
        >
          Tambah Paket Soal
        </v-btn>
      </v-expand-transition>
    </div>
    <template v-for="(item, index) in items">
      <div
        @click="() => handleAddSoal(item)"
        v-if="!item.modeAdd"
        class="white my-6 px-8 pt-6 pb-10 rounded-lg pointer"
        :key="index"
      >
        <div class="d-flex flex-row justify-space-between align-center">
          <p class="header-3 mb-0">{{ item.title }}</p>
          <div class="d-flex flex-row align-center">
            <p class="label-style mb-0 mx-4">
              {{ !item.is_active ? "Tidak Aktif" : "Aktif" }}
            </p>
            <v-switch
              @click.stop="() => {}"
              @change="(e) => handleClickActivation(item, index, e)"
              dense
              :disabled="item.loadingActivate"
              :loading="item.loadingActivate"
              v-model="item.is_active"
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
                <v-list-item @click="() => handleAddSoal(item)" link>
                  <v-icon small class="mr-4">mdi-plus</v-icon>
                  <p class="selection-item ma-0">Tambah Soal</p>
                </v-list-item>
                <v-list-item @click="() => handleEdit(item, index)" link>
                  <img class="mr-4" src="@/assets/icons/edit-outlined.svg" />
                  <p class="selection-item ma-0">Edit Data</p>
                </v-list-item>
                <v-list-item
                  :disabled="item.loadingDelete"
                  @click="() => handleDelete(item, index)"
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
        <p
          class="text-subtitle-2 my-1 font-weight-light subtitlegraytext--text"
        >
          {{ item.description }}
        </p>
        <div class="d-flex flex-row align-center mt-12">
          <div class="d-flex flex-row align-center mr-6">
            <img class="mr-2" src="@/assets/icons/sheet.svg" />
            <p class="selection-item font-weight-medium ma-0">
              {{ item.total_soal }} Soal
            </p>
          </div>
          <div class="d-flex flex-row align-center">
            <img class="mr-2" src="@/assets/icons/time.svg" />
            <p class="selection-item font-weight-medium ma-0">
              {{ item.time }} Menit
            </p>
          </div>
        </div>
      </div>
      <!-- Edited Mode -->
      <v-form
        v-else
        id="edited-form"
        ref="formEdit"
        v-model="validEdited"
        @submit.prevent="() => handleSubmit(index, 'edit')"
        :key="`else-${index}`"
      >
        <div
          class="d-flex flex-column white my-6 px-8 py-10 rounded-lg"
          :key="`else-${index}`"
        >
          <div class="d-flex flex-row justify-space-between align-start">
            <div class="d-flex flex-column" style="width: 344px">
              <p class="label-style mb-1">Nama Paket Soal</p>
              <v-text-field
                v-model="edited.title"
                placeholder="Nama Paket Soal"
                :rules="[(v) => !!v || 'Field ini tidak boleh kosong']"
                filled
                outlined
                dense
                class="rounded"
              />
            </div>
            <div class="d-flex flex-column align-center">
              <p class="text-caption font-weight-light mb-1">
                Total Menit / Paket
              </p>
              <Counter @on-change="(e) => handleChange(e, 'edit')" />
            </div>
          </div>
          <div class="d-flex flex-row justify-space-between mt-2">
            <v-text-field
              v-model="edited.description"
              style="max-width: 344px"
              placeholder="Deskripsi Paket Soal"
              hide-details
              class="custom-padding"
            />
            <div class="d-flex flex-row align-self-end mt-4">
              <v-btn
                color="primary"
                @click="() => handleCancel(index, 'edit')"
                class="no-uppercase depressed mr-6"
                outlined
              >
                Batal
              </v-btn>
              <v-btn
                :loading="item.loadingEdit"
                :disabled="!validEdited"
                type="submit"
                form="edited-form"
                color="primary"
                class="no-uppercase depressed"
              >
                Simpan
              </v-btn>
            </div>
          </div>
        </div>
      </v-form>
    </template>
    <ContentNotFound
      message="Kejiwaan Group Not Found"
      :loading="loading"
      v-if="!isAvailable"
    >
      <template v-slot:action>
        <v-btn depressed @click="() => getList()" color="default" class="px-10">
          <v-icon class="mr-1" small>mdi-reload</v-icon>
          Reload
        </v-btn>
      </template>
    </ContentNotFound>
    <v-expand-transition>
      <v-form
        v-if="modeAdd"
        id="add-form"
        ref="form"
        v-model="validSubmit"
        @submit.prevent="() => handleSubmit()"
      >
        <div class="d-flex flex-column white px-8 py-10 rounded-lg">
          <div class="d-flex flex-row justify-space-between align-start">
            <div class="d-flex flex-column" style="width: 344px">
              <p class="label-style mb-1">Nama Paket Soal</p>
              <v-text-field
                v-model="payload.title"
                placeholder="Nama Paket Soal"
                :rules="[(v) => !!v || 'Field ini tidak boleh kosong']"
                filled
                outlined
                dense
                class="rounded"
              />
            </div>
            <div class="d-flex flex-column align-center">
              <p class="text-caption font-weight-light mb-1">
                Total Menit / Paket
              </p>
              <Counter @on-change="(e) => handleChange(e)" />
            </div>
          </div>
          <div class="d-flex flex-row justify-space-between mt-2">
            <v-text-field
              v-model="payload.description"
              style="max-width: 344px"
              placeholder="Deskripsi Paket Soal"
              hide-details
              class="custom-padding"
            />
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
                :disabled="!validSubmit"
                type="submit"
                form="add-form"
                color="primary"
                class="no-uppercase depressed"
              >
                Simpan
              </v-btn>
            </div>
          </div>
        </div>
      </v-form>
    </v-expand-transition>
  </div>
</template>

<script>
import GroupService from "@/services/resources/group.service";
const Counter = () => import("@/components/Counter");
const ContentNotFound = () => import("@/components/Content/NotFound");

export default {
  components: {
    ContentNotFound,
    Counter,
  },
  data() {
    return {
      validEdited: false,
      validSubmit: false,
      loading: false,
      items: [],
      payload: {
        secureId: null,
        title: null,
        description: null,
        is_active: false,
        time: 0,
        modeAdd: false,
        loadingDelete: false,
        loadingActivate: false,
        loadingEdit: false,
      },
      edited: {
        secureId: null,
        title: null,
        description: null,
        is_active: false,
        time: 0,
        modeAdd: false,
        loadingDelete: false,
        loadingActivate: false,
        loadingEdit: false,
      },
      modeAdd: false,
      loadingSubmit: false,
    };
  },
  computed: {
    isAvailable() {
      return this.items.length > 0;
    },
  },
  activated() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      this.items = [];
      GroupService.getListKejiwaan()
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.items = [...result];
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
    handleAddPaket() {
      this.modeAdd = !this.modeAdd;
      // Reset Open Edited Section
      this.items.map((e) => (e.modeAdd = false));
      this.resetEditVariable();

      // Going to the last section of the website
      this.$vuetify.goTo(9999, {
        duration: 1500,
        offset: 0,
        easing: "easeInOutCubic",
      });
    },
    handleCancel(index, type = "add") {
      if (type == "edit" && this.items[index]?.secureId) {
        this.items[index].modeAdd = false;
        this.resetEditVariable();
      } else {
        this.$vuetify.goTo(0, {
          duration: 500,
          offset: 0,
          easing: "easeInOutCubic",
        });
        this.modeAdd = false;
      }
    },
    handleEdit(item, index) {
      this.edited = {
        ...item,
      };
      this.modeAdd = false;
      this.items.map((e) => (e.modeAdd = false));
      this.items[index].modeAdd = true;
    },
    handleClickActivation(item, index, event) {
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
            this.activateData(item, index, event);
          } else {
            this.items[index].is_active = !event;
          }
        },
      });
    },
    activateData(item, index, event) {
      this.items[index].loadingActivate = true;
      GroupService.activationKejiwaan({
        secureId: item.secureId,
        is_active: event,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.items[index].is_active = event;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Berhasil ${
                event ? "mengaktifkan" : "menonaktifkan"
              } status soal`,
              color: "success",
            });
          } else {
            this.items[index].is_active = !event;
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
          this.items[index].is_active = !event;
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: `Gagal ${
              event ? "mengaktifkan" : "menonaktifkan"
            } status soal`,
            color: "error",
          });
        })
        .finally(() => (this.items[index].loadingActivate = false));
    },
    handleSubmit(index, type = "add") {
      if (this.$refs[type == "add" ? "form" : "formEdit"].validate()) {
        if (type == "edit") this.requestEdit(index);
        else this.requestAdd();
      }
    },
    requestEdit(index) {
      this.items[index].loadingEdit = true;
      GroupService.insertDataKejiwaan({
        secureId: this.edited.secureId,
        title: this.edited.title,
        description: this.edited.description,
        time: this.edited.time,
        is_active: this.edited.is_active,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.items[index].modeAdd = false;
            this.resetEditVariable();
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menyimpan data Kejiwaan",
              color: "success",
            });
            this.getList();
          } else {
            this.items[index].loadingEdit = false;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menyimpan data Kejiwaan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          this.items[index].loadingEdit = false;
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menyimpan data Kejiwaan",
            color: "error",
          });
        });
    },
    requestAdd() {
      this.loadingSubmit = true;
      GroupService.insertDataKejiwaan({
        title: this.payload.title,
        description: this.payload.description,
        time: this.payload.time,
        is_active: this.payload.is_active,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.modeAdd = false;
            this.resetVariable();
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil membuat data Kejiwaan",
              color: "success",
            });
            this.getList();
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal membuat data Kejiwaan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal membuat data Kejiwaan",
            color: "error",
          });
        })
        .finally(() => {
          this.loadingSubmit = false;
        });
    },
    handleChange(e, type = "add") {
      if (type == "edit") {
        this.edited.time = parseInt(e);
      } else {
        this.payload.time = parseInt(e);
      }
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
    deleteData(item, index) {
      this.items[index].loadingDelete = true;
      GroupService.deleteKejiwaan(item.secureId)
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menghapus data Kejiwaan",
              color: "success",
            });
            this.getList();
          } else {
            this.items[index].loadingDelete = false;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menghapus data Kejiwaan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          this.items[index].loadingDelete = false;
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menghapus data Kejiwaan",
            color: "error",
          });
        });
    },
    handleAddSoal(item) {
      this.$router.replace({
        query: { kejiwaanSecureId: item.secureId },
      });
    },
    resetVariable() {
      this.payload = {
        secureId: null,
        title: null,
        description: null,
        is_active: false,
        time: 0,
        modeAdd: false,
        loadingDelete: false,
      };
    },
    resetEditVariable() {
      this.edited = {
        secureId: null,
        title: null,
        description: null,
        is_active: false,
        time: 0,
        modeAdd: false,
        loadingDelete: false,
      };
    },
  },
};
</script>

<style scoped>
.label-style {
  font-family: Inter !important;
  color: #9b9b9b !important;
}

.v-text-field--outlined >>> fieldset {
  border-color: transparent;
  background: #f8f6fb;
}

.quantity-count {
  border: 1px solid #e0e0e0;
}
</style>
