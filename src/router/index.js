import Vue from "vue";
import VueRouter from "vue-router";
import { Cookies, LocalStorage, LoadingBar, Dialog } from "quasar";
import { setAllLocalStorage } from "@/utils/common";
import routes from "./routes";
import store from "../store/index";
Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach((to, from, next) => {
    LoadingBar.start();
    // let authConfig = LocalStorage.getItem("authConfig");

    // if (!authConfig) {
    //   if (!authConfig.appId) {
    //     getLoginUrl();
    //   }
    // }

    //无效页面跳转至首页
    if (!to.name) {
      next({ path: "/error404" });
      return false;
    }

    if (Cookies.get("loggedIn")) {
      setAllLocalStorage();
    }
    LoadingBar.stop();
    // 不需要身份校验 直接通过
    return next();
  });

  Router.afterEach(() => {
    LoadingBar.stop();
  });

  return Router;
}

function getLoginUrl() {
  const Store = store();
  Store.dispatch("system/getConfig")
    .then(res => {
      if (parseInt(res.code) == 200) {
        LocalStorage.set("authConfig", res.data.config);
        LocalStorage.set("basic_settings", res.data.basic_settings);
      }
    })
    .catch(error => {});
}
