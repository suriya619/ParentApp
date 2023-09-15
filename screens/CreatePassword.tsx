import React, { useState } from "react";
import {
  VStack,
  Box,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  Button,
  Image,
  IconButton,
  Center,
  Hidden,
  FormControl,
  ScrollView,
} from "native-base";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import FloatingLabelInput from "./components/FloatingLabelInput";
import GuestLayout from "../layouts/GuestLayout";
import { changePasswordAction } from "../store/profile";
import { ButtonLayout, FullScreenLoader } from "./commoncomponents";
import { isEmpty } from "lodash";
import { Platform } from "react-native";
import RNAlert from "./commoncomponents/RNAlert";
// import { ScrollView } from "react-native";

export default function CreatePassword({ props, navigation }: any) {
  const [pass, setPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [alertData, setAlertData] = React.useState<any>({});

  const dispatch = useDispatch();
  const parent = useSelector((state: any) => state.activeUser.parent);
  const isLoading = useSelector((state: any) => state.profile.isLoading);

  const handleSubmit = () => {
    if (isValidForm()) {
      dispatch(
        changePasswordAction(
          {
            UserId: parent.UserId,
            OldPassword: oldPass,
            NewPassword: confirmPass,
          },
          handleSuccess
        )
      );
    }
  };
  const handleSuccess = () => {
    navigation.pop();
  };

  const isValidForm = () => {
    const errobj: any = {};
    if (oldPass === "") {
      setAlertData({title: "Invalid", description: "Old password is required"});
      errobj.oldPass = "Old password is required";
    }else if (pass === "") {
      setAlertData({title: "Invalid", description: "New password is required"});
      errobj.pass = "New password is required";
    }else if (pass !== "" && validatePassword()) {
      setAlertData({title: "Invalid Password", description: validatePassword()});
      errobj.pass = "must be of at least 8 characters";
    }else if (oldPass !== "" && oldPass === pass) {
      setAlertData({title: "Invalid", description: "New password must be different from Old password"});
      errobj.pass = "New password must be different from Old password";
    }else if (confirmPass === "") {
      setAlertData({title: "Invalid", description: "Confirm password is required"});
      errobj.confirmPass = "Confirm password is required";
    }else if (pass !== confirmPass) {
      errobj.confirmPass = "Both passwords must match";
      setAlertData({title: "Invalid", description: "Password and Confirm password must match"});
    }
    setErrors(errobj);
    return isEmpty(errobj);
  };
  const validatePassword = () => {
    var uppercaseRegExp = /(?=.*?[A-Z])/;
    var specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    var minLengthRegExp = /.{8,}/;
    var startsWithDigit = /^[A-Za-z_@.#$&+-][><?@+'`~^%&\*\[\]\{\}.!#|\\\"$';,:;=/\(\),\-\w\s+]*$/;
    let description = "";
    if(minLengthRegExp.test(pass) === false){
      description = "Minimum 8 characters.\n"
    }
    if(startsWithDigit.test(pass) === false){
      description += "Don't  start with a number.\n"
    }
    if(specialCharRegExp.test(pass) === false){
      description += "Include a special character.\n"
    }
    if(uppercaseRegExp.test(pass) === false){
      description += "Atleast one CAPITAL letter.\n"
    }
    return description;
  }
  const onhandleCloseAlert  = () => {
    setAlertData({});
  } 
  return (
    <GuestLayout>
      <>{isLoading && <FullScreenLoader isVisible={isLoading} />}</>
      <Hidden from="md">
        <HStack space="2" px="1" mt="4" mb="5" alignItems="center">
          <IconButton
            variant="unstyled"
            onPress={() => {
              navigation.goBack();
            }}
            icon={
              <Icon
                alignItems="center"
                justifyContent="center"
                size="6"
                as={AntDesign}
                name="arrowleft"
                color="coolGray.50"
              />
            }
          />
          <Text color="coolGray.50" fontSize="lg">
            Create Password
          </Text>
        </HStack>
      </Hidden>
      <Hidden till="md">
        <Center
          flex="1"
          bg="primary.900"
          px={{ base: "4", md: "8" }}
          borderTopLeftRadius={{ md: "xl" }}
          borderBottomLeftRadius={{ md: "xl" }}
        >
          <Image
            h="24"
            size="80"
            alt="Your Child's Day "
            resizeMode={"contain"}
            source={require("./components/logo.png")}
          />
        </Center>
      </Hidden>

      <ScrollView
        bounces={Platform.OS !== "android"}
        _light={{ bg: "white" }}
        _dark={{ bg: "coolGray.800" }}
        keyboardShouldPersistTaps="handled"
      >
        <Box
          py={{ base: "6", md: "10" }}
          px={{ base: "4", md: "10" }}
          _light={{ bg: "white" }}
          _dark={{ bg: "coolGray.800" }}
          flex="1"
          borderTopRightRadius={{ md: "xl" }}
          borderBottomRightRadius={{ md: "xl" }}
        >
          <VStack justifyContent="space-between" flex="1">
            <Box>
              <VStack space={{ base: "4", md: "5" }}>
                <Text
                  fontSize={{ base: "lg", md: "2xl" }}
                  fontWeight="bold"
                  _dark={{ color: "coolGray.50" }}
                  _light={{ color: "coolGray.800" }}
                >
                  Create new password
                </Text>
                <Text
                  _light={{ color: "coolGray.800" }}
                  _dark={{ color: "coolGray.400" }}
                  fontSize="sm"
                >
                  Your new password must be different from previous used
                  passwords and must be of at least 8 characters.
                </Text>
              </VStack>

              <VStack space="4" mt="10">
                <FormControl isInvalid={"oldPass" in errors} isRequired>
                  <FloatingLabelInput
                    _focus={{
                      _light: { borderColor: "#D1D5DB" },
                      _dark: { borderColor: "coolGray.700" },
                    }}
                    py="3"
                    isRequired
                    type={showOldPass ? "" : "password"}
                    label="Old Password"
                    borderRadius="4"
                    defaultValue={oldPass}
                    labelColor="#9ca3af"
                    onChangeText={(txt: any) => setOldPass(txt.replace(/\s/g, ''))}
                    labelBGColor={useColorModeValue("#fff", "#1f2937")}
                    InputRightElement={
                      <IconButton
                        mr="3"
                        variant="unstyled"
                        icon={
                          <Icon
                            size="5"
                            color="coolGray.400"
                            as={Entypo}
                            name={showOldPass ? "eye" : "eye-with-line"}
                          />
                        }
                        onPress={() => {
                          setShowOldPass(!showOldPass);
                        }}
                      />
                    }
                    _dark={{
                      borderColor: "coolGray.700",
                    }}
                    _light={{
                      borderColor: "coolGray.300",
                    }}
                  />

                  {/* {"oldPass" in errors ? (
                    <FormControl.ErrorMessage>
                      {errors.oldPass}
                    </FormControl.ErrorMessage>
                  ) : (
                    <FormControl.HelperText
                      _light={{ _text: { color: "coolGray.600" } }}
                      _dark={{ _text: { color: "coolGray.400" } }}
                    >
                      Enter currently using password.
                    </FormControl.HelperText>
                  )} */}
                </FormControl>
                <FormControl isInvalid={"pass" in errors} isRequired>
                  <FloatingLabelInput
                    _focus={{
                      _light: { borderColor: "#D1D5DB" },
                      _dark: { borderColor: "coolGray.700" },
                    }}
                    py="3"
                    isRequired
                    type={showPass ? "" : "password"}
                    label="New Password"
                    borderRadius="4"
                    defaultValue={pass}
                    labelColor="#9ca3af"
                    onChangeText={(txt: any) => setPass(txt.replace(/\s/g, ''))}
                    labelBGColor={useColorModeValue("#fff", "#1f2937")}
                    InputRightElement={
                      <IconButton
                        mr="3"
                        variant="unstyled"
                        icon={
                          <Icon
                            size="5"
                            color="coolGray.400"
                            as={Entypo}
                            name={showPass ? "eye" : "eye-with-line"}
                          />
                        }
                        onPress={() => {
                          setShowPass(!showPass);
                        }}
                      />
                    }
                    _dark={{
                      borderColor: "coolGray.700",
                    }}
                    _light={{
                      borderColor: "coolGray.300",
                    }}
                  />
                  {/* {"pass" in errors ? (
                    <FormControl.ErrorMessage>
                      {errors.pass}
                    </FormControl.ErrorMessage>
                  ) : (
                    <FormControl.HelperText
                      _light={{ _text: { color: "coolGray.600" } }}
                      _dark={{ _text: { color: "coolGray.400" } }}
                    >
                      Must be at least 8 characters.
                    </FormControl.HelperText>
                  )} */}
                </FormControl>
                <FormControl
                  mt={{ base: 1, md: 0 }}
                  isInvalid={"confirmPass" in errors}
                  isRequired
                >
                  <FloatingLabelInput
                    _focus={{
                      _light: { borderColor: "#D1D5DB" },
                      _dark: { borderColor: "coolGray.700" },
                    }}
                    isRequired
                    type={showConfirmPass ? "" : "password"}
                    borderRadius="4"
                    labelColor="#9ca3af"
                    label="Confirm Password"
                    defaultValue={confirmPass}
                    onChangeText={(txt: any) => setConfirmPass(txt.replace(/\s/g, ''))}
                    labelBGColor={useColorModeValue("#fff", "#1f2937")}
                    InputRightElement={
                      <IconButton
                        mr="3"
                        variant="unstyled"
                        icon={
                          <Icon
                            size="5"
                            color="coolGray.400"
                            as={Entypo}
                            name={showConfirmPass ? "eye" : "eye-with-line"}
                          />
                        }
                        onPress={() => {
                          setShowConfirmPass(!showConfirmPass);
                        }}
                      />
                    }
                    _text={{
                      fontSize: "sm",

                      fontWeight: "medium",
                    }}
                    _dark={{
                      borderColor: "coolGray.700",
                    }}
                    _light={{
                      borderColor: "coolGray.300",
                    }}
                  />
                  {/* {"confirmPass" in errors ? (
                    <FormControl.ErrorMessage>
                      {errors.confirmPass}
                    </FormControl.ErrorMessage>
                  ) : (
                    <FormControl.HelperText
                      _light={{ _text: { color: "coolGray.600" } }}
                      _dark={{ _text: { color: "coolGray.400" } }}
                    >
                      Both passwords must match.
                    </FormControl.HelperText>
                  )} */}
                </FormControl>
              </VStack>
            </Box>
          </VStack>
          <ButtonLayout
          pageType="SignUp"
          nameText="UPDATE PASSWORD"
          onchange={handleSubmit}
          style={{paddingVertical: 0, marginTop: 40}}
          />
          {/* <Button
            mt={{ base: 12, md: "102px" }}
            mb={{ base: "4", md: 0 }}
            py="13px"
            size="md"
            _light={{
              bg: "primary.900",
            }}
            _dark={{
              bg: "primary.800",
            }}
            onPress={handleSubmit}
          >
            UPDATE PASSWORD
          </Button> */}
        </Box>
        <RNAlert
          title={alertData.title}
          description={alertData.description}
          onClose={onhandleCloseAlert}
          isOpen={!isEmpty(alertData.title)}
        />
      </ScrollView>
    </GuestLayout>
  );
}
