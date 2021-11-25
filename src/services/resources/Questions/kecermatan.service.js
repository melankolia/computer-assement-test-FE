import MainInstance from "@/services/middle.instance";
import { QUESTIONS } from "../../constants";

const QuestionService = {
  getDetail(params) {
    return MainInstance.query(QUESTIONS.KECERMATAN.DETAIL, { params });
  },
  insertSection(data) {
    return MainInstance.post(QUESTIONS.KECERMATAN.INSERT_SECTION, data);
  },
  insertQuestion(data) {
    return MainInstance.post(QUESTIONS.KECERMATAN.INSERT_QUESTION, data);
  },
  deleteSection(params) {
    return MainInstance.delete(QUESTIONS.KECERMATAN.DELETE_SECTION, { params });
  },
  deleteQuestion(params) {
    return MainInstance.delete(QUESTIONS.KECERMATAN.DELETE_QUESTION, {
      params,
    });
  },
};

export default QuestionService;
