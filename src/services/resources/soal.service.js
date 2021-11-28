import { SOAL, NILAI } from "@/services/constants";
import MainInstance from "@/services/middle.instance";

const SoalService = {
  getAll(params) {
    return MainInstance.query(SOAL.LIST, { params });
  },
  getListNilai(params) {
    return MainInstance.query(NILAI.LIST, { params });
  },
  getListNilaiKecermatan(params) {
    return MainInstance.query(NILAI.LIST_KECERMATAN, { params });
  },
  insertNilai(data) {
    return MainInstance.post(NILAI.INSERT, data);
  },
  insertNilaiKecermatan(data) {
    return MainInstance.post(NILAI.INSERT_KECERMATAN, data);
  },
};

export default SoalService;
