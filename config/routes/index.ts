import base from "./base";
import dynamic from "./dynamic";

export default [
  ...base,
  ...dynamic,
  {
    path: '/',
    redirect: '/workbench',
  },
  {
    component: './404',
  },
];
