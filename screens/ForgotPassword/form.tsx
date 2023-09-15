import React from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  VStack,
  Text,
  useColorMode,
} from "native-base";
import {
  KeyBoardScrollView,
  TextLayout,
  ButtonLayout,
  WhiteBgLayout,
} from "../commoncomponents";

import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import ForgotPwdImageLayout from "./ForgotPwdImageLayout";
import { forgotPassword } from "../../store/auth";
import RNAlert from "../commoncomponents/RNAlert";
import { isEmpty } from "lodash";

type ForgotPasswordFormNavigationProp = NavigationProp<ParamListBase>;
export default function ForgotPasswordForm() {
  const { colorMode } = useColorMode();

  const dispatch = useDispatch();
  const navigation = useNavigation<ForgotPasswordFormNavigationProp>();
  const [email, setEmailText] = React.useState("");
  const [alertData, setAlertData] = React.useState<any>({});

  const onHandleTitleBarNavigation = () => {
    navigation.navigate("SignIn");
  };


  const onhandleSignUpLinkClicked = () => {
    //    navigation.navigate("");
  };

  //onHandle method to get textinput values from textboxes we will receive this callback from TextLayoutComponent
  const onhandleTextChanges = (text:any, fieldname:any) => {
    setEmailText(text);
  };

  const onHandleButtonPress = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!email.replace(/\s/g, '')) {
      setAlertData({ title: "Invalid", description: `Email is empty` });
    } else if (reg.test(email.replace(/\s/g, '')) === false) {
      setAlertData({ title: "Invalid !", description: `Email is Incorrect` });
    } else {
       handleClick();
      console.log("All good to go for forgot password");
    }
  };

  const handleForgotPassword = (data: any, callback: any) => dispatch(forgotPassword(data, callback));

  const handleClick = async () => {
    handleForgotPassword({ email: email.toLowerCase().replace(/\s/g, '') }, handleNavigation);
  };

  const handleNavigation = (data: any) => {
    if (data.statusCode === 200 && data?.responseMessage !== "Failure") {
      setTimeout(()=>{
        navigation.navigate("SignIn");
      },1500);
      setEmailText("")
    }
  };
  const onhandleCloseAlert = () => {
    setAlertData({});
  }
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
                Forgot Password?
              </Text>
              <Text
                _light={{ color: "coolGray.800" }}
                _dark={{ color: "coolGray.400" }}
                textAlign={{ base: "center", sm: "left" }}
              >
                Not to worry! Enter the email address associated with your account
                and we’ll send a link to reset your password.
              </Text>
            </VStack>
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
                value={email}
                labelText="Email"
              />
            </VStack>

            <ButtonLayout
              pageType="ForgotPassword"
              nameText="SUBMIT"
              onchange={onHandleButtonPress} />

            {/* <VStack alignItems="center" pt="5">
              <TextWithLinkLayout
                titletext="Send"
                linkText="OTP"
                onchange={onhandleSignUpLinkClicked}
              />
            </VStack> */}
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
