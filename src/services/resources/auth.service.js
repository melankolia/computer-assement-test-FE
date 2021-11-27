import AuthInstance from "../auth.instance";
import { LOGIN, LOGOUT } from "../constants";

const AuthService = {
  login(body) {
    return AuthInstance.post(LOGIN, body);
  },
  logout(body) {
    return AuthInstance.post(LOGOUT, body);
  },
};

export default AuthService;
