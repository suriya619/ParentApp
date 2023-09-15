import {
  Badge,
  Box,
  Center,
  HStack,
  Text,
  VStack,
  Avatar,
  useColorModeValue,
  Icon,
  Pressable,
} from "native-base";
import React, { useState } from "react";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import { convertLocaleDateTimeLong, convertLocaleDateTimeLongNew } from "../../utils/date";
import { FullScreenLoader } from "../commoncomponents";
import { FormButton } from "./components";
import { View,  } from "react-native";

import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';

type MyScreenNavigationProp = NavigationProp<ParamListBase>;

const CheckInEntriesList = ({ child, handleChildSignInStatusCall, handleConfirmModal, setChildID }:any) => {
  const [status, setStatus] = useState(child.SignInStatus);
  const [isExpaned, setExpanded] = useState(false);
  const userData = useSelector((state:any) => state.activeUser);
  const navigation = useNavigation<MyScreenNavigationProp>();
  var statusLabel = "";
  var prevStatusDetails = "";

  const ImagePath = "";

  if (child.IsAbsent) {
    statusLabel = "Marked Absent";
  } else if (child.SignInStatus === "Not yet signed in") {
    statusLabel = "Not yet signed in";
  } else if (child.SignInStatus === "Signed out") {
    statusLabel = "Signed out";
  } else {
    statusLabel = "Signed in";
  }

  if (child.IsAbsent) {
    prevStatusDetails = `MARKED ABSENT: ${convertLocaleDateTimeLong(child.LastAttendenceDate)}`;
  } else {
    child.SignInStatus === "Not yet signed in" ? "Signed out" : "Signed in";
    prevStatusDetails = `${child.SignInStatus === "Not yet signed in"
      ? "SIGNED OUT"
      : child.SignInStatus.toUpperCase()
      }: ${convertLocaleDateTimeLong(child.LastAttendenceDate)}`;

  }

  const CheckInParams = {
    child: child,
    setStatus: setStatus,
    handleChildSignInStatusCall: handleChildSignInStatusCall,
  };

  const onSignInButtonClicked = (childID: any) => {
    setChildID(childID);
    if (isExpaned) {
      handleConfirmModal("SignInFormm", CheckInParams)
      setTimeout(() => {
        setExpanded(false);
      }, 300);
    } else {
      navigation.navigate("SignInFormm", CheckInParams);
      console.log("child >>> set as Sign In" + statusLabel);
    }
  };

  const onSignOutButtonClicked = () => {
    if (isExpaned) {
      handleConfirmModal("SignOuttFormm", CheckInParams);
      setTimeout(() => {
        setExpanded(false);
      }, 300);
    } else {
      navigation.navigate("SignOuttFormm", CheckInParams);
      console.log("child >>> set as SignOut" + statusLabel);
    }
  };

  const onMarkAbsentButtonClicked = () => {
    if (isExpaned) {
      handleConfirmModal("MarkAbsentFormm", CheckInParams);
      setTimeout(() => {
        setExpanded(false);
      }, 300);
    } else {
      navigation.navigate("MarkAbsentFormm", CheckInParams);
      console.log("child >>> set Mark Absent " + statusLabel);
    }
  };
  const caseOne: any = child.IsBookedToday & !child.IsAbsent & child.SignInStatus == "Not yet signed in";
  const caseTwo = child.IsBookedToday & !child.IsAbsent & child.SignInStatus == "Signed in";
  const caseThree = child.IsBookedToday & !child.IsAbsent & child.SignInStatus == "Signed out";
  const caseFour = child.IsBookedToday & child.IsAbsent
  const caseFive = !child.IsBookedToday;
  return (
    <Box
      px="4"
      borderWidth="0.2"
      _light={{ borderColor: "coolGray.300", bg: "white" }}
      _dark={{ borderColor: "coolGray.800", bg: "coolGray.900" }}
      shadow="2"
      rounded="2"
      my="1"
    >
      <FullScreenLoader isVisible={userData.isLoading} />
      <HStack justifyContent="space-between" my="3">
        <HStack space="1" alignItems="center">
          <VStack alignItems="center">
            {child.ImagePath != "" ? (
              <FastImage
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50
                }}
                source={{
                  uri: child.ImagePath,
                  priority: FastImage.priority.normal,
                }}
              />
            ) : (
              <Avatar
                width={50}
                height={50}
                bg={useColorModeValue("avatarBg", "avatarBg")}
                _text={{
                  color: useColorModeValue("white", "white"),
                }}
              >
                {`${child.FirstName.substring(0, 1)}${child.LastName.substring(
                  0,
                  1
                )}`}
              </Avatar>
            )}
          </VStack>

          <VStack>
            <Text
              fontWeight="bold"
              fontSize="sm"
              paddingLeft="1"
              _light={{ color: "primary.600" }}
              _dark={{ color: "primary.300" }}
            >
              {child.FirstName} {child.LastName}
            </Text>
            <Text
              fontWeight="bold"
              paddingLeft="1"
              fontSize="xs"
              _light={{ color: "primary.400" }}
              _dark={{ color: "coolGray.50" }}
            >NEXT BOOKING</Text>
            {child.NextBookingDate ? <Text
              fontWeight="bold"
              paddingLeft="1"
              fontSize="xs"
              _light={{ color: "primary.400" }}
              _dark={{ color: "coolGray.50" }}
            >{child.IsToday ? "Today - " : ""}{convertLocaleDateTimeLongNew(child.NextBookingDate)}</Text> : <Text
              fontWeight="bold"
              paddingLeft="1"
              fontSize="xs"
              _light={{ color: "primary.400" }}
              _dark={{ color: "coolGray.50" }}
            >
              NONE
            </Text>}
          </VStack>
        </HStack>
        {!caseOne && !caseTwo && <Pressable style={{ position: "absolute", right: -10, width: 40, height: 40, alignItems: "center", justifyContent: "center", top: -10 }}
          onPress={() => setExpanded(!isExpaned)}
        >
          <Icon
            size="8"
            as={MaterialCommunityIcons}
            name={"dots-horizontal"}
            _dark={{ color: 'primary.300' }}
            _light={{ color: 'primary.500' }}
          />
        </Pressable>}
        {/* <Center>
          <Badge
            borderRadius="10"
            colorScheme={
              statusLabel === "Signed in"
                ? "success"
                : statusLabel === "Not yet signed in"
                ? "danger"
                : "info"
            }
            variant="subtle"
            minWidth="90"
          >
            {statusLabel}
          </Badge>
        </Center> */}
      </HStack>
      <VStack mb={(caseOne || caseTwo || caseThree || caseFour || isExpaned) ? "5" : "0"} space="3">
        {/* last action label */}
        {(caseTwo || caseThree || caseFour) ? <View>
          <View style={{ height: 0.5, backgroundColor: "#d3d3d3", width: "100%", marginBottom: 14 }} />
          <HStack alignItems="center">
            <View style={{ width: 60, height: 20 }} />
            <Text fontSize="xs" color={statusLabel === "Marked Absent" ? "secondary.700" : "primary.400"} fontWeight="bold" flexWrap="wrap" width="85%">{prevStatusDetails}</Text>
          </HStack>
        </View> : null}

        {/* Button display */}
        {(caseOne || caseTwo || isExpaned) ? <View>
          <View style={{ height: 0.5, backgroundColor: "#d3d3d3", width: "100%", marginBottom: 14 }} />
          {caseTwo ? (
            <FormButton
              varianttype="prime1"
              text="Sign Out"
              onchange={onSignOutButtonClicked}
            />
          ) : !caseTwo ? (
            <HStack space="2">
              {child.IsBookedToday && !child.IsAbsent ? <FormButton
                varianttype="second1"
                text="Absent"
                onchange={onMarkAbsentButtonClicked}
                flex="0.8"
              /> : null}
              <FormButton
                varianttype="prime1"
                text="Sign In"
                onchange={() => onSignInButtonClicked(child?.ChildID)}
              />
            </HStack>
          ) : (
            <FormButton
              varianttype="prime1"
              text=" Sign In"
              onchange={() => onSignInButtonClicked(child?.ChildID)}
            />
          )}

        </View> : null}
      </VStack>
    </Box>
  );
};

export default CheckInEntriesList;
