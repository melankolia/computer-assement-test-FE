<template>
  <div class="px-6 py-12 mt-6">
    <p class="text-h4 font-weight-bold ma-0">Daftar Peserta</p>
    <v-row dense class="mt-9" align="center" justify="space-between">
      <v-col cols="12" xs="12" sm="4">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          placeholder="Cari Peserta"
          solo
          dense
          class="rounded"
        >
        </v-text-field>
      </v-col>
      <v-expand-transition>
        <v-col cols="12" xs="12" sm="4" align-self="end" v-if="!addMode">
          <v-btn @click="handleAdd" color="primary float-right no-uppercase">
            Tambah Peserta
          </v-btn>
        </v-col>
      </v-expand-transition>
    </v-row>
    <v-data-table
      :loading="loading"
      v-model="selected"
      :headers="pesertaHeaders"
      :items="items"
      hide-default-footer
      show-select
      show-expand
      single-expand
      :expanded.sync="expanded"
      item-key="secureId"
      class="mt-4"
    >
      <template #header.nama_lengkap="{ header }">
        <v-expand-transition>
          <p class="ma-0">
            {{ isSelected ? `${selectedLength} Selected` : header.text }}
          </p>
        </v-expand-transition>
      </template>
      <template #header.username="{ header }">
        <p class="ma-0">{{ !isSelected ? header.text : "" }}</p>
      </template>
      <template #header.password="{ header }">
        <p class="ma-0">{{ !isSelected ? header.text : "" }}</p>
      </template>
      <template #header.is_online="{ header }">
        <p class="ma-0">{{ !isSelected ? header.text : "" }}</p>
      </template>
      <template #header.data-table-expand="{ header }">
        <p v-if="!isSelected" class="ma-0">{{ header.text }}</p>
        <v-menu rounded left min-width="188px" v-else>
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
            <v-list-item @click="() => handleDelete(selected, 'multiple')" link>
              <img class="mr-4" src="@/assets/icons/delete-outlined.svg" />
              <p class="selection-item ma-0">Hapus Data</p>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template #item.is_online="{ item }">
        <div class="d-flex flex-row align-center justify-space-between">
          <v-chip
            small
            :color="item.is_online ? 'greencs' : 'graycs'"
            class="pr-4"
          >
            <v-icon :color="item.is_online ? 'greentext' : 'graytext'">
              mdi-circle-medium
            </v-icon>
            <span
              :class="item.is_online ? 'greentext--text' : 'graytext--text'"
              >{{ item.is_online ? "Aktif" : "Tidak Aktif" }}</span
            >
          </v-chip>
        </div>
      </template>
      <template #footer>
        <v-expand-transition>
          <div v-if="addMode">
            <v-form
              id="submit-form"
              ref="form"
              v-model="validSubmit"
              lazy-validation
              @submit.prevent="() => handleSave('submit')"
            >
              <div
                class="
                  d-flex
                  flex-row
                  px-12
                  py-8
                  justify-space-around
                  align-center
                  addbg
                "
              >
                <div style="width: 246px">
                  <p class="label-style mb-1">Nama Peserta</p>
                  <v-text-field
                    v-model="payload.nama_lengkap"
                    placeholder="Nama Peserta"
                    outlined
                    solo
                    dense
                    class="rounded"
                    :rules="[(v) => !!v || 'Field ini tidak boleh kosong']"
                  >
                  </v-text-field>
                </div>
                <div style="width: 246px">
                  <p class="label-style mb-1">Username</p>
                  <v-text-field
                    v-model="payload.username"
                    placeholder="Cari Peserta"
                    outlined
                    solo
                    dense
                    class="rounded"
                    :rules="[(v) => !!v || 'Field ini tidak boleh kosong']"
                  >
                  </v-text-field>
                </div>
                <div style="width: 246px">
                  <p class="label-style mb-1">Password</p>
                  <v-text-field
                    v-model="payload.password"
                    placeholder="Password"
                    outlined
                    solo
                    dense
                    class="rounded"
                    :rules="[(v) => !!v || 'Field ini tidak boleh kosong']"
                  >
                  </v-text-field>
                </div>
                <v-btn
                  :loading="loadingSubmit"
                  :disabled="!validSubmit"
                  type="submit"
                  form="submit-form"
                  color="primary"
                  class="no-uppercase mb-2"
                >
                  Simpan
                </v-btn>
              </div>
            </v-form>
          </div>
        </v-expand-transition>
      </template>
      <template #item.data-table-expand="{ item, expand, isExpanded }">
        <v-expand-transition>
          <v-menu
            rounded
            left
            min-width="188px"
            v-if="!isExpanded && !isSelected"
          >
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
                @click="() => handleEdit(item, () => expand(!isExpanded))"
                link
              >
                <img class="mr-4" src="@/assets/icons/edit-outlined.svg" />
                <p class="selection-item ma-0">Edit Data</p>
              </v-list-item>
              <v-list-item @click="() => handleDelete(item)" link>
                <img class="mr-4" src="@/assets/icons/delete-outlined.svg" />
                <p class="selection-item ma-0">Hapus Data</p>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            small
            depressed
            icon
            class="rounded-lg"
            @click="() => handleEdit(null, () => expand(!isExpanded))"
            v-else-if="isExpanded && !isSelected"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-expand-transition>
      </template>
      <template #expanded-item="{ headers }">
        <v-expand-transition>
          <td class="addbg" :colspan="headers.length">
            <v-form
              id="edited-form"
              ref="formEdit"
              v-model="validEdited"
              lazy-validation
              @submit.prevent="() => handleSave('edit')"
            >
              <div
                class="
                  d-flex
                  flex-row
                  px-12
                  py-8
                  justify-space-around
                  align-center
                  addbg
                "
              >
                <div style="width: 246px">
                  <p class="label-style mb-1">Nama Peserta</p>
                  <v-text-field
                    v-model="edited.nama_lengkap"
                    placeholder="Nama Peserta"
                    outlined
                    solo
                    dense
                    class="rounded"
                    :rules="[(v) => !!v || 'Field ini tidak boleh kosong']"
                  >
                  </v-text-field>
                </div>
                <div style="width: 246px">
                  <p class="label-style mb-1">Username</p>
                  <v-text-field
                    v-model="edited.username"
                    placeholder="Cari Peserta"
                    outlined
                    solo
                    dense
                    class="rounded"
                    :rules="[(v) => !!v || 'Field ini tidak boleh kosong']"
                  >
                  </v-text-field>
                </div>
                <div style="width: 246px">
                  <p class="label-style mb-1">Password</p>
                  <v-text-field
                    v-model="edited.password"
                    placeholder="Password"
                    outlined
                    solo
                    dense
                    class="rounded"
                    :rules="[(v) => !!v || 'Field ini tidak boleh kosong']"
                  >
                  </v-text-field>
                </div>
                <v-btn
                  :loading="loadingEdit"
                  :disabled="!validEdited"
                  type="submit"
                  form="edited-form"
                  color="primary no-uppercase mb-2"
                >
                  Simpan
                </v-btn>
              </div>
            </v-form>
          </td>
        </v-expand-transition>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import PesertaService from "@/services/resources/peserta.service";

export default {
  data() {
    return {
      // Data table properties
      loading: false,
      selected: [],
      pesertaHeaders: [
        {
          text: "Nama Peserta",
          value: "nama_lengkap",
          sortable: false,
          width: "30%",
        },
        { text: "Username", value: "username", sortable: false, width: "25%" },
        { text: "Password", value: "password", sortable: false, width: "25%" },
        { text: "Status", value: "is_online", sortable: false, width: "20%" },
        { text: "", value: "data-table-expand", width: "30%" },
      ],
      items: [],
      expanded: [],

      // Form properties
      payload: {
        secureId: null,
        nama_lengkap: null,
        username: null,
        password: null,
        status: true,
      },
      edited: {
        secureId: null,
        nama_lengkap: null,
        username: null,
        password: null,
        status: true,
      },
      addMode: false,
      validSubmit: false,
      validEdited: false,
      loadingSubmit: false,
      loadingEdit: false,

      // Search Properties
      search: null,
    };
  },
  computed: {
    isSelected() {
      return this.selected.length > 0;
    },
    selectedLength() {
      return this.selected.length;
    },
  },
  watch: {
    search() {
      this.fetchListDebounce(this.getList);
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList(cb) {
      this.loading = true;
      this.createToken(PesertaService.cancelReq().source());
      PesertaService.getAll(
        {
          search: this.search || "",
        },
        { cancelToken: this.cancelRequest.token }
      )
        .then(({ data: { message, result } }) => {
          if (message == "OK") {
            this.items = [...result.data];
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Gagal memuat data peserta",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
          cb && cb();
        });
    },
    handleAdd() {
      this.addMode = true;
    },
    resetVariable() {
      this.payload = {
        secureId: null,
        nama_lengkap: null,
        username: null,
        password: null,
        status: true,
      };
      this.edited = {
        secureId: null,
        nama_lengkap: null,
        username: null,
        password: null,
        status: true,
      };
    },
    handleSave(type = "submit") {
      if (this.$refs[type == "submit" ? "form" : "formEdit"].validate()) {
        type == "submit"
          ? (this.loadingSubmit = true)
          : (this.loadingEdit = true);
        PesertaService.insertData(type == "submit" ? this.payload : this.edited)
          .then(({ data: { message } }) => {
            if (message == "OK") {
              type != "submit" && (this.expanded = []);
              this.$store.commit("snackbar/setSnack", {
                show: true,
                message: `Berhasil ${
                  type == "submit" ? "menambahkan" : "mengubah"
                } data User`,
                color: "success",
              });
            } else {
              this.$store.commit("snackbar/setSnack", {
                show: true,
                message: `Gagal ${
                  type == "submit" ? "menambahkan" : "mengubah"
                } data User`,
                color: "error",
              });
            }
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            this.getList(() => {
              this.resetVariable();
              type == "submit" && (this.addMode = false);
              type == "submit"
                ? (this.loadingSubmit = false)
                : (this.loadingEdit = false);
            });
          });
      }
    },
    handleEdit(item, cb) {
      if (item) this.edited = { ...item };
      cb && cb();
    },
    handleDelete(item, type = "single") {
      this.$confirm({
        title: "Confirm",
        message: `Are you sure you want to delete this data ?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            this.deleteData(item, type);
          }
        },
      });
    },
    deleteData(item, type = "single") {
      this.loading = true;
      PesertaService.delete({
        payloadDeleteUserVO: type == "single" ? [item] : item,
      })
        .then(({ data: { message } }) => {
          if (message == "OK") {
            this.selected = [];
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Berhasil menghapus data User`,
              color: "success",
            });
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Gagal menghapus data User`,
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.getList();
        });
    },
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: transparent;
}
</style>
