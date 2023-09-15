import React from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  VStack,
  Text,
} from "native-base";
import {
  KeyBoardScrollView,
  TextLayout,
  ButtonLayout,
  WhiteBgLayout,
} from "../commoncomponents";

import { useNavigation, useRoute, NavigationProp, ParamListBase } from "@react-navigation/native";
import ForgotPwdImageLayout from "./ForgotPwdImageLayout";
import RNAlert from "../commoncomponents/RNAlert";
import { isEmpty } from "lodash";
import { resetPassword } from "../../store/auth/actions";

type ResetPasswordFormNavigationProp = NavigationProp<ParamListBase>;
export default function ResetPasswordForm({ props }: any) {
  const route = useRoute();

  const { email }: any = route?.params;

  const dispatch = useDispatch();
  const navigation = useNavigation<ResetPasswordFormNavigationProp>();
  const [password, setPasswordText] = React.useState("");
  const [confirmPassword, setConfirmPasswordText] = React.useState("");
  const [otp, setOtpText] = React.useState("");
  const [showPassword, setShowPass] = React.useState(false);
  const [alertData, setAlertData] = React.useState<any>({});

  const onHandleTitleBarNavigation = () => {
    navigation.navigate("SignIn");
  };

  const onhandleSignUpLinkClicked = () => {
    //    navigation.navigate("");
  };

  //onHandle method to get textinput values from textboxes we will receive this callback from TextLayoutComponent
  const onhandleTextChanges = (text: any, fieldname: any) => {
    if (fieldname === 'password') {
      setPasswordText(text);
    } else if (fieldname === 'confirmPassword') {
      setConfirmPasswordText(text);
    } else {
      setOtpText(text);
    }
  };

  const onHandleButtonPress = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (otp === "") {
      setAlertData({ title: "Invalid", description: `Code is empty` });
    } else if (password === "") {
      setAlertData({ title: "Invalid", description: `Password is empty` });
    }
    else if (confirmPassword === "") {
      setAlertData({ title: "Invalid", description: `Confirm password is empty` });
    }
    else if (password !== "" && password !== confirmPassword) {
      setAlertData({ title: "Invalid !", description: `Password mismatch` });
    } else {
      handleClick();
      console.log("All good to go for forgot password");
    }
  };

  const handleResetPassword = (data: any, callback: any) => dispatch(resetPassword(data, callback));

  const handleClick = async () => {
    handleResetPassword({
      email: email.toLowerCase().replace(/\s/g, ''),
      code: otp,
      password: confirmPassword
    }, handleNavigation);
  };

  const handleNavigation = (data: any) => {
    if (data.statusCode === 200 && data.responseMessage !== "Failure") {
      setTimeout(()=>{
        navigation.navigate("SignIn");
      },1500);
    }
  };
  const onhandleCloseAlert = () => {
    setAlertData({});
  }

  const onHandleEyeIconClicked = (showPass: any) => {
    setShowPass(showPass);
  };
  return (
    <KeyBoardScrollView>
      <WhiteBgLayout>
        <ForgotPwdImageLayout />

        <VStack justifyContent="space-between" flex="1" space="0">
          <Box
            pt={{ base: "0", md: "12" }}
            pb={{ base: "6", md: "12" }}
            px={{ base: "7", md: "10" }}
            _light={{ bg: "white" }}
            _dark={{ bg: "coolGray.800" }}
            flex="1"
            borderTopRightRadius={{ md: "xl" }}
            borderBottomRightRadius={{ md: "xl" }}

          >
            <VStack space={{ base: "2", md: "5" }} pb={"7"}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                _dark={{ color: "coolGray.50" }}
                _light={{ color: "coolGray.800" }}
                textAlign={{ base: "center", sm: "left" }}
              >
                Reset Password
              </Text>
              {/* <Text
                _light={{ color: "coolGray.800" }}
                _dark={{ color: "coolGray.400" }}
                textAlign={{ base: "center", sm: "left" }}
              >
                Enter and confirm your new password below.
              </Text> */}
            </VStack>
            <VStack space="4">
              <TextLayout
                defaultValue={otp}
                onChange={onhandleTextChanges}
                isshowPass={false}
                name="code"
                labelText="Code"
              />
              <TextLayout
                defaultValue={password}
                onChange={onhandleTextChanges}
                isshowPass={true}
                name="password"
                labelText="New Password"
                onShowPass={onHandleEyeIconClicked}
                value={password}
              />
              <TextLayout
                defaultValue={confirmPassword}
                onChange={onhandleTextChanges}
                isshowPass={true}
                name="confirmPassword"
                labelText="Re-enter Password"
                onShowPass={onHandleEyeIconClicked}
                value={confirmPassword}
              />
            </VStack>

            <ButtonLayout
              pageType="ForgotPassword"
              nameText="SUBMIT"
              onchange={onHandleButtonPress} />
          </Box>
        </VStack>
        <RNAlert
          title={alertData.title}
          description={alertData.description}
          onClose={onhandleCloseAlert}
          isOpen={!isEmpty(alertData.title)}
        />
      </WhiteBgLayout>
    </KeyBoardScrollView>
  );
}
