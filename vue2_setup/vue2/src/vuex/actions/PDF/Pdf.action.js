import store from "../../store";
import { PDFConst } from "../../../const/PDF";
export default {
  startLoading: () => {
    store.commit(PDFConst.LOADING);
  },
  endLoading: () => {
    store.commit(PDFConst.LOAD_COMPLETE);
  },
  startRenderWVSControls: () => {
    store.commit(PDFConst.START_RENDER_WVS_CONTROL);
  },
  endRenderWVSControls: () => {
    store.commit(PDFConst.END_RENDER_WVS_CONTROL);
  },
  addControlToPDF: (control) => {
    store.commit(PDFConst.ADD_CONTROL_TO_PDF, control);
  },
  removeAllControlPDF: () => {
    store.commit(PDFConst.REMOVE_ALL_CONTROL_PDF);
  },
};
