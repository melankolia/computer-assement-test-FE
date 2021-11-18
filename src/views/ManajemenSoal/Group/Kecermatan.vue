<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row justify-space-between align-center">
      <p class="header-3 mb-0">Kecermatan</p>
      <v-expand-transition>
        <v-btn
          v-if="!modeAdd"
          @click="modeAdd = !modeAdd"
          color="primary"
          class="no-uppercase"
        >
          Tambah Paket Soal
        </v-btn>
      </v-expand-transition>
    </div>
    <div
      v-for="(item, index) in items"
      class="white my-6 px-8 pt-6 pb-10 rounded-lg"
      :key="index"
    >
      <div class="d-flex flex-row justify-space-between align-center">
        <p class="header-3 mb-0">{{ item.title }}</p>
        <div class="d-flex flex-row align-center">
          <p class="label-style mb-0 mx-4">
            {{ !item.is_active ? "Tidak Aktif" : "Aktif" }}
          </p>
          <v-switch dense v-model="item.is_active" color="greentext" inset />
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
              <v-list-item link>
                <img class="mr-4" src="@/assets/icons/edit-outlined.svg" />
                <p class="selection-item ma-0">Edit Data</p>
              </v-list-item>
              <v-list-item link>
                <img class="mr-4" src="@/assets/icons/delete-outlined.svg" />
                <p class="selection-item ma-0">Hapus Data</p>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <p class="text-subtitle-2 my-1 font-weight-light subtitlegraytext--text">
        {{ item.description }}
      </p>
      <div class="d-flex flex-row align-center mt-12">
        <div class="d-flex flex-row align-center mr-6">
          <img class="mr-2" src="@/assets/icons/sheet.svg" />
          <p class="selection-item font-weight-medium ma-0">50 Soal</p>
        </div>
        <div class="d-flex flex-row align-center">
          <img class="mr-2" src="@/assets/icons/time.svg" />
          <p class="selection-item font-weight-medium ma-0">
            {{ item.time }} (20 Menit/Section)
          </p>
        </div>
      </div>
    </div>
    <v-expand-transition>
      <div
        v-if="modeAdd"
        class="d-flex flex-column white px-8 py-10 rounded-lg"
      >
        <div class="d-flex flex-row justify-space-between align-start">
          <div class="d-flex flex-column" style="width: 344px">
            <p class="label-style mb-1">Nama Paket Soal</p>
            <v-text-field
              v-model="payload.title"
              placeholder="Nama Paket Soal"
              hide-details
              filled
              outlined
              dense
              class="rounded"
            />
          </div>
          <div class="d-flex flex-column align-center">
            <p class="text-caption font-weight-light mb-1">
              Total Menit / Section
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
  </div>
</template>

<script>
import { MANAJEMEN_SOAL } from "@/router/name.types";
const Counter = () => import("@/components/Counter");

export default {
  components: {
    Counter,
  },
  data() {
    return {
      items: [
        {
          secureId: "1234-999",
          title: "Test Kecermatan 1",
          description: "Tema Soal pada Kecermatan 1 adalah Kecermatan",
          time: "12",
          is_active: false,
        },
      ],
      payload: {
        title: null,
        description: null,
        is_active: true,
        time: 12,
      },
      modeAdd: false,
      loadingSubmit: false,
    };
  },
  methods: {
    handleCancel() {
      this.modeAdd = false;
    },
    handleSubmit() {
      this.loadingSubmit = true;
      setTimeout(() => {
        this.items.push({
          ...this.payload,
        });
        this.payload = {
          title: null,
          description: null,
          is_active: true,
          time: "12",
        };
        this.modeAdd = false;
        this.loadingSubmit = false;
      }, 1000);
    },
    handleChange(e) {
      this.payload.time = parseInt(e);
    },
    handleAddSoal(item) {
      this.$router.replace({
        query: null,
      });
      this.$router.replace({
        name: MANAJEMEN_SOAL,
        query: { kecermatanSecureId: item.secureId },
      });
    },
  },
};
</script>

<style scoped>
.label-style {
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
