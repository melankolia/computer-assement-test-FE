<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row justify-space-between align-center">
      <div class="d-flex flex-column" style="width: 25%">
        <p class="header-3 mb-5">New Kecermatan</p>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          placeholder="Cari Paket Soal"
          solo
          class="rounded"
        >
        </v-text-field>
      </div>
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
              {{ item.totalMinutes }} Menit {{ item.totalSeconds }} Detik ({{
                item.minutes
              }}
              Menit {{ item.seconds }} Detik / Section)
            </p>
          </div>
          <div class="d-flex flex-row align-center mx-4">
            <v-icon class="mr-1">mdi-timelapse</v-icon>
            <p class="selection-item font-weight-medium mb-0 mt-2">
              {{ item.time_interval }} Detik
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
            <div class="d-flex flex-row">
              <div class="d-flex flex-column align-end justify-end mb-1 mr-6">
                <v-checkbox
                  v-model="edited.is_random"
                  color="primary"
                  hide-details
                >
                  <template #label>
                    <p class="text-caption font-weight-light mb-0">Acak Soal</p>
                  </template>
                </v-checkbox>
              </div>
              <div class="d-flex flex-column">
                <p class="text-caption font-weight-light mb-1">
                  Total Waktu / Section
                </p>
                <div class="d-flex flex-row">
                  <div class="d-flex flex-column mr-4">
                    <p class="text-caption font-weight-light mb-1">Menit</p>
                    <Counter
                      :data="edited.minutes"
                      @on-change="(e) => handleChange(e, 'minutes', 'edit')"
                    />
                  </div>
                  <div class="d-flex flex-column">
                    <p class="text-caption font-weight-light mb-1">Detik</p>
                    <Counter
                      :data="edited.seconds"
                      @on-change="(e) => handleChange(e, 'seconds', 'edit')"
                    />
                  </div>
                </div>
                <div class="d-flex flex-column mr-4">
                  <p class="text-caption font-weight-light mb-1 mt-2">
                    Interval <br />
                    Detik
                  </p>
                  <Counter
                    :data="edited.time_interval"
                    @on-change="(e) => handleInterval(e, 'edited')"
                  />
                </div>
              </div>
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
      message="Kecermatan Group Not Found"
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
            <div class="d-flex flex-row">
              <div class="d-flex flex-column align-end justify-end mb-1 mr-6">
                <v-checkbox
                  v-model="payload.is_random"
                  color="primary"
                  hide-details
                >
                  <template #label>
                    <p class="text-caption font-weight-light mb-0">Acak Soal</p>
                  </template>
                </v-checkbox>
              </div>
              <div class="d-flex flex-column">
                <p class="text-caption font-weight-light mb-1">
                  Total Waktu / Section
                </p>
                <div class="d-flex flex-row">
                  <div class="d-flex flex-column mr-4">
                    <p class="text-caption font-weight-light mb-1">Menit</p>
                    <Counter
                      :data="payload.minutes"
                      @on-change="(e) => handleChange(e, 'minutes')"
                    />
                  </div>
                  <div class="d-flex flex-column">
                    <p class="text-caption font-weight-light mb-1">Detik</p>
                    <Counter
                      :data="payload.seconds"
                      @on-change="(e) => handleChange(e, 'seconds')"
                    />
                  </div>
                </div>
                <div class="d-flex flex-column mr-4">
                  <p class="text-caption font-weight-light mb-1 mt-2">
                    Interval <br />
                    Detik
                  </p>
                  <Counter
                    :data="payload.time_interval"
                    @on-change="(e) => handleInterval(e)"
                  />
                </div>
              </div>
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
const Counter = () => import("@/components/CounterKecermatan");
const ContentNotFound = () => import("@/components/Content/NotFound");

export default {
  components: {
    Counter,
    ContentNotFound,
  },
  data() {
    return {
      search: null,
      validEdited: false,
      validSubmit: false,
      loading: false,
      items: [],
      payload: {
        secureId: null,
        title: null,
        description: null,
        is_active: false,
        is_random: false,
        time: 1,
        time_interval: 0,
        minutes: 1,
        seconds: 0,
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
        is_random: false,
        time: 1,
        time_interval: 0,
        minutes: 1,
        seconds: 0,
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
  watch: {
    search: {
      handler(val) {
        this.fetchListDebounce(() => this.getList(val));
      },
      deep: true,
    },
  },
  activated() {
    this.getList();
  },
  methods: {
    getList(search = null) {
      this.loading = true;
      this.items = [];
      GroupService.getListNewKecermatan({
        search,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            result.map((e) => {
              let totalTime = e.time * e.total_section;
              e.totalMinutes = parseInt(totalTime / 60, 10);
              e.totalSeconds = parseInt(totalTime % 60, 10);
              e.minutes = parseInt(e.time / 60, 10);
              e.seconds = parseInt(e.time % 60, 10);
            });
            this.items = [...result];
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal memuat data New Kecermatan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal memuat data New Kecermatan",
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
      this.$vuetify.goTo("#last-section", {
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
        ...this.edited,
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
      GroupService.activationNewKecermatan({
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
      if (type == "add") this.$refs.form.validate() && this.requestAdd();
      else {
        this.$refs.formEdit.every((e) => e.validate()) &&
          this.requestEdit(index);
      }
    },
    requestEdit(index) {
      this.items[index].loadingEdit = true;
      const time = this.edited.minutes * 60 + this.edited.seconds;

      GroupService.insertDataNewKecermatan({
        secureId: this.edited.secureId,
        title: this.edited.title,
        description: this.edited.description,
        time,
        time_interval: this.edited.time_interval,
        is_active: this.edited.is_active,
        is_random: this.edited.is_random,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.items[index].modeAdd = false;
            this.resetEditVariable();
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menyimpan data New Kecermatan",
              color: "success",
            });
            this.getList();
          } else {
            this.items[index].loadingEdit = false;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menyimpan data New Kecermatan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.items[index].loadingEdit = false;
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menyimpan data Kecermatan",
            color: "error",
          });
        });
    },
    requestAdd() {
      const time = this.payload.minutes * 60 + this.payload.seconds;

      this.loadingSubmit = true;
      GroupService.insertDataNewKecermatan({
        title: this.payload.title,
        description: this.payload.description,
        time,
        time_interval: this.payload.time_interval,
        is_active: this.payload.is_active,
        is_random: this.payload.is_random,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.modeAdd = false;
            this.resetVariable();
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil membuat data New Kecermatan",
              color: "success",
            });
            this.getList();
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal membuat data New Kecermatan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal membuat data Kecermatan",
            color: "error",
          });
        })
        .finally(() => {
          this.loadingSubmit = false;
        });
    },
    handleChange(e, unit = "seconds", type = "add") {
      const mode = type == "add" ? "payload" : "edited";
      if (unit == "seconds") {
        if (+e >= 60) {
          this[mode].minutes++;
          this[mode].seconds = 0;
        } else if (+e < 0 && this[mode].minutes > 0) {
          this[mode].minutes--;
          this[mode].seconds = 59;
        } else if (+e <= 0 || !e) this[mode].seconds = 0;
        else this[mode].seconds = +e;
      } else if (unit == "minutes") {
        if (+e >= 0) this[mode].minutes = parseInt(e);
        else if (+e <= 0) this[mode].minutes = 0;
      }
    },
    handleInterval(e, type = "add") {
      const mode = type == "add" ? "payload" : "edited";
      if (+e >= 0) this[mode].time_interval = parseInt(e);
      else if (+e <= 0) this[mode].time_interval = 0;
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
      GroupService.deleteNewKecermatan(item.secureId)
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menghapus data New Kecermatan",
              color: "success",
            });
            this.getList();
          } else {
            this.items[index].loadingDelete = false;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal menghapus data New Kecermatan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.items[index].loadingDelete = false;
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menghapus data Kecermatan",
            color: "error",
          });
        });
    },
    handleAddSoal(item) {
      this.$router.replace({
        query: { newKecermatanSecureId: item.secureId },
      });
    },
    resetVariable() {
      this.payload = {
        secureId: null,
        title: null,
        description: null,
        is_active: false,
        is_random: false,
        time: 1,
        minutes: 1,
        seconds: 0,
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
        is_random: false,
        time: 1,
        minutes: 1,
        seconds: 0,
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
