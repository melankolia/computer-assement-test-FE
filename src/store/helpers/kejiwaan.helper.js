import { createHelpers } from "vuex-map-fields";

export const { mapFields } = createHelpers({
  getterType: "kejiwaan/getRootField",
  mutationType: "kejiwaan/updateRootField",
});
