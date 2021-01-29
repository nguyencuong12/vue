import store from "../../store";
export default {
  assignFile: (pdfFile) => {
    store.commit("ASSIGN_PDF_FILE", pdfFile);
  },
  removeFile: () => {
    store.commit("REMOVE_PDF_FILE");
  },
};
