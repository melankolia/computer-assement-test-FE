import { createHelpers } from "vuex-map-fields";

export const { mapFields } = createHelpers({
  getterType: "kecerdasan/getRootField",
  mutationType: "kecerdasan/updateRootField",
});
