import MainInstance from "@/services/middle.instance";
import { GROUPS } from "@/services/constants";

const GroupService = {
  getListKecerdasan(params) {
    return MainInstance.query(GROUPS.KECERDASAN.LIST, { params });
  },
  insertDataKecerdasan(data) {
    return MainInstance.post(GROUPS.KECERDASAN.INSERT, data);
  },
  deleteKecerdasanData(id) {
    return MainInstance.deleteSlug(GROUPS.KECERDASAN.DELETE, id);
  },
  activationKecerdasanData(data) {
    return MainInstance.post(GROUPS.KECERDASAN.ACTIVATION, data);
  },
};

export default GroupService;
