import MainInstance from "@/services/middle.instance";
import { GROUPS } from "@/services/constants";

const GroupService = {
  getListKecerdasan(params) {
    return MainInstance.query(GROUPS.KECERDASAN.LIST, { params });
  },
  insertDataKecerdasan(data) {
    return MainInstance.post(GROUPS.KECERDASAN.INSERT, data);
  },
  deleteKecerdasan(id) {
    return MainInstance.deleteSlug(GROUPS.KECERDASAN.DELETE, id);
  },
  activationKecerdasan(data) {
    return MainInstance.post(GROUPS.KECERDASAN.ACTIVATION, data);
  },
  getListKepribadian(params) {
    return MainInstance.query(GROUPS.KEPRIBADIAN.LIST, { params });
  },
  insertDataKepribadian(data) {
    return MainInstance.post(GROUPS.KEPRIBADIAN.INSERT, data);
  },
  deleteKepribadian(id) {
    return MainInstance.deleteSlug(GROUPS.KEPRIBADIAN.DELETE, id);
  },
  activationKepribadian(data) {
    return MainInstance.post(GROUPS.KEPRIBADIAN.ACTIVATION, data);
  },
  getListKejiwaan(params) {
    return MainInstance.query(GROUPS.KEJIWAAN.LIST, { params });
  },
  insertDataKejiwaan(data) {
    return MainInstance.post(GROUPS.KEJIWAAN.INSERT, data);
  },
  deleteKejiwaan(id) {
    return MainInstance.deleteSlug(GROUPS.KEJIWAAN.DELETE, id);
  },
  activationKejiwaan(data) {
    return MainInstance.post(GROUPS.KEJIWAAN.ACTIVATION, data);
  },
  getListKecermatan(params) {
    return MainInstance.query(GROUPS.KECERMATAN.LIST, { params });
  },
  insertDataKecermatan(data) {
    return MainInstance.post(GROUPS.KECERMATAN.INSERT, data);
  },
  deleteKecermatan(id) {
    return MainInstance.deleteSlug(GROUPS.KECERMATAN.DELETE, id);
  },
  activationKecermatan(data) {
    return MainInstance.post(GROUPS.KECERMATAN.ACTIVATION, data);
  },
  getListNewKecermatan(params) {
    return MainInstance.query(GROUPS.NEW_KECERMATAN.LIST, { params });
  },
  insertDataNewKecermatan(data) {
    return MainInstance.post(GROUPS.NEW_KECERMATAN.INSERT, data);
  },
  deleteNewKecermatan(id) {
    return MainInstance.deleteSlug(GROUPS.NEW_KECERMATAN.DELETE, id);
  },
  activationNewKecermatan(data) {
    return MainInstance.post(GROUPS.NEW_KECERMATAN.ACTIVATION, data);
  },
};

export default GroupService;
