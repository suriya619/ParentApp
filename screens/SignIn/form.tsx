import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useEffect } from "react";
import { VStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FullScreenLoader } from "../commoncomponents/FullScreenLoader";

import {
  KeyBoardScrollView,
  WhiteBackgroundLayout,
  RememberMeTextLayout,
  TextLayout,
  ButtonLayout,
  LinkTextLayout,
  TextWithLinkLayout,
} from "../commoncomponents";

import {
  login,
  loginWithGoogle,
  loginWithApple,
  getUserRolesList,
} from "../../store/auth";
import RNAlert from "../commoncomponents/RNAlert";
import { isEmpty } from "lodash";
import SelectUserRoleModal from "./selectRoleModal";
import { getUserDetailToAccess, setLoading, setLoginData } from "../../store/auth/actions";
import { save } from "../../assets/styles/storage";

WebBrowser.maybeCompleteAuthSession();

type SignInFormNavigationProp = NavigationProp<ParamListBase>;
export function SignInForm() {
  const [showPass, setShowPass] = React.useState(false);
  const [email, setEmailText] = React.useState("");
  const [password, setPasswordText] = React.useState("");
  const userData = useSelector((state: any) => state.activeUser);
  const userRoles = useSelector((state: any) => state.activeUser.userRoles);
  const [checked, setChecked] = React.useState(false);
  const [alertData, setAlertData] = React.useState<any>({});
  const [showModal, setShowRoleModal] = React.useState<any>(false);

  const dispatch = useDispatch();
  const navigation = useNavigation<SignInFormNavigationProp>();

  const handleLogin = (data: any, callback: any) => dispatch(login(data, callback));
  const handleGoogleLogin = (data: any, callback: any) =>
    dispatch(loginWithGoogle(data, callback));
  const handleAppleLogin = (data: any, callback: any) =>
    dispatch(loginWithApple(data, callback));

  // Method to handle Page Navigation
  const onhandlePageNavigation = async (data: any) => {
    if (data.accessToken) {
      dispatch(getUserRolesList());
      dispatch(setLoginData(data))
      save('loggedTokens', data);
    }
  };

  async function checkAndSaveLoginResultData(data: any) {
    await AsyncStorage.setItem("parentID", "" + data.data.parentId);
    await AsyncStorage.setItem("loginResultData", JSON.stringify(data));
  }

  // Method to handle SignIn Button Click  
  const onhandleSignInButtonClick = async () => {
    handleLogin(
      { username: email.trim(), password: password.trim() },
      onhandlePageNavigation
    );
  };

  // Method to handle Rememberme checkbox
  async function handleCheckBox(checkStatus: any) {
    const d = await AsyncStorage.getItem("remember_me")
    if (checkStatus) {
      await AsyncStorage.setItem("remember_me", "true");
    } else {
      await AsyncStorage.setItem("remember_me", "false");
    }
  }

  //onHandle method to handle checkbox event, we will receive this callback from RemembermeTextLayout Component.
  const onhandleCheckBoxchange = (checked: any) => {
    setChecked(checked);
    handleCheckBox(checked);
  };

  //onHandle method to get textinput values from textboxes we will receive this callback from TextLayoutComponent
  const onhandleTextChanges = (text: any, fieldname: any) => {
    fieldname == "email" ? setEmailText(text) : setPasswordText(text);
  };

  const onHandleEyeIconClicked = (showPass: any) => {
    setShowPass(showPass);
  };

  //onHandle method to navigate to ForgotPassword screen,will receive this callback from LinkTextLayout component.
  const onForgotPwdLinkClicked = () => {
    navigation.navigate("ForgotPassword");
  };

  const onhandleSignUpLinkClicked = () => {
    navigation.navigate("SignUp");
  };

  const onHandleGoogleIconClicked = (googleAccesstoken: any, res: any) => {
    handleGoogleLogin(
      { GoogleToken: googleAccesstoken, pageType: "SignIn", userData: res },
      onhandlePageNavigation
    );
  };

  const onHandleAppleLogin = (pagetype: any, credential: any) => {
    handleAppleLogin(
      { pageType: "SignIn", userData: credential },
      onhandlePageNavigation
    );
  };

  const onHandleButtonPress = () => {
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let reg = /^[a-zA-Z0-9]+$/;
    // if (!selectedCompanyService) {
    //   setAlertData({ title: "Invalid", description: `Company or service is required` });
    // } else 
    if (!email.trim()) {
      setAlertData({ title: "Invalid", description: `Email is empty` });
    }
    // else if (reg.test(email.trim()) === false) {
    //   setAlertData({ title: "Invalid !", description: `Email is Incorrect` });
    // } 
    else if (!password) {
      setAlertData({ title: "Invalid", description: `Password is empty` });
    } else {
      onhandleSignInButtonClick();
    }
  };
  const onhandleCloseAlert = () => {
    setAlertData({});
  }
  useEffect(() => {
    if (userRoles?.length > 1) {
      setShowRoleModal(true);
    } else if (userRoles?.length === 1) {
      setLoading(true);
      const activeItem = userRoles[0];
      if (!isEmpty(activeItem)) {
        handleRoleSelection(activeItem)
      }
    }
  }, [userRoles]);
  const handleRoleSelection = async (activeRole: any) => {
    setShowRoleModal(false);
    await AsyncStorage.setItem('siteToAccessURL', activeRole.site_url);
    dispatch(getUserDetailToAccess({
      siteToAccess: activeRole.site_to_access,
      roleID: activeRole.role_id
    }, handleCallback))
  }
  const handleCallback = async (data: any) => {
    if (data.AccessToken) {
      const deleted = await AsyncStorage.getItem("deletedAccount");
      if (deleted === null) {
        checkAndSaveLoginResultData(data);
        handleCheckBox(checked);
        setLoading(false);
        navigation.navigate("MainNavigator");
      }
    }
  }

  const onCloseRoleModal = () => {
    setShowRoleModal(false)
    dispatch(setLoading(false))
  }

  return (
    <KeyBoardScrollView>
      <FullScreenLoader isVisible={userData.isLoading} />
      <WhiteBackgroundLayout text=" Sign in to continue!">
        <VStack space="3">
          <VStack space="4">
            {/* <SelectCompanyorService 
              placeholderText={"Select Company & Centre"}
              selectedCompanyService={selectedCompanyService}
              setSelectedCompanyService={setSelectedCompanyService}
            /> */}
            <TextLayout
              defaultValue={email}
              onChange={onhandleTextChanges}
              isshowPass={false}
              name="email"
              labelText="Email"
              value={email}
            />

            <TextLayout
              defaultValue={password}
              onChange={onhandleTextChanges}
              isshowPass={true}
              name="password"
              labelText="Password"
              onShowPass={onHandleEyeIconClicked}
              value={password}
            />
          </VStack>

          <LinkTextLayout
            linkText="Forgot password?"
            onchange={onForgotPwdLinkClicked}
          />

          <RememberMeTextLayout onchange={onhandleCheckBoxchange} />

          <ButtonLayout
            pageType="SignIn"
            nameText="SIGN IN"
            onchange={onHandleButtonPress}
          />

          {/* <ORLayout /> */}
        </VStack>

        {/* <Center>
          <GoogleIconLayout
            onGoogleClicked={onHandleGoogleIconClicked}
            onAppleClicked={onHandleAppleLogin}
          />
        </Center> */}

        <TextWithLinkLayout
          titletext="Don't have an account?"
          linkText="Sign up"
          onchange={onhandleSignUpLinkClicked}
        />
        <RNAlert
          title={alertData.title}
          description={alertData.description}
          onClose={onhandleCloseAlert}
          isOpen={!isEmpty(alertData.title)}
        />
        <SelectUserRoleModal
          showModal={showModal}
          setShowModal={() => onCloseRoleModal()}
          onValueChange={handleRoleSelection}
          data={userRoles || []}
        />
      </WhiteBackgroundLayout>
    </KeyBoardScrollView>
  );
}
