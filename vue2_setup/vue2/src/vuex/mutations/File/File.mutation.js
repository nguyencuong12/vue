export default {
  state: {
    file: [],
  },
  mutations: {
    ASSIGN_PDF_FILE: (state, pdfFile) => {
      console.log("assign file", pdfFile);
      state.file.push(pdfFile);
    },
    REMOVE_PDF_FILE: (state) => {
      state.file.pop();
      console.log("file mutation remove", state.file);
    },
  },
  getters: {
    file: (state) => state.file,
  },
};
