<template>
  <div>
    <template v-if="!image || data.question.type == 'text'">
      <p class="question-text-font ml-8 mt-4">
        {{ data.question.question }}
      </p>
    </template>
    <div v-else class="d-flex ml-8 my-6">
      <img height="100px" :src="data.question.question" />
    </div>
    <v-btn-toggle
      v-bind="{ mandatory: data.answer.answer != null }"
      class="ml-12"
      v-model="data.answer"
      tile
      group
    >
      <div
        v-for="(e, i) in data.answerList"
        class="d-flex flex-row align-center my-1 ml-4"
        :key="i"
      >
        <v-btn
          :disabled="disabled"
          depressed
          :value="e"
          class="mr-4"
          :class="{
            active: e.secureId == data.answer.secureId,
            'active-font': e.secureId == data.answer.secureId,
          }"
          >{{ e.symbol }}</v-btn
        >
        <p v-if="!image || e.type == 'text'" class="mb-0">
          {{ e.answer }}
        </p>
        <img v-else :src="e.answer" height="40px" />
      </div>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
.v-btn-toggle {
  flex-direction: column;
}

.active {
  background-color: #ae8ef2 !important;
}

.active-font {
  color: #53319a !important;
}
</style>
