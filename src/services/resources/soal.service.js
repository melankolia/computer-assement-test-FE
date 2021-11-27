import { SOAL, NILAI } from "@/services/constants";
import MainInstance from "@/services/middle.instance";

const SoalService = {
  getAll(params) {
    return MainInstance.query(SOAL.LIST, { params });
  },
  insertNilai(data) {
    return MainInstance.post(NILAI.INSERT, data);
  },
};

export default SoalService;
