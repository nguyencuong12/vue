import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./routes";
import { MainLayout, GuestLayout } from "./layouts";
import store from "./vuex/store";
import VueSweetalert2 from "vue-sweetalert2";

import "vue2-dropzone/dist/vue2Dropzone.css";

Vue.config.productionTip = false;
Vue.component("main-layout", MainLayout);
Vue.component("guest-layout", GuestLayout);
Vue.use(VueSweetalert2);

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
