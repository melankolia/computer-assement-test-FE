<template>
  <v-navigation-drawer app permanent class="px-5 py-6">
    <v-img width="129" height="27" :src="Logo" />
    <div class="d-flex flex-column align-center mt-10">
      <v-avatar
        size="132px"
        :color="setColorFromString(getProfile.acronymName)"
      >
        <span class="white--text text-h3">{{ getProfile.acronymName }}</span>
      </v-avatar>
      <div class="d-flex flex-column align-center mt-4">
        <p class="font-weight-medium text-h6 ma-0">
          {{ getProfile.nama_lengkap }}
        </p>
        <p class="font-weight-light text-body-2 ma-0">
          {{ getProfile.type | firstCapital }}
        </p>
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
      <v-btn
        :loading="loading"
        @click="logout"
        color="primary"
        outlined
        block
        depressed
      >
        <p class="text-button ma-0">Keluar</p>
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script>
import DefaultProfile from "@/assets/Pic.png";
import Logo from "@/assets/Small.svg";
import { LOGOUT } from "@/store/constants/actions.type";
import { LOGIN } from "@/router/name.types";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      DefaultProfile,
      Logo,
      loading: false,
      selectedItem: 0,
      items: [],
      itemsAdmin: [
        { text: "Data Peserta", to: "/data-peserta" },
        { text: "Manajemen Soal", to: "/manajemen-soal" },
        { text: "Peraturan Soal & Siswa", to: "/peraturan-soal" },
      ],
      itemsSiswa: [
        { text: "Daftar Soal", to: "/data-soal" },
        { text: "Daftar Nilai", to: "/data-nilai" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getProfile"]),
  },
  mounted() {
    const type = this.getProfile.type;
    if (type == "user") {
      this.items = [...this.itemsSiswa];
    } else {
      this.items = [...this.itemsAdmin];
    }
  },
  methods: {
    setColorFromString(string) {
      var colors = [
        "#D81B60",
        "#8E24AA",
        "#5E35B1",
        "#3949AB",
        "#1E88E5",
        "#039BE5",
        "#00ACC1",
        "#00897B",
        "#43A047",
        "#7CB342",
        "#F4511E",
        "#6D4C41",
        "#546E7A",
        "#757575",
      ];
      if (string) {
        var hash = 0;
        if (string.length === 0) return hash;
        for (var i = 0; i < string.length; i++) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
          hash = hash & hash;
        }
        hash = ((hash % colors.length) + colors.length) % colors.length;
        return colors[hash];
      }
      return colors[0];
    },
    logout() {
      this.$confirm({
        title: "Confirm",
        message: `Are you sure you want to Logout ?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            this.handleLogout();
          }
        },
      });
    },
    handleLogout() {
      this.loading = true;
      this.$store
        .dispatch(LOGOUT, {
          username: this.getProfile.username,
        })
        .then(() => {
          this.$router.push({ name: LOGIN });
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped>
.text-button {
  font-weight: 500 !important;
  font-size: 16px !important;
  line-height: 140%;
  text-transform: none !important;
}
</style>
