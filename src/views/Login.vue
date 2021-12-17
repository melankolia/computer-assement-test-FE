<template>
  <div class="container-color d-flex flex-row justify-space-around pa-12">
    <img class="image-fix" :src="AirPlane" />
    <div class="d-flex flex-column">
      <div class="d-flex flex-row mb-4 align-center" style="margin-top: 80px">
        <img class="mr-4" :src="LogoWhite" width="50" height="50" />
        <p class="mb-0 malaka-font-white white--text">Malaka Psikologi</p>
      </div>
      <p class="welcome-text white--text">
        Buktikan <br />
        Dengan Nyata <br />
      </p>
      <p class="sub-welcome-text mt-2 white--text">Usahamu Meraih Mimpi</p>
    </div>
    <div class="d-flex flex-column justify-space-between card-login pa-12">
      <div class="d-flex flex-row align-center">
        <img class="mr-2" :src="Logo" contain height="43" width="43" />
        <p class="mb-0 malaka-font">Malaka Psikologi</p>
      </div>
      <div class="section-label">
        <p class="ma-0 font-weight-bold login-text">Login</p>
        <p class="ma-0 login-sub-text">Masuk Untuk Mengerjakan Soal</p>
      </div>
      <div class="d-flex flex-column mb-6">
        <v-form
          id="check-login-form"
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="onSubmit()"
        >
          <p class="label-style mb-1">Username</p>
          <v-text-field
            :rules="usernameRules"
            v-model="username"
            dense
            filled
            outlined
          />

          <p class="label-style mb-1">Password</p>
          <v-text-field
            :rules="passwordRules"
            v-model="password"
            dense
            filled
            outlined
            :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (e1 = !e1)"
            :type="e1 ? 'password' : 'text'"
            counter
          />
        </v-form>
        <v-btn
          :loading="loading"
          type="submit"
          form="check-login-form"
          class="primary pa-6"
          depressed
        >
          <p class="ma-0">Masuk</p>
        </v-btn>
      </div>
    </div>
    <div class="d-flex flex-row footer-section justify-space-between px-12">
      <p class="footer-font white--text mx-12 px-10">
        © 2021 Turara Innovative
      </p>
      <p class="footer-font white--text mx-12 px-10">designed by fizart</p>
    </div>
  </div>
</template>

<script>
import Logo from "@/assets/images/admin-logo.png";
import LogoWhite from "@/assets/images/logo-white.png";
import AirPlane from "@/assets/images/airplane.png";
import { LOGIN } from "@/store/constants/actions.type";
import { DATA_PESERTA, DATA_SOAL } from "@/router/name.types";

export default {
  data() {
    return {
      Logo,
      LogoWhite,
      AirPlane,
      valid: false,
      loading: false,
      e1: true,
      username: null,
      password: null,
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) => (v && v.length > 3) || "Username must be at least 4 characters",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length > 4) || "Password must be at least 5 characters",
      ],
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch(LOGIN, {
            username: this.username,
            password: this.password,
          })
          .then((result) => {
            if (this.$route.query && this.$route.query.pathname) {
              if (this.$route.query.pathname.includes("login")) {
                this.$router.replace({
                  name: result?.type == "admin" ? DATA_PESERTA : DATA_SOAL,
                });
              } else {
                this.$router.replace(
                  this.$route.query.pathname + this.$route.query.search
                );
              }
            } else {
              this.$router.replace({
                name: result?.type == "admin" ? DATA_PESERTA : DATA_SOAL,
              });
            }
          })
          .catch((err) => {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: err || "Something went wrong. Please try again.",
              color: "error",
            });
          })
          .finally(() => (this.loading = false));
      }
    },
  },
};
</script>

<style scoped>
.container-color {
  height: 100%;
  background: linear-gradient(111.34deg, #7248ea 0%, #8f48ea 100%);
}

.image-fix {
  position: absolute;
  top: 0;
  left: 60px;
  height: 85%;
}

.malaka-font-white {
  font-family: Roboto !important;
  font-style: normal;
  font-weight: bold !important;
  font-size: 30px;
  line-height: 120% !important;
}

.welcome-text {
  font-family: Inter !important;
  font-style: normal;
  font-weight: bold !important;
  line-height: 130%;
  font-size: 80px !important;
}

.sub-welcome-text {
  font-family: Inter !important;
  font-style: normal;
  font-weight: 600;
  font-size: 32px !important;
  line-height: 140%;
}

.tagline-text {
  font-family: Inter !important;
  font-weight: bold;
  line-height: 140%;
}

.card-login {
  width: 448px;
  height: 682px;
  background: white;
  border-radius: 8px;
}

/* .section-label {
  padding-top: 140px;
} */

.login-text {
  font-family: Inter !important;
  font-style: normal;
  font-weight: bold !important;
  font-size: 36px !important;
  line-height: 120%;
  color: #4d4d4d;
}

.login-sub-text {
  font-family: Inter !important;
  font-style: normal;
  font-weight: normal !important;
  font-size: 16px !important;
  line-height: 24px;
  color: #616161;
}

.v-text-field--outlined >>> fieldset {
  border-color: transparent;
}

.label-style {
  font-family: Inter !important;
  font-style: normal;
  font-weight: 500 !important;
  font-size: 14px !important;
  line-height: 140%;
  color: #726b81;
}

.malaka-font {
  font-family: Roboto !important;
  font-style: normal;
  font-weight: bold !important;
  font-size: 20px !important;
  line-height: 120%;
  color: #4d4d4d;
}

.footer-section {
  position: absolute !important;
  bottom: 0;
  width: 100%;
}

.footer-font {
  font-family: Roboto !important;
  font-style: normal;
  font-weight: normal !important;
  font-size: 12px !important;
  line-height: 14px;
}

@media only screen and (min-width: 1700px) {
  .footer-section {
    padding: 0 10% !important;
  }
}
</style>
