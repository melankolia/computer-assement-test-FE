<template>
  <div class="d-flex flex-column mx-10 mb-10 pb-10 px-10">
    <p v-if="!modeEdit" class="paragraph-font pt-10" v-html="item.rules" />
    <template v-else>
      <v-textarea
        v-model="item.rules"
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
        >
          Batal
        </v-btn>
        <v-btn
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
export default {
  props: {
    modeEdit: { type: Boolean, required: true },
  },
  data() {
    return {
      item: {
        rules: `- Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. <br />
                - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.  Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. <br />
                - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.  Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. `,
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("on-change", false);
    },
    handleCancel() {
      this.$emit("on-change", false);
    },
  },
};
</script>

<style></style>
