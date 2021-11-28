import { createHelpers } from "vuex-map-fields";

export const { mapFields } = createHelpers({
  getterType: "kecermatan/getRootField",
  mutationType: "kecermatan/updateRootField",
});
