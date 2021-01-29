import { TokenManager } from "../../../tokenManager/token";
export default {
  // state: {
  //   token: "",
  // },:
  state: {
    statusLogin: null,
  },
  mutations: {
    // LOGIN_REQUEST: (state, formData) => {
    //   if (!state || !formData) {
    //     console.log("LOGIN REQUEST MUTATION CALL !!!");
    //   }
    // },
    LOGIN_SUCCESS: (state, token) => {
      console.log("LOGIN SUCCESS CALL !!!");
      if (!state || !token) {
        return null;
      } else {
        console.log("LOGIN SUCCESS CALL ", token);
        state.statusLogin = true;
        // localStorage.setItem("userName");
        TokenManager.setToken(token.token);
        // window.location.href = "/";
      }
    },
    LOGIN_ERROR: (state, error) => {
      if (!state || !error) {
        return null;
      } else {
        state.statusLogin = false;
      }
    },
  },
  getters: {
    statusLogin: (state) => state.statusLogin,
  },
  // getters: {
  //   token: (state) => state.token,
  // },
};
