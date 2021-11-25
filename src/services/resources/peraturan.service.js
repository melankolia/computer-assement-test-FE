import { PERATURAN } from "@/services/constants";
import MainInstance from "@/services/middle.instance";

const PeraturanService = {
  getAll() {
    return MainInstance.query(PERATURAN);
  },
  insertData(data) {
    return MainInstance.post(PERATURAN, data);
  },
};

export default PeraturanService;
