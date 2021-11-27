import { SOAL } from "@/services/constants";
import MainInstance from "@/services/middle.instance";

const KecermatanService = {
  findCover(params) {
    return MainInstance.query(SOAL.COVER, { params });
  },
};

export default KecermatanService;
