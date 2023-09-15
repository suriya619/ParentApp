import React, { useEffect } from "react";
import { BackHandler, Text } from "react-native";
import { VStack } from "native-base";
import VersionNumber from 'react-native-version-number';

import {
  ButtonLayout,
  StatusBarLayout,
  SplashLogoLayout,
} from "../commoncomponents";

import { BackgroundLayout } from "../commoncomponents";

import { useNavigation } from "@react-navigation/native";

export default function LandingScreen() {
  //Used for Screen Navigation
  const navigation = useNavigation();

  const backActionHandler = () => {
    BackHandler.exitApp();
    return true;
  };

  //For Handling the ClickAction of Login Button
  const onHandleLoginClicked = () => {
    navigation.navigate("SignIn");
  };

  // For Handling the ClickAction of SignUp Button
  const onHandleSignUpClicked = () => {
    navigation.navigate("SignUp");
  };

  //For Handling the ClickAction of Skip Button
  const onHandleSkipClicked = () => {
    navigation.navigate("MainNavigator");
  };

  useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);
    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, []);

  return (
    <BackgroundLayout>
      <StatusBarLayout />
      <SplashLogoLayout />

      {/* pageType prop it identify from which screen ButtonLayout is called. Based on it button Layout will be rendered accordingly
          onchange prop is to handle the click events of button in the respective callabck.
          type prop is used to set the variant property of button.
          nameText prop is used to assign the label of the button.
      */}
      <VStack space="3" mt="2" p="3" safeAreaBottom>
        <ButtonLayout
          pageType="Splash"
          type="light"
          nameText="LOGIN"
          onchange={onHandleLoginClicked}
        />

        <ButtonLayout
          pageType="Splash"
          type="secondary"
          nameText="SIGN UP"
          onchange={onHandleSignUpClicked}
        />
        {/* <ButtonLayout
          pageType="Splash"
          type="primary"
          nameText="SKIP"
        onchange={onHandleSkipClicked}/> */}
      </VStack>
      <Text style={{ color: "white", textAlign: "center", fontSize: 9, }}>{`V ${VersionNumber.appVersion} (${VersionNumber.buildVersion})`}</Text>
    </BackgroundLayout>
  );
}
