import { put, call, takeEvery } from "redux-saga/effects";

import { AuthAPI } from "../../../api";

function* login(action) {
  console.log("LOGIN SAGA REQUEST !!!", action.payload);
  try {
    const response = yield call(AuthAPI.login, action.payload);
    console.log("LOGIN RESPONSE SAGA", response);
    const { data } = response;
    yield put({ type: "LOGIN_SUCCESS", token: data.token });
    // if (response) {
    //   yield put({ type: "LOGIN_SUCCESS", response });
    // }
  } catch (e) {
    yield put({ type: "LOGIN_ERROR", e });
  }
}

export default function* AuthListen() {
  yield takeEvery("LOGIN_REQUEST", login);
}
