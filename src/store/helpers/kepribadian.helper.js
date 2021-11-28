import { createHelpers } from "vuex-map-fields";

export const { mapFields } = createHelpers({
  getterType: "kepribadian/getRootField",
  mutationType: "kepribadian/updateRootField",
});
