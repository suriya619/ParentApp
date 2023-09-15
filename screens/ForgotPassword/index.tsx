import React from "react";
import { BackgroundLayout,TitleBarLayout } from "../commoncomponents";
import ForgotPasswordForm from "./form";


export default function ForgotPassword({ props, navigation }: any) {

  const onHandleTitleBarNavigation = () => {
    navigation.navigate("SignIn");
  };

  return (
    <BackgroundLayout>
      <TitleBarLayout
        titleBarText="Forgot Password"
        onchange={onHandleTitleBarNavigation}
      />
      <ForgotPasswordForm />
    </BackgroundLayout>
  );
}
