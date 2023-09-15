import moment from "moment";
import {
  // Box,
  // FormControl,
  // HStack,
  // Input,
  // Pressable,
  // Radio,
  // View,
  // ScrollView,
  // Image,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View, Image, StyleSheet, Pressable, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignatureCapture from "react-native-signature-capture";
import { useDispatch, useSelector } from "react-redux";
import { MOODS } from "../../../constants";
import { childSignInLog, getMedicalOrGeneralNotes } from "../../../store/auth";
import { convert12to24hrs, getChildAgeinMonths } from "../../../utils/date";
import Icons from "../../../utils/icons";
import { FullScreenLoader } from "../../commoncomponents";
import ActionSheetSelect from "../components/ActionSheetSelect";
import FormLabel from "../components/FormLabel";
import SubmitButton from "../components/SubmitButton";
import TextAreaField from "../components/TextAreaField";
import useThemedStyles from "../../../context/useThemedStyles";
import { DashboardLayout } from "../../commoncomponents";
import {
  bottleminutesarray,
  bottletimearray,
  collectionByWho,
  collectionsminutesarray,
  collectionstimearray,
  getCurrentDate,
} from "../FormFields";
import FormControl from "../components/FormControl";
import ErrorText from "../components/ErrorText";
import { AppFontSizes, AppTypography } from "../../../assets/styles/themes";

import CustomButtons from '../components/CustomButtons';
import CustomVStackButtons from '../components/CustomVStackButtons';
import SelectMedicalorGeneralNotes from '../../commoncomponents/SelectMedicalorGeneralNotes';
import useTheme from "../../../context/useTheme";
import FormInputText from "../components/FormInput";

const SignIn: React.FC = ({ route }: any) => {
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
  const [activeModal, setActiveModal] = useState(false);
  const [ActiveNotesType, setActiveNotesType] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState({ height: 0, status: false });
  const [dataSourceCords, setDataSourceCords] = useState([] as number[]);
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [activeKey, setActiveKey] = useState(0);
  const [ref, setRef] = useState<ScrollView>();
  const signatureRef = useRef<any>(null);
  const styles = useThemedStyles(style);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isLoading = useSelector((state:any) => state.activeUser.isLoading);
  const getMedicalorGeneralNotesList = useSelector((state: any) => state.activeUser.getMedicalorGeneralNotesList);

  const getCenterSigninOutSettings = useSelector(
    (state:any) => state.center.getCenterSigninOutSettings
  );

  const getChildAgeLimit = useSelector(
    (state:any) => state.center.getChildAgeLimit
  );

  const childInfo = (userData?.lstChild || []).find(
    (ele:any) => ele.ChildID === child?.ChildID
  );

  const childAgeInMonth = getChildAgeinMonths(childInfo?.BirthDate);

  useEffect(() => {
    dispatch(getMedicalOrGeneralNotes(child?.ChildID));
    getUserData();
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardStatus({ height: e.endCoordinates.height, status: true });
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus({ height: 0, status: false });
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const getUserData = async () => {
    if (!userData) {
      const user:any = await AsyncStorage.getItem("user");
      const parseUser = JSON.parse(user);
      setUserData(parseUser?.Data);
    }
  };

  const handleChildLogin = (data:any, callback:any) => dispatch(childSignInLog(data, callback));

  const validate = () => {
    let valid = true;
    if (getCenterSigninOutSettings.InSleepWell === 3) {
      if (!formData.sleep.trim()) {
        errors.sleep = "Please select sleep well";
        valid = false;
      } else {
        delete errors.sleep;
      }
    }

    if (
      getCenterSigninOutSettings.InBabyWakeTime === 3 &&
      childAgeInMonth !== -1 &&
      childAgeInMonth < getChildAgeLimit?.BabyAgeLimit
    ) {
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
      if (formData.medication === "" || !formData?.medication?.trim()) {
        errors.medication =
          'Please enter medical notes, or "No Notes for today"';
        valid = false;
      } else if (formData.medication.length > 500) {
        errors.medication = "Maximum character count of 500, please enter less";
        valid = false;
      } else {
        delete errors.medication;
      }
    } else {
      if (formData.medication.length > 500) {
        errors.medication = "Maximum character count of 500, please enter less";
        valid = false;
      } else {
        delete errors.medication;
      }
    }

    if (getCenterSigninOutSettings.InImportantInfo === 3) {
      if (formData.notes === "" || !formData?.notes?.trim()) {
        errors.notes =
          'Please enter important information, or "No Notes for today"';
        valid = false;
      } else if (formData.notes.length > 250) {
        errors.notes = "Maximum character count of 250, please enter less";
        valid = false;
      } else {
        delete errors.notes;
      }
    } else {
      if (formData.notes.length > 250) {
        errors.notes = "Maximum character count of 250, please enter less";
        valid = false;
      } else {
        delete errors.notes;
      }
    }

    if (getCenterSigninOutSettings.InCollectedBy === 3) {
      if (!formData.collectionByWho.trim()) {
        errors.collectionByWho = "Please select who will be collecting";
        valid = false;
      } else delete errors.collectionByWho;

      if (formData.collectionByWho === "other") {
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
    } else {
      setInvalidForm(true);
      setISSignature(false);
    }
  };

  const handleNavigation = (data: any, statusCode: any) => {
    if (statusCode === 200) {
      handleChildSignInStatusCall();
      setSubmit(false);
      navigation.goBack();
      setStatus("Signed In");
    } else {
      setSubmit(false);
      setISSignature(false);
    }
  };

  const handleSignInClick = async () => {
    let signatureVal;
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

  const getIconFromList = (iconName: string, moodValue: string) => {
    let icon = "";
    if (iconName === "Happy") {
      icon = "HAPPY";
    } else if (iconName === "Calm") {
      icon = "CALM";
    } else if (iconName === "Sad") {
      icon = "SAD";
    } else if (iconName === "Sleepy") {
      icon = "SLEEPY";
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
    delete errors?.signature;
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

  const handleStateUpdate = (value: any) => {
    setData(value);
  };

  const handleSelectNotes = (type: any) => {
    setActiveModal(true);
    setActiveNotesType(type);
  }

  const handleKeyboard = () => {
    Keyboard.dismiss();
    scrollHandler(activeKey)
  }

  const scrollHandler = (key: any) => {
    if (dataSourceCords.length > scrollToIndex) {
      ref?.scrollTo({
        y: dataSourceCords[key + 1] - 20, //we get the offset value from array based on key
        animated: true,
      });
    }
  };

  const getKeyforForm = (type: string) => {
    var keyItem = 0;
    switch (type) {
      case 'sleep':
        if (getCenterSigninOutSettings.InSleepWell !== 1) keyItem = 1;
        break;
      case 'wokeUp':
        if (getCenterSigninOutSettings.InSleepWell === 1) {
          keyItem = 1;
        } else if (getCenterSigninOutSettings.InBabyWakeTime !== 1 &&
          childAgeInMonth !== -1 &&
          childAgeInMonth <= getChildAgeLimit?.BabyAgeLimit) {
          keyItem = 2;
        }
        break;
      case 'bottle':
        if (getCenterSigninOutSettings.InSleepWell === 1 && getCenterSigninOutSettings.InBabyWakeTime === 1) {
          keyItem = 1;
        } else if (getCenterSigninOutSettings.InSleepWell === 1 || getCenterSigninOutSettings.InBabyWakeTime === 1) {
          keyItem = 3 - ([getCenterSigninOutSettings.InSleepWell === 1, getCenterSigninOutSettings.InBabyWakeTime === 1].filter(ele => ele == true)?.length);
        } else if (getCenterSigninOutSettings.InBabyFeed !== 1 &&
          childAgeInMonth !== -1 &&
          childAgeInMonth <= getChildAgeLimit?.BabyAgeLimit) {
          keyItem = 3;
        }
        break;
      case 'nappy':
        if (getCenterSigninOutSettings.InSleepWell === 1 && getCenterSigninOutSettings.InBabyWakeTime === 1 && getCenterSigninOutSettings.InBabyFeed === 1) {
          keyItem = 1;
        } else if (getCenterSigninOutSettings.InSleepWell === 1 || getCenterSigninOutSettings.InBabyWakeTime === 1 || getCenterSigninOutSettings.InBabyFeed === 1) {
          keyItem = 4 - ([getCenterSigninOutSettings.InSleepWell === 1, getCenterSigninOutSettings.InBabyWakeTime === 1, getCenterSigninOutSettings.InBabyFeed === 1].filter(ele => ele == true)?.length);
        } else if (getCenterSigninOutSettings.InBabyNappy !== 1 &&
          childAgeInMonth !== -1 &&
          childAgeInMonth <= getChildAgeLimit?.BabyAgeLimit) {
          keyItem = 4;
        }
        break;
      case 'mood':
        if (getCenterSigninOutSettings.InSleepWell === 1 && getCenterSigninOutSettings.InBabyWakeTime === 1 && getCenterSigninOutSettings.InBabyFeed === 1 && getCenterSigninOutSettings.InBabyNappy === 1) {
          keyItem = 1;
        } else if (
          childAgeInMonth !== -1 &&
          childAgeInMonth > getChildAgeLimit?.BabyAgeLimit) {
          keyItem = getCenterSigninOutSettings.InSleepWell === 1 ? 1 : 2;
        } else if (getCenterSigninOutSettings.InSleepWell === 1 || getCenterSigninOutSettings.InBabyWakeTime === 1 || getCenterSigninOutSettings.InBabyFeed === 1 || getCenterSigninOutSettings.InBabyNappy === 1) {
          console.log([getCenterSigninOutSettings.InSleepWell === 1, getCenterSigninOutSettings.InBabyWakeTime === 1, getCenterSigninOutSettings.InBabyFeed === 1, getCenterSigninOutSettings.InBabyNappy === 1].filter(ele => ele == true)?.length, ">>>>>>>>>> key")
          keyItem = 5 - ([getCenterSigninOutSettings.InSleepWell === 1, getCenterSigninOutSettings.InBabyWakeTime === 1, getCenterSigninOutSettings.InBabyFeed === 1, getCenterSigninOutSettings.InBabyNappy === 1].filter(ele => ele == true)?.length);
        } else if (getCenterSigninOutSettings.InMood !== 1) {
          keyItem = 5;
        }
        break;
      case 'medication':
        if (getCenterSigninOutSettings.InSleepWell === 1 && getCenterSigninOutSettings.InBabyWakeTime === 1 && getCenterSigninOutSettings.InBabyFeed === 1 && getCenterSigninOutSettings.InBabyNappy === 1 && getCenterSigninOutSettings.InMood === 1) {
          keyItem = 1;
        } else if (
          childAgeInMonth !== -1 &&
          childAgeInMonth > getChildAgeLimit?.BabyAgeLimit) {
          keyItem = 3 - [getCenterSigninOutSettings.InSleepWell === 1, getCenterSigninOutSettings.InMood === 1].filter(ele => ele == true)?.length;
        } else if (getCenterSigninOutSettings.InSleepWell === 1 || getCenterSigninOutSettings.InBabyWakeTime === 1 || getCenterSigninOutSettings.InBabyFeed === 1 || getCenterSigninOutSettings.InBabyNappy === 1 || getCenterSigninOutSettings.InMood === 1) {
          keyItem = 6 - ([getCenterSigninOutSettings.InSleepWell === 1, getCenterSigninOutSettings.InBabyWakeTime === 1, getCenterSigninOutSettings.InBabyFeed === 1, getCenterSigninOutSettings.InBabyNappy === 1, getCenterSigninOutSettings.InMood === 1].filter(ele => ele == true)?.length);
        } else if (getCenterSigninOutSettings.InMedication !== 1) {
          keyItem = 6;
        }
        break;
      case 'notes':
        if (getCenterSigninOutSettings.InSleepWell === 1 && getCenterSigninOutSettings.InBabyWakeTime === 1 && getCenterSigninOutSettings.InBabyFeed === 1 && getCenterSigninOutSettings.InBabyNappy === 1 && getCenterSigninOutSettings.InMood === 1 && getCenterSigninOutSettings.InMedication === 1) {
          keyItem = 1;
        } else if (
          childAgeInMonth !== -1 &&
          childAgeInMonth > getChildAgeLimit?.BabyAgeLimit) {
          keyItem = 4 - [getCenterSigninOutSettings.InSleepWell === 1, getCenterSigninOutSettings.InMood === 1, getCenterSigninOutSettings.InMedication === 1].filter(ele => ele == true)?.length;
        } else if (getCenterSigninOutSettings.InSleepWell === 1 || getCenterSigninOutSettings.InBabyWakeTime === 1 || getCenterSigninOutSettings.InBabyFeed === 1 || getCenterSigninOutSettings.InBabyNappy === 1 || getCenterSigninOutSettings.InMood === 1 || getCenterSigninOutSettings.InMedication === 1) {
          keyItem = 7 - ([getCenterSigninOutSettings.InSleepWell === 1, getCenterSigninOutSettings.InBabyWakeTime === 1, getCenterSigninOutSettings.InBabyFeed === 1, getCenterSigninOutSettings.InBabyNappy === 1, getCenterSigninOutSettings.InMood === 1, getCenterSigninOutSettings.InMedication === 1].filter(ele => ele == true)?.length);
        } else if (getCenterSigninOutSettings.InImportantInfo !== 1) {
          keyItem = 7;
        }
        break;
      case 'collectionByWho':
        if (getCenterSigninOutSettings.InSleepWell === 1 && getCenterSigninOutSettings.InBabyWakeTime === 1 && getCenterSigninOutSettings.InBabyFeed === 1 && getCenterSigninOutSettings.InBabyNappy === 1 && getCenterSigninOutSettings.InMood === 1 && getCenterSigninOutSettings.InMedication === 1) {
          keyItem = 1;
        } else if (
          childAgeInMonth !== -1 &&
          childAgeInMonth > getChildAgeLimit?.BabyAgeLimit) {
          keyItem = 5 - [getCenterSigninOutSettings.InSleepWell === 1, getCenterSigninOutSettings.InMood === 1, getCenterSigninOutSettings.InMedication === 1, getCenterSigninOutSettings.InImportantInfo === 1].filter(ele => ele == true)?.length;
        } else if (getCenterSigninOutSettings.InSleepWell === 1 || getCenterSigninOutSettings.InBabyWakeTime === 1 || getCenterSigninOutSettings.InBabyFeed === 1 || getCenterSigninOutSettings.InBabyNappy === 1 || getCenterSigninOutSettings.InMood === 1 || getCenterSigninOutSettings.InMedication === 1 || getCenterSigninOutSettings.InImportantInfo === 1) {
          keyItem = 8 - ([getCenterSigninOutSettings.InSleepWell === 1, getCenterSigninOutSettings.InBabyWakeTime === 1, getCenterSigninOutSettings.InBabyFeed === 1, getCenterSigninOutSettings.InBabyNappy === 1, getCenterSigninOutSettings.InMood === 1, getCenterSigninOutSettings.InMedication === 1, getCenterSigninOutSettings.InImportantInfo === 1].filter(ele => ele == true)?.length);
        } else if (getCenterSigninOutSettings.InCollectedBy !== 1) {
          keyItem = 8;
        }
        break;
      case 'collectionTime':
        if (getCenterSigninOutSettings.InSleepWell === 1 && getCenterSigninOutSettings.InBabyWakeTime === 1 && getCenterSigninOutSettings.InBabyFeed === 1 && getCenterSigninOutSettings.InBabyNappy === 1 && getCenterSigninOutSettings.InMood === 1 && getCenterSigninOutSettings.InMedication === 1 && getCenterSigninOutSettings.InCollectedBy === 1) {
          keyItem = 1;
        } else {
          if (
            childAgeInMonth !== -1 &&
            childAgeInMonth > getChildAgeLimit?.BabyAgeLimit) {
            keyItem = 6 - [getCenterSigninOutSettings.InSleepWell === 1, getCenterSigninOutSettings.InMood === 1, getCenterSigninOutSettings.InMedication === 1, getCenterSigninOutSettings.InImportantInfo === 1, getCenterSigninOutSettings.InCollectedBy === 1].filter(ele => ele == true)?.length;
          } else if (getCenterSigninOutSettings.InSleepWell === 1 || getCenterSigninOutSettings.InBabyWakeTime === 1 || getCenterSigninOutSettings.InBabyFeed === 1 || getCenterSigninOutSettings.InBabyNappy === 1 || getCenterSigninOutSettings.InMood === 1 || getCenterSigninOutSettings.InMedication === 1 || getCenterSigninOutSettings.InImportantInfo === 1 || getCenterSigninOutSettings.InCollectedBy === 1) {
            keyItem = 9 - ([getCenterSigninOutSettings.InSleepWell === 1, getCenterSigninOutSettings.InBabyWakeTime === 1, getCenterSigninOutSettings.InBabyFeed === 1, getCenterSigninOutSettings.InBabyNappy === 1, getCenterSigninOutSettings.InMood === 1, getCenterSigninOutSettings.InMedication === 1, getCenterSigninOutSettings.InImportantInfo === 1, getCenterSigninOutSettings.InCollectedBy === 1].filter(ele => ele == true)?.length);
          } else if (getCenterSigninOutSettings.InCollectedTime !== 1) {
            keyItem = 9;
          }
        }
        break;
      case 'signature':
        if (getCenterSigninOutSettings.InSleepWell === 1 && getCenterSigninOutSettings.InBabyWakeTime === 1 && getCenterSigninOutSettings.InBabyFeed === 1 && getCenterSigninOutSettings.InBabyNappy === 1 && getCenterSigninOutSettings.InMood === 1 && getCenterSigninOutSettings.InMedication === 1 && getCenterSigninOutSettings.InCollectedBy === 1 && getCenterSigninOutSettings.InCollectedTime === 1) {
          keyItem = 1;
        } else {
          if (
            childAgeInMonth !== -1 &&
            childAgeInMonth > getChildAgeLimit?.BabyAgeLimit) {
            keyItem = 7 - [getCenterSigninOutSettings.InSleepWell === 1, getCenterSigninOutSettings.InMood === 1, getCenterSigninOutSettings.InMedication === 1, getCenterSigninOutSettings.InImportantInfo === 1, getCenterSigninOutSettings.InCollectedBy === 1, getCenterSigninOutSettings.InCollectedTime === 1].filter(ele => ele == true)?.length;
          } else if (getCenterSigninOutSettings.InSleepWell === 1 || getCenterSigninOutSettings.InBabyWakeTime === 1 || getCenterSigninOutSettings.InBabyFeed === 1 || getCenterSigninOutSettings.InBabyNappy === 1 || getCenterSigninOutSettings.InMood === 1 || getCenterSigninOutSettings.InMedication === 1 || getCenterSigninOutSettings.InImportantInfo === 1 || getCenterSigninOutSettings.InCollectedBy === 1 || getCenterSigninOutSettings.InCollectedTime === 1) {
            keyItem = 10 - ([getCenterSigninOutSettings.InSleepWell === 1, getCenterSigninOutSettings.InBabyWakeTime === 1, getCenterSigninOutSettings.InBabyFeed === 1, getCenterSigninOutSettings.InBabyNappy === 1, getCenterSigninOutSettings.InMood === 1, getCenterSigninOutSettings.InMedication === 1, getCenterSigninOutSettings.InImportantInfo === 1, getCenterSigninOutSettings.InCollectedBy === 1, getCenterSigninOutSettings.InCollectedTime === 1].filter(ele => ele == true)?.length);
          } else if (getCenterSigninOutSettings.InSignature !== 1) {
            keyItem = 10;
          }
        }
        break;
      default: break;
    }
    return keyItem;
  }

  const onSelectedItems = (type: any, item: any) => {
    setData({ ...formData, [type]: item?.notes });
    setActiveModal(false);
    scrollHandler(activeKey)
    if(type === "medication" && item?.notes !== ""){
      delete errors.medication;
    } else if(type==="notes" && item?.notes !== ""){
      delete errors.notes;
    }
}

  return (
    <DashboardLayout title={`Sign In ${child.FirstName}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.select({ ios: 44, android: keyboardStatus.height + 88 })}
        enabled>
        <ScrollView
          style={styles.contentContainer}
          nestedScrollEnabled
          bounces={false}
          keyboardShouldPersistTaps="handled"
          ref={ref => { setRef(ref as any) }}
        >
          <FullScreenLoader isVisible={isLoading} />
          {/* SLEEP QUALITY    */}

          {getCenterSigninOutSettings.InSleepWell !== 1 && (
            <>
              <FormControl
                isRequired={
                  getCenterSigninOutSettings.InSleepWell === 3 &&
                  childAgeInMonth !== -1 &&
                  childAgeInMonth < getChildAgeLimit?.BabyAgeLimit
                }
                isInvalid={"sleep" in errors}
                key={getKeyforForm("sleep")} //keys will be needed for function
                onLayout={(event: any) => {
                  const index = getKeyforForm("sleep");
                  const layout = event.nativeEvent.layout;
                  dataSourceCords[index] = layout.y; // we store this offset values in an array
                  setDataSourceCords(dataSourceCords);
                }}
              >
                <FormLabel
                  labeltext={"Did " + child.FirstName + " sleep well?"}
                  required={getCenterSigninOutSettings.InSleepWell === 3}
                />
                <CustomButtons
                  onPress={(value: any) => {
                    const index = getKeyforForm("sleep");
                    setData({ ...formData, sleep: value });
                    setActiveKey(index);
                    scrollHandler(index);
                    delete errors.sleep;
                  }}
                  state={formData?.sleep}
                  options={[{ label: "Yes", value: "good" }, { label: "No", value: "bad" }]}
                />

                {"sleep" in errors && (
                  <ErrorText
                    errorMessage={errors.sleep}
                  />
                )}
              </FormControl>
              <View style={styles.divider} />
            </>
          )}

          {/*  TIME WOKE UP   */}
          {getCenterSigninOutSettings.InBabyWakeTime !== 1 &&
            childAgeInMonth !== -1 &&
            childAgeInMonth <= getChildAgeLimit?.BabyAgeLimit && (
              <>
                <FormControl
                  isRequired={
                    getCenterSigninOutSettings.InBabyWakeTime === 3 &&
                    childAgeInMonth !== -1 &&
                    childAgeInMonth < getChildAgeLimit?.BabyAgeLimit
                  }
                  isInvalid={"wokeUp" in errors}
                  key={getKeyforForm("wokeUp")} //keys will be needed for function
                  onLayout={(event: any) => {
                    const index = getKeyforForm("wokeUp");
                    const layout = event.nativeEvent.layout;
                    dataSourceCords[index] = layout.y; // we store this offset values in an array
                    setDataSourceCords(dataSourceCords);
                  }}
                >
                  <FormLabel
                    labeltext={"What time did " + child.FirstName + " wake up?"}
                    required={getCenterSigninOutSettings.InBabyWakeTime === 3}
                  />

                  <ActionSheetSelect
                    accessibilityLabelText="Choose a time"
                    placeholderText="Choose a time"
                    formData={formData}
                    minutesarray={bottleminutesarray}
                    timearray={bottletimearray}
                    type="wokeUp"
                    setData={(data: any) => {
                      const index = getKeyforForm("wokeUp");
                      handleStateUpdate(data);
                      setActiveKey(index);
                      scrollHandler(index)
                      delete errors.wokeUp
                    }}
                    callBack={() => {
                      const index = getKeyforForm("wokeUp");
                      setActiveKey(index);
                      scrollHandler(index - 1);
                    }}
                    activeNode={20}
                  />

                  {"wokeUp" in errors && (
                    <ErrorText
                      errorMessage={errors.wokeUp}
                    />
                  )}
                </FormControl>
                <View style={styles.divider} />
              </>
            )}

          {/* TIME OF LAST BOTTLE */}
          {getCenterSigninOutSettings.InBabyFeed !== 1 &&
            childAgeInMonth !== -1 &&
            childAgeInMonth <= getChildAgeLimit?.BabyAgeLimit && (
              <>
                <FormControl
                  my="5"
                  isRequired={
                    getCenterSigninOutSettings.InBabyFeed === 3 &&
                    childAgeInMonth !== -1 &&
                    childAgeInMonth < getChildAgeLimit?.BabyAgeLimit
                  }
                  isInvalid={"bottle" in errors}
                  key={getKeyforForm("bottle")} //keys will be needed for function
                  onLayout={(event: any) => {
                    const index = getKeyforForm("bottle");
                    const layout = event.nativeEvent.layout;
                    dataSourceCords[index] = layout.y; // we store this offset values in an array
                    setDataSourceCords(dataSourceCords);
                  }}
                >
                  <FormLabel
                    labeltext={
                      "What time was " + child.FirstName + "'s last bottle?"
                    }
                    required={getCenterSigninOutSettings.InBabyFeed === 3}
                  />

                  <ActionSheetSelect
                    accessibilityLabelText="Choose a time"
                    placeholderText="Choose a time"
                    formData={formData}
                    type="bottle"
                    minutesarray={bottleminutesarray}
                    timearray={bottletimearray}
                    setData={(data: any) => {
                      const index = getKeyforForm("bottle");
                      handleStateUpdate(data);
                      setActiveKey(index);
                      scrollHandler(index);
                      delete errors.bottle
                    }}
                    callBack={() => {
                      const index = getKeyforForm("bottle");
                      setActiveKey(index);
                      scrollHandler(index - 1);
                    }}
                    activeNode={20}
                  />

                  {"bottle" in errors && (
                    <ErrorText
                      errorMessage={errors.bottle}
                    />
                  )}
                </FormControl>
                <View style={styles.divider} />
              </>
            )}
          {/* TIME OF LAST NAPPY */}
          {getCenterSigninOutSettings.InBabyNappy !== 1 &&
            childAgeInMonth !== -1 &&
            childAgeInMonth <= getChildAgeLimit?.BabyAgeLimit && (
              <>
                <FormControl
                  key={getKeyforForm("nappy")} //keys will be needed for function
                  onLayout={(event: any) => {
                    const index = getKeyforForm("nappy");
                    const layout = event.nativeEvent.layout;
                    dataSourceCords[index] = layout.y; // we store this offset values in an array
                    setDataSourceCords(dataSourceCords);
                  }}
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
                      "What time was " +
                      child.FirstName +
                      "'s last nappy change?"
                    }
                    required={getCenterSigninOutSettings.InBabyNappy === 3}
                  />

                  <ActionSheetSelect
                    accessibilityLabelText="Choose a time"
                    placeholderText="Choose a time"
                    formData={formData}
                    type="nappy"
                    minutesarray={bottleminutesarray}
                    timearray={bottletimearray}
                    setData={(data: any) => {
                      const index = getKeyforForm("nappy");
                      handleStateUpdate(data);
                      setActiveKey(index);
                      scrollHandler(index);
                      delete errors.nappy
                    }}
                    callBack={() => {
                      const index = getKeyforForm("nappy");
                      setActiveKey(index);
                      scrollHandler(index - 1);
                    }}
                    activeNode={20}
                  />

                  {"nappy" in errors && (
                    <ErrorText
                      errorMessage={errors.nappy}
                    />
                  )}
                </FormControl>
                <View style={styles.divider} />
              </>
            )}

          {/* MOOD   */}
          {getCenterSigninOutSettings.InMood !== 1 && (
            <>
              <FormControl
                key={getKeyforForm("mood")} //keys will be needed for function
                onLayout={(event: any) => {
                  const layout = event.nativeEvent.layout;
                  const index = getKeyforForm("mood");
                  dataSourceCords[index] = layout.y; // we store this offset values in an array
                  setDataSourceCords(dataSourceCords);
                }}
                my="5"
                isRequired={getCenterSigninOutSettings.InMood === 3}
                isInvalid={"mood" in errors}
              >
                <FormLabel
                  labeltext={"How is " + child.FirstName + " feeling?"}
                  required={getCenterSigninOutSettings.InMood === 3}
                />

                <View style={styles.emojicontainer}>
                  {MOODS.map((ele, index) => (
                    <Pressable
                      key={index}
                      style={[styles.emoji,
                      {
                        borderTopLeftRadius: index === 0 ? 4 : 0,
                        borderBottomLeftRadius: index === 0 ? 4 : 0,
                        borderTopRightRadius: index === 3 ? 4 : 0,
                        borderBottomRightRadius: index === 3 ? 4 : 0,
                        borderColor: formData?.mood === ele ? theme?.colors?.primary[650] : theme?.colors?.blueGray[200],
                        borderWidth: formData?.mood === ele ? 2 : 1,
                        borderLeftWidth: formData?.mood === ele ? 2 : (MOODS.findIndex(item => item === formData?.mood) > -1 && index == MOODS.findIndex(item => item === formData?.mood) + 1 ? 0 : 1),
                        borderRightWidth: formData?.mood === ele ? 2 : index === 3 ? 1 : 0,
                        ...(formData?.mood === ele && { backgroundColor: theme?.colors?.primary[50] }),
                      }]}
                      onPress={() => {
                        const index = getKeyforForm("mood");
                        setActiveKey(index);
                        scrollHandler(index);
                        setData({ ...formData, mood: ele });
                      }}
                      hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }}
                    >
                      {getIconFromList(ele, formData?.mood) ? (
                        <Icons
                          iconName={getIconFromList(ele, formData?.mood)}
                          height={34}
                          width={34}
                        />
                      ) : null}
                    </Pressable>
                  ))}
                </View>
                {"mood" in errors && (
                  <ErrorText
                    errorMessage={errors.mood}
                  />
                )}
              </FormControl>
              <View style={styles.divider} />
            </>
          )}

          {/* MEDICAL INFORMATION   */}
          {getCenterSigninOutSettings.InMedication !== 1 && (
            <>
              <FormControl
                key={getKeyforForm("medication")} //keys will be needed for function
                onLayout={(event: any) => {
                  const layout = event.nativeEvent.layout;
                  const index = getKeyforForm("medication");
                  dataSourceCords[index] = layout.y; // we store this offset values in an array
                  setDataSourceCords(dataSourceCords);
                }}
                my="5"
                isRequired={getCenterSigninOutSettings.InMedication === 3}
                isInvalid={"medication" in errors}
              >
                <FormLabel labeltext={"Any Medical notes?"} required={getCenterSigninOutSettings.InMedication === 3}/>

                <TextAreaField
                  formData={formData}
                  type="medication"
                  setData={(data: any) => {
                    handleStateUpdate(data);
                    setData({ ...formData, medication: data })
                    const index = getKeyforForm("medication");
                    setActiveKey(index);
                    delete errors.medication
                  }}
                  onFocus={() => {
                    const index = getKeyforForm("medication");
                    setActiveKey(index);
                    scrollHandler(index - 1)
                  }}
                  showIcon={true}
                  inputHeight={44}
                  customStyle={{
                    numberOfLines: 1,
                    textInput: {
                      color: theme?.colors?.primary[675]
                    }
                  }}
                  onPressIcon={() => {
                    const index = getKeyforForm("medication");
                    setActiveKey(index);
                    scrollHandler(index - 1);
                    handleSelectNotes('medication')
                  }}
                  nativeIDName={"Done"}
                  nativeButtonClick={handleKeyboard}
                />
                {"medication" in errors && (
                  <ErrorText
                    errorMessage={errors.medication}
                  />
                )}
              </FormControl>
              <View style={styles.divider} />
            </>
          )}

          {/* NOTES value={formData.notes} */}
          {getCenterSigninOutSettings.InImportantInfo !== 1 && (
            <>
              <FormControl
                key={getKeyforForm("notes")} //keys will be needed for function
                onLayout={(event: any) => {
                  const layout = event.nativeEvent.layout;
                  const index = getKeyforForm("notes");
                  dataSourceCords[index] = layout.y; // we store this offset values in an array
                  setDataSourceCords(dataSourceCords);
                }}
                my="5"
                isRequired={getCenterSigninOutSettings.InImportantInfo === 3}
                isInvalid={"notes" in errors}
              >
                <FormLabel labeltext={"Any General comments?"} required={getCenterSigninOutSettings.InImportantInfo === 3} />

                <TextAreaField
                  formData={formData}
                  type="notes"
                  setData={(data: any) => {
                    const index = getKeyforForm("notes");
                    setActiveKey(index);
                    handleStateUpdate(data);
                    setData({ ...formData, notes: data })
                    delete errors.notes
                  }}
                  inputHeight={44}
                  showIcon={true}
                  customStyle={{
                    numberOfLines: 1,
                    textInput: {
                      color: theme?.colors?.primary[675]
                    }
                  }}
                  onFocus={() => {
                    const index = getKeyforForm("notes");
                    setActiveKey(index);
                    scrollHandler(index - 1)
                  }}
                  onPressIcon={() => {
                    const index = getKeyforForm("notes");
                    setActiveKey(index);
                    scrollHandler(index - 1);
                    handleSelectNotes('notes')
                  }}
                  nativeIDName={"Done"}
                  nativeButtonClick={handleKeyboard}
                />
                {"notes" in errors && (
                  <ErrorText
                    errorMessage={errors.notes}
                  />
                )}
              </FormControl>
              <View style={styles.divider} />
            </>
          )}

          {/* WHO IS COLLECTING   */}
          {getCenterSigninOutSettings.InCollectedBy !== 1 && (
            <>
              <FormControl
                key={getKeyforForm("collectionByWho")} //keys will be needed for function
                onLayout={(event: any) => {
                  const layout = event.nativeEvent.layout;
                  const index = getKeyforForm("collectionByWho");
                  dataSourceCords[index] = layout.y; // we store this offset values in an array
                  setDataSourceCords(dataSourceCords);
                }}
                isRequired={getCenterSigninOutSettings.InCollectedBy === 3}
                isInvalid={"collectionByWho" in errors}
              >
                <View style={otherCollector && { marginBottom: 20 }}>
                  <FormLabel
                    labeltext={"Who is Collecting  " + child.FirstName + "?"}
                    required={getCenterSigninOutSettings.InCollectedBy === 3}
                     />

                  <CustomVStackButtons
                    data={[...(collectionByWho || []).map((ele) => ({ label: ele?.name, value: ele?.name })), { label: "Other", value: "other" }]}
                    state={formData?.collectionByWho}
                    onPress={(key: number, value: any) => {
                      Keyboard.dismiss();
                      setData({ ...formData, collectionByWho: value });
                      const index = getKeyforForm("collectionByWho");
                      setActiveKey(index);
                      if (value === "other") {
                        scrollHandler(index - 1)
                        setOtherCollector(true)
                      } else {
                        scrollHandler(index);
                        setOtherCollector(false);
                      }
                      delete errors.collectionByWho;
                    }} />

                  {/* <RadioGroup
                name="Choose Collector"
                options={[...(collectionByWho || []).map((ele) => ({ label: ele?.name, value: ele?.name })), { label: "Other", value: "other" }]}
                onChange={(value: any) => {
                  console.log(value, '--- value');
                  setData({ ...formData, collectionByWho: value });
                  value === "other" ? setOtherCollector(true) : setOtherCollector(false);
                  delete errors.collectionByWho;
                }}
                selected={formData?.collectionByWho}
                radioControlStyle={styles.radioControl}
                isInvalid={"collectionByWho" in errors}
              /> */}
                  {"collectionByWho" in errors && (
                    <ErrorText
                      errorMessage={errors.collectionByWho}
                    />
                  )}
                </View>
                {/* If other is selected in collectingByWho.... new form field opens up   */}
                {otherCollector && (<View>
                  <FormLabel
                    labeltext={"NAME OF PERSON COLLECTING"}
                    customStyle={{
                      labelText: {
                        fontSize: AppFontSizes.FONT_SIZE_10
                      }
                    }}
                  />

                  <FormInputText
                    placeholder=""
                    onChangeText={(value: any) => {
                      const index = getKeyforForm("collectionByWho");
                      setActiveKey(index);
                      setData((newState) => ({
                        ...newState,
                        otherCollector: value,
                      }));
                      delete errors.otherCollector;
                    }}
                    onFocus={() => {
                      const index = getKeyforForm("collectionByWho");
                      setActiveKey(index);
                      scrollHandler(index - 1)
                    }}
                    nativeIDName={"Done"}
                    nativeButtonClick={handleKeyboard}
                  />
                  {"otherCollector" in errors && (
                    <ErrorText
                      errorMessage={errors.otherCollector}
                    />
                  )}
                </View>)}
              </FormControl>

              <View style={styles.divider} />
            </>
          )}

          {/* COLLECTION TIME   */}
          {getCenterSigninOutSettings.InCollectedTime !== 1 && (
            <>
              <FormControl
                key={getKeyforForm("collectionTime")}
                onLayout={(event: any) => {
                  const layout = event.nativeEvent.layout;
                  const index = getKeyforForm("collectionTime");
                  dataSourceCords[index] = layout.y; // we store this offset values in an array
                  setDataSourceCords(dataSourceCords);
                }}
                my="5"
                isRequired={getCenterSigninOutSettings.InCollectedTime === 3}
                isInvalid={"collectionTime" in errors}
              >
                <FormLabel labeltext={"Planned collection time"} required={getCenterSigninOutSettings.InCollectedTime === 3} />

                <ActionSheetSelect
                  accessibilityLabelText="Choose a time"
                  placeholderText="Choose a time"
                  type="collectionTime"
                  formData={formData}
                  minutesarray={collectionsminutesarray}
                  timearray={collectionstimearray}
                  fullArray={generateCollectionTimeArray()}
                  setData={(data: any) => {
                    handleStateUpdate(data);
                    const index = getKeyforForm("collectionTime");
                    scrollHandler(index);
                    delete errors.collectionTime
                  }}
                  callBack={() => {
                    const index = getKeyforForm("collectionTime");
                    setActiveKey(index);
                    scrollHandler(index - 1);
                  }}
                  setKeyboardStatus={setKeyboardStatus}
                  activeNode={0}
                />

                {"collectionTime" in errors && (
                  <ErrorText
                    errorMessage={errors.collectionTime}
                  />
                )}
              </FormControl>
              <View style={styles.divider} />
            </>
          )}

          {/* SIGNATURE CAPTURE */}
          {getCenterSigninOutSettings.InSignature !== 1 && (
            <FormControl
              key={getKeyforForm("signature")}
              my="5"
              isRequired={getCenterSigninOutSettings.InSignature === 3}
              isInvalid={"signature" in errors}
              onLayout={(event: any) => {
                const layout = event.nativeEvent.layout;
                const index = getKeyforForm("signature");
                dataSourceCords[index] = layout.y; // we store this offset values in an array
                setDataSourceCords(dataSourceCords);
              }}
            >
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <FormLabel labeltext={"Please sign below"} required={getCenterSigninOutSettings.InSignature === 3} />
                <TouchableOpacity onPress={() => onClearButtonClicked()}>
                  <FormLabel labeltext="Clear" customStyle={{
                    labelText: {
                      color: theme?.colors?.blueGray[500],
                      marginBottom: 4
                    }
                  }} />
                  <View style={{ height: 1, backgroundColor: theme?.colors?.blueGray[500], marginTop: Platform.select({ ios: -4, android: -7 }) }} />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  borderWidth: "signature" in errors ? 2 : 1,
                  borderColor: "signature" in errors ? "#FF0000" : theme?.colors?.borderColor,
                  borderRadius: 4,
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
                <ErrorText
                  errorMessage={errors.signature}
                />
              )}
              {/* <FormButton
                varianttype="subtle"
                text="Save"
                onchange={getSignatureImageEncodedValue}
              /> */}
              {/* <FormButton
              varianttype="subtle"
              text="Clear"
              onchange={onClearButtonClicked}
            /> */}
            </FormControl>
          )}

          {/* FORM SUBMIT BUTTON */}

          {/* <View style={{height: keyboardStatus.height, width: 100}} /> */}
          <SubmitButton
            submit={submit}
            text="SIGN IN"
            onchange={isSignature ? getSignatureImageEncodedValue : onSubmit}
            buttonStyle={{ marginBottom: 80 }}
          />


          {invalidForm && (
            <Text style={styles.inValidColor}>
              Form not filled out correctly
            </Text>
          )}
          {activeModal && <SelectMedicalorGeneralNotes
            type={ActiveNotesType}
            placeholderText={ActiveNotesType === 'medication' ? "Medical" : "General"}
            setState={setData}
            data={ActiveNotesType === 'medication' ? getMedicalorGeneralNotesList?.data?.medical : getMedicalorGeneralNotesList?.data?.general}
            state={formData}
            onSelectedItems={onSelectedItems}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            callback={() => {
              scrollHandler(activeKey)
            }}
          />}
        </ScrollView>
        {
          keyboardStatus?.status && Platform.OS === 'android' && <TouchableOpacity style={styles.customButton} onPress={() => handleKeyboard()}>
            <View>
              <FormLabel labeltext="Done" customStyle={{
                labelText: {
                  color: theme?.colors?.blueGray[500],
                  marginBottom: 0
                }
              }} />
              <View style={{ height: 1, backgroundColor: theme?.colors?.blueGray[500], marginTop: -7 }} />
            </View>
          </TouchableOpacity>
        }
      </KeyboardAvoidingView>
    </DashboardLayout>
  );
};

const style = (theme: any) => StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  radioControl: {
    display: 'flex',
    flexDirection: 'column',
  },
  helperText: {
    fontFamily: AppTypography.Poppins[400].normal,
    fontSize: AppFontSizes.FONT_SIZE_10,
    lineHeight: 18,
    color: theme?.colors?.iconColor,
    marginTop: 5
  },
  inputStyle: {
    justifyContent: 'center',
    textAlignVertical: "center",
    borderColor: theme?.colors?.borderColor,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: theme?.colors?.muted[900],
    fontFamily: AppTypography.Poppins[400].normal,
    fontSize: AppFontSizes.FONT_SIZE_13,
  },
  inValidColor: {
    fontFamily: AppTypography.Poppins[400].normal,
    fontSize: AppFontSizes.FONT_SIZE_10,
    lineHeight: 18,
    color: theme?.colors?.errorColor
  },
  emojicontainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 58,
    width: "50%",
    justifyContent: 'space-between',
  },
  emoji: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  divider: {
    borderWidth: 1,
    borderColor: theme?.colors?.blueGray[100],
    marginBottom: 20
  },
  customButton: {
    height: 54,
    backgroundColor: theme?.colors?.commonWhite,
    paddingHorizontal: 16,
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: theme?.colors?.blueGray[300]
  }
})

export default React.memo(SignIn, (prevprops, nextprops) => {
  return true;
});
