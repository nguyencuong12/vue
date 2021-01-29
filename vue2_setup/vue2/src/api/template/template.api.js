const URL = "/api/templates";
import axios from "../ajax/ajax";
import ajax from "../ajax/ajax";

export const TemplateAPI = {
  fetch: () => {
    const options = {
      url: URL,
      method: "GET",
    };
    return ajax(options);
  },
  get: (formData = {}) => {
    const { id } = formData;
    const options = {
      url: `${URL}/${id}`,
      data: formData,
    };
    return ajax(options);
  },
  update: (formData) => {
    const { id } = formData;

    const options = {
      url: `${URL}/${id}`,
      // headers:{
      //   "Content-Type:application/json"
      // },
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
      method: "PUT",
    };
    return axios(options);
  },
  getTemplateDoc: (formData) => {
    const { doc } = formData;
    const options = {
      url: `${URL}/doc/${doc}`,
      methods: "GET",
      responseType: "arraybuffer",
      data: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/pdf",
      },
    };
    return axios(options);
  },
  create: (formData) => {
    //FIXME:
    var form = new FormData();
    for (var entry in formData) {
      form.append(entry, formData[entry]);
    }
    const options = {
      url: URL,
      // params:{
      //   createTemplate:true
      // },
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      data: form,
    };
    return ajax(options);
  },
  delete: (formData) => {
    var { templateID } = formData;
    const options = {
      URL: `${URL}/${templateID}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      methods: "DELETE",
    };
    return axios(options);
  },
};
