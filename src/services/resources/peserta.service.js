import MiddleInstance from "@/services/middle.instance";
import { USERS } from "@/services/constants";

const PesertaService = {
  getAll(params, token) {
    return MiddleInstance.query(USERS.LIST, { params, token });
  },
  insertData(data) {
    return MiddleInstance.post(USERS.INSERT, data);
  },
  delete(data) {
    return MiddleInstance.delete(USERS.DELETE, { data });
  },
  cancelReq() {
    return MiddleInstance.cancelRequest();
  },
};

export default PesertaService;
