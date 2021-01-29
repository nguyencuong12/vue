import Vue from "vue";
import Router from "vue-router";
import {
  LoginView,
  TemplateCreate,
  DashBoard,
  ErrorView,
  TemplateList,
  TemplateEdit,
} from "./views";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: DashBoard,
    },
    {
      path: "/login",
      name: "Login Page",
      component: LoginView,
      meta: {
        layout: "guest-layout",
      },
    },
    {
      path: "/template-create",
      name: "Template Create",
      component: TemplateCreate,
    },
    {
      path: "/template-list",
      name: "Template List",
      component: TemplateList,
    },
    {
      path: "/template-edit/:templateID",
      name: "Template Edit",
      component: TemplateEdit,
    },

    {
      path: "/*",
      name: "404 Page",
      component: ErrorView,
    },
  ],
});
