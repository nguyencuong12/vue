import Vue from "vue";
import Vuex from "vuex";
// import VuexSaga from "vuex-saga";
import * as mutations from "./mutations";
// import { VuexSaga } from "vuex-saga";
import rootSaga from "./saga";

import { VuexSaga } from "vuex-coolstory";

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    ...mutations,
  },
  plugins: [
    VuexSaga({
      sagas: [rootSaga],
    }),
    // VuexSaga({
    //   // sagas: [rootSaga],
    //   sagas: [rootSaga],
    // }),
  ],
});

// Vue.use(VuexSaga, { store: store });
export default store;
