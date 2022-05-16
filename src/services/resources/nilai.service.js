import { NILAI } from "@/services/constants";
import MainInstance from "@/services/middle.instance";

const NilaiService = {
  deleteAllNilai() {
    return MainInstance.delete(NILAI.DELETE);
  },
};

export default NilaiService;
