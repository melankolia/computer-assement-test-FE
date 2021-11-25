import MainInstance from "@/services/middle.instance";
import { QUESTIONS } from "../../constants";

const QuestionService = {
  getDetail(params) {
    return MainInstance.query(QUESTIONS.KECERDASAN.DETAIL, { params });
  },
  insertData(data) {
    return MainInstance.post(QUESTIONS.KECERDASAN.INSERT, data);
  },
  deleteData(params) {
    return MainInstance.delete(QUESTIONS.KECERDASAN.DELETE, { params });
  },
};

export default QuestionService;
