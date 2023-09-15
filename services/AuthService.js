import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Facebook from "expo-facebook";
import ApiService from "./ApiService";
import config from "../config";
// import notificationService from './NotificationService';
import { Toast } from "native-base";
import {
  getCurrentDate,
  getLastWeeksDate,
  getPast6monthsDate,
} from "../utils/date";
import moment from "moment";
import axios from "axios";
import { checkVersion } from "react-native-check-version";
import VersionNumber from 'react-native-version-number';
import { get } from "../assets/styles/storage";
import { Platform } from "react-native";

const { FACEBOOK_APP_ID } = config;

const { CLIENT_ID } = config;

const ENDPOINTS = {
  LOGIN: "/api/Auth/Login",
  REGISTER: "/api/Registration/RegisterUser",
  FORGOT_PASSWORD: "/api/Auth/ForgotPassword?",
  SOCIAL_LOGIN: "/api/Auth/SocialLogin",
  SOCIAL_REGISTER: "/api/Registration/SocialLoginUserRegister",
  CHILD_SIGN_IN_LOG_DETAILS: "/api/SignINLog/SignInLogDetailsUpdate",
  CHILD_SIGN_IN_STATUS: "/api/SignINLog/GetChildSignInStatus",
  CHILD_MARK_ABSENT: "/api/SignINLog/MarkChildAbsent",
  GET_CHILD_AGE_LIMIT: "/api/SignINLog/GetChildAgeLimit",
  GET_CENTRE_SIGN_IN_OUT_SETTINGS: "/api/Centre/GetCentreSignInOutSettings",
  GET_ACTIVITY_BY_LAST_MODIFIED_DATE: "/api/DayCare/GetActivityByLastModifiedDate",
  GET_ACTIVITY_BY_DATE_RANGE: "/api/DayCare/GetActivityByDateRange",
  GET_CHILDREN_TIMELINE: "/api/webapi/GetChildrenTimeline",
  GET_CHILDREN_LEARNING: "/api/webapi/GetLEActivityDashboard",
  GET_LELOOKUP: "/api/webapi/GetLELookup",
  CHANGE_PASSWORD: "/api/webapi/ChangePassword",
  DELETE_ACCOUNT: "/api/webapi/RemoveRoleAccess",
};

class AuthService extends ApiService {
  constructor() {
    super();
    this.init();
  }

  init = async () => {
    const token = this.getAccessToken();
    const user = this.getUser();

    if (token && user) {
      await this.setAuthorizationHeader();
      this.api.setUnauthorizedCallback(this.destroySession.bind(this));
    }
  };

  setAuthorizationHeader = async () => {
    const accessToken = await this.getAccessToken();
    if (accessToken) {
      this.api.attachHeaders({
        Authorization: `Bearer ${accessToken}`,
      });
    }

    this.api.attachHeaders({
      clientId: CLIENT_ID,
    });
  };

  createSession = async (user, deleted) => {
    if (deleted === null) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      if (user.AccessToken) {
        await AsyncStorage.setItem("accessToken", user.AccessToken);
      }
      await this.setAuthorizationHeader();
    }
  };

  destroySession = async () => {
    // await AsyncStorage.clear();
    this.api.removeHeaders(["Authorization"]);
  };

  login = async (credentials, callback) => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGIN, credentials);
    //  console.log("Login response = " + JSON.stringify(data, null, 2));
    this.handleResponse(data, callback);
    return data;
  };

  register = async (credentials, callback) => {
    const { data } = await this.apiClient.post(ENDPOINTS.REGISTER, credentials);
    this.handleResponse(data, callback);
    return data;
  };

  handleResponse = async (data, callback) => {
    // console.log("fbCallback check >>> " + callback);

    const deleted = await AsyncStorage.getItem("deletedAccount");
    if (data?.Status.Status) {
      await this.createSession(data, deleted);
    }
    const statusMessage = data?.Status?.ResponseMessage;
    if (data.message !== "Network Error") {
      if (deleted == null) {
        Toast.show({
          title: data?.Status.Status ? "Success" : "Failure",
          status: data?.Status.Status ? "success" : "error",
          description: statusMessage,
          duration: data?.Status.Status ? 1500 : 3000,
          placement: "top",
        });
      } else {
        Toast.show({
          title: "Failure",
          status: "error",
          description: "Your account has been deleted. Please contact admin@yourchildsday.com",
          duration: 3000,
          placement: "top",
        });
      }
    }

    setTimeout(() => {
      callback && callback(data);
    }, 300);
  };

  loginWithGoogle = async (authInfo, callback) => {
    if (authInfo?.pageType === "SignUp") {
      var userName = authInfo?.userData.email.substring(
        0,
        authInfo?.userData.email.lastIndexOf("@")
      );
      const reqBody = {
        Email: authInfo?.userData.email,
        UserName: userName,
        FirstName: "",
        LastName: "",
        MobileNumber: "",
        LoginProvider: "Google",
        ProviderKey: authInfo?.userData.sub,
      };
      const { data } = await this.apiClient.post(
        ENDPOINTS.SOCIAL_REGISTER,
        reqBody
      );

      this.handleResponse(data, callback);
      return data;
    } else {

      const { data } = await this.apiClient.get(
        `${ENDPOINTS.SOCIAL_LOGIN}?LoginProvider=Google&ProviderKey=${authInfo?.userData.sub}`
      );
      this.handleResponse(data, callback);
      return data;
    }
  };

  loginWithApple = async (authInfo, callback) => {

    const getAppleLoginDetails = await AsyncStorage.getItem("Apple_Login");
    const parseGetAppleSignUp = getAppleLoginDetails
      ? JSON.parse(getAppleLoginDetails)
      : {};
    const authAppleSignUpDetails =
      parseGetAppleSignUp && parseGetAppleSignUp[authInfo?.userData.user]
        ? parseGetAppleSignUp[authInfo?.userData.user]
        : {};

    if (authInfo?.pageType === "SignUp") {
      var userName = (
        authInfo?.userData.email ||
        authAppleSignUpDetails?.email ||
        ""
      ).substring(
        0,
        (
          authInfo?.userData.email ||
          authAppleSignUpDetails?.email ||
          ""
        ).lastIndexOf("@")
      );
      const reqBody = {
        Email: authInfo?.userData.email || authAppleSignUpDetails?.email,
        UserName: userName,
        FirstName:
          authInfo?.fullName?.givenName ||
          authAppleSignUpDetails?.fullName?.givenName,
        LastName:
          authInfo?.fullName?.familyName ||
          authAppleSignUpDetails?.fullName?.familyName,
        MobileNumber: "",
        LoginProvider: "Apple",
        ProviderKey: authInfo?.userData.user || authAppleSignUpDetails?.user,
      };
      const { data } = await this.apiClient.post(
        ENDPOINTS.SOCIAL_REGISTER,
        reqBody
      );

      this.handleResponse(data, callback);
      return data;
    } else {
      const { data } = await this.apiClient.get(
        `${ENDPOINTS.SOCIAL_LOGIN}?LoginProvider=Apple&ProviderKey=${authInfo?.userData.user}`
      );
      this.handleResponse(data, callback);
      return data;
    }
  };

  forgotPasswordFromLogin = async (authInfo, callback) => {
    const { data } = await this.apiClient.get(
      `${ENDPOINTS.FORGOT_PASSWORD}email=${authInfo?.Email}`
    );
    this.handleResponse(data, callback);
    return data;
  };

  childSignInStatus = async (authInfo, callback) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const user = await this.getUser();
    let headerConfig = {
      headers: {
        AuthorizedToken: accessToken,
      },
    };
    console.log(`${ENDPOINTS.CHILD_SIGN_IN_STATUS}?parentId=${user?.Data?.ParentId}`);
    const { data } = await this.apiClient.get(
      `${ENDPOINTS.CHILD_SIGN_IN_STATUS}?parentId=${user?.Data?.ParentId}`,
      headerConfig
    );
    callback && callback(data);

    return data;
  };

  childSignInLogDetails = async (credentials, callback) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    let headerConfig = {
      headers: {
        AuthorizedToken: accessToken,
      },
    };

    const reqBody = {
      Id: "null",
      SignType: credentials.SignType,
      ParentID: credentials.ParentID,
      ChildID: credentials.ChildID,
      // SignDate: credentials.SignDate,
      SignatureImage: credentials.SignatureImage,
      SleepWell: credentials.SleepWell,
      Mood: credentials.Mood,
      CollectingByWho: credentials.CollectingByWho,
      TimeOfCollection: credentials.TimeOfCollection,
      TimeOfWokeUp: credentials.TimeOfWokeUp,
      TimeOfLastBottle: credentials.TimeOfLastBottle,
      Medication: credentials.Medication,
      ImportantInformation: credentials.ImportantInformation,
      SignOutParentID: credentials.ParentID,
      TimeOfLastNappy: credentials.TimeOfLastNappy
    };

    const { data, status } = await this.apiClient.post(
      ENDPOINTS.CHILD_SIGN_IN_LOG_DETAILS,
      reqBody,
      headerConfig
    );

    callback && callback(data, status);

    return data;
  };

  childMarkAsAbsentLogDetails = async (credentials, callback) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    let headerConfig = {
      headers: {
        AuthorizedToken: accessToken,
      },
    };

    // console.log(
    //   "childSignInLogDetails >> queryString : " + JSON.stringify(credentials)
    // );

    const reqBody = {
      Id: "null",
      ChildID: credentials.ChildID,
      ParentID: credentials.ParentID,
      // SignDate: getCurrentDate(),
      // StartDate: credentials.StartDate,
      // EndDate: credentials.EndDate,
      Notes: credentials.Notes,
      Reason: credentials.Reason,
      UserId: credentials.UserId,
      ParentName: credentials.ParentName,
      ChildName: credentials.ChildName,
    };
    const { data, status } = await this.apiClient.post(
      ENDPOINTS.CHILD_MARK_ABSENT,
      reqBody,
      headerConfig
    );
    callback && callback(data, status);
    return data;
  };

  getActivityByLastModifiedDate = async (authInfo, callback) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    let headerConfig = {
      headers: {
        AuthorizedToken: accessToken,
      },
    };
    const { data } = await this.apiClient.get(
      `${ENDPOINTS.GET_ACTIVITY_BY_LAST_MODIFIED_DATE}?parentId=${authInfo?.ParentID}&LastModifiedDate=${authInfo?.LastModifiedDate}`,
      headerConfig
    );

    callback && callback(data);

    return data;
  };

  getActivityByRangeDate = async (authInfo, callback) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    let headerConfig = {
      headers: {
        AuthorizedToken: accessToken,
      },
    };
    const { data } = await this.apiClient.get(
      `${ENDPOINTS.GET_ACTIVITY_BY_DATE_RANGE}?weekStartDate=${authInfo?.StartDate}&weekEndDate=${authInfo?.EndDate}&parentId=${authInfo?.ParentID}`,
      headerConfig
    );

    callback && callback(data);

    return data;
  };

  getChildAgeLimit = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const user = await this.getUser();
    let headerConfig = {
      headers: {
        AuthorizedToken: accessToken,
      },
    };

    const { data } = await this.apiClient.get(
      `${ENDPOINTS.GET_CHILD_AGE_LIMIT}?CentreID=${user?.Data?.ChildCareCentreId || "1"
      }`,
      headerConfig
    );
    return data;
  };

  getCentreSignInOutSettings = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const user = await this.getUser();
    let headerConfig = {
      headers: {
        AuthorizedToken: accessToken,
      },
    };
    const { data } = await this.apiClient.get(
      `${ENDPOINTS.GET_CENTRE_SIGN_IN_OUT_SETTINGS}?parentId=${user?.Data?.ParentId}`,
      headerConfig
    );
    return data;
  };

  getLookup = async () => {
    // console.log("GetLookup auth service");

    const accessToken = await AsyncStorage.getItem("accessToken");
    const user = await this.getUser();
    let headerConfig = {
      headers: {
        AuthorizedToken: accessToken,
      },
    };

    const { data } = await this.apiClient.get(
      `${ENDPOINTS.GET_LELOOKUP}?centreId=1&userId=${user?.Data?.UserId
      }&date=${moment(new Date()).format("YYYY-MM-DD")}`,
      headerConfig
    );

    // console.log("Getting Lookups***** ", data);

    return data;
  };

  getChildrenTimeline = async (authInfo, callback) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) return null;
    const user = await this.getUser();
    let headerConfig = {
      headers: {
        AuthorizedToken: accessToken,
      },
    };
    console.log(`${ENDPOINTS.GET_CHILDREN_TIMELINE}?centreID=${user?.Data?.ChildCareCentreId || "1"
      }&date=${authInfo?.date}&childID=${authInfo?.childID || null}&taskTypeIDs=1,2,3,4,5,6,8,9&email=${user?.Data?.Email}`)
    const { data } = await this.apiClient.get(
      `${ENDPOINTS.GET_CHILDREN_TIMELINE}?centreID=${user?.Data?.ChildCareCentreId || "1"
      }&date=${authInfo?.date}&childID=${authInfo?.childID || null}&taskTypeIDs=1,2,3,4,5,6,8,9&email=${user?.Data?.Email}`,
      headerConfig
    );

    // console.log(
    //   "response getChildrenTimeline = " + JSON.stringify(data, null, 2)
    // );

    callback && callback(data);

    return data;
  };

  getChildrenLearning = async (payload, callback) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) return null;
    const user = await this.getUser();
    let headerConfig = {
      headers: {
        AuthorizedToken: accessToken,
      },
    };

    const childids = await this.getChildIds();

    const reqBody = {
      UserId: user?.Data?.UserId,
      FromDate: getPast6monthsDate(),
      ToDate: getCurrentDate(),
      ShareWithParents: 1,
      Childrens: childids,
      Status: 3,
      email: user?.Data?.Email
    };
    // console.log("GetChildrenLearning #####" + JSON.stringify(reqBody));

    const { data } = await this.apiClient.post(
      ENDPOINTS.GET_CHILDREN_LEARNING,
      reqBody,
      headerConfig
    );
    // setTimeout(() => {
    //   callback && callback(data);
    // }, 1000)

    return data;
  };

  facebookLogin = async (pageType, dataUser, callback) => {
    console.log("fbCallBack initial method 2 >>> " + callback);
    console.log(
      "SocialPageType facebookLogin >> check page : " +
      JSON.stringify(pageType?.pageType)
    );
    if (pageType?.pageType === "SignUp") {
      console.log("SocialPageType >> signup page condition satisfied : ");
      var userName = dataUser.email.substring(
        0,
        dataUser.email.lastIndexOf("@")
      );
      const reqBody = {
        Email: dataUser.email,
        UserName: userName,
        FirstName: "",
        LastName: "",
        MobileNumber: "",
        LoginProvider: "Facebook",
        ProviderKey: dataUser.id,
      };
      console.log("SignUp social reqBody >> " + JSON.stringify(reqBody));
      const { data } = await this.apiClient.post(
        ENDPOINTS.SOCIAL_REGISTER,
        reqBody
      );

      console.log("fbCallBack check2 >>> " + callback);

      this.handleResponse(data, callback);
      return data;
    } else {
      console.log("SocialPageType >> SignIn page condition satisfied : ");

      const { data } = await this.apiClient.get(
        `${ENDPOINTS.SOCIAL_LOGIN}?LoginProvider=Facebook&ProviderKey=${dataUser.id}`
      );

      console.log("fbCallBack check2 >>> " + callback);

      this.handleResponse(data, callback);
      return data;
    }

    // const { data } = await this.apiClient.get(
    //   `${ENDPOINTS.FACEBOOK}&ProviderKey=${dataUser.id}`
    // );
  };

  loginWithFacebook = async (pageType, callback) => {
    console.log(pageType, callback, "== pageType, callback");
    // try {
    //   await Facebook.initializeAsync({
    //     appId: FACEBOOK_APP_ID,
    //   });
    //   const { type, token, expirationDate, permissions, declinedPermissions } =
    //     await Facebook.logInWithReadPermissionsAsync({
    //       permissions: ["public_profile", "email"],
    //     });
    //   if (type === "success") {
    //     // Get the user's name using Facebook's Graph API
    //     const responseUser = await fetch(
    //       `https://graph.facebook.com/me?access_token=${token}`
    //     );
    //     const data = await responseUser.json();
    //     const response = await fetch(
    //       `https://graph.facebook.com/${data.id}?fields=id,name,email,picture&access_token=${token}`
    //     );
    //     const dataUser = await response.json();

    //     console.log("fbCallBack initial method 1 >>> " + callback);
    //     this.facebookLogin(pageType, dataUser, callback);
    //   } else {
    //     // type === 'cancel'
    //   }
    // } catch ({ message }) {
    //   alert(`Facebook Login Error: ${message}`);
    //   console.log(message);
    // }
  };

  getAccessToken = async () => {
    const user = await AsyncStorage.getItem("user");
    return user ? JSON.parse(user).accessToken : undefined;
  };

  getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    return JSON.parse(user);
  };

  getChildIds = async () => {
    const user = await AsyncStorage.getItem("user");
    const childids = JSON.parse(user)
      ?.Data?.lstChild.map(({ ChildID }) => ChildID)
      .join(",");

    return childids;
  };

  updateUserInStorage = async (property) => {
    const user = await AsyncStorage.getItem("user");
    let jsonUser = JSON.parse(user);
    jsonUser = { ...jsonUser, ...property };
    AsyncStorage.setItem("user", JSON.stringify(jsonUser));
  };

  changePassword = async (payload, callback) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) return null;
    const auth = await get('auth');
    const headerConfig = {
      headers: {
        authorizedtoken: accessToken,
      },
    };
    const reqBody = {
      ...payload,
      AccessToken: auth.accessToken,
    }
    const { data } = await this.apiClient.post(
      `${ENDPOINTS.CHANGE_PASSWORD}`,
      reqBody,
      headerConfig
    );
    if (data?.StatusMessage !== 'failure') {
      callback && callback(data);
    }

    Toast.show({
      title: data?.StatusMessage !== 'failure' ? "Success" : "Failure",
      status: data?.StatusMessage !== 'failure' ? "success" : "error",
      description: data?.ResponseMessage || "Successfully changed password",
      duration: data?.StatusMessage !== 'failure' ? 1500 : 3000,
      placement: "top",
    });
    return data;
  }

  deleteAccount = async (credentials, callback) => {
    const { data } = await this.apiClient.post(`${ENDPOINTS.DELETE_ACCOUNT}?UserId=${credentials}`, {});
    if (data?.Status !== 'failure') {
      callback && callback(data);
    }
    return data;
  };

  // getCompanyorService = async (baseUrl) => {
  //   return axios.get(`${baseUrl}/WebApi/Company/GetCompanyCentre`)
  //     .then(function (response) {
  //       const data = response?.data;
  //       return data;
  //     }).catch(
  //       function (error) {
  //         return error;
  //       }
  //     )
  // }

    getCompanyorService = async (baseUrl) => {
    return axios.get(`${baseUrl}/WebApi/Auth/getcentres`)
      .then(function (response) {
        const data = response?.data;
        return data;
      }).catch(
        function (error) {
          return error;
        }
      )
  }

  checkVersionDetails = async () => {
    const version = await checkVersion({ platform: Platform.OS, bundleId: "com.innovationtechnologies.yourchildsday", currentVersion: VersionNumber.appVersion, country: 'au' });
    if (version?.needsUpdate) {
      const env = await get('environment');
      const baseUrl = config[env || config.default];
      return axios.get(`${baseUrl}/Webapi/Master/CheckAppForceUpgradeVersion?Device=${Platform.OS}&Version=${version?.version}`)
        .then(async (response) => {
          const status = response?.data;
          return {
            status,
            version
          };
        }).catch(async (error) => {
          return {
            status: false,
            version
          };
        });
    }
    return {
      status: false,
      version
    };
  }

  getMedicalOrGeneralNotes = async (ChildId, callback) => {
    const env = await get('environment');
    const accessToken = await AsyncStorage.getItem("accessToken");
    const baseUrl = config[env || config.default];
    return axios.get(`${baseUrl}/WebApi/webapi/GetMedicalOrGeneralNotes?ChildId=${ChildId}`, {headers: { AuthorizedToken: accessToken, }})
      .then(function (response) {
        const data = response?.data;
        return data;
      }).catch(
        function (error) {
          return error;
        }
      )
  };
}

const authService = new AuthService();

export default authService;
