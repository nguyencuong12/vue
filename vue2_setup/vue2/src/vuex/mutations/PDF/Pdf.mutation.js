export default {
  state: {
    loading: false,
    pdfLoaded: false,
    controlRendered: false,
    controls: [],
  },
  mutations: {
    LOADING: (state) => {
      state.loading = true;
      state.pdfLoaded = true;
      console.log("<<<<<<<<<<< Loading Mutation Call >>>>>>>>>>>>>");
    },
    LOAD_COMPLETE: (state) => {
      state.loading = false;
      state.pdfLoaded = false;
      console.log("<<<<<<<<<<< Loading End Mutation Call >>>>>>>>>>>>>");
    },
    START_RENDER_WVS_CONTROL: (state) => {
      console.log("<<<<<<<<<<<<<< START RENDER CONTROL >>>>>>>>>>>>>");
      state.loading = true;
      state.controlRendered = false;
    },
    END_RENDER_WVS_CONTROL: (state) => {
      state.loading = false;
      state.controlRendered = true;
      console.log("<<<<<<<<<<<<<< END RENDER CONTROL >>>>>>>>>>>>>", state.controlRendered);
    },
    ADD_CONTROL_TO_PDF: (state, control) => {
      state.controls.push(control);
    },
    REMOVE_ALL_CONTROL_PDF: (state) => {
      console.log("remove control mutation call !!");
      state.controls = [];
    },
    // REMOVE_CONTROL_IN_PDF: (state) => {},
  },
  getters: {
    loading: (state) => state.loading,
    pdfLoaded: (state) => state.pdfLoaded,
    controlRendered: (state) => state.controlRendered,
    controls: (state) => state.controls,
  },
};
