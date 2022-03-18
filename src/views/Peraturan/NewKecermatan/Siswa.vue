<template>
  <div class="d-flex flex-column mx-10 mb-10 pb-10 px-10">
    <p
      v-if="!modeEdit"
      class="paragraph-font pt-10"
      v-html="items.kecermatanVO.siswa.description"
    />
    <template v-else>
      <quill-editor
        class="editor"
        ref="myTextEditor"
        :value="items.kecermatanVO.siswa.description"
        :options="editorOption"
        @change="onEditorChange"
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
  kecermatanVO: {
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
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            ["clean"],
          ],
        },
      },
      loading: false,
    };
  },
  methods: {
    onEditorChange(value) {
      this.debounce(() => {
        this.items.kecermatanVO.siswa.description = value.html;
      });
    },
    handleSubmit() {
      const Payload = {
        secureId: this.items.kecermatanVO.siswa.secureId || "",
        type: "siswa",
        rule_type: "kecermatan",
        description: this.items.kecermatanVO.siswa.description,
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
