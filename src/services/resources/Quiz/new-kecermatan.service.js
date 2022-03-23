import MainInstance from "@/services/middle.instance";
import { QUESTIONS } from "../../constants";

const QuizService = {
  getList(params) {
    return MainInstance.query(QUESTIONS.NEW_KECERMATAN.DETAIL, { params });
  },
};

export default QuizService;
