export default {
  state: {
    controlRender: [],
  },
  mutations: {
    RENDER_CONTROL: (state, element) => {
      console.log("CONTROL RENDER", element);
      state.controlRender = element;
    },
  },
  getters: {
    controlRender: (state) => state.controlRender,
  },
};
