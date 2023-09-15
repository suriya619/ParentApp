import moment from "moment";
import {
  Box,
  FormControl,
  HStack,
  Input,
  Pressable,
  Radio,
  View,
  ScrollView,
  Image,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignatureCapture from "react-native-signature-capture";
import { useDispatch, useSelector } from "react-redux";
import { MOODS } from "../../constants";
import { childSignInLog } from "../../store/auth";
import { convert12to24hrs, getChildAgeinMonths } from "../../utils/date";
import Icons from "../../utils/icons";
import { FullScreenLoader } from "../commoncomponents";
import ActionSheetSelect from "./components/ActionSheetSelect";
import FormButton from "./components/FormButton";
import FormLabel from "./components/FormLabel";
import SubmitButton from "./components/SubmitButton";
import TextAreaField from "./components/TextAreaField";
import { DashboardLayout } from "../commoncomponents";
import {
  bottleminutesarray,
  bottletimearray,
  collectionByWho,
  collectionsminutesarray,
  collectionstimearray,
  getCurrentDate,
} from "./FormFields";

const SignInFormm = ({ route }: any) => {
  const { child, setStatus, handleChildSignInStatusCall } = route.params;

  const [formData, setData] = useState({
    sleep: "",
    wokeUp: "",
    bottle: "",
    mood: "Happy",
    // medication: child.medication,
    // notes: child.notes,
    medication: "",
    notes: "",
    collectionByWho: "",
    otherCollector: "",
    collectionTime: "",
    signature: "",
    nappy: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [otherCollector, setOtherCollector] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isSignature, setISSignature] = useState(false);
  const [signature, setSignature] = useState("");
  const signatureRef = useRef(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.activeUser.isLoading);

  const getCenterSigninOutSettings = useSelector(
    (state) => state.center.getCenterSigninOutSettings
  );

  const getChildAgeLimit = useSelector(
    (state) => state.center.getChildAgeLimit
  );

  const childInfo = (userData?.lstChild || []).find(
    (ele) => ele.ChildID === child?.ChildID
  );

  const childAgeInMonth = getChildAgeinMonths(childInfo?.BirthDate);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    if (!userData) {
      const user = await AsyncStorage.getItem("user");
      const parseUser = JSON.parse(user);
      setUserData(parseUser?.Data);
    }
  };

  const handleChildLogin = (data, callback) =>
    dispatch(childSignInLog(data, callback));

  const validate = () => {

    let valid = true;

    if (getCenterSigninOutSettings.InSleepWell === 3) {
      if (!formData.sleep.trim()) {
        errors.sleep = "Please select sleep well";
        valid = false;
      } else {
        console.log("Sleep well else");
        delete errors.sleep;
      }
    }

    if (
      getCenterSigninOutSettings.InBabyWakeTime === 3 &&
      childAgeInMonth !== -1 &&
      childAgeInMonth < getChildAgeLimit?.BabyAgeLimit
    ) {
      console.log(
        "==== Wokeup time if condition =====",
        formData.wokeUp.trim()
      );
      if (!formData.wokeUp.trim()) {
        errors.wokeUp = "Please select a time";
        valid = false;
      } else delete errors.wokeUp;
    }

    if (
      getCenterSigninOutSettings.InBabyWakeTime === 3 &&
      childAgeInMonth !== -1 &&
      childAgeInMonth < getChildAgeLimit?.BabyAgeLimit
    ) {
      console.log(
        "==== bottle time if condition =====",
        formData.bottle.trim()
      );

      if (!formData.bottle.trim()) {
        errors.bottle = "Please select a time";
        valid = false;
      } else delete errors.bottle;
    }

    if (
      getCenterSigninOutSettings.InBabyNappy === 3 &&
      childAgeInMonth !== -1 &&
      childAgeInMonth < getChildAgeLimit?.BabyAgeLimit
    ) {
      if (!formData.nappy.trim()) {
        errors.nappy = "Please select a time";
        valid = false;
      } else delete errors.nappy;
    }

    if (getCenterSigninOutSettings.InMood === 3) {
      if (!formData.mood.trim()) {
        errors.mood = "Please choose a mood";
        valid = false;
      } else delete errors.mood;
    }

    if (getCenterSigninOutSettings.InMedication === 3) {
      if (!formData.medication.trim()) {
        errors.medication =
          'Please enter medical notes, or "No Notes for today"';
        valid = false;
      } else if (formData.medication.length > 500) {
        errors.medication = "Maximum character count of 500, please enter less";
        valid = false;
      } else delete errors.medication;
    } else {
      if (formData.medication.length > 500) {
        errors.medication = "Maximum character count of 500, please enter less";
        valid = false;
      } else delete errors.medication;
    }

    if (getCenterSigninOutSettings.InImportantInfo === 3) {
      if (!formData.notes.trim()) {
        errors.notes =
          'Please enter important information, or "No Notes for today"';
        valid = false;
      } else if (formData.notes.length > 250) {
        errors.notes = "Maximum character count of 250, please enter less";
        valid = false;
      } else delete errors.notes;
    } else {
      if (formData.notes.length > 250) {
        errors.notes = "Maximum character count of 250, please enter less";
        valid = false;
      } else delete errors.notes;
    }

    if (getCenterSigninOutSettings.InCollectedBy === 3) {
      if (!formData.collectionByWho.trim()) {
        errors.collectionByWho = "Please select who will be collecting";
        valid = false;
      } else delete errors.collectionByWho;

      if (formData.collectingByWho === "other") {
        if (!formData.otherCollector.trim()) {
          errors.otherCollector = "Please specify who will be collecting";
          valid = false;
        } else delete errors.otherCollector;
      }
    }

    if (getCenterSigninOutSettings.InCollectedTime === 3) {
      if (!formData.collectionTime.trim()) {
        errors.collectionTime = "Please select a time";
        valid = false;
      } else delete errors.collectionTime;
    }
    //Weird bug has meant that in this form you have to check the opposite condition for is the signature required.
    // Hence the !formData.signature.required when this you would expect formData.signature.required as in the other forms
    if (getCenterSigninOutSettings.InSignature === 3) {
      if (signature === "") {
        errors.signature = "Please save your signature";
        valid = false;
      } else delete errors.signature;
    }

    setErrors({ ...errors });
    return valid;
  };

  const onSubmit = () => {
    // getSignatureImageEncodedValue();

    if (validate()) {
      setErrors({});
      setInvalidForm(false);
      setSubmit(true);
      setTimeout(function () {
        handleSignInClick();
      }, 300);

      setTimeout(function () {
        setSubmit(false);
        navigation.goBack();
        setStatus("Signed In");
      }, 2000);
    } else {
      setInvalidForm(true);
      setISSignature(false);
    }
  };

  const handleNavigation = (data) => {
    console.log("Child Signed In Successully");
    handleChildSignInStatusCall();
  };

  const handleSignInClick = async () => {
    if (!isSignature) signatureVal = "";

    handleChildLogin(
      {
        AuthorizedToken: "",
        Id: "null",
        SignType: "SignIN",
        ParentID: child.ParentID,
        ChildID: child.ChildID,
        SignDate: getCurrentDate(),
        SignatureImage: isSignature ? signature : "",
        SleepWell: formData.sleep,
        Mood: formData.mood,
        CollectingByWho:
          formData.collectionByWho === "other"
            ? formData.otherCollector
            : formData.collectionByWho,
        TimeOfCollection:
          formData.collectionTime !== ""
            ? convert12to24hrs(formData.collectionTime)
            : null,
        TimeOfWokeUp:
          formData.wokeUp !== "" ? convert12to24hrs(formData.wokeUp) : null,
        TimeOfLastBottle:
          formData.bottle !== "" ? convert12to24hrs(formData.bottle) : null,
        Medication: formData.medication,
        ImportantInformation: formData.notes,
        SignOutParentID: null,
        TimeOfLastNappy:
          formData.nappy !== "" ? convert12to24hrs(formData.nappy) : null,
      },
      handleNavigation
    );
  };

  const getIconFromList = (iconName, moodValue) => {
    let icon = "";
    if (iconName === "Happy") {
      icon = moodValue === "Happy" ? "HAPPY_CHECKED" : "HAPPY";
    } else if (iconName === "Calm") {
      icon = moodValue === "Calm" ? "CALM_CHECKED" : "CALM";
    } else if (iconName === "Sad") {
      icon = moodValue === "Sad" ? "SAD_CHECKED" : "SAD";
    } else if (iconName === "Sleepy") {
      icon = moodValue === "Sleepy" ? "SLEEPY_CHECKED" : "SLEEPY";
    }
    return icon;
  };

  const onClearButtonClicked = () => {
    setISSignature(false);
    signatureRef?.current?.resetImage();
    setSignature("");
    setData((newState) => ({ ...newState, signature: "" }));
  };

  const getSignatureImageEncodedValue = () => {
    setISSignature(true);
    signatureRef?.current?.saveImage();
  };

  const onSaveEvent = (result: any) => {
    setSignature(result?.encoded);
    const err = { ...errors };
    if (getCenterSigninOutSettings.InSignature === 3) {
      if ((result?.encoded || "") === "") {
        err.signature = "Please save your signature";
      } else delete err.signature;
    }
    setErrors({ ...err });
  };

  const onDragEvent = () => {
    setISSignature(true);
  };

  useEffect(() => {
    if (signature !== "") {
      onSubmit();
    }
  }, [signature]);

  const generateCollectionTimeArray = () => {
    const startDate = moment(new Date().setHours(12, 0, 0));
    const endDate = getCenterSigninOutSettings.ClosingTime
      ? moment(
          new Date().setHours(
            getCenterSigninOutSettings.ClosingTime.split(":")[0],
            getCenterSigninOutSettings.ClosingTime.split(":")[1],
            0
          )
        )
      : moment(new Date().setHours(16, 0, 0));
    const duration = moment.duration(endDate.diff(startDate));
    const hours = duration.asHours() > 0 ? duration.asHours() * 4 + 1 : 1;
    const updatedTimeArray = [...Array(Math.round(hours)).keys()].map(
      (el, idx) =>
        startDate.add(idx === 0 ? 0 : 15, "minutes").format("hh:mm a")
    );
    return getCenterSigninOutSettings.ClosingTime ? updatedTimeArray : null;
  };
  const handleStateUpdate = (value) => {
    setData(value);
  };
  return (
    <DashboardLayout title={`Sign ${child.FirstName} In`}>

      <Box pb="20">
        <ScrollView
          px="4"
          mb={{ base: -20 }}
          nestedScrollEnabled
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <FullScreenLoader isVisible={isLoading} />
          {/* SLEEP QUALITY    */}

          {getCenterSigninOutSettings.InSleepWell !== 1 && (
            <FormControl
              my="5"
              isRequired={
                getCenterSigninOutSettings.InSleepWell === 3 &&
                childAgeInMonth !== -1 &&
                childAgeInMonth < getChildAgeLimit?.BabyAgeLimit
              }
              isInvalid={"sleep" in errors}
            >
              <FormLabel
                labeltext={"Did " + child.FirstName + " sleep well? "}
              />

              <Radio.Group
                name="sleep"
                accessibilityLabel="Did your child sleep well?"
                onChange={(value) => {
                  setData((newState) => ({ ...newState, sleep: value }));
                  //     sleepWell_temp = value;
                  //     console.log("loginFormCheck sleep >>>> " + sleepWell_temp);
                }}
              >
                <HStack space="10">
                  <Radio value="good">Yes</Radio>
                  <Radio value="bad">No</Radio>
                </HStack>
              </Radio.Group>
              {"sleep" in errors && (
                <FormControl.ErrorMessage>
                  {errors.sleep}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}

          {/*  TIME WOKE UP   */}
          {getCenterSigninOutSettings.InBabyWakeTime !== 1 &&
            childAgeInMonth !== -1 &&
            childAgeInMonth <= getChildAgeLimit?.BabyAgeLimit && (
              <FormControl
                my="5"
                isRequired={
                  getCenterSigninOutSettings.InBabyWakeTime === 3 &&
                  childAgeInMonth !== -1 &&
                  childAgeInMonth < getChildAgeLimit?.BabyAgeLimit
                }
                isInvalid={"wokeUp" in errors}
              >
                <FormLabel
                  labeltext={"What time did " + child.FirstName + " wake up?"}
                />

                <ActionSheetSelect
                  accessibilityLabelText="Choose a time"
                  placeholderText="Choose a time"
                  formData={formData}
                  minutesarray={bottleminutesarray}
                  timearray={bottletimearray}
                  type="wokeUp"
                  setData={handleStateUpdate}
                />

                {"wokeUp" in errors && (
                  <FormControl.ErrorMessage>
                    {errors.wokeUp}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}

          {/* TIME OF LAST BOTTLE */}
          {getCenterSigninOutSettings.InBabyFeed !== 1 &&
            childAgeInMonth !== -1 &&
            childAgeInMonth <= getChildAgeLimit?.BabyAgeLimit && (
              <FormControl
                my="5"
                isRequired={
                  getCenterSigninOutSettings.InBabyFeed === 3 &&
                  childAgeInMonth !== -1 &&
                  childAgeInMonth < getChildAgeLimit?.BabyAgeLimit
                }
                isInvalid={"bottle" in errors}
              >
                <FormLabel
                  labeltext={
                    " What time was " + child.FirstName + "'s last bottle?"
                  }
                />

                <ActionSheetSelect
                  accessibilityLabelText="Choose a time"
                  placeholderText="Choose a time"
                  formData={formData}
                  type="bottle"
                  minutesarray={bottleminutesarray}
                  timearray={bottletimearray}
                  setData={handleStateUpdate}
                />

                {"bottle" in errors && (
                  <FormControl.ErrorMessage>
                    {errors.bottle}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          {/* TIME OF LAST NAPPY */}
          {getCenterSigninOutSettings.InBabyNappy !== 1 &&
            childAgeInMonth !== -1 &&
            childAgeInMonth <= getChildAgeLimit?.BabyAgeLimit && (
              <FormControl
                my="5"
                isRequired={
                  getCenterSigninOutSettings.InBabyNappy === 3 &&
                  childAgeInMonth !== -1 &&
                  childAgeInMonth < getChildAgeLimit?.BabyAgeLimit
                }
                isInvalid={"nappy" in errors}
              >
                <FormLabel
                  labeltext={
                    " What time was " +
                    child.FirstName +
                    "'s last nappy change?"
                  }
                />

                <ActionSheetSelect
                  accessibilityLabelText="Choose a time"
                  placeholderText="Choose a time"
                  formData={formData}
                  type="nappy"
                  minutesarray={bottleminutesarray}
                  timearray={bottletimearray}
                  setData={handleStateUpdate}
                />

                {"nappy" in errors && (
                  <FormControl.ErrorMessage>
                    {errors.nappy}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}

          {/* MOOD   */}
          {getCenterSigninOutSettings.InMood !== 1 && (
            <FormControl
              my="5"
              isRequired={getCenterSigninOutSettings.InMood === 3}
              isInvalid={"mood" in errors}
            >
              <FormLabel
                labeltext={"How is " + child.FirstName + " feeling?"}
              />

              <HStack width="90%" space="10%" pt="1">
                {MOODS.map((ele) => (
                  <Pressable
                    onPress={() => {
                      setData((newState) => ({ ...newState, mood: ele }));
                    }}
                    hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }}
                  >
                    {getIconFromList(ele, formData?.mood) ? (
                      <Icons
                        iconName={getIconFromList(ele, formData?.mood)}
                        height={40}
                        width={40}
                      />
                    ) : null}
                  </Pressable>
                ))}
              </HStack>
              {"mood" in errors && (
                <FormControl.ErrorMessage>
                  {errors.mood}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}

          {/* MEDICAL INFORMATION   */}
          {getCenterSigninOutSettings.InMedication !== 1 && (
            <FormControl
              my="5"
              isRequired={getCenterSigninOutSettings.InMedication === 3}
              isInvalid={"medication" in errors}
            >
              <FormLabel labeltext={child.FirstName + "'s medical notes"} />
              <TextAreaField
                formData={formData}
                type="medication"
                setData={setData}
              />

              {"medication" in errors && (
                <FormControl.ErrorMessage>
                  {errors.medication}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}

          {/* NOTES value={formData.notes} */}
          {getCenterSigninOutSettings.InImportantInfo !== 1 && (
            <FormControl
              my="5"
              isRequired={getCenterSigninOutSettings.InImportantInfo === 3}
              isInvalid={"notes" in errors}
            >
              <FormLabel labeltext={"General notes for " + child.FirstName} />

              <TextAreaField
                formData={formData}
                type="notes"
                setData={setData}
              />
              {"notes" in errors && (
                <FormControl.ErrorMessage>
                  {errors.notes}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}

          {/* WHO IS COLLECTING   */}
          {getCenterSigninOutSettings.InCollectedBy !== 1 && (
            <>
              <FormControl
                my="5"
                isRequired={getCenterSigninOutSettings.InCollectedBy === 3}
                isInvalid={"collectionByWho" in errors}
              >
                <FormLabel
                  labeltext={"Who is Collecting  " + child.FirstName + "?"}/>

                <Radio.Group
                  accessibilityLabel="Choose Collector"
                  onChange={(value) => {
                    setData((newState) => ({
                      ...newState,
                      collectionByWho: value,
                    }));
                    value === "other"
                      ? setOtherCollector(true)
                      : setOtherCollector(false);
                  }}
                >
                  {collectionByWho.map((collector, index) => {
                    return (
                      <Radio key={index} value={collector.name} my="1">
                        {collector.name}
                      </Radio>
                    );
                  })}
                  <Radio value="other" my="1">
                    Other
                  </Radio>
                </Radio.Group>
                {"collectionByWho" in errors && (
                  <FormControl.ErrorMessage>
                    {errors.collectionByWho}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              {/* If other is selected in collectingByWho.... new form field opens up   */}
              {otherCollector && (
                <FormControl
                  my="5"
                  isRequired={formData.collectionByWho === "other"}
                  isInvalid={"otherCollector" in errors}
                >
                  <FormLabel labeltext="Please specify" />

                  <Input
                    placeholder="John, Brother"
                    onChangeText={(value) => {
                      setData((newState) => ({
                        ...newState,
                        otherCollector: value,
                      }));
                    }}
                  />
                  <FormControl.HelperText>
                    Please describe the relationship
                  </FormControl.HelperText>
                  {"otherCollector" in errors && (
                    <FormControl.ErrorMessage>
                      {errors.otherCollector}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
              )}
            </>
          )}

          {/* COLLECTION TIME   */}
          {getCenterSigninOutSettings.InCollectedTime !== 1 && (
            <FormControl
              my="5"
              isRequired={getCenterSigninOutSettings.InCollectedTime === 3}
              isInvalid={"collectionTime" in errors}
            >
              <FormLabel labeltext="Collection time" />

              <ActionSheetSelect
                accessibilityLabelText="Choose a time"
                placeholderText="Choose a time"
                type="collectionTime"
                formData={formData}
                minutesarray={collectionsminutesarray}
                timearray={collectionstimearray}
                fullArray={generateCollectionTimeArray()}
                setData={handleStateUpdate}
              />

              {"collectionTime" in errors && (
                <FormControl.ErrorMessage>
                  {errors.collectionTime}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}

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
                }}
              >
                {signature !== "" ? (
                  <Image
                    source={{ uri: `data:image/png;base64,${signature}` }}
                    style={{
                      // borderColor: "signature" in errors ? "#FF0000" : "#A6BFC8",
                      // borderWidth: "signature" in errors ? 2 : 1,
                      width: "99%",
                      height: 215,
                    }}
                  />
                ) : (
                  <SignatureCapture
                    style={{
                      // borderColor: "signature" in errors ? "#FF0000" : "#A6BFC8",
                      // borderWidth: "signature" in errors ? 2 : 1,
                      width: "99%",
                      height: 215,
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
                  />
                )}
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

          {/* FORM SUBMIT BUTTON */}

          <SubmitButton
            submit={submit}
            text="Sign In"
            onchange={isSignature ? getSignatureImageEncodedValue : onSubmit}
          />

          {invalidForm && (
            <Box _text={{ color: "red.500" }}>
              Form not filled out correctly
            </Box>
          )}
        </ScrollView>
      </Box>
    </DashboardLayout>
  );
};

export default React.memo(SignInFormm, (prevprops, nextprops) => {
  return true;
});

// export default SignInFormm;
