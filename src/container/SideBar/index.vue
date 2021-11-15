<template>
  <v-navigation-drawer app permanent class="px-5 py-6">
    <v-img width="129" height="27" :src="Logo" />
    <div class="d-flex flex-column align-center mt-10">
      <v-avatar class="profile" color="grey" size="132">
        <v-img :src="DefaultProfile" />
      </v-avatar>
      <div class="d-flex flex-column align-center mt-4">
        <p class="font-weight-medium text-h6 ma-0">Admin Pertama</p>
        <p class="font-weight-light text-body-2 ma-0">Admin</p>
      </div>
    </div>
    <v-divider class="my-6" />
    <v-list style="transition: all 0.7s" nav dense>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item :to="item.to" v-for="(item, i) in items" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <v-btn color="primary" outlined block depressed>
        <p class="text-button ma-0">Keluar</p>
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script>
import DefaultProfile from "@/assets/Pic.png";
import Logo from "@/assets/Small.svg";

export default {
  data() {
    return {
      DefaultProfile,
      Logo,
      selectedItem: 0,
      items: [
        { text: "Data Peserta", to: "/data-peserta" },
        { text: "Manajemen Soal", to: "/manajemen-soal" },
        { text: "Peraturan Soal & Siswa", to: "/peraturan" },
      ],
    };
  },
};
</script>

<style scoped>
.text-button {
  font-weight: 500 !important;
  font-size: 16px !important;
  line-height: 140%;
}
</style>
