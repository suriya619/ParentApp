import { Toast } from "native-base";
import { save, get } from "../../assets/styles/storage";
import AuthenticationInstance from "../../services/AuthenticationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from '../../store';
import { setInternetMessageModal } from '../../store/global';

const ENDPOINTS = {
  LOGIN: "/userauth",
  REGISTER: "/createuser",
  FORGOT_PASSWORD: "/forgotpasswordauth",
  RESET_PASSWORD: "/resetpasswordauth",
  USERROLE: "/getuserrole",
  USER_DETAIL_ACCESS: "/GetUserDetailToAccess",
  CENTRES_LIST: "/getcentres",
  LOGOUT: "/signout"
};

const loginAPI = async (credentials: any, callback: any) => {
  try {
    const { data } = await AuthenticationInstance.post(ENDPOINTS.LOGIN, credentials);
    console.log("Login response = " + JSON.stringify(data, null, 2));
    handleResponseAuth(data, callback, true, "login");
    return data;
  }
  catch (err: any) {
    if (err?.message === "Network Error") {
      store.dispatch(setInternetMessageModal(true, ""));
    }
  }
}

const registerAPI = async (credentials: any, callback: any) => {
  try {
    const { data } = await AuthenticationInstance.post(ENDPOINTS.REGISTER, credentials);
    console.log("Register response = " + JSON.stringify(data, null, 2));
    handleResponseAuth(data, callback, false, "signup");
    return data;
  }
  catch (err: any) {
    if (err?.message === "Network Error") {
      store.dispatch(setInternetMessageModal(true, ""));
    }
  }
}


const forgotPasswordAPI = async (credentials: any, callback: any) => {
  try {
    const { data } = await AuthenticationInstance.post(ENDPOINTS.FORGOT_PASSWORD, credentials);
    console.log("forgot password response = " + JSON.stringify(data, null, 2));
    handleResponseAuth(data, callback, false, "forgot");
    return data;
  }
  catch (err: any) {
    if (err?.message === "Network Error") {
      store.dispatch(setInternetMessageModal(true, ""));
    }
  }
}

const resetPasswordAPI = async (credentials: any, callback: any) => {
  try {
    const { data } = await AuthenticationInstance.post(ENDPOINTS.RESET_PASSWORD, credentials);
    console.log("resetPasswordAPI response = " + JSON.stringify(data, null, 2));
    handleResponseAuth(data, callback, false, "reset");
    return data;
  }
  catch (err: any) {
    if (err?.message === "Network Error") {
      store.dispatch(setInternetMessageModal(true, ""));
    }
  }
}

const getUserRoleAPI = async () => {
  try {
    const auth = await get('auth');
    const reqBody = {
      accessToken: auth.accessToken,
    }
    const { data } = await AuthenticationInstance.post(ENDPOINTS.USERROLE, reqBody);
    const filterRole = data?.data?.roles?.filter((el: any) => el.role_id === '5');
    if (filterRole === undefined || filterRole.length === 0) {
      Toast.show({
        title: "Failure",
        status: "error",
        description: data?.errorMessage || "This user is not associated with the Parent role. Please try with some other user.",
        duration: 3000,
        placement: "top",
      });
    } else if (filterRole.length > 0) {
      Toast.show({
        title: "Success",
        status: "success",
        description: "User logging in successfully",
        duration: 1500,
        placement: "top",
      });
      handleResponse(data, null);
    }
    return filterRole;
  }
  catch (err: any) {
    if (err?.message === "Network Error") {
      store.dispatch(setInternetMessageModal(true, ""));
    }
  }
}

const logoutAPI = async (credentials: any, callback: any) => {
  try {
    const { data } = await AuthenticationInstance.post(ENDPOINTS.LOGOUT, credentials);
    console.log("Logout response = " + JSON.stringify(data, null, 2));
    handleResponseAuth(data, callback, true, "logout");
    callback && callback(data);
    return data;
  }
  catch (err) {

  }
}
const createSession = async (user: any, deleted: any) => {
  if (deleted === null) {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    if (user.AccessToken) {
      await AsyncStorage.setItem("accessToken", user.AccessToken);
    }
  }
};
const getUserDetailToAccessAPI = async (payload: any, callback: any) => {
  try {
    const auth = await get('auth');
    const reqBody = {
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
      siteToAccess: payload.siteToAccess,
      roleID: payload.roleID
    }
    const { data } = await AuthenticationInstance.post(ENDPOINTS.USER_DETAIL_ACCESS, reqBody);
    console.log("Login response = " + JSON.stringify(data, null, 2));
    const dataModal = handleResponseModal(data);
    if (data.status) {
      createSession(dataModal, null);
    } else {
      Toast.show({
        title: "Failure",
        status: "error",
        description: data?.errorMessage || "",
        duration: 5000,
        placement: "top",
      });
    }
    handleResponse({ ...dataModal, status: true }, callback);
    return dataModal;
  }
  catch (err: any) {
    if (err?.message === "Network Error") {
      store.dispatch(setInternetMessageModal(true, ""));
    }
  }
}

const handleResponseModal = (resp: any) => {
  const lstChild = resp.data?.lstChild.map((el: any) => ({
    "ChildID": el.childID,
    "CRNNumber": el.crnNumber,
    "FirstName": el.firstName,
    "LastName": el.lastName,
    "Gender": el.gender,
    "BirthDate": el.birthDate,
    "DateRegistered": el.dateRegistered,
    "Notes": el.notes,
    "Allergy": el.allergy,
    "ImagePath": el.imagePath,
    "IsOlderChild": el.isOlderChild,
    "IsBookedToday": el.isBookedToday,
    "SignInStatus": el.signInStatus,
    "sortIndex": el.sortIndex
  }));
  return {
    "Status": {
      "Status": resp.status,
      "StatusMessage": null,
      "ResponseMessage": "User logging in successfully"
    },
    "AccessToken": resp.accessToken,
    "Data": {
      "UserId": resp.data?.userId,
      "FirstName": resp.data?.firstName,
      "LastName": resp.data?.lastName,
      "CompanyId": resp.data?.companyId,
      "ChildCareCentreId": resp.data?.childCareCentreId,
      "MobileNumber": resp.data?.mobileNumber,
      "Email": resp.data?.email,
      "DateOfBirth": resp.data?.dateOfBirth,
      "CRNNumber": resp.data?.crnNumber,
      "ParentId": resp.data?.parentId,
      "CompanyName": resp.data?.companyName,
      "CentreName": resp.data?.centreName,
      "UserRole": resp.data?.userRole,
      "UserStatus": resp.data?.userStatus,
      "lstChild": lstChild,
      "UserRequestStatusId": resp.data?.userRequestStatusId,
      "UserImage": resp.data?.userImage
    }
  }
}

const getAllCenterListAPI = async (payload: any, callback: any) => {
  try {
    const { data } = await AuthenticationInstance.get(ENDPOINTS.CENTRES_LIST);
    return data;
  }
  catch (err: any) {
    if (err?.message === "Network Error") {
      store.dispatch(setInternetMessageModal(true, ""));
    }
  }
}

const handleResponseAuth = (data: any, callback: any, storeData: boolean = false, type: string) => {

  const statusMessage = data?.errorMessage || data?.responseMessage;

  if (type === "login" && data?.responseMessage === "User logging in successfully") {
    storeData && save('auth', data.data);
    callback && callback(data.data);
  } else if ((data?.statusCode === 200 && data?.responseMessage !== "Failure" && type !== "login") || data.status) {
    Toast.show({
      title: "Success",
      status: "success",
      description: statusMessage,
      duration: (type === "logout") ? 1500 : 3000,
      placement: "top",
    });
    storeData && save('auth', data.data);
    callback && callback((type === "forgot" || type === "reset" || type === "signup" || type === "logout") ? data : data.data);
  } else if ((data?.statusCode === 200 && data?.responseMessage === "Failure") || data?.responseMessage === "Failure") {
    Toast.show({
      title: "Failure",
      status: "error",
      description: statusMessage,
      duration: 5000,
      placement: "top",
    });
  } else if (data.message !== "Network Error" && (storeData && data?.statusCode !== 200 && !data.status)) {
    Toast.show({
      title: ((data?.statusCode === 200 && data?.responseMessage !== "Failure")) ? "Success" : (data.status ? "Success" : "Failure"),
      status: data?.statusCode === 200 || data.status ? "success" : "error",
      description: statusMessage,
      duration: data?.statusCode === 200 || data.status ? 1500 : 5000,
      placement: "top",
    });
  }
}

const handleResponse = (data: any, callback: any) => {
  if (data?.statusCode === 200 || data.status) {
    callback && callback(data.status ? data : data.data);
  }
}
export {
  loginAPI,
  getUserRoleAPI,
  registerAPI,
  forgotPasswordAPI,
  getUserDetailToAccessAPI,
  getAllCenterListAPI,
  resetPasswordAPI,
  logoutAPI
}