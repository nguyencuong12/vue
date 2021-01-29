import TemplateSaga from "./template/template.saga";
import AuthSaga from "./auth/auth.saga";
import { fork } from "redux-saga/effects";

// export default function* rootSaga() {
//   yield fork(TemplateSaga);
// }

export default function* rootSaga() {
  // yield all([...TemplateSaga]);\
  // yield fork(TemplateSaga);
  // yield all([...TemplateSaga]);
  yield fork(TemplateSaga);
  yield fork(AuthSaga);
}
