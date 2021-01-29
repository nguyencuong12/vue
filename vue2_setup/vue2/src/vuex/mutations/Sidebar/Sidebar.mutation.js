export default {
  state: {
    open: false,
  },
  mutations: {
    CHANGE_STATE_SIDEBAR: (state) => {
      state.open = !state.open;
    },
  },
  getters: {
    open: (state) => state.open,
  },
};
