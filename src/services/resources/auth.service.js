import AuthInstance from "../auth.instance";
import { LOGIN } from "../constants";

const AuthService = {
  login(body) {
    return AuthInstance.post(LOGIN, body);
  },
};

export default AuthService;
