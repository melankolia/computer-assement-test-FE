const TheContainer = () => import("@/container");
// const Home = () => import("@/views/Home");
const About = () => import("@/views/About");
const Login = () => import("@/views/Login");
const DaftarPeserta = () => import("@/views/Peserta");
const ManajemenSoal = () => import("@/views/ManajemenSoal");
const PeraturanSoal = () => import("@/views/Peraturan");
const DaftarSoal = () => import("@/views/DaftarSoal");
const DaftarNilai = () => import("@/views/DaftarNilai");
const Rules = () => import("@/views/Rules");
const KecerdasanQuiz = () => import("@/views/Quiz/Kecerdasan");

import {
  HOME,
  ABOUT,
  LOGIN,
  MANAJEMEN_SOAL,
  PERATURAN_SOAL,
  DATA_SOAL,
  DATA_NILAI,
  RULES,
  QUIZ,
} from "./name.types";

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
        path: "/data-soal",
        name: DATA_SOAL,
        component: DaftarSoal,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/data-nilai",
        name: DATA_NILAI,
        component: DaftarNilai,
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
      {
        path: "/peraturan-soal",
        name: PERATURAN_SOAL,
        component: PeraturanSoal,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/rules/:secureId",
    name: RULES,
    component: Rules,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/quiz",
    component: {
      render(c) {
        return c("router-view");
      },
    },
    meta: {
      requiresAuth: true,
      title: "Quiz",
    },
    children: [
      {
        path: "/kecerdasan/:secureId",
        name: QUIZ.KECERDASAN,
        component: KecerdasanQuiz,
        meta: {
          requiresAuth: true,
          title: "Kecerdasan Quiz",
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
