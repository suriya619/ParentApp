import { Box, FormControl, View, Image, ScrollView } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import SignatureCapture from "react-native-signature-capture";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { childSignInLog } from "../../store/auth";
import { FullScreenLoader } from "../commoncomponents";
import FormButton from "./components/FormButton";
import FormLabel from "./components/FormLabel";
import SubmitButton from "./components/SubmitButton";
import { getCurrentDate } from "./FormFields";
import { DashboardLayout } from "../commoncomponents";

const SignOutFormm = ({route, navigation}: any) => {

  const {child, setStatus, handleChildSignInStatusCall } = route.params;

  const [formData, setData] = useState({
    signature: "",
  });

  var signatureVal = "";
  const [errors, setErrors] = useState<any>({});
  const [submit, setSubmit] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);
  const signatureRef = useRef(null);
  const [text, setText] = useState("");
  const [isSignature, setISSignature] = useState(false);
  const [signature, setSignature] = useState("");

  // const formFields = formFieldsRequired.signOut;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.activeUser);
  const getCenterSigninOutSettings = useSelector(
    (state) => state.center.getCenterSigninOutSettings
  );

  const handleChildLogout = (data, callback) =>
    dispatch(childSignInLog(data, callback));
  const handleNavigation = () => {
    // navigation.navigate("OtpVerification");
  };

  const validate = () => {
    if (getCenterSigninOutSettings.InSignature === 3) {
      if (signature === "") {
        setErrors({ ...errors, signature: "Please sign the form" });
        return false;
      }
    }
    return true;
  };

  const onSubmit = () => {
    // getSignatureImageEncodedValue();

    setTimeout(function () {
      if (validate()) {
        setErrors({});
        setInvalidForm(false);
        setSubmit(true);
        // console.log("childSign 713 >>> " + JSON.stringify(formData.signature));
        handleSignoutClick();
        setTimeout(function () {
          setSubmit(false);
          navigation.goBack();
          setStatus("Signed Out");
        }, 2000);
        
      } else {
        setInvalidForm(true);
      }
    }, 300);
  };

  const handleSignoutClick = async () => {
    if (!isSignature) signatureVal = "";

    const handleNavigation = (data) => {
      console.log("Child Signed out Successully");
      handleChildSignInStatusCall();
    };

    handleChildLogout(
      {
        AuthorizedToken: "",
        Id: "null",
        SignType: "SignOut",
        ParentID: child.ParentID,
        ChildID: child.ChildID,
        SignDate: getCurrentDate(),
        SignatureImage: signatureVal,
        SleepWell: "",
        Mood: "",
        CollectingByWho: "",
        TimeOfCollection: "",
        TimeOfWokeUp: "",
        TimeOfLastBottle: "",
        Medication: "",
        ImportantInformation: "",
        SignOutParentID: child.ParentID,
      },
      handleNavigation
    );
  };

  const onClearButtonClicked = () => {
    setISSignature(false);
    signatureRef?.current?.resetImage();
    setSignature("");
    signatureVal = "";
  };

  const getSignatureImageEncodedValue = () => {
    setISSignature(true);
    signatureRef?.current?.saveImage();
  };

  const onSaveEvent = (result) => {
    setSignature(result?.encoded || ""); 
  };

  const onDragEvent = () => {
    setISSignature(true);
  };
  useEffect(() => {
    if(signature !== ""){
      onSubmit();
    }
  }, [signature])
  return (
  <DashboardLayout title={`Sign ${child.FirstName} Out`}>
    <Box pb="20">
    <ScrollView px="4" mb={{ base: -20 }} nestedScrollEnabled bounces={false} 
          keyboardShouldPersistTaps="handled">
      <FullScreenLoader isVisible={userData.isLoading} />
      {/* SIGNATURE CAPTURE */}
      {getCenterSigninOutSettings.InSignature !== 1 && (
        <FormControl
          my="5"
          isRequired={getCenterSigninOutSettings.InSignature === 3}
          isInvalid={"signature" in errors}
        >
          <FormLabel labeltext="Signature" />

          <View
            style={{
              borderWidth: "signature" in errors ? 2 : 1,
              borderColor: "signature" in errors ? "#FF0000" : "#A6BFC8",
              height: 220,
              backgroundColor: "#FFFFFF",
              marginBottom:5
            }}
          >
            {signature !== "" ? <Image source={{uri: `data:image/png;base64,${signature}`}} style={{
                width: "99%",
                height: 210,
              }} /> :
            <SignatureCapture
              style={{
                // borderColor: "signature" in errors ? "#FF0000" : "#A6BFC8",
                // borderWidth: "signature" in errors ? 2 : 1,
                width: "99%",
                height: 210,
              }}
              saveImageFileInExtStorage={false}
              ref={signatureRef}
              showNativeButtons={false}
              showTitleLabel={false}
              showBorder={false}
              backgroundColor="#FFFFFF"
              minStrokeWidth={4}
              maxStrokeWidth={4}
              onSaveEvent={onSaveEvent}
              onDragEvent={onDragEvent}
            />}
          </View>
          {"signature" in errors && (
            <FormControl.ErrorMessage>
              {errors.signature}
            </FormControl.ErrorMessage>
          )}
          {/* <FormButton
            varianttype="subtle"
            text="Save"
            onchange={getSignatureImageEncodedValue}
          /> */}
          <FormButton
            varianttype="subtle"
            text="Clear"
            onchange={onClearButtonClicked}
          />
        </FormControl>
      )}

      <SubmitButton submit={submit} text="Sign Out" onchange={ isSignature ? getSignatureImageEncodedValue : onSubmit} />

      {invalidForm && (
        <Box _text={{ color: "red.500" }}>Form not filled out correctly</Box>
      )}
    </ScrollView>
    </Box>
  </DashboardLayout>
  );
};

export default React.memo(SignOutFormm, (prevprops, nextprops) => {
  return true;
});
