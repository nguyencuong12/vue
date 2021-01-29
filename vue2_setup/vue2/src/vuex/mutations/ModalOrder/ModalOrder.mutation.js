export default {
  state: {
    openModal: false,
    controlInfo: {},
  },
  mutations: {
    // RENDER_CONTROL: (state, element) => {
    //   console.log("CONTROL RENDER", element);
    //   state.controlRender = element;
    // },
    SHOW_MODAL: (state, Info) => {
      state.openModal = true;
      state.controlInfo = Info;
    },
    HIDE_MODAL: (state) => {
      state.openModal = false;
    },
  },
  getters: {
    // controlRender: (state) => state.controlRender,
    openModal: (state) => state.openModal,
    controlInfo: (state) => state.controlInfo,
  },
};
