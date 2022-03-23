import { createHelpers } from "vuex-map-fields";

export const { mapFields } = createHelpers({
  getterType: "new_kecermatan/getRootField",
  mutationType: "new_kecermatan/updateRootField",
});
