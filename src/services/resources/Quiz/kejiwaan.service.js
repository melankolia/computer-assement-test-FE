import MainInstance from "@/services/middle.instance";
import { QUESTIONS } from "../../constants";

const QuizService = {
  getList(params) {
    return MainInstance.query(QUESTIONS.KEJIWAAN.DETAIL, { params });
  },
};

export default QuizService;
