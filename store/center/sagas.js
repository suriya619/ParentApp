import { isEmpty } from "lodash";
import { call, put, select, takeLatest } from "redux-saga/effects";
import authService from "../../services/AuthService";
import {
  GET_CHILD_AGE_LIMIT,
  GET_CENTRE_SIGN_IN_OUT_SETTINGS,
} from "./actionTypes";

import {
  setLoading as setCenterLoading,
  setChildAgeLimit,
  setCentreSignInOutSettings,
} from "./actions";
import {
  getCentreSignInOutSettingsFromDB,
  insertCentreSignInOutSettings,
  getCentreAgeLimit,
  insertCentreAgeLimit,
} from "../../sql_lite";

function* getChildAgeLimit() {
  try {
    yield put(setCenterLoading(true));
    const { netInfo } = yield select((state) => ({
      netInfo: state.global.netInfo,
    }));
    if (!netInfo?.isConnected) {
      getCentreAgeLimit();
    } else {
      const response = yield call(authService.getChildAgeLimit);
      if (response?.Status?.Status) {
        const ageLimitData = !isEmpty(response?.Data) ? response?.Data[0] : {};
        insertCentreAgeLimit(ageLimitData);
        yield put(
          setChildAgeLimit({
            getChildAgeLimit: ageLimitData,
          })
        );
      }
    }
  } catch (error) {
    console.log("getChildAgeLimit Error" + JSON.stringify(error, null, 2));
  } finally {
    yield put(setCenterLoading(false));
  }
}

function* getCentreSignInOutSettings() {
  try {
    yield put(setCenterLoading(true));
    const { netInfo } = yield select((state) => ({
      netInfo: state.global.netInfo,
    }));
    if (!netInfo?.isConnected) {
      getCentreSignInOutSettingsFromDB();
    } else {
      const response = yield call(authService.getCentreSignInOutSettings);
      if (response?.Status?.Status) {
        insertCentreSignInOutSettings(response?.Data);
        yield put(
          setCentreSignInOutSettings({
            getCenterSigninOutSettings: response?.Data,
          })
        );
      }
    }
  } catch (error) {
    console.log(
      "getCentreSignInOutSettings Error" + JSON.stringify(error, null, 2)
    );
  } finally {
    yield put(setCenterLoading(false));
  }
}

export function* watchGetChildAgeLimit() {
  yield takeLatest(GET_CHILD_AGE_LIMIT, getChildAgeLimit);
}

export function* watchGetCentreSignInOutSettings() {
  yield takeLatest(GET_CENTRE_SIGN_IN_OUT_SETTINGS, getCentreSignInOutSettings);
}
