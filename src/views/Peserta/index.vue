<template>
  <div class="px-6 py-12 mt-6">
    <p class="text-h4 font-weight-bold ma-0">Daftar Peserta</p>
    <v-row dense class="mt-9" align="center" justify="space-between">
      <v-col cols="12" xs="12" sm="4">
        <v-text-field
          append-icon="mdi-magnify"
          placeholder="Cari Peserta"
          hide-details
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
      v-model="selected"
      :headers="pesertaHeaders"
      :items="items"
      hide-default-footer
      show-select
      show-expand
      single-expand
      :expanded.sync="expanded"
      item-key="nama"
      class="mt-4"
    >
      <template #item.status="{ item }">
        <div class="d-flex flex-row align-center justify-space-between">
          <v-chip
            small
            :color="item.status == 'Aktif' ? 'greencs' : 'graycs'"
            class="pr-4"
          >
            <v-icon :color="item.status == 'Aktif' ? 'greentext' : 'graytext'">
              mdi-circle-medium
            </v-icon>
            <span
              :class="
                item.status == 'Aktif' ? 'greentext--text' : 'graytext--text'
              "
              >{{ item.status }}</span
            >
          </v-chip>
        </div>
      </template>
      <template #footer>
        <v-expand-transition>
          <div v-if="addMode">
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
                  v-model="payload.nama"
                  placeholder="Nama Peserta"
                  hide-details
                  outlined
                  solo
                  dense
                  class="rounded"
                >
                </v-text-field>
              </div>
              <div style="width: 246px">
                <p class="label-style mb-1">Username</p>
                <v-text-field
                  v-model="payload.username"
                  placeholder="Cari Peserta"
                  hide-details
                  outlined
                  solo
                  dense
                  class="rounded"
                >
                </v-text-field>
              </div>
              <div style="width: 246px">
                <p class="label-style mb-1">Password</p>
                <v-text-field
                  v-model="payload.password"
                  placeholder="Password"
                  hide-details
                  outlined
                  solo
                  dense
                  class="rounded"
                >
                </v-text-field>
              </div>
              <v-btn
                :loading="loadingSubmit"
                @click="() => handleSave('submit')"
                color="primary"
                class="no-uppercase align-self-end"
                >Simpan</v-btn
              >
            </div>
          </div>
        </v-expand-transition>
      </template>
      <template #item.data-table-expand="{ item, expand, isExpanded }">
        <v-expand-transition>
          <v-menu rounded left min-width="188px" v-if="!isExpanded">
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
              <v-list-item link>
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
            v-else
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-expand-transition>
      </template>
      <template #expanded-item="{ headers }">
        <v-expand-transition>
          <td class="addbg" :colspan="headers.length">
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
                  v-model="edited.nama"
                  placeholder="Nama Peserta"
                  hide-details
                  outlined
                  solo
                  dense
                  class="rounded"
                >
                </v-text-field>
              </div>
              <div style="width: 246px">
                <p class="label-style mb-1">Username</p>
                <v-text-field
                  v-model="edited.username"
                  placeholder="Cari Peserta"
                  hide-details
                  outlined
                  solo
                  dense
                  class="rounded"
                >
                </v-text-field>
              </div>
              <div style="width: 246px">
                <p class="label-style mb-1">Password</p>
                <v-text-field
                  v-model="edited.password"
                  placeholder="Password"
                  hide-details
                  outlined
                  solo
                  dense
                  class="rounded"
                >
                </v-text-field>
              </div>
              <v-btn
                :loading="loadingSubmit"
                @click="() => handleSave('edit')"
                color="primary no-uppercase align-self-end"
                >Simpan</v-btn
              >
            </div>
          </td>
        </v-expand-transition>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      pesertaHeaders: [
        { text: "Nama Peserta", value: "nama", sortable: false, width: "30%" },
        { text: "Username", value: "username", sortable: false, width: "25%" },
        { text: "Password", value: "password", sortable: false, width: "25%" },
        { text: "Status", value: "status", sortable: false, width: "20%" },
        { text: "", value: "data-table-expand" },
      ],
      items: [
        {
          secureId: "1",
          nama: "Hafizh Alfurqon",
          username: "Alfurqon",
          password: "malaka123",
          status: "Aktif",
        },
        {
          secureId: "2",
          nama: "Faris Nabil",
          username: "Faris22",
          password: "malaka123",
          status: "Tidak Aktif",
        },
      ],
      expanded: [],
      payload: {
        secureId: null,
        nama: null,
        username: null,
        password: null,
        status: "Aktif",
      },
      edited: {
        secureId: null,
        nama: null,
        username: null,
        password: null,
        status: "Aktif",
      },
      addMode: false,
      loadingSubmit: false,
    };
  },
  methods: {
    handleAdd() {
      this.addMode = true;
    },
    handleSave(type = "submit") {
      this.loadingSubmit = true;
      setTimeout(() => {
        if (type == "submit") {
          this.items.push({
            ...this.payload,
            secureId: "5",
          });
          this.addMode = false;
          this.loadingSubmit = false;
        } else {
          this.addMode = false;
          this.loadingSubmit = false;
        }
      }, 2000);
    },
    handleEdit(item, cb) {
      if (item) this.edited = { ...item };
      cb && cb();
    },
  },
  watch: {
    payload: {
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
}
</style>
