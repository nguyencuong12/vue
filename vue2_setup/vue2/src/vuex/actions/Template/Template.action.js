import store from "../../store";
export default {
  templateCreateAction: (formData) => {
    store.commit("TEMPLATE_CREATE_REQUEST", formData);
  },
};
