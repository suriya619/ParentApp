import React, { useState } from "react";
import {
  HStack,
  Text,
  VStack,
  Pressable,
  Box,
  useColorMode,
  useColorModeValue,
  ScrollView,
  Button,
  Modal,
} from "native-base";
import DashboardLayout from "./commoncomponents/DashboardLayout";
import { useNavigation, CommonActions } from "@react-navigation/native";
import {
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dropAllTables } from "../sql_lite";
import { useIsFocused } from "@react-navigation/native";

import { deleteAccountAction, logout } from "../store/auth";
import { dailycarelogout } from "../store/dailycare";

import { useDispatch, useSelector } from "react-redux";
import { centreLogout } from "../store/center/actions";
import { learningLogout } from "../store/learning";
import VersionNumber from "react-native-version-number";
import { isEmpty } from "lodash";
import { get } from "../assets/styles/storage";

async function setLogout() {
  try {
    const getKeys = await AsyncStorage.getAllKeys();
    if (!isEmpty(getKeys)) {
      const excludeKeys = (getKeys || []).filter((keys) => keys !== "CompanyorService" && keys !== "environment");
      await AsyncStorage.multiRemove(excludeKeys);
    } else {
      await AsyncStorage.clear();
    }
    await dropAllTables();
    return true;
  } catch (err) {
    return true;
  }
}

function OptionItem({ icon, title, navigateTo, setModalVisible }) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        if (setModalVisible) {
          setModalVisible(true);
        }
        else {
          navigation.navigate(navigateTo);
        }
      }}
    >
      <Box>
        <VStack p="2">
          <HStack alignItems="center">
            <Box width={{ base: "15%", md: "10%" }}>{icon}</Box>
            <Box flex="1">
              <Text
                fontSize="md"
                fontWeight="medium"
                _light={{ color: "primary.500" }}
                _dark={{ color: "coolGray.50" }}
              >
                {title}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
}

//= ({ length,item, index }) => {

const General = (props) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  //console.log("Account called");
  const { colorMode } = useColorMode();
  const iconColor = useColorModeValue("#244B56", "#F7D0CB");
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const parent = useSelector((state) => state.activeUser.parent);
  const loggedData = useSelector((state) => state.activeUser.loggedUser);
  const dispatch = useDispatch();
  // Inside your component
  const resetAction = CommonActions.reset({
    index: 0, // The index of the screen to reset to (0 in this case)
    routes: [
      // Define the new set of screens to replace the stack
      { name: 'SplashScreen' }, // Replace 'Home' with the name of the screen you want to navigate to
    ],
  });

  const LogOut = async (isDeleted) => {
    // dispatch(resetState())
   const getStoredTokens = await get('loggedTokens');
    dispatch(logout({
      accessToken: !isEmpty(loggedData) ? loggedData.accessToken : getStoredTokens?.accessToken,
      refreshToken: !isEmpty(loggedData) ? loggedData.refreshToken : getStoredTokens?.refreshToken
    }, handleCallback));

    dispatch(dailycarelogout());
    dispatch(centreLogout());
    dispatch(learningLogout());

    setModalVisible(false);
    await setLogout();
    if (isDeleted) {
      // AsyncStorage.setItem("deletedAccount", JSON.stringify(parent));
    }
  }

  const handleCallback = (data) => {
    if ((data.statusCode === 200 && data.responseMessage !== "Failure") || data.errorMessage === "Access Token has expired") {
      setTimeout(() => {
        navigation.dispatch(resetAction);
      }, 1500)
    }
  }

  const deleteSuccess = () => {
    setDeleteModalVisible(false);
    LogOut(true);
  }
  const deleteAccount = async () => {
    dispatch(deleteAccountAction(parent.UserId, deleteSuccess))
  };
  return (
    <DashboardLayout
      title="Account"
      mobileHeader={{ backButton: false, notificon: false }}
    >
      <ScrollView>
        <VStack
          px={{ base: 2, md: 8 }}
          py={{ base: 4, md: 8 }}
          space="5"
          height="full"
          justifyContent="space-between"
        >
          {/* <OptionItem
              icon={
                <Ionicons
                  name="md-shield-checkmark-outline"
                  size={32}
                  color={iconColor}
                />
              }
              title="Privacy Settings"
              navigateTo="PrivacySettings"
            /> */}
          {/* <OptionItem
              icon={
                <Ionicons
                  name="md-person-outline"
                  size={32}
                  color={iconColor}
                />
              }
              title="Edit Profile"
              navigateTo="EditAccount"
            /> */}
          {/* <OptionItem
              icon={
                <Ionicons
                  name="md-lock-closed-outline"
                  size={32}
                  color={iconColor}
                />
              }
              title="Remove Access"
              navigateTo="RemoveFromGroup"
            /> */}
          {/* <OptionItem
              icon={
                <Ionicons
                  name="md-newspaper-outline"
                  size={32}
                  color={iconColor}
                />
              }
              title="Terms and Conditions"
              navigateTo="TermsAndCondition"
            /> */}
          <OptionItem
            icon={
              <Ionicons name="md-key-outline" size={32} color={iconColor} />
            }
            title="Change Password"
            navigateTo="CreatePassword"
          />
          {/* <OptionItem
              icon={<FontAwesome5 name="wpforms" size={32} color={iconColor} />}
              title="New Enrolment"
              navigateTo="EditAccount"
            /> */}
          {/* <OptionItem
              icon={
                <MaterialCommunityIcons
                  name="account-details-outline"
                  size={32}
                  color={iconColor}
                />
              }
              title="CCS"
              navigateTo="EditAccount"
            /> */}
          {/* <OptionItem
              icon={
                <FontAwesome5 name="money-check" size={26} color={iconColor} />
              }
              title="Billing"
              navigateTo="EditAccount"
            /> */}
          <OptionItem
            icon={colorMode === "light" ?
              <Ionicons
                name="md-sunny-outline"
                size={32}
                color={iconColor}
              />
              :
              <Ionicons
                name="md-moon-outline"
                size={32}
                color={iconColor}
              />
            }
            title="Dark Mode"
            navigateTo="DarkMode"
          />
          <OptionItem
            icon={
              <Ionicons
                name="trash-outline"
                size={32}
                color={iconColor}
              />
            }
            title="Delete Account"
            navigateTo="SplashScreen"
            setModalVisible={setDeleteModalVisible}
          />
          <OptionItem
            icon={
              <Ionicons
                name="md-lock-closed-outline"
                size={32}
                color={iconColor}
              />
            }
            title="Logout"
            navigateTo="SplashScreen"
            setModalVisible={setModalVisible}
          />
          {/* <Button variant="primary" onPress={toggleColorMode}>
            {useColorModeValue("Dark mode", "Light mode")}
          </Button> */}
        </VStack>
      </ScrollView>
      {/* /////////////////////////////// */}

      {/* // just newly added to show client for logout working */}
      {(modalVisible || deleteModalVisible) && <Modal isOpen={modalVisible || deleteModalVisible} onClose={modalVisible ? setModalVisible : setDeleteModalVisible} size='md'>
        <Modal.Content >
          <Modal.CloseButton />
          <Modal.Header _text={{ color: 'primary.600' }} >{deleteModalVisible ? "Delete account?" : "Logout"}</Modal.Header>
          <Modal.Body>
            <ScrollView bounces={false}>
              <Text fontSize={'12'} fontWeight='semibold'>
                {deleteModalVisible ? "By deleting this account, access to view your child's profile, child details and their activities will be disabled. Please contact your centre if you wish to enable access again." : "Are you sure?"}
              </Text>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {deleteModalVisible ? <>
              <Button w={'45%'} _text={{ fontWeight: 'bold' }} onPress={() => setDeleteModalVisible(false)} >
                Cancel
              </Button>
              <Button w={'45%'} _text={{ fontWeight: 'bold' }} onPress={deleteAccount} >
                Delete
              </Button>
            </> : <Button w={'full'} _text={{ fontWeight: 'bold' }} onPress={() => LogOut()} >
              Yes
            </Button>}
          </Modal.Footer>
        </Modal.Content>
      </Modal>}
      <Text
        _light={{ color: "coolGray.800" }}
        _dark={{ color: "coolGray.400" }}
        textAlign="center"
        fontSize={11}
      >
        {`V ${VersionNumber.appVersion} (${VersionNumber.buildVersion})`}
      </Text>
    </DashboardLayout>
  );
};

export default React.memo(General, (prevprops, nextprops) => {
  // if (prevprops !== nextprops) {
  //   return false;
  // }
  return true;
});
