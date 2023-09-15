import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider, useColorModeValue } from "native-base";
import { LogBox, BackHandler, Alert, AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import childData from "./api_data/childData.js";
import ThemeProvider from "./context/ThemeProvider"
import store from "./store";
import { connectDB } from "./sql_lite/dbConnection";
import { setNetInfo } from "./store/global";
import { setVersionCheckDetails } from './store/auth';
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppLoading from "./screens/commoncomponents/AppLoading.tsx"

// Theme
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import { paTheme, colorModeManager } from "./theme";

//import { responsiveHeight, } from "react-native-responsive-dimensions";

//Screens
import {
  DailyCare,
  LearningNew,
  Account,
  LandingScreen,
  SignIn,
  SignUp,
  OtpVerification,
  ForgotPassword,
  AppUpdate,
  CreatePassword,
  ResetPassword,
  EditAccount,
  Notification,
  PrivacySettings,
  RemoveFromGroup,
  TermsAndCondition,
  CheckkIn,
  DarkMode,
} from "./screens";
import CheckSignIn from "./screens/CheckkIn/forms/signin";
import CheckSignOut from "./screens/CheckkIn/forms/signout";
import CheckMarkAbsent from "./screens/CheckkIn/forms/markabsent";

// Custom Icons
import IconAccount from "./assets/icons/IconAccount";
import IconCheckIn from "./assets/icons/IconCheckIn";
import IconDailyCare from "./assets/icons/IconDailyCare";
import IconLearning from "./assets/icons/IconLearning";
import SplashScreen from "react-native-splash-screen";
import { getAllChild, getParent } from "./sql_lite/signInOutQuery";
import AppVersionUpdate from "./screens/commoncomponents/appVersionUpdate";
import InternetConnection from "./screens/commoncomponents/internetConnection";
// import LearningNew from "./screens/Learnings/LearningNew.js";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
global.db = connectDB();

function MainNavigator() {
  const childSelector = useState(childData[0]);
  //const { width, height } = Dimensions.get("window");
  // console.log("width & Height ", width + " " + height);

  const backActionHandler = () => {
    Alert.alert("Alert!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="DailyCare"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          if (route.name === "DailyCare") {
            return <IconDailyCare color={color} />;
          } else if (route.name === "Learning") {
            return <IconLearning color={color} />;
          } else if (route.name === "Check-In") {
            return <IconCheckIn color={color} />;
          } else if (route.name === "Account") {
            return <IconAccount color={color} />;
          }
        },
        tabBarPosition: "bottom",
        unmountOnBlur: false, // If we give true, white screen flickr happening  in Android when switching between tabs
        tabBarActiveTintColor: "#EA9575",
        tabBarInactiveTintColor: useColorModeValue("#366775", "#A6BFC8"),
        headerShown: false,
        tabBarStyle: {
          backgroundColor: useColorModeValue("#fff", "#111827"),
          borderTopColor: "#A6BFC8",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 3,
          fontWeight: "bold",
        },
        keyboardHidesTabBar: true,
      })}
    >
      <Tab.Screen
        name="DailyCare"
        options={{
          title: "Daily Care",
        }}
      >
        {(props) => <DailyCare {...props} childSelector={childSelector} />}
      </Tab.Screen>

      <Tab.Screen
        name="Learning"
        options={{
          title: "Learning",
        }}
      >
        {(props) => <LearningNew {...props} childSelector={childSelector} />}
      </Tab.Screen>

      <Tab.Screen
        name="Check-In"
        options={{ title: "Sign In/Out" }}
        component={CheckkIn}
      />

      <Tab.Screen
        name="Account"
        options={{
          title: "Account",
        }}
        component={Account}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const netInfo = useNetInfo();

  useEffect(() => {
    store.dispatch(setNetInfo(netInfo));
  }, [netInfo]);

  LogBox.ignoreAllLogs();
  const appState = useRef(AppState.currentState);
  const [accessToken, setAccessToken] = useState(null);
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("accessToken").then((res) => {
      setAccessToken(res);
      AsyncStorage.getItem("remember_me").then(async (remember) => {
        if (res !== null) {
          getParent();
          getAllChild();
          // setTimeout(SplashScreen.hide(), 2000);
          SplashScreen.hide();
          setAppReady(true);
          setTimeout(async () => {
            store.dispatch(setVersionCheckDetails());
          }, 3000);
        } else {
          SplashScreen.hide();
          setAppReady(true);
          setTimeout(async () => {
            store.dispatch(setVersionCheckDetails());
          }, 3000);
        }
      });
    });

    AppState.addEventListener("change", (nextAppState) => appStateHandler(nextAppState));
    return () => {
      AppState.removeEventListener("change", appStateHandler);
    };
  }, []);

  const appStateHandler = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      store.dispatch(setVersionCheckDetails());
    }

    appState.current = nextAppState;
  }

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (fontsLoaded && isAppReady) {
    if (accessToken != null) {
      return (
        <Provider store={store}>
          <SafeAreaProvider
            initialMetrics={{
              insets: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              },
            }}
          >
            <NativeBaseProvider
              theme={paTheme}
              colorModeManager={colorModeManager}
            >
              <ThemeProvider>
                <NavigationContainer>
                  <Stack.Navigator
                    screenOptions={{
                      headerShown: false,
                      tabBarHideOnKeyboard: true,
                      tabBarStyle: [
                        {
                          display: "flex",
                        },
                        null,
                      ],
                    }}
                  >
                    <Stack.Screen
                      name="MainNavigator"
                      component={MainNavigator}
                    />
                    <Stack.Screen name="SignInFormm" component={CheckSignIn} />
                    <Stack.Screen
                      name="SignOuttFormm"
                      component={CheckSignOut}
                    />
                    <Stack.Screen
                      name="MarkAbsentFormm"
                      component={CheckMarkAbsent}
                    />
                    <Stack.Screen name="AppUpdate" component={AppUpdate} />
                    <Stack.Screen
                      name="CreatePassword"
                      component={CreatePassword}
                    />
                    <Stack.Screen name="EditAccount" component={EditAccount} />
                    <Stack.Screen name="Notification" component={Notification} />
                    <Stack.Screen
                      name="PrivacySettings"
                      component={PrivacySettings}
                    />
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="SplashScreen" component={LandingScreen} />
                    <Stack.Screen
                      name="OtpVerification"
                      component={OtpVerification}
                    />
                    <Stack.Screen
                      name="ForgotPassword"
                      component={ForgotPassword}
                    />
                    <Stack.Screen
                      name="ResetPassword"
                      component={ResetPassword}
                    />
                    <Stack.Screen name="DarkMode" component={DarkMode} />
                    <Stack.Screen
                      name="RemoveFromGroup"
                      component={RemoveFromGroup}
                    />
                    <Stack.Screen
                      name="TermsAndCondition"
                      component={TermsAndCondition}
                    />
                  </Stack.Navigator>
                  <AppVersionUpdate />
                  <InternetConnection />
                </NavigationContainer>
              </ThemeProvider>
            </NativeBaseProvider>
          </SafeAreaProvider>
        </Provider>
      );
    } else {
      return (
        <Provider store={store}>
          <SafeAreaProvider
            initialMetrics={{
              insets: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              },
            }}
          >
            <NativeBaseProvider
              theme={paTheme}
              colorModeManager={colorModeManager}
            >
              <ThemeProvider>
                <NavigationContainer>
                  <Stack.Navigator
                    screenOptions={{
                      headerShown: false,
                    }}
                  >
                    <Stack.Screen name="SplashScreen" component={LandingScreen} />
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen
                      name="OtpVerification"
                      component={OtpVerification}
                    />
                    <Stack.Screen
                      name="ForgotPassword"
                      component={ForgotPassword}
                    />
                    <Stack.Screen
                      name="ResetPassword"
                      component={ResetPassword}
                    />
                    <Stack.Screen
                      name="RemoveFromGroup"
                      component={RemoveFromGroup}
                    />
                    <Stack.Screen
                      name="TermsAndCondition"
                      component={TermsAndCondition}
                    />
                    <Stack.Screen
                      name="MainNavigator"
                      component={MainNavigator}
                    />
                    <Stack.Screen name="SignInFormm" component={CheckSignIn} />
                    <Stack.Screen
                      name="SignOuttFormm"
                      component={CheckSignOut}
                    />
                    <Stack.Screen
                      name="MarkAbsentFormm"
                      component={CheckMarkAbsent}
                    />
                    <Stack.Screen
                      name="CreatePassword"
                      component={CreatePassword}
                    />
                    <Stack.Screen name="EditAccount" component={EditAccount} />
                    <Stack.Screen name="DarkMode" component={DarkMode} />
                  </Stack.Navigator>
                  <AppVersionUpdate />
                  <InternetConnection />
                </NavigationContainer>
              </ThemeProvider>
            </NativeBaseProvider>
          </SafeAreaProvider>
        </Provider>
      );
    }
  } else {
    return (
      <>
        <AppLoading />
      </>
    )
  }
}
