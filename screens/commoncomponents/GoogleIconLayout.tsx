import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable } from "native-base";
import React from "react";
import { Platform } from "react-native";
import IconGoogle from "../components/IconGoogle";

export default function GoogleIconLayout(props: any) {
  const [request, googleResponse, promptAsync] = Google.useAuthRequest({
    scopes: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/user.phonenumbers.read",
    ],

    expoClientId:
      "931689849976-6766acuv38ifcr2jh7k7i4knagvsuquv.apps.googleusercontent.com", // clientId
    //"931689849976-4aj1fdbgf4uh6706e8iptv8l8n7307p8.apps.googleusercontent.com", // created via Test acct with gowritendersoftware@gmail.com/gowri@1234

    iosClientId:
      "720711103004-dn0b8sfaeqsbisrp7vv6kuagj1ghnpsm.apps.googleusercontent.com", //clientId
    //"931689849976-jrjv1q43351k2d09uchapvru6kd4s5hg.apps.googleusercontent.com",// created via Test acct with gowritendersoftware@gmail.com/gowri@1234

    androidClientId:
      "720711103004-99rupl9dgbb5s592k2ff6utbeocduerq.apps.googleusercontent.com", //clientId
    // "931689849976-2pfj7cl50q15jhmu39qieikssv2mtijf.apps.googleusercontent.com", // created via Test acct with gowritendersoftware@gmail.com/gowri@1234

    webClientId:
      "931689849976-6766acuv38ifcr2jh7k7i4knagvsuquv.apps.googleusercontent.com", //clientId
    // "931689849976-4aj1fdbgf4uh6706e8iptv8l8n7307p8.apps.googleusercontent.com" , // created via Test acct with gowritendersoftware@gmail.com/gowri@1234
  });

  React.useEffect(() => {
    if (googleResponse?.type === "success") {
      const { authentication } = googleResponse;
      fetchgoogleUserInfo(googleResponse.authentication?.accessToken);
    }
  }, [googleResponse]);

  async function fetchgoogleUserInfo(googleAccesstoken) {
    const responseGoogle = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + googleAccesstoken,
          "Content-Type": "application/json",
        },
      }
    );
    const res = await responseGoogle.json();
    // handleGoogleLogin(
    //   { GoogleToken: googleAccesstoken, pageType: "SignIn", userData: res }, handleNavigation
    // );
    props.onGoogleClicked(googleAccesstoken, res);
  }

  const CallAppleLogin = async (credential) => {
    if (credential) {
      const getAppleSignUp = await AsyncStorage.getItem("Apple_Login");
      const parseGetAppleSignUp = getAppleSignUp
        ? JSON.parse(getAppleSignUp)
        : {};
      const hasProviderKey = parseGetAppleSignUp.hasOwnProperty(
        credential?.user
      );
      const appleSignUp = hasProviderKey
        ? parseGetAppleSignUp
        : { ...parseGetAppleSignUp, [credential.user]: credential };
      await AsyncStorage.setItem("Apple_Login", JSON.stringify(appleSignUp));
      // handleAppleLogin(
      //   { pageType: "SignIn", userData: credential },
      //   handleNavigation
      // );
      props.onAppleClicked("SignIn", credential);
    }
  };

  return (
    <>
      <Pressable
        onPress={() => {
          promptAsync();
        }}
      >
        <IconGoogle />
      </Pressable>

      {Platform.OS === "ios" && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={
            AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
          }
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ width: 200, height: 44, marginTop: 15 }}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });
              CallAppleLogin(credential);
              // signed in
            } catch (e) {
              if (e.code === "ERR_CANCELED") {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }}
        />
      )}
    </>
  );
}
