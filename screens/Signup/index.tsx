import React from "react";
import { BackgroundLayout, WelcomeTextHeader } from "../commoncomponents";
import { SignUpForm } from "./form";

export default function SignUp({ props, navigation }: any) {
  const onHandleTitleBarNavigation = () => {
    navigation.pop();
  };

  let welcomeStrings = {
    titlebarText: "Sign Up",
    welcomeText: "Welcome ",
    signintocontText: "Sign up to continue",
  };

  return (
    <BackgroundLayout bounces={false}>
      <WelcomeTextHeader
        {...welcomeStrings}
        onchange={onHandleTitleBarNavigation}
      />
      <SignUpForm />
    </BackgroundLayout>
  );
}
