import {
  //Box,
  // FormControl, 
  // View, 
  // Image, 
  // ScrollView 
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";
import SignatureCapture from "react-native-signature-capture";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { childSignInLog } from "../../../store/auth";
import { FullScreenLoader } from "../../commoncomponents";
import FormButton from "../components/FormButton";
import FormLabel from "../components/FormLabel";
import SubmitButton from "../components/SubmitButton";
import { getCurrentDate } from "../FormFields";
import { DashboardLayout } from "../../commoncomponents";
import useThemedStyles from "../../../context/useThemedStyles";
import FormControl from "../components/FormControl";
import ErrorText from "../components/ErrorText";
import { AppFontSizes, AppTypography } from "../../../assets/styles/themes";

const SignOut = ({ route, navigation }: any) => {

  const { child, setStatus, handleChildSignInStatusCall } = route.params;

  var signatureVal = "";
  const [errors, setErrors] = useState<any>({});
  const [submit, setSubmit] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);
  const signatureRef = useRef<any>(null);
  const [isSignature, setISSignature] = useState(false);
  const [signature, setSignature] = useState("");

  // const formFields = formFieldsRequired.signOut;
  const dispatch = useDispatch();
  const styles = useThemedStyles(style);
  const userData = useSelector((state:any) => state.activeUser);
  const getCenterSigninOutSettings = useSelector(
    (state:any) => state.center.getCenterSigninOutSettings
  );

  const handleChildLogout = (data:any, callback:any) =>
    dispatch(childSignInLog(data, callback));

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
      } else {
        setInvalidForm(true);
        setISSignature(false);
      }
    }, 300);
  };

  const handleSignoutClick = async () => {
    if (!isSignature) signatureVal = "";

    const handleNavigation = (data: any, statusCode: any) => {
      if (statusCode === 200) {
        handleChildSignInStatusCall();
        setSubmit(false);
        navigation.goBack();
        setStatus("Signed Out");
      } else {
        setSubmit(false);
        setISSignature(false);
      }
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

  const onSaveEvent = (result:any) => {
    setSignature(result?.encoded || "");
  };

  const onDragEvent = () => {
    setISSignature(true);
    delete errors?.signature;
  };
  useEffect(() => {
    if (signature !== "") {
      onSubmit();
    }
  }, [signature]);

  return (
    <DashboardLayout title={`Sign ${child.FirstName} Out`}>
      <ScrollView
        style={styles.contentContainer}
        nestedScrollEnabled
        bounces={false}
        keyboardShouldPersistTaps="handled">
        <FullScreenLoader isVisible={userData.isLoading} />
        {/* SIGNATURE CAPTURE */}
        {getCenterSigninOutSettings.InSignature !== 1 && (
          <FormControl
            my="5"
            isRequired={getCenterSigninOutSettings.InSignature === 3}
            isInvalid={"signature" in errors}
          >
            <FormLabel labeltext="Signature" required={getCenterSigninOutSettings.InSignature === 3} />

            <View
              style={{
                borderWidth: "signature" in errors ? 2 : 1,
                borderColor: "signature" in errors ? "#FF0000" : "#A6BFC8",
                height: 220,
                backgroundColor: "#FFFFFF",
                marginBottom: 5
              }}
            >
              {signature !== "" ? <Image source={{ uri: `data:image/png;base64,${signature}` }} style={{
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
              <ErrorText
                errorMessage={errors.signature}
              />
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

        <SubmitButton submit={submit} text="SIGN OUT" onchange={isSignature ? getSignatureImageEncodedValue : onSubmit} />

        {invalidForm && (
          <Text style={styles.inValidColor}>Form not filled out correctly</Text>
        )}
      </ScrollView>
    </DashboardLayout>
  );
};

const style = (theme: any) => StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  inValidColor: {
    fontFamily: AppTypography.Poppins[400].normal,
    fontSize: AppFontSizes.FONT_SIZE_10,
    lineHeight: 18,
    color: theme?.colors?.errorColor
  }
})

export default React.memo(SignOut, (prevprops, nextprops) => {
  return true;
});
