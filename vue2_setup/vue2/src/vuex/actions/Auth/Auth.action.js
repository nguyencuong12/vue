import store from "../../store";

export default {
  // assignFile: (pdfFile) => {
  //     store.commit("ASSIGN_PDF_FILE", pdfFile);
  //   },
  login: (formData) => {
    store.commit("LOGIN_REQUEST", formData);
  },
};
