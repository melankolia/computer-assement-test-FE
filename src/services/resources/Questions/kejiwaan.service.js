import MainInstance from "@/services/middle.instance";
import { QUESTIONS } from "../../constants";

const QuestionService = {
  getDetail(params) {
    return MainInstance.query(QUESTIONS.KEJIWAAN.DETAIL, { params });
  },
  insertData(data) {
    return MainInstance.post(QUESTIONS.KEJIWAAN.INSERT, data);
  },
  deleteData(params) {
    return MainInstance.delete(QUESTIONS.KEJIWAAN.DELETE, { params });
  },
};

export default QuestionService;
