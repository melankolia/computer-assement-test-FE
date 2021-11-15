<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row justify-space-between align-center">
      <p class="header-3 mb-0">Kecerdasan</p>
      <v-btn color="primary no-uppercase"> Tambah Paket Soal </v-btn>
    </div>
    <div class="white my-6 px-8 pt-6 pb-10 rounded-lg">
      <div class="d-flex flex-row justify-space-between align-center">
        <p class="header-3 mb-0">Test Kecerdasan 1</p>
        <div class="d-flex flex-row align-center">
          <p class="label-style mb-0 mx-4">
            {{ !switch2 ? "Tidak Aktif" : "Aktif" }}
          </p>
          <v-switch dense v-model="switch2" color="greentext" inset />
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
        Tema Soal pada Kecerdasan 1 adalah Tentang Negara dan Ibu kota
      </p>
      <div class="d-flex flex-row align-center mt-12">
        <div class="d-flex flex-row align-center mr-6">
          <img class="mr-2" src="@/assets/icons/sheet.svg" />
          <p class="selection-item font-weight-medium ma-0">50 Soal</p>
        </div>
        <div class="d-flex flex-row align-center">
          <img class="mr-2" src="@/assets/icons/time.svg" />
          <p class="selection-item font-weight-medium ma-0">90 Menit</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      switch2: false,
    };
  },
};
</script>

<style scoped>
.label-style {
  color: #9b9b9b !important;
}
</style>
