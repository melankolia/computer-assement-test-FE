const Home = () => import("@/views/Home");
const About = () => import("@/views/About");
const Login = () => import("@/views/Login");

import { HOME, ABOUT, LOGIN } from "./name.types";

export const configRoutes = [
  {
    path: "/",
    name: HOME,
    component: Home,
  },
  {
    path: "/login",
    name: LOGIN,
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/about",
    name: ABOUT,
    component: About,
  },
];
