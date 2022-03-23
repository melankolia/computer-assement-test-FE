const TheContainer = () => import("@/container");
// const Home = () => import("@/views/Home");
// const About = () => import("@/views/About");
const Login = () => import("@/views/Login");
const DaftarPeserta = () => import("@/views/Peserta");
const ManajemenSoal = () => import("@/views/ManajemenSoal");
const PeraturanSoal = () => import("@/views/Peraturan");
const DaftarSoal = () => import("@/views/DaftarSoal");
const DaftarNilai = () => import("@/views/DaftarNilai");
const Rules = () => import("@/views/Rules");
const KecerdasanQuiz = () => import("@/views/Quiz/Kecerdasan");
const KepribadianQuiz = () => import("@/views/Quiz/Kepribadian");
const KejiwaanQuiz = () => import("@/views/Quiz/Kejiwaan");
const KecermatanQuiz = () => import("@/views/Quiz/Kecermatan");
const NewKecermatanQuiz = () => import("@/views/Quiz/New_Kecermatan");

import {
  LOGIN,
  HOME,
  MANAJEMEN_SOAL,
  PERATURAN_SOAL,
  DATA_PESERTA,
  DATA_SOAL,
  DATA_NILAI,
  RULES,
  QUIZ,
} from "./name.types";

export const configRoutes = [
  {
    path: "/",
    component: TheContainer,
    name: HOME,
    meta: {
      requiresAuth: true,
      title: "Home",
    },
    children: [
      {
        path: "/data-peserta",
        name: DATA_PESERTA,
        component: DaftarPeserta,
        meta: {
          requiresAuth: true,
          privileges: "admin",
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
          privileges: "admin",
        },
      },
      {
        path: "/peraturan-soal",
        name: PERATURAN_SOAL,
        component: PeraturanSoal,
        meta: {
          requiresAuth: true,
          privileges: "admin",
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
      {
        path: "/kepribadian/:secureId",
        name: QUIZ.KEPRIBADIAN,
        component: KepribadianQuiz,
        meta: {
          requiresAuth: true,
          title: "Kepribadian Quiz",
        },
      },
      {
        path: "/kejiwaan/:secureId",
        name: QUIZ.KEJIWAAN,
        component: KejiwaanQuiz,
        meta: {
          requiresAuth: true,
          title: "Kejiwaan Quiz",
        },
      },
      {
        path: "/kecermatan/:secureId",
        name: QUIZ.KECERMATAN,
        component: KecermatanQuiz,
        meta: {
          requiresAuth: true,
          title: "Kecermatan Quiz",
        },
      },
      {
        path: "/new-kecermatan/:secureId",
        name: QUIZ.NEW_KECERMATAN,
        component: NewKecermatanQuiz,
        meta: {
          requiresAuth: true,
          title: "New Kecermatan Quiz",
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
];
