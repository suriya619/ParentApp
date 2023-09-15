import React from "react";
import { useDispatch } from "react-redux";
import {
  BackgroundLayout,
  WelcomeTextHeader,
} from "../commoncomponents";
import { SignInForm } from "./form";
import { setUserRolesList } from "../../store/auth/actions";

export default function SignIn({ props, navigation }: any) {
  const dispatch = useDispatch();

  const onHandleTitleBarNavigation = () => {
    navigation.pop();
    dispatch(setUserRolesList([]));
  };
    
  let welcomeStrings = {
    titlebarText:"Sign In",
    welcomeText:"Welcome back,",
    signintocontText:"Sign in to continue",
    };

  return (
    <BackgroundLayout bounces={false}>
      <WelcomeTextHeader
           onchange={onHandleTitleBarNavigation}
          {...welcomeStrings}
       />
      <SignInForm />
    </BackgroundLayout>  
  );
}