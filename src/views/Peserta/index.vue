<template>
  <div class="px-6 py-12">
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
                @click="() => handleSave('submit')"
                color="primary no-uppercase align-self-end"
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
      <template #expanded-item="{ headers, item }">
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
                  :value="item.nama"
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
                  :value="item.username"
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
                  :value="item.password"
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
          nama: "Hafizh Alfurqon",
          username: "Alfurqon",
          password: "malaka123",
          status: "Aktif",
        },
        {
          nama: "Faris Nabil",
          username: "Faris22",
          password: "malaka123",
          status: "Tidak Aktif",
        },
      ],
      expanded: [],
      selectedEdit: {
        secureId: null,
        nama: null,
        username: null,
        password: null,
        status: null,
      },
      addMode: false,
    };
  },
  methods: {
    handleAdd() {
      this.addMode = true;
    },
    handleSave(type = "submit") {
      if (type == "submit") this.addMode = false;
    },
    handleEdit(item, cb) {
      if (item) this.selectedEdit = { ...item };
      cb();
    },
  },
  watch: {
    selectedEdit: {
      handler(val) {
        console.log(val);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.label-style {
  font-family: Inter !important;
  font-style: normal;
  font-weight: 500 !important;
  font-size: 12px !important;
  line-height: 140%;
  color: #726b81;
}

.v-text-field--outlined >>> fieldset {
  border-color: transparent;
}
</style>
