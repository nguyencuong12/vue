import { put, call, takeEvery } from "redux-saga/effects";
// import { TemplateAction } from "../actions";
import { TemplateAPI } from "../../../api";
function* createTemplate(action) {
  try {
    const response = yield call(TemplateAPI.create, action.payload);
    console.log("RESPONSE ", response);
    // const { id } = response;
    if (response) {
      yield put({ type: "TEMPLATE_CREATE_SUCCESS", response });
    }
  } catch (e) {
    // console.log("TEMPALTE CREATE ERROR CALL ", e);
    yield put({ type: "TEMPLATE_CREATE_ERROR", e });
  }
}

export default function* TemplateCreateListen() {
  yield takeEvery("TEMPLATE_CREATE_REQUEST", createTemplate);
  // yield takeEvery("TEST", "functionHandle");
}
