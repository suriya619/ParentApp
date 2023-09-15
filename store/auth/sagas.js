import { call, put, select, takeLatest } from "redux-saga/effects";
import { groupBy, isEmpty } from "lodash";
import authService from "../../services/AuthService";
import {
  APPLE_LOGIN,
  FACEBOOK_LOGIN,
  FORGOT_PASSWORD,
  GOOGLE_LOGIN,
  LOGIN,
  REGISTER,
  CHILD_SIGN_IN_LOG_DETAILS,
  CHILD_MARK_ABSENT_LOG_DETAILS,
  CHILD_SIGN_IN_STATUS_LIST,
  LOGOUT,
  LOGOUT_USER,
  SET_ACTIVE_CHILD,
  DELETE_ACCOUNT,
  SET_VERSION_CHECK_DETAILS,
  GET_COMPANYORSERVICE_LIST,
  GET_MEDICAL_OR_GENERAL_NOTES,
  GET_USER_ROLES,
  GET_USER_DETAIL_ACCESS,
  RESET_PASSWORD,
} from "./actionTypes";
import {
  setActiveUser,
  setChildSigninStatusList,
  setLoading as setLoginLoading,
  setParent,
  setChildData,
  setActiveChild,
  setAppUpdateDetails,
  setShowAppUpdateModal,
  setCompanyOrServiceList,
  setMedicalOrGeneralNotes,
  setUserRolesList,
} from "./actions";
import {
  createAllTables,
  insertParent,
  insertAllChild,
  insertChildSignInStatus,
  deleteChildSignInStatus,
  getAllChildSignInStatus,
  dropAllTables,
} from "../../sql_lite";
import { convertDateformat } from "../../utils/date";
import {
  setInternetMessageModal
} from "../global";
import { forgotPasswordAPI, getUserDetailToAccessAPI, getUserRoleAPI, loginAPI, registerAPI, resetPasswordAPI, getAllCenterListAPI, logoutAPI } from "./authenticationAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

function* login({ payload, callback }) {
  try {
    dropAllTables();
    createAllTables();
    yield put(setLoginLoading(true));
    const data = yield call(loginAPI, payload, callback);
    if (!data?.data) {
      yield put(setLoginLoading(false));
    }
  } catch (error) {
    console.log("loginError ===", error);
    yield put(setLoginLoading(false));
  } finally {
    // yield put(setLoginLoading(false));
  }
}

function* register({ payload, callback }) {
  try {
    yield put(setLoginLoading(true));
    const data = yield call(registerAPI, payload, callback);
    yield put(setLoginLoading(false));
  } catch (error) {
    console.log("loginError" + JSON.stringify(error, null, 2));
  } finally {
    yield put(setLoginLoading(false));
  }
}

function* loginWithFacebook({ pageType, callback }) {
  try {
    yield put(setLoginLoading(true));
    yield call(authService.loginWithFacebook, pageType, callback);
  } catch (error) {
    console.log("loginError" + JSON.stringify(error, null, 2));
  } finally {
    yield put(setLoginLoading(false));
  }
}

function* loginWithGoogle({ payload, callback }) {
  try {
    dropAllTables();
    createAllTables();

    yield put(setLoginLoading(true));
    yield call(authService.loginWithGoogle, payload, callback);
  } catch (error) {
    console.log("loginError" + JSON.stringify(error, null, 2));
  } finally {
    yield put(setLoginLoading(false));
  }
}

function* loginWithApple({ payload, callback }) {
  try {
    dropAllTables();
    createAllTables();
    yield put(setLoginLoading(true));
    yield call(authService.loginWithApple, payload, callback);
  } catch (error) {
    console.log("loginWithApple" + JSON.stringify(error, null, 2));
  } finally {
    yield put(setLoginLoading(false));
  }
}

function* forgotPasswordFromLogin({ payload, callback }) {
  try {
    // yield put(setLoader(true));
    yield put(setLoginLoading(true));
    yield call(forgotPasswordAPI, payload, callback);
  } catch (error) {
    console.log("forgotPwd Error" + JSON.stringify(error, null, 2));
  } finally {
    yield put(setLoginLoading(false));
  }
}

function* resetPasswordFromLogin({ payload, callback }) {
  try {
    yield put(setLoginLoading(true));
    yield call(resetPasswordAPI, payload, callback);
  } catch (error) {
    console.log("resetPasswordFromLogin Error" + JSON.stringify(error, null, 2));
  } finally {
    yield put(setLoginLoading(false));
  }
}

function* logoutRefresh() {
     yield put({ type: LOGOUT });
}

function* logout({ payload, callback }) {
  try {
     yield put(setLoginLoading(true));
    yield call(logoutAPI, payload, callback);
  } catch (error) {
    console.log("logout Error" + JSON.stringify(error, null, 2));
  } finally {
     yield put(setLoginLoading(false));
  }
}

function* childSignInStatusList({ payload, callback }) {
  try {
    const { netInfo } = yield select((state) => ({
      netInfo: state.global.netInfo,
    }));
    const CheckInDate = convertDateformat(new Date());
    if (!netInfo?.isConnected) {
      getAllChildSignInStatus(CheckInDate, callback);
    } else {
      const response = yield call(
        authService.childSignInStatus,
        payload,
        callback
      );
      if (response?.Status?.Status) {
        if (response?.Data.length > 0) {
          const dataTemp = response?.Data || [];

          deleteChildSignInStatus(CheckInDate);

          dataTemp.forEach(function (element) {
            insertChildSignInStatus(element, CheckInDate);
          });
        }
        yield put(
          setChildSigninStatusList({
            childSigninStatusList: !isEmpty(response?.Data)
              ? response?.Data
              : [],
          })
        );
      }
    }
  } catch (error) {
    console.log("childSignInStatusList Error" + JSON.stringify(error, null, 2));
  } finally {
  }
}

function* childSignInLogDetails({ payload, callback }) {
  try {
    yield call(authService.childSignInLogDetails, payload, callback);
  } catch (error) {
    console.log("childSignInLogDetails Error" + JSON.stringify(error, null, 2));
  } finally {
  }
}

function* childMarkAsAbsentLogDetails({ payload, callback }) {
  try {
    yield call(authService.childMarkAsAbsentLogDetails, payload, callback);
  } catch (error) {
    console.log(
      "childMarkAsAbsentLogDetails Error" + JSON.stringify(error, null, 2)
    );
  } finally {
  }
}

function* setActiveChildAction({ payload }) {
  try {
    yield put(setActiveChild(payload))
  } catch (err) {
    console.log(err, "err")
  }
}

function* deleteAccount({ payload, callback }) {
  try {
    dropAllTables();
    createAllTables();
    yield put(setLoginLoading(true));
    const data = yield call(authService.deleteAccount, payload, callback);
  } catch (error) {
    console.log("DELETEError ===", error);
    // displayNoNetworkToast();
  } finally {
    yield put(setLoginLoading(false));
  }
}

function* getCompanyorService({ payload, callback }) {
  try {
    yield put(setLoginLoading(true));
    const data = yield call(getAllCenterListAPI, payload, callback);
    if (data?.message === "Network Error") {
      yield put(setInternetMessageModal(true, 'splash'));
    } else {
      if (data?.statusCode) {
        const datalist = data?.data;
        const groubBy = groupBy(datalist, 'siteAccess');
        const siteAccesKeys = Object.keys(groubBy);

        let groupedArray = siteAccesKeys.map((item) => {
          const getList = groupBy(groubBy[item], 'companyName')

          const companyKeys = Object.keys(getList).map(ele => {
            return {
              companyName: ele,
              centreList: getList[ele]
            }
          })

          return {
            siteAccess: item,
            companyList: companyKeys.filter(ele => ele.companyName !== "null" && ele.companyName !== "")
          }
        });

        yield put(setCompanyOrServiceList(groupedArray));
      } else {
        yield put(setCompanyOrServiceList([]));
      }
      yield put(setInternetMessageModal(false, ''));
    }
  } catch (error) {
    console.log("getCompanyorService Error ===", error);
  } finally {
    yield put(setLoginLoading(false));
  }
}

function* checkVersionDetails({ payload, callback }) {
  try {
    const { netInfo } = yield select((state) => ({
      netInfo: state.global.netInfo,
    }));
    if (netInfo?.isConnected) {
      yield put(setLoginLoading(true));
      const data = yield call(authService.checkVersionDetails, payload, callback);
      if (data?.version?.needsUpdate) {
        yield put(setAppUpdateDetails({
          isforceUpdated: data?.status,
          url: data?.version?.url
        }));
        yield put(setShowAppUpdateModal(true));
        yield put(setInternetMessageModal(false, ""));
      }
    }
  } catch (error) {
    console.log("checkVersionDetails Error ===", error);
  } finally {
    yield put(setLoginLoading(false));
  }
}

function* getMedicalOrGeneralNotes({ payload, callback }) {
  try {
    const data = yield call(authService.getMedicalOrGeneralNotes, payload, callback);
    if (data) {
      yield put(setMedicalOrGeneralNotes(data));
    } else {
      yield put(setMedicalOrGeneralNotes({}));
    }
  } catch (error) {
    console.log('setMedicalOrGeneralNotes Error ===', error);
  } finally {
    yield put(setLoginLoading(false));
  }
}

function* getUserRoles({ payload, callback }) {
  try {
    // yield put(setLoginLoading(true));
    const response = yield call(getUserRoleAPI, callback);
    if (response?.length) {
      yield put(setUserRolesList(response));
    } else if (response?.length === 0) {
      yield put(setLoginLoading(false));
    }
  } catch (error) {
    console.log("getUserRoles ===", error);
    // displayNoNetworkToast();
  } finally {
    // yield put(setLoginLoading(false)); 
  }
}
const createSession = async (user, deleted) => {
  if (deleted === null) {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    if (user.AccessToken) {
      await AsyncStorage.setItem("accessToken", user.AccessToken);
    }
    await this.setAuthorizationHeader();
  }
};
function* getUserDetailToAccess({ payload, callback }) {
  try {
    yield put(setLoginLoading(true));
    const response = yield call(getUserDetailToAccessAPI, payload, callback);
    if (response?.Status.Status) {
      createSession(response, null);
      yield put(setParent(response.Data)); // Set in redux
      console.log("Started >>> insert parent", response.Data);
      insertParent(response.Data);
      if (response?.Data.lstChild.length > 0) {
        yield put(setChildData(response.Data.lstChild));
        response.Data.lstChild.forEach(function (element) {
          insertAllChild(element, response.Data.ParentId);
        });
      }
    }
    yield put(setActiveUser(response));
  } catch (error) {
    console.log("loginError ===", error);
    // displayNoNetworkToast();
  } finally {
    yield put(setLoginLoading(false));
  }
}


export function* watchLogin() {
  yield takeLatest(LOGIN, login);
}

export function* watchRegister() {
  yield takeLatest(REGISTER, register);
}

export function* watchLoginWithGoogle() {
  yield takeLatest(GOOGLE_LOGIN, loginWithGoogle);
}

export function* watchLoginWithApple() {
  yield takeLatest(APPLE_LOGIN, loginWithApple);
}

export function* watchLoginWithFacebook() {
  yield takeLatest(FACEBOOK_LOGIN, loginWithFacebook);
}

export function* watchForgotPassword() {
  yield takeLatest(FORGOT_PASSWORD, forgotPasswordFromLogin);
}

export function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD, resetPasswordFromLogin);
}

export function* watchChildSignInLogDetails() {
  yield takeLatest(CHILD_SIGN_IN_LOG_DETAILS, childSignInLogDetails);
}

export function* watchChildMarkAsAbsentLogDetails() {
  yield takeLatest(CHILD_MARK_ABSENT_LOG_DETAILS, childMarkAsAbsentLogDetails);
}

export function* watchChildSignInStatusList() {
  yield takeLatest(CHILD_SIGN_IN_STATUS_LIST, childSignInStatusList);
}

export function* watchLogoutSuccess() {
  yield takeLatest(LOGOUT, logoutRefresh);
}
export function* watchLogout() {
  yield takeLatest(LOGOUT_USER, logout);
}

export function* watchSetActiveChild() {
  yield takeLatest(SET_ACTIVE_CHILD, setActiveChildAction)
}

export function* watchDeleteAccount() {
  yield takeLatest(DELETE_ACCOUNT, deleteAccount)
}

export function* watchGetCompanyorService() {
  yield takeLatest(GET_COMPANYORSERVICE_LIST, getCompanyorService)
}

export function* watchCheckVersionDetails() {
  yield takeLatest(SET_VERSION_CHECK_DETAILS, checkVersionDetails)
}

export function* watchGetMedicalOrGeneralNotes() {
  yield takeLatest(GET_MEDICAL_OR_GENERAL_NOTES, getMedicalOrGeneralNotes);
}

export function* watchGetUserRoles() {
  yield takeLatest(GET_USER_ROLES, getUserRoles);
}
export function* watchGetUserDetailToAccess() {
  yield takeLatest(GET_USER_DETAIL_ACCESS, getUserDetailToAccess);
}