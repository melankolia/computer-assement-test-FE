<template>
  <div class="d-flex flex-column mx-10 mb-10 pb-10 px-10">
    <p
      v-if="!modeEdit"
      class="paragraph-font pt-10"
      v-html="items.kecerdasanVO.soal.description"
    />
    <template v-else>
      <v-textarea
        v-model="items.kecerdasanVO.soal.description"
        auto-grow
        hide-details
        filled
        outlined
        dense
        class="rounded"
        :rows="16"
      />
      <div class="d-flex flex-row mt-4 align-self-end">
        <v-btn
          @click="handleCancel"
          color="primary"
          class="no-uppercase depressed mr-4"
          outlined
          :disabled="loading"
        >
          Batal
        </v-btn>
        <v-btn
          :loading="loading"
          @click="handleSubmit"
          color="primary"
          class="no-uppercase depressed"
        >
          Simpan
        </v-btn>
      </div>
    </template>
  </div>
</template>

<script>
const items = {
  kecerdasanVO: {
    siswa: {
      secureId: null,
      description: null,
    },
    soal: {
      secureId: null,
      description: null,
    },
  },
};

import PeraturanService from "@/services/resources/peraturan.service";

export default {
  props: {
    modeEdit: { type: Boolean, required: true },
    items: {
      type: Object,
      required: true,
      default: () => items,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleSubmit() {
      const Payload = {
        secureId: this.items.kecerdasanVO.soal.secureId || "",
        type: "soal",
        rule_type: "kecerdasan",
        description: this.items.kecerdasanVO.soal.description,
      };
      this.loading = true;
      PeraturanService.insertData(Payload)
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil menyimpan data Peraturan",
              color: "success",
            });
            this.$emit("on-submit");
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: result || "Berhasil menyimpan data Peraturan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal menyimpan data Peraturan",
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
    handleCancel() {
      this.$emit("on-cancel");
    },
  },
};
</script>

<style></style>
