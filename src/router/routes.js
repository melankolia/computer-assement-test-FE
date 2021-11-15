const TheContainer = () => import("@/container");
// const Home = () => import("@/views/Home");
const About = () => import("@/views/About");
const Login = () => import("@/views/Login");
const DaftarPeserta = () => import("@/views/Peserta");
const ManajemenSoal = () => import("@/views/ManajemenSoal");

import { HOME, ABOUT, LOGIN, MANAJEMEN_SOAL } from "./name.types";

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
      {
        path: "/manajemen-soal",
        name: MANAJEMEN_SOAL,
        component: ManajemenSoal,
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
