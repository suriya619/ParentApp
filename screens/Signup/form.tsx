import React, { useEffect, useState } from "react";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useNetInfo } from "@react-native-community/netinfo";
import { VStack } from "native-base";

import * as WebBrowser from "expo-web-browser";
// import { displayNetNotReachable, displayNetNotReachableToast, displayNoNetwork, displayNoNetworkToast } from "../../utils/ToastUtil";
import { FullScreenLoader } from "../commoncomponents/FullScreenLoader";
import SelectCompanyorService from "../commoncomponents/selectCompanyorService";
// import CustomSelectCenter from "../commoncomponents/CustomSelectCenter";

// Actions
import {
  register,
  loginWithGoogle,
  loginWithApple,
} from "../../store/auth";

import {
  WhiteBackgroundLayout,
  KeyBoardScrollView,
  TextLayout,
  IacceptLinkTextLayout,
  ButtonLayout,
  TextWithLinkLayout,
} from "../commoncomponents";
import RNAlert from "../commoncomponents/RNAlert";
import { isEmpty } from "lodash";

WebBrowser.maybeCompleteAuthSession();

type SignUpFormNavigationProp = NavigationProp<ParamListBase>;
export function SignUpForm() {

  const navigation = useNavigation<SignUpFormNavigationProp>();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.activeUser);

  const [password, setPasswordText] = useState("");
  const [confirmPassword, setConfirmPasswordText] = useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [checked, setChecked] = React.useState(true);
  const [userName, setUserName] = React.useState("");
  const [email, setEmailText] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [alertData, setAlertData] = React.useState<any>({});
  const [pageLoading, setPageLoading] = React.useState<any>(true);
  const [selectedCompanyService, setSelectedCompanyService] = React.useState<any>(null);

  const handleRegister = (data: any, callback: any) => dispatch(register(data, callback));
  const handleGoogleLogin = (data: any, callback: any) => dispatch(loginWithGoogle(data, callback));
  const handleAppleLogin = (data: any, callback: any) => dispatch(loginWithApple(data, callback));
  const companyList = useSelector((state: any) => state.activeUser.companyList);


  useEffect(()=>{
    if(!isEmpty(companyList)){
      setPageLoading(false);
    }
  },[]);

  const handleClick = async () => {
    handleRegister(
      {
        username: userName.trim(),
        email: email.toLowerCase().trim(),
        password: password.trim(),
        firstname: firstName.trim(),
        lastname: lastName.trim(),
        mobilenumber: mobileNumber,
        companyid: selectedCompanyService?.companyID,
        centreid: selectedCompanyService?.centreID,
        siteaccess: selectedCompanyService?.siteAccess,
        confirmemail: false,
        roles: "5"
      },
      onhandlePageNavigation
    );
  };

  const onhandlePageNavigation = (data: any) => {
    if (data.statusCode === 200 && data.responseMessage !== "Failure") {
      setTimeout(() => {
        navigation.navigate("SignIn");
      }, 1500);
      setPasswordText("");
      setConfirmPasswordText("");
      setFirstName("");
      setLastName("");
      setUserName("");
      setEmailText("");
      setMobileNumber("");
    }
  };

  //onHandle method to get textinput values from textboxes we will receive this callback from TextLayoutComponent
  const onhandleTextChanges = (text: any, fieldname: any) => {
    switch (fieldname) {
      case "username":
        setUserName(text.replace(/\s/g, ''));
        break;
      case "email":
        setEmailText(text.replace(/\s/g, ''));
        break;
      case "password":
        setPasswordText(text.replace(/\s/g, ''));
        break;
      case "confirmpassword":
        setConfirmPasswordText(text.replace(/\s/g, ''));
        break;
      case "firstName":
        setFirstName(text.replace(/\s/g, ''));
        break;
      case "lastName":
        setLastName(text.replace(/\s/g, ''));
        break;
      case "mobileNumber":
        setMobileNumber(text.replace(/\s/g, ''));
        break;
    }

  };

  const onHandleEyeIconClicked = (showPass: any) => {
    //   setShowPass(showPass);

  };

  const onHandleButtonPress = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let regPassword = /((?![0-9_])(?=.*\\d)(?=.*[A-Z])(?=.*\\W).{8,15})/;
    if (!selectedCompanyService) {
      setAlertData({ title: "Invalid", description: `Company & Centre is required` });
    } else if (firstName?.trim() === "") {
      setAlertData({ title: "Invalid", description: "First name is empty" });
    } else if (lastName?.trim() === "") {
      setAlertData({ title: "Invalid", description: "Last name is empty" });
    } else if (!email?.trim()) {
      setAlertData({ title: "Invalid", description: "Email is empty" });
    } else if (reg.test(email?.trim()) === false) {
      setAlertData({ title: "Invalid !", description: "Email is Incorrect" });
    } else if (!mobileNumber?.trim()) {
      setAlertData({ title: "Invalid", description: "Mobile number is empty" });
    } else if (!userName?.trim()) {
      setAlertData({ title: "Invalid", description: "User name is empty" });
    } else if (!password?.trim()) {
      setAlertData({ title: "Invalid", description: "Password is empty" });
    } else if (validatePassword() !== "") {
      setAlertData({ title: "Invalid Password", description: validatePassword() });
    } else if (!confirmPassword?.trim()) {
      setAlertData({ title: "Invalid", description: "Confirm password is empty" });
    } else if (confirmPassword?.trim() !== password?.trim()) {
      setAlertData({ title: "Invalid", description: "Password mismatch" });
    } else if (!checked) {
      setAlertData({ title: "Invalid", description: "You must accept the terms of use & privacy policy" });
    } else {
      handleClick();
    }
  };
  const validatePassword = () => {
    var uppercaseRegExp = /(?=.*?[A-Z])/;
    var specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    var minLengthRegExp = /.{8,}/;
    var startsWithDigit = /^[A-Za-z_@.#$&+-][><?@+'`~^%&\*\[\]\{\}.!#|\\\"$';,:;=/\(\),\-\w\s+]*$/;
    let description = "";
    if (minLengthRegExp.test(password) === false) {
      description = "Minimum 8 characters.\n"
    }
    if (startsWithDigit.test(password) === false) {
      description += "Don't  start with a number.\n"
    }
    if (specialCharRegExp.test(password) === false) {
      description += "Include a special character.\n"
    }
    if (uppercaseRegExp.test(password) === false) {
      description += "Atleast one CAPITAL letter.\n"
    }
    return description;
  }
  const onHandleGoogleIconClicked = (googleAccesstoken: any, res: any) => {
    handleGoogleLogin(
      { GoogleToken: googleAccesstoken, pageType: "SignUp", userData: res },
      onhandlePageNavigation
    );
  };

  const onHandleAppleLogin = (pagetype: any, credential: any) => {
    handleAppleLogin(
      { pageType: "SignUp", userData: credential },
      onhandlePageNavigation
    );
  };

  const onhandleSignUpLinkClicked = () => {
    navigation.navigate("SignIn");
  };
  const onhandleCloseAlert = () => {
    setAlertData({});
  }

  return (
    <KeyBoardScrollView>
      <FullScreenLoader isVisible={userData.isLoading} />
      <WhiteBackgroundLayout text="Sign up to continue!">
        <VStack space="5">
          <VStack space="4">
            <SelectCompanyorService
              placeholderText={"Select Company & Centre"}
              selectedCompanyService={selectedCompanyService}
              setSelectedCompanyService={setSelectedCompanyService}
            />
            <TextLayout
              defaultValue={firstName}
              onChange={onhandleTextChanges}
              isshowPass={false}
              name="firstName"
              labelText="First Name"
              value={firstName}
            />
            <TextLayout
              defaultValue={lastName}
              value={lastName}
              onChange={onhandleTextChanges}
              isshowPass={false}
              name="lastName"
              labelText="Last Name"
            />
            <TextLayout
              defaultValue={email}
              value={email}
              onChange={onhandleTextChanges}
              isshowPass={false}
              name="email"
              labelText="Email"
            />
            <TextLayout
              defaultValue={mobileNumber}
              value={mobileNumber}
              onChange={onhandleTextChanges}
              isshowPass={false}
              name="mobileNumber"
              labelText="Mobile Number"
              keyboardType="phone-pad"
              maxLength={12}
            />
            <TextLayout
              defaultValue={userName}
              value={userName}
              onChange={onhandleTextChanges}
              isshowPass={false}
              name="username"
              labelText="Username"
            />
            <TextLayout
              defaultValue={password}
              value={password}
              onChange={onhandleTextChanges}
              isshowPass={true}
              name="password"
              labelText="Password"
              onShowPass={onHandleEyeIconClicked}
            />
            <TextLayout
              defaultValue={confirmPassword}
              value={confirmPassword}
              onChange={onhandleTextChanges}
              isshowPass={true}
              name="confirmpassword"
              labelText="Confirm Password"
              onShowPass={onHandleEyeIconClicked}
            />
          </VStack>

          <IacceptLinkTextLayout 
            checked={checked}
            setChecked={setChecked}
          />

          <ButtonLayout
            pageType="SignUp"
            nameText="SIGN UP"
            onchange={onHandleButtonPress}
          />

          {/* <ORLayout />

          <Center>
            <GoogleIconLayout
              onGoogleClicked={onHandleGoogleIconClicked}
              onAppleClicked={onHandleAppleLogin}
            />
          </Center> */}
        </VStack>

        <TextWithLinkLayout
          titletext=" Already have an account?"
          linkText="Sign in"
          onchange={onhandleSignUpLinkClicked}
        />
        <RNAlert
          title={alertData.title}
          description={alertData.description}
          onClose={onhandleCloseAlert}
          isOpen={!isEmpty(alertData.title)}
        />
      </WhiteBackgroundLayout>
    </KeyBoardScrollView>
  );
}