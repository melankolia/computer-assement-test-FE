<template>
  <div class="container-color d-flex flex-row justify-space-around pa-12">
    <p class="welcome-text text-h2 white--text py-12">
      Buktikan <br />
      Dengan Nyata <br />
      <span class="tagline-text text-h4"> Usahamu Meraih Mimpi </span>
    </p>
    <div class="d-flex flex-column justify-space-between card-login pa-12">
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
  </div>
</template>

<script>
import { LOGIN } from "@/store/constants/actions.type";
import { HOME } from "@/router/name.types";

export default {
  data() {
    return {
      valid: false,
      loading: false,
      e1: true,
      username: null,
      password: null,
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) => (v && v.length > 3) || "Username must be at least 4 characters",
      ],
      passwordRules: [(v) => !!v || "Password is required"],
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
          .then(() => {
            if (this.$route.query && this.$route.query.pathname) {
              if (this.$route.query.pathname.includes("login")) {
                this.$router.replace({ name: HOME });
              } else {
                this.$router.replace(
                  this.$route.query.pathname + this.$route.query.search
                );
              }
            } else {
              this.$router.replace({ name: HOME });
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

.welcome-text {
  font-family: Inter !important;
  font-style: normal;
  font-weight: bold;
  line-height: 120%;
  margin-top: 140px;
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

.section-label {
  padding-top: 140px;
}

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
</style>
