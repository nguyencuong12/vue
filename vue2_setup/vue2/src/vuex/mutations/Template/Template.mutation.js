export default {
  state: {
    templateCreate: [],
    loading: false,
    statusCreateTemplate: null,
    // templateID: "",
  },
  mutations: {
    TEMPLATE_CREATE_REQUEST: (state, payload) => {
      state.loading = true;
      console.log("template create request mutation call !", payload);
    },
    TEMPLATE_CREATE_SUCCESS: (state) => {
      console.log("template create mutation call !!!!");
      state.loading = false;
      state.statusCreateTemplate = true;
      // state.templateID = id;
    },
    TEMPLATE_CREATE_ERROR: (state) => {
      state.loading = false;
      // console.log("TEMPLATE MUTATION ERROR", errorObject.e);
      state.statusCreateTemplate = false;
    },
  },
  getters: {
    templateCreate: (state) => state.templateCreate,
    loading: (state) => state.loading,
    file: (state) => state.file,
    errorCreateTemplate: (state) => state.errorCreateTemplate,
  },
};
