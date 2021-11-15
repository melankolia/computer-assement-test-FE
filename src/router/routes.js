const TheContainer = () => import("@/container");
// const Home = () => import("@/views/Home");
const About = () => import("@/views/About");
const Login = () => import("@/views/Login");
const DaftarPeserta = () => import("@/views/Peserta");

import { HOME, ABOUT, LOGIN } from "./name.types";

export const configRoutes = [
  {
    path: "/",
    component: TheContainer,
    meta: {
      title: "Home",
    },
    children: [
      {
        path: "/data-peserta",
        name: HOME,
        component: DaftarPeserta,
        meta: {
          requiresAuth: true,
        },
      },
    ],
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
