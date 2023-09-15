import { call, put, takeLatest } from "redux-saga/effects";
import authService from "../../services/AuthService";
import { changePasswordCompleteAction, changePasswordRequestAction } from "./actions";
import { CHANGE_PASSWORD } from "./actionTypes";

function* changePasswordSagas({ payload, callback }) {
  try {
    yield put(changePasswordRequestAction());
    const result = yield call(
      authService.changePassword,
      payload,
      callback
    );
  } catch (error) {
    yield put(changePasswordCompleteAction());
    console.log("changePassword Error" + JSON.stringify(error, null, 2));
  } finally {
    yield put(changePasswordCompleteAction());
  }
}


export function* watchLogoutSuccess() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordSagas);
}
