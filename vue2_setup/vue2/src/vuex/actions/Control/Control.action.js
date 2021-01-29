import store from "../../store";
export default {
  renderControl: (element) => {
    store.commit("RENDER_CONTROL", element);
  },
};
