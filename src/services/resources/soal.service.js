import { SOAL } from "@/services/constants";
import MainInstance from "@/services/middle.instance";

const SoalService = {
  getAll(params) {
    return MainInstance.query(SOAL.LIST, { params });
  },
};

export default SoalService;
