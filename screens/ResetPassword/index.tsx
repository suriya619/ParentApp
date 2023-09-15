import React from "react";
import { BackgroundLayout,TitleBarLayout } from "../commoncomponents";
import ResetPasswordForm from "./form";
import { Keyboard } from "react-native";


export default function ResetPassword({ props, navigation }: any) {

  const onHandleTitleBarNavigation = async() => {
    await Keyboard.dismiss();
    navigation.goBack();
  };

  return (
    <BackgroundLayout>
      <TitleBarLayout
        titleBarText="Reset Password"
        onchange={onHandleTitleBarNavigation}
      />
      <ResetPasswordForm/>
    </BackgroundLayout>
  );
}
