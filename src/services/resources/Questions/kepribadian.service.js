import MainInstance from "@/services/middle.instance";
import { QUESTIONS } from "../../constants";

const QuestionService = {
  getDetail(params) {
    return MainInstance.query(QUESTIONS.KEPRIBADIAN.DETAIL, { params });
  },
  insertData(data) {
    return MainInstance.post(QUESTIONS.KEPRIBADIAN.INSERT, data);
  },
  deleteData(params) {
    return MainInstance.delete(QUESTIONS.KEPRIBADIAN.DELETE, { params });
  },
};

export default QuestionService;
