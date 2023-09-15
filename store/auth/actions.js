
import {
  FACEBOOK_LOGIN,
  GOOGLE_LOGIN,
  APPLE_LOGIN,
  LOGIN,
  FORGOT_PASSWORD,
  REGISTER,
  SET_ACTIVE_USER,
  LOGIN_LOADING,
  CHILD_SIGN_IN_LOG_DETAILS,
  CHILD_MARK_ABSENT_LOG_DETAILS,
  CHILD_SIGN_IN_STATUS_LIST,
  SET_CHILD_SIGNIN_STATUS_LIST,
  SET_PARENT,
  SET_CHILD_DATA,
  LOGOUT,
  LOGOUT_USER,
  UPDATE_ACTIVE_CHILD,
  SET_ACTIVE_CHILD,
  DELETE_ACCOUNT,
  GET_COMPANYORSERVICE_LIST,
  SET_COMPANYORSERVICE_LIST,
  SET_COMPANYORSERVICE_ITEM,
  SET_APP_VERSION_DETAILS,
  SET_SHOW_APP_UPDATE_MODAL,
  SET_VERSION_CHECK_DETAILS,
  GET_MEDICAL_OR_GENERAL_NOTES,
  SET_MEDICAL_OR_GENERAL_NOTES,
  GET_USER_ROLES,
  SET_USER_ROLES,
  SET_USER_DETAIL_ACCESS,
  GET_USER_DETAIL_ACCESS,
  RESET_PASSWORD,
  SET_LOGIN_DATA
} from "./actionTypes";

export function login(credentials, callback) {
  return {
    type: LOGIN,
    payload: credentials,
    callback: callback
  };
}

export function logout(credentials, callback) {
  return {
    type: LOGOUT_USER,
    payload: credentials,
    callback: callback
  };
}

export function register(credentials, callback) {
  return {
    type: REGISTER,
    payload: credentials,
    callback: callback,
  };
}

export function loginWithFacebook(pageType, callback) {
  return {
    type: FACEBOOK_LOGIN,
    pageType: pageType,
    callback: callback,
  };
}

export function loginWithGoogle(authInfo, callback) {
  return {
    type: GOOGLE_LOGIN,
    payload: authInfo,
    callback: callback
  };
}

export function loginWithApple(authInfo, callback) {
  return {
    type: APPLE_LOGIN,
    payload: authInfo,
    callback: callback
  };
}

export function forgotPassword(authInfo, callback) {
  return {
    type: FORGOT_PASSWORD,
    payload: authInfo,
    callback: callback,
  };
}

export function resetPassword(authInfo, callback) {
  return {
    type: RESET_PASSWORD,
    payload: authInfo,
    callback: callback,
  };
}

export function childSignInLog(credentials, callback) {
  return {
    type: CHILD_SIGN_IN_LOG_DETAILS,
    payload: credentials,
    callback: callback,
  };
}

export function childMarkAsAbsent(credentials, callback) {
  return {
    type: CHILD_MARK_ABSENT_LOG_DETAILS,
    payload: credentials,
    callback: callback,
  };
}

export function childSignInStatusList(authInfo, callback) {
  return {
    type: CHILD_SIGN_IN_STATUS_LIST,
    payload: authInfo,
    callback: callback,
  };
}

export function setChildSigninStatusList(data) {
  return {
    type: SET_CHILD_SIGNIN_STATUS_LIST,
    payload: data
  }
}

export function setActiveUser(data) {
  return {
    type: SET_ACTIVE_USER,
    payload: data
  }
}

export function setParent(data) {
  return {
    type: SET_PARENT,
    payload: data
  }
}

export function setChildData(data) {
  return {
    type: SET_CHILD_DATA,
    payload: data
  }
}

export function setLoading(isLoading) {
  return {
    type: LOGIN_LOADING,
    payload: isLoading
  }
}

export function setActiveChild(data) {
  return {
    type: UPDATE_ACTIVE_CHILD,
    payload: data
  }
}
export function setActiveChildCall(data) {
  return {
    type: SET_ACTIVE_CHILD,
    payload: data
  }
}

export function deleteAccountAction(email, callback) {
  return {
    type: DELETE_ACCOUNT,
    payload: email,
    callback
  }
}

export function setCompanyOrServiceList(data) {
  return {
    type: SET_COMPANYORSERVICE_LIST,
    payload: data
  }
}

export function setCompanyOrServiceItem(data) {
  return {
    type: SET_COMPANYORSERVICE_ITEM,
    payload: data
  }
}

export function setAppUpdateDetails(data) {
  return {
    type: SET_APP_VERSION_DETAILS,
    payload: data
  }
}

export function setShowAppUpdateModal(data) {
  return {
    type: SET_SHOW_APP_UPDATE_MODAL,
    payload: data
  }
}

export function setVersionCheckDetails() {
  return {
    type: SET_VERSION_CHECK_DETAILS,
  }
}

export function getCompanyorService(baseUrl) {
  return {
    type: GET_COMPANYORSERVICE_LIST,
    payload: baseUrl
  }
}

// ** get medical or general notes ** //
export function getMedicalOrGeneralNotes(reqObj, callback) {
  return {
    type: GET_MEDICAL_OR_GENERAL_NOTES,
    payload: reqObj,
    callback,
  };
}
export function setMedicalOrGeneralNotes(data) {
  return {
    type: SET_MEDICAL_OR_GENERAL_NOTES,
    payload: data,
  };
}

export const getUserRolesList = (callback) => {
  return {
    type: GET_USER_ROLES, 
    callback,
  };
}

export function setUserRolesList(data) {
  return {
    type: SET_USER_ROLES,
    payload: data,
  };
}

export function setLoginData(data) {
  return {
    type: SET_LOGIN_DATA,
    payload: data,
  };
}

export const getUserDetailToAccess = (data, callback) => {
  return {
    type: GET_USER_DETAIL_ACCESS, 
    payload: data,
    callback,
  };
}

export function setUserDetailsAccess(data) {
  return {
    type: SET_USER_DETAIL_ACCESS,
    payload: data,
  };
}