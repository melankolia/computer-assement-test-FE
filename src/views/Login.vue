<template>
  <div class="container d-flex flex-row justify-space-around pa-12">
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
        <p class="label-style mb-1">Username</p>
        <v-text-field dense filled outlined />

        <p class="label-style mb-1">Password</p>
        <v-text-field dense filled outlined />

        <v-btn class="primary pa-6" depressed>
          <p class="ma-0">Masuk</p>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
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
