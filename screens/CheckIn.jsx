// import React from "react";
// import { useRef, useEffect, useState, useCallback } from "react";
// import {
//   Box,
//   HStack,
//   Icon,
//   Text,
//   VStack,
//   Avatar,
//   Image,
//   Pressable,
//   useColorMode,
//   Switch,
//   Center,
//   Badge,
//   Modal,
//   Button,
//   Divider,
//   ScrollView,
//   FormControl,
//   Input,
//   Checkbox,
//   RadioGroup,
//   Radio,
//   TextArea,
//   Select,
// } from "native-base";
// import { Ionicons, Entypo } from "@expo/vector-icons";
// import DashboardLayout from "./commoncomponents/DashboardLayout";
// import { SignatureView } from "react-native-signature-capture-view";

// import * as MailComposer from "expo-mail-composer";

// import { useDispatch, useSelector } from "react-redux";
// import { AsyncStorage } from "react-native";



// // Actions
// import {
//   childSignInLog,
//   childSignInStatusList,
//   childMarkAsAbsent,
// } from "../store/auth";

// import {
//   getCentreSignInOutSettings,
//   getChildAgeLimit
// } from "../store/center";

// import { FullScreenLoader } from "./commoncomponents/FullScreenLoader";
// import { getChildAgeinMonths, convert12to24hrs, convertDateformat } from "../utils/date";
// import Icons from "../utils/icons";
// import { isEmpty } from "lodash";
// import { getParent, getAllChildSignInStatus } from '../sql_lite'

// const getCurrentDate = () => {

//   var date = new Date().getDate();
//   var month = new Date().getMonth() + 1;
//   var year = new Date().getFullYear();
//   var hours = new Date().getHours();
//   var min = new Date().getMinutes();
//   var sec = new Date().getSeconds();

//   //Alert.alert(date + '-' + month + '-' + year);
//   // You can turn it in to your desired format
//   return year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sec; //format: dd-mm-yyyy;

// };

// // Data in formFields required: if required is true disabled cannot be true
// // const formFieldsRequired = {
// //   signIn: {
// //     sleep: {
// //       required: false,
// //       disabled: false,
// //     },
// //     wokeUp: {
// //       required: false,
// //       disabled: false,
// //     },
// //     bottle: {
// //       required: false,
// //       disabled: false,
// //     },
// //     mood: {
// //       required: false,
// //       disabled: false,
// //     },
// //     medication: {
// //       required: false,
// //       disabled: false,
// //     },
// //     notes: {
// //       required: false,
// //       disabled: false,
// //     },
// //     collectionByWho: {
// //       required: false,
// //       disabled: false,
// //     },
// //     collectionTime: {
// //       required: false,
// //       disabled: false,
// //     },
// //     signature: {
// //       required: true,
// //       disabled: false,
// //     },
// //   },
// //   signOut: {
// //     signature: {
// //       required: true,
// //       disabled: false,
// //     },
// //     time: {
// //       required: true,
// //       disabled: false,
// //     },
// //   },
// //   markAbsent: {
// //     isSick: {
// //       required: true,
// //       disabled: false,
// //     },
// //     illness: {
// //       required: true,
// //       disabled: false,
// //     },
// //     details: {
// //       required: true,
// //       disabled: false,
// //     },
// //     estimatedAbsence: {
// //       required: true,
// //       disabled: false,
// //     },
// //   },
// // };

// const childListNew = [];

// const collectionByWho = [
//   {
//     ParentID: "Mum",
//     name: "Mum",
//   },
//   {
//     ParentID: "Dad",
//     name: "Dad",
//   },
//   {
//     ParentID: "Grandma",
//     name: "Grandma",
//   },
// ];


// function ChildStatusBox({ child, handleChildSignInStatusCall }) {
  
//   const [status, setStatus] = useState(child.SignInStatus);
//   const [statusDropdown, setStatusDropdown] = useState(false);
//   const [formDropdown, setFormDropdown] = useState(false);
//   const [form, setForm] = useState("");
//   const userData = useSelector((state) => state.activeUser);
//   var statusLabel = "";

//   if (child.IsAbsent) {
//     statusLabel = "Marked Absent";
//   } else if (child.SignInStatus === "Not yet signed in") {
//     statusLabel = "Not yet signed in";
//   } else if (child.SignInStatus === "Signed out") {
//     statusLabel = "Signed out";
//   } else {
//     statusLabel = "Signed in";
//   }

//   // child.SignInStatus === "Not yet signed in" ? "Signed out" : "Signed in";
//   const prevStatusDetails = `${child.FirstName} was ${child.SignInStatus === "Not yet signed in" ? "Signed out" : child.SignInStatus} at ${child.LastAttendenceDate}`;
  
//   return (
//     <>
//       <Pressable
//         onPress={() => {
//           setStatusDropdown(!statusDropdown);
//           console.log("ChildStatusBox clicked");
//         }}
//       >
//         <Box
//           px="4"
//           borderWidth="1"
//           borderColor="coolGray.300"
//           shadow="3"
//           bg="coolGray.100"
//           rounded="8"
//           my="1"
//         >
//           <FullScreenLoader isVisible={userData.isLoading} />
//           <HStack justifyContent="space-between" my="4">
//             <HStack space="2" alignItems="center">
//               <Avatar source={{ uri: child.ImagePath }}></Avatar>
//               <VStack>
//                 <Text
//                   fontWeight="medium"
//                   fontSize="md"
//                   _light={{ color: "coolGray.800" }}
//                   _dark={{ color: "coolGray.50" }}
//                 >
//                   {child.FirstName} {child.LastName}
//                 </Text>
//               </VStack>
//             </HStack>
//             <Center>
//               <Badge
//                 padding="1"
//                 borderRadius="10"
//                 colorScheme={
//                   statusLabel === "Signed in"
//                     ? "success"
//                     : statusLabel === "Not yet signed in"
//                       ? "danger"
//                       : "info"
//                 }
//                 variant="subtle"
//                 minWidth="120"
//               >
//                 {statusLabel}
//               </Badge>
//             </Center>
//           </HStack>
//           {statusDropdown && (
//             <VStack mb="4" space="2">

//               <Text>{prevStatusDetails}</Text>
//               {statusLabel === "Signed in" ? (
//                 <Button
//                   variant="primary"
//                   size="sm"
//                   onPress={() => {
//                     setStatusDropdown(false);
//                     setFormDropdown(true);
//                     setForm("Sign Out");
//                     console.log("child >>> set as SignOut" + statusLabel);
//                   }}
//                 >
//                   Sign Out
//                 </Button>
//               ) : statusLabel === "Not yet signed in" || statusLabel === "Signed out" ? (
//                 <HStack space="2">
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     flex={1}
//                     onPress={() => {
//                       setStatusDropdown(false);
//                       setFormDropdown(true);
//                       setForm("Sign In");
//                       console.log("child >>> set as Sign In" + statusLabel);
//                     }}
//                   >
//                     Sign In
//                   </Button>
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     flex={1}
//                     onPress={() => {
//                       setStatusDropdown(false);
//                       setFormDropdown(true);
//                       setForm("Mark Absent");
//                       console.log("child >>> set Mark Absent" + statusLabel);
//                     }}
//                   >
//                     Mark Absent
//                   </Button>
//                 </HStack>
//               ) : (
//                 <Button
//                   variant="primary"
//                   size="sm"
//                   onPress={() => {
//                     setStatusDropdown(false);
//                     setFormDropdown(true);
//                     setForm("Sign In");
//                     console.log("child >>> set Sign In" + statusLabel);
//                   }}
//                 >
//                   Sign In
//                 </Button>
//               )}
//             </VStack>
//           )}
//         </Box>
//       </Pressable>
//       {formDropdown && (
//         <FormBox
//           form={form}
//           child={child}
//           setFormDropdown={setFormDropdown}
//           setStatus={setStatus}
//           handleChildSignInStatusCall={handleChildSignInStatusCall}
//         />
//       )}
//     </>
//   );
// }

// function FormBox({form,child,setFormDropdown,setStatus,handleChildSignInStatusCall,}) {

//   return (
    
//     <Box borderWidth="1" borderColor="primary.200" p="4">
//       <HStack justifyContent="space-between" alignItems="center">
//         <Text fontSize="lg">
//           {form.split(" ")[0] +
//             " " +
//             child.FirstName +
//             " " +
//             form.split(" ")[1]}
//         </Text>
//         <Button
//           variant="subtle"
//           size="sm"
//           onPress={() => setFormDropdown(false)}>
//           {" "}
//           Cancel{" "}
//         </Button>
//       </HStack>
//       {form === "Sign In" ? (
//         <SignInForm
//           child={child}
//           setFormDropdown={setFormDropdown}
//           setStatus={setStatus}
//           handleChildSignInStatusCall={handleChildSignInStatusCall}
//         />
//       ) : form === "Sign Out" ? (
//         <SignOutForm
//           child={child}
//           setFormDropdown={setFormDropdown}
//           setStatus={setStatus}
//           handleChildSignInStatusCall={handleChildSignInStatusCall}
//         />
//       ) : (
//         <MarkAbsentForm
//           child={child}
//           setFormDropdown={setFormDropdown}
//           setStatus={setStatus}
//           handleChildSignInStatusCall={handleChildSignInStatusCall}
//         />
//       )}
//     </Box>
//   );
// }

// function SignInForm({
//   child,
//   setFormDropdown,
//   setStatus,
//   handleChildSignInStatusCall,
// }) {
//   var sleepWell_temp = "";
//   var mood_temp = "";
//   var collectionByWho_temp = "";
//   var collectionTime_temp = "";
//   var wokeUp_temp = "";
//   var bottle_temp = "";
//   var medication_temp = "";
//   var notes_temp = "";
//   var otherCollector_temp = "";

//   const mood = ["Happy", "Calm", "Sad", "Sleepy"];

//   const [formData, setData] = useState({

//     sleep: "",
//     wokeUp: "",
//     bottle: "",
//     mood: "Happy",
//     // medication: child.medication,
//     // notes: child.notes,
//     medication: "",
//     notes: "",
//     collectionByWho: "",
//     otherCollector: "",
//     collectionTime: "5:00 pm",
//     signature: "",

//   });

//   const [errors, setErrors] = useState({});
//   const [otherCollector, setOtherCollector] = useState(false);
//   const [submit, setSubmit] = useState(false);
//   const [invalidForm, setInvalidForm] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const signatureRef = useRef(null);
//   //const formFields = formFieldsRequired.signIn;

//   const dispatch = useDispatch();
//   const isLoading = useSelector((state) => state.activeUser.isLoading);
//   const getCenterSigninOutSettings = useSelector((state) => state.center.getCenterSigninOutSettings);
//   const getChildAgeLimit = useSelector((state) => state.center.getChildAgeLimit);
//   const childInfo = (userData?.lstChild || []).find(ele => ele.ChildID === child?.ChildID);
//   const childAgeInMonth = getChildAgeinMonths(childInfo?.BirthDate);

//   useEffect(() => {
//     getUserData();
//   }, [])

//   const getUserData = async () => {
//     if (!userData) {
//       const user = await AsyncStorage.getItem("user");
//       const parseUser = JSON.parse(user);
//       setUserData(parseUser?.Data);
//     }
//   }

//   const handleChildLogin = (data, callback) =>
//     dispatch(childSignInLog(data, callback));
//   const handleNavigation = () => {
//     // navigation.navigate("OtpVerification");
//   };



//   const validate = () => {
//     let valid = true;

//     // if (formFields.sleep.required) {
//     //   if (!formData.sleep.trim()) {
//     //     errors.sleep = "Please specify sleep quality";
//     //     valid = false;
//     //   } else delete errors.sleep;
//     // }

// console.log("validate " , getCenterSigninOutSettings.InBabyWakeTime +" childAgeInMonth " ,childAgeInMonth +" getChildAgeLimit " , getChildAgeLimit?.BabyAgeLimit)

//     if (getCenterSigninOutSettings.InBabyWakeTime === 3 && childAgeInMonth !== -1 && childAgeInMonth < getChildAgeLimit?.BabyAgeLimit) {
//       if (!formData.wokeUp.trim()) {
//         errors.wokeUp = "Please select a time";
//         valid = false;
//       } else delete errors.wokeUp;
//     }

//     if (getCenterSigninOutSettings.InBabyWakeTime === 3 && childAgeInMonth !== -1 && childAgeInMonth < getChildAgeLimit?.BabyAgeLimit) {
//       if (!formData.bottle.trim()) {
//         errors.bottle = "Please select a time";
//         valid = false;
//       } else delete errors.bottle;
//     }

//     if (getCenterSigninOutSettings.InMood === 3) {
//       if (!formData.mood.trim()) {
//         errors.mood = "Please choose a mood";
//         valid = false;
//       } else delete errors.mood;
//     }

//     if (getCenterSigninOutSettings.InMedication === 3) {
//       if (!formData.medication.trim()) {
//         errors.medication =
//           'Please enter medical notes, or "No Notes for today"';
//         valid = false;
//       } else if (formData.medication.length > 500) {
//         errors.medication = "Maximum character count of 500, please enter less";
//         valid = false;
//       } else delete errors.medication;
//     } else {
//       if (formData.medication.length > 500) {
//         errors.medication = "Maximum character count of 500, please enter less";
//         valid = false;
//       } else delete errors.medication;
//     }

//     if (getCenterSigninOutSettings.InImportantInfo === 3) {
//       if (!formData.notes.trim()) {
//         errors.notes =
//           'Please enter important information, or "No Notes for today"';
//         valid = false;
//       } else if (formData.notes.length > 250) {
//         errors.notes = "Maximum character count of 250, please enter less";
//         valid = false;
//       } else delete errors.notes;
//     } else {
//       if (formData.notes.length > 250) {
//         errors.notes = "Maximum character count of 250, please enter less";
//         valid = false;
//       } else delete errors.notes;
//     }

//     if (getCenterSigninOutSettings.InCollectedBy === 3) {
//       if (!formData.collectionByWho.trim()) {
//         errors.collectionByWho = "Please select who will be collecting";
//         valid = false;
//       } else delete errors.collectionByWho;

//       if (formData.collectingByWho === "other") {
//         if (!formData.otherCollector.trim()) {
//           errors.otherCollector = "Please specify who will be collecting";
//           valid = false;
//         } else delete errors.otherCollector;
//       }
//     }

//     if (getCenterSigninOutSettings.InCollectedTime === 3) {
//       if (!formData.collectionTime.trim()) {
//         errors.collectionTime = "Please select a time";
//         valid = false;
//       } else delete errors.collectionTime;
//     }
//     //Weird bug has meant that in this form you have to check the opposite condition for is the signature required.
//     // Hence the !formData.signature.required when this you would expect formData.signature.required as in the other forms
//     if (getCenterSigninOutSettings.InSignature === 3) {
//       if (formData.signature === "") {
//         errors.signature = "Please save your signature";
//         valid = false;
//       } else delete errors.signature;
//     }
//     setErrors({ ...errors });

//     return valid;
//   };

//   const onSubmit = () => {
//     if (validate()) {
//       setErrors({});
//       setInvalidForm(false);
//       setSubmit(true);
//       console.log("childSignIn >> 502" + formData);
//       handleSignInClick();
//       setTimeout(function () {
//         setSubmit(false);
//         setFormDropdown(false);
//         setStatus("Signed In");
//       }, 2000);
//     } else {
//       setInvalidForm(true);
//     }
//   };

//   const handleSignInClick = async () => {
//     const slugSignature = formData.signature.substring(
//       formData.signature.indexOf(",") + 1
//     );
//     const handleNavigation = (data) => {
//       console.log("Child Signed In Successully");
//       //  refreshPage();
//       handleChildSignInStatusCall();
//     };
//     handleChildLogin(
//       {
//         AuthorizedToken: "",
//         Id: "null",
//         SignType: "SignIN",
//         ParentID: child.ParentID,
//         ChildID: child.ChildID,
//         SignDate: getCurrentDate(),
//         SignatureImage: slugSignature,
//         SleepWell: formData.sleep,
//         Mood: formData.mood,
//         CollectingByWho: formData.collectionByWho === 'other' ? formData.otherCollector : formData.collectionByWho,
//         TimeOfCollection: convert12to24hrs(formData.collectionTime),
//         TimeOfWokeUp: convert12to24hrs(formData.wokeUp),
//         TimeOfLastBottle: convert12to24hrs(formData.bottle),
//         Medication: formData.medication,
//         ImportantInformation: formData.notes,
//         SignOutParentID: null,
//       },
//       handleNavigation
//     );
//   };

//   const getIconFromList = (iconName, moodValue) => {

//     let icon = "";
//     if (iconName === "Happy") {
//       icon = moodValue === "Happy" ? "HAPPY_CHECKED" : "HAPPY"
//     } else if (iconName === "Calm") {
//       icon = moodValue === "Calm" ? "CALM_CHECKED" : "CALM"
//     } else if (iconName === "Sad") {
//       icon = moodValue === "Sad" ? "SAD_CHECKED" : "SAD"
//     } else if (iconName === "Sleepy") {
//       icon = moodValue === "Sleepy" ? "SLEEPY_CHECKED" : "SLEEPY"
//     }
//     return icon
//   }

//   return (
//     <Box>
//       <FullScreenLoader isVisible={isLoading} />
//       {/* SLEEP QUALITY    */}
//       {getCenterSigninOutSettings.InSleepWell !== 1 && (
//         <FormControl
//           my="5"
//           isRequired={false}
//           isInvalid={"sleep" in errors}
//         >
//           <FormControl.Label
//             _text={{
//               bold: true,
//             }}
//           >
//             {" "}
//             Did {child.FirstName} sleep well?
//           </FormControl.Label>
//           <Radio.Group
//             name="sleep"
//             accessibilityLabel="Did your child sleep well?"
//             onChange={(value) => {
//               setData({ ...formData, sleep: value });
//               sleepWell_temp = value;
//               console.log("loginFormCheck sleep >>>> " + sleepWell_temp);
//             }}
//           >
//             <HStack space="10">
//               <Radio value="good">Yes</Radio>
//               <Radio value="bad">No</Radio>
//             </HStack>
//           </Radio.Group>
//           {"sleep" in errors && (
//             <FormControl.ErrorMessage>{errors.sleep}</FormControl.ErrorMessage>
//           )}
//         </FormControl>
//       )}

//       {/*  TIME WOKE UP   */}
//       {getCenterSigninOutSettings.InBabyWakeTime !== 1 && childAgeInMonth !== -1 && childAgeInMonth <= getChildAgeLimit?.BabyAgeLimit && (
//         <FormControl
//           my="5"
//           isRequired={getCenterSigninOutSettings.InBabyWakeTime === 3 && childAgeInMonth !== -1 && childAgeInMonth < getChildAgeLimit?.BabyAgeLimit}
//           isInvalid={"wokeUp" in errors}
//         >
//           <FormControl.Label
//             _text={{
//               bold: true,
//             }}
//           >
//             What time did {child.FirstName} wake up?
//           </FormControl.Label>
//           <Select
//             accessibilityLabel="Choose a time"
//             placeholder="Choose a time"
//             _selectedItem={{ bg: "secondary.300" }}
//             mt="1"
//             _actionSheetContent={{
//               height: "400",
//             }}
//             onValueChange={(value) => {
//               setData({ ...formData, wokeUp: value });
//               console.log("loginFormCheck sleep >>>> " + value);
//               wokeUp_temp = value;
//             }}
//           >
//             {["3:", "4:", "5:", "6:", "7:", "8:", "9:"].map(
//               (hour, hourIndex) => {
//                 return ["00 am", "15 am", "30 am", "45 am"].map(
//                   (min, minIndex) => {
//                     return (
//                       <Select.Item
//                         key={hourIndex * 10 + minIndex}
//                         label={hour + min}
//                         value={hour + min}
//                         justifyContent="center"
//                       />
//                     );
//                   }
//                 );
//               }
//             )}
//           </Select>
//           {"wokeUp" in errors && (
//             <FormControl.ErrorMessage>{errors.wokeUp}</FormControl.ErrorMessage>
//           )}
//         </FormControl>
//       )}

//       {/* TIME OF LAST BOTTLE */}
//       {getCenterSigninOutSettings.InBabyFeed !== 1 && childAgeInMonth !== -1 && childAgeInMonth <= getChildAgeLimit?.BabyAgeLimit && (
//         <FormControl
//           my="5"
//           isRequired={getCenterSigninOutSettings.InBabyWakeTime === 3 && childAgeInMonth !== -1 && childAgeInMonth < getChildAgeLimit?.BabyAgeLimit}
//           isInvalid={"bottle" in errors}
//         >
//           <FormControl.Label
//             _text={{
//               bold: true,
//             }}
//           >
//             What time was {child.FirstName}'s last bottle?
//           </FormControl.Label>
//           <Select
//             accessibilityLabel="Choose a time"
//             placeholder="Choose a time"
//             _selectedItem={{ bg: "secondary.300" }}
//             mt="1"
//             _actionSheetContent={{
//               height: "400",
//             }}
//             onValueChange={(value) => {
//               setData({ ...formData, bottle: value });
//               bottle_temp = value;
//             }}
//           >
//             {["3:", "4:", "5:", "6:", "7:", "8:", "9:"].map(
//               (hour, hourIndex) => {
//                 return ["00 am", "15 am", "30 am", "45 am"].map(
//                   (min, minIndex) => {
//                     return (
//                       <Select.Item
//                         key={hourIndex * 10 + minIndex}
//                         label={hour + min}
//                         value={hour + min}
//                         justifyContent="center"
//                       />
//                     );
//                   }
//                 );
//               }
//             )}
//           </Select>
//           {"bottle" in errors && (
//             <FormControl.ErrorMessage>{errors.bottle}</FormControl.ErrorMessage>
//           )}
//         </FormControl>
//       )}

//       {/* MOOD   */}
//       {getCenterSigninOutSettings.InMood !== 1 && (
//         <FormControl
//           my="5"
//           isRequired={getCenterSigninOutSettings.InMood === 3}
//           isInvalid={"mood" in errors}
//         >
//           <FormControl.Label
//             _text={{
//               bold: true,
//             }}
//           >
//             {" "}
//             How is {child.FirstName} feeling?
//           </FormControl.Label>
//           <HStack width="90%" space="10%" pt="1" >
//             {
//               (mood || []).map(ele => <Pressable onPress={() => setData({ ...formData, mood: ele })} hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }}>
//                 {getIconFromList(ele, formData?.mood) ? <Icons iconName={getIconFromList(ele, formData?.mood)} height={40} width={40} /> : null}
//               </Pressable>)
//             }
//           </HStack>
//           {"mood" in errors && (
//             <FormControl.ErrorMessage>{errors.mood}</FormControl.ErrorMessage>
//           )}
//         </FormControl>
//       )}

//       {/* MEDICAL INFORMATION   */}
//       {getCenterSigninOutSettings.InMedication !== 1 && (
//         <FormControl
//           my="5"
//           isRequired={getCenterSigninOutSettings.InMedication === 3}
//           isInvalid={"medication" in errors}
//         >
//           <FormControl.Label
//             _text={{
//               bold: true,
//             }}
//           >
//             {child.FirstName}'s medical notes
//           </FormControl.Label>
//           <TextArea
//             value={formData.medication}
//             onChangeText={(value) => {
//               setData({ ...formData, medication: value });
//               console.log(
//                 "loginFormCheck medication >>>> " + formData.medication
//               );
//               medication_temp = value;
//             }}
//           />
//           {"medication" in errors && (
//             <FormControl.ErrorMessage>
//               {errors.medication}
//             </FormControl.ErrorMessage>
//           )}
//         </FormControl>
//       )}

//       {/* NOTES   */}
//       {getCenterSigninOutSettings.InImportantInfo !== 1 && (
//         <FormControl
//           my="5"
//           isRequired={getCenterSigninOutSettings.InImportantInfo === 3}
//           isInvalid={"notes" in errors}
//         >
//           <FormControl.Label
//             _text={{
//               bold: true,
//             }}
//           >
//             General notes for {child.FirstName}
//           </FormControl.Label>
//           <TextArea
//             value={formData.notes}
//             onChangeText={(value) => {
//               setData({ ...formData, notes: value });
//               console.log("loginFormCheck notes >>>> " + formData.notes);
//               notes_temp = value;
//             }}
//           />
//           {"notes" in errors && (
//             <FormControl.ErrorMessage>{errors.notes}</FormControl.ErrorMessage>
//           )}
//         </FormControl>
//       )}

//       {/* WHO IS COLLECTING   */}
//       {getCenterSigninOutSettings.InCollectedBy !== 1 && (
//         <>
//           <FormControl
//             my="5"
//             isRequired={getCenterSigninOutSettings.InCollectedBy === 3}
//             isInvalid={"collectionByWho" in errors}
//           >
//             <FormControl.Label
//               key={0}
//               _text={{
//                 bold: true,
//               }}
//             >
//               Who is Collecting {child.FirstName}?
//             </FormControl.Label>
//             <Radio.Group
//               accessibilityLabel="Choose Collector"
//               onChange={(value) => {
//                 setData({ ...formData, collectionByWho: value });
//                 value === "other"
//                   ? setOtherCollector(true)
//                   : setOtherCollector(false);
//                 console.log("loginFormCheck >>>> " + formData.collectionByWho);
//                 collectionByWho_temp = value;
//               }}
//             >
//               {collectionByWho.map((collector, index) => {
//                 return (
//                   <Radio key={index} value={collector.name} my="1">
//                     {collector.name}
//                   </Radio>
//                 );
//               })}
//               <Radio value="other" my="1">
//                 Other
//               </Radio>
//             </Radio.Group>
//             {"collectionByWho" in errors && (
//               <FormControl.ErrorMessage>
//                 {errors.collectionByWho}
//               </FormControl.ErrorMessage>
//             )}
//           </FormControl>

//           {/* If other is selected in collectingByWho.... new form field opens up   */}
//           {otherCollector && (
//             <FormControl
//               my="5"
//               isRequired={formData.collectionByWho === "other"}
//               isInvalid={"otherCollector" in errors}
//             >
//               <FormControl.Label
//                 _text={{
//                   bold: true,
//                 }}
//               >
//                 Please specify
//               </FormControl.Label>
//               <Input
//                 placeholder="John, Brother"
//                 onChangeText={(value) => {
//                   setData({ ...formData, otherCollector: value });
//                   otherCollector_temp = value;
//                 }}
//               />
//               <FormControl.HelperText>
//                 Please describe the relationship
//               </FormControl.HelperText>
//               {"otherCollector" in errors && (
//                 <FormControl.ErrorMessage>
//                   {errors.otherCollector}
//                 </FormControl.ErrorMessage>
//               )}
//             </FormControl>
//           )}
//         </>
//       )}

//       {/* COLLECTION TIME   */}
//       {getCenterSigninOutSettings.InCollectedTime !== 1 && (
//         <FormControl
//           my="5"
//           isRequired={getCenterSigninOutSettings.InCollectedTime === 3}
//           isInvalid={"collectionTime" in errors}
//         >
//           <FormControl.Label
//             _text={{
//               bold: true,
//             }}
//           >
//             Collection time
//           </FormControl.Label>
//           <Select
//             accessibilityLabel="Choose a time"
//             placeholder="Choose a time"
//             _selectedItem={{ bg: "secondary.300" }}
//             mt="1"
//             _actionSheetContent={{
//               height: "400",
//             }}
//             onValueChange={(value) => {
//               setData({ ...formData, collectionTime: value });
//               collectionTime_temp = value;
//             }}
//             value={formData.collectionTime}
//           >
//             {["12:", "1:", "2:", "3:", "4:", "5:", "6:"].map(
//               (hour, hourIndex) => {
//                 return ["00 pm", "15 pm", "30 pm", "45 pm"].map(
//                   (min, minIndex) => {
//                     return (
//                       <Select.Item
//                         key={hourIndex * 10 + minIndex}
//                         label={hour + min}
//                         value={hour + min}
//                         justifyContent="center"
//                       />
//                     );
//                   }
//                 );
//               }
//             )}
//           </Select>
//           {"collectionTime" in errors && (
//             <FormControl.ErrorMessage>
//               {errors.collectionTime}
//             </FormControl.ErrorMessage>
//           )}
//         </FormControl>
//       )}

//       {/* SIGNATURE CAPTURE */}
//       {getCenterSigninOutSettings.InSignature !== 1 && (
//         <FormControl
//           my="5"
//           isRequired={getCenterSigninOutSettings.InSignature === 3}
//           isInvalid={"signature" in errors}
//         >
//           <FormControl.Label
//             _text={{
//               bold: true,
//             }}
//           >
//             {" "}
//             Signature
//           </FormControl.Label>
//           <SignatureView
//             style={{
//               borderWidth: "signature" in errors ? 2 : 1,
//               borderColor: "signature" in errors ? "#FF0000" : "#A6BFC8",
//               height: 200,
//             }}
//             ref={signatureRef}
//             // onSave is automatically called whenever signature-pad onEnd is called and saveSignature is called
//             onSave={(val) => {
//               //  a base64 encoded image
//               setData(prev => ({ ...prev, signature: val }));
//               // setData({ ...formData, signature: val });
//             }}
//           />

//           <Button
//             variant="subtle"
//             size="sm"
//             mt="1"
//             flex={1}
//             onPress={() => {
//               signatureRef.current.clearSignature();
//               setData(prev => ({ ...prev, signature: "" }));
//             }}
//           >
//             Clear
//           </Button>
//           {"signature" in errors && (
//             <FormControl.ErrorMessage>
//               {errors.signature}
//             </FormControl.ErrorMessage>
//           )}
//         </FormControl>
//       )}

//       {/* FORM SUBMIT BUTTON */}
//       <Button
//         my="2"
//         isLoading={submit}
//         variant="secondary"
//         _loading={{
//           bg: "secondary.500",
//           _text: {
//             color: "white",
//           },
//         }}
//         _spinner={{
//           color: "white",
//         }}
//         isLoadingText="Submitting"
//         onPress={() => {
//           onSubmit();
//         }}
//       >
//         Sign In
//       </Button>
//       {invalidForm && (
//         <Box _text={{ color: "red.500" }}>Form not filled out correctly</Box>
//       )}
//     </Box>
//   );
// }

// function SignOutForm({
//   child,
//   setFormDropdown,
//   setStatus,
//   handleChildSignInStatusCall,
// }) {
//   const [formData, setData] = useState({
//     signature: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [submit, setSubmit] = useState(false);
//   const [invalidForm, setInvalidForm] = useState(false);
//   const signatureRef = useRef(null);
//   const [text, setText] = useState("");

//  // const formFields = formFieldsRequired.signOut;

//   const dispatch = useDispatch();
//   const userData = useSelector((state) => state.activeUser);
//   const getCenterSigninOutSettings = useSelector((state) => state.center.getCenterSigninOutSettings);

//   const handleChildLogout = (data, callback) =>
//     dispatch(childSignInLog(data, callback));
//   const handleNavigation = () => {
//     // navigation.navigate("OtpVerification");
//   };

//   const validate = () => {
//     if (getCenterSigninOutSettings.InSignature === 3) {
//       if (!formData.signature.trim()) {
//         setErrors({ ...errors, signature: "Please sign the form" });
//         return false;
//       }
//     }
//     return true;
//   };

//   const onSubmit = () => {
//     if (validate()) {
//       setErrors({});
//       setInvalidForm(false);
//       setSubmit(true);
//       // console.log("childSign 713 >>> " + JSON.stringify(formData.signature));
//       handleSignoutClick();
//       setTimeout(function () {
//         setSubmit(false);
//         setFormDropdown(false);
//         setStatus("Signed Out");
//       }, 2000);
//     } else {
//       console.log("child 1022 >>> SignOut else");
//       setInvalidForm(true);
//     }
//   };

//   const handleSignoutClick = async () => {
//     const slugSignature = formData.signature.substring(
//       formData.signature.indexOf(",") + 1
//     );
//     console.log("signatureSlug >>>> " + slugSignature);

//     const handleNavigation = (data) => {
//       console.log("Child Signed out Successully");
//       handleChildSignInStatusCall();
//     };

//     handleChildLogout(
//       {
//         AuthorizedToken: "",
//         Id: "null",
//         SignType: "SignOut",
//         ParentID: child.ParentID,
//         ChildID: child.ChildID,
//         SignDate: getCurrentDate(),
//         SignatureImage: slugSignature,
//         SleepWell: "",
//         Mood: "",
//         CollectingByWho: "",
//         TimeOfCollection: "",
//         TimeOfWokeUp: "",
//         TimeOfLastBottle: "",
//         Medication: "",
//         ImportantInformation: "",
//         SignOutParentID: child.ParentID,
//       },
//       handleNavigation
//     );
//   };

//   return (
//     <Box>
//       <FullScreenLoader isVisible={userData.isLoading} />
//       {/* SIGNATURE CAPTURE */}
//       {getCenterSigninOutSettings.InSignature !== 1 && (
//         <FormControl
//           my="5"
//           isRequired={getCenterSigninOutSettings.InSignature === 3}
//           isInvalid={"signature" in errors}
//         >
//           <FormControl.Label
//             _text={{
//               bold: true,
//             }}
//           >
//             {" "}
//             Signature
//           </FormControl.Label>
//           <SignatureView
//             style={{
//               borderWidth: "signature" in errors ? 2 : 1,
//               borderColor: "signature" in errors ? "#FF0000" : "#A6BFC8",
//               height: 200,
//             }}
//             ref={signatureRef}
//             // onSave is automatically called whenever signature-pad onEnd is called and saveSignature is called
//             onSave={(val) => {
//               //  a base64 encoded image
//               setData({ ...formData, signature: val });
//             }}
//           />

//           <Button
//             variant="subtle"
//             size="sm"
//             mt="1"
//             flex={1}
//             onPress={() => {
//               signatureRef.current.clearSignature();
//               setData({ ...formData, signature: "" });
//             }}
//           >
//             Clear
//           </Button>

//           {"signature" in errors && (
//             <FormControl.ErrorMessage>
//               {errors.signature}
//             </FormControl.ErrorMessage>
//           )}
//         </FormControl>
//       )}

//       <Button
//         my="2"
//         isLoading={submit}
//         variant="secondary"
//         _loading={{
//           bg: "secondary.500",
//           _text: {
//             color: "white",
//           },
//         }}
//         _spinner={{
//           color: "white",
//         }}
//         isLoadingText="Submitting"
//         onPress={onSubmit}
//       >
//         Sign Out
//       </Button>
//       {invalidForm && (
//         <Box _text={{ color: "red.500" }}>Form not filled out correctly</Box>
//       )}
//     </Box>
//   );
// }

// function MarkAbsentForm({
//   child,
//   setFormDropdown,
//   setStatus,
//   handleChildSignInStatusCall,
// }) {
//   const [formData, setData] = useState({
//     isSick: "",
//     illness: "",
//     otherIllness: "",
//     details: "",
//     estimatedAbsence: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [submit, setSubmit] = useState(false);
//   const [invalidForm, setInvalidForm] = useState(false);
//   const [emailStatus, setEmailStatus] = useState(false);

//   const formFields = formFieldsRequired.markAbsent;

//   const dispatch = useDispatch();
//   const userData = useSelector((state) => state.activeUser);

//   const handleChildMarkAsAbsent = (data, callback) =>
//     dispatch(childMarkAsAbsent(data, callback));
//   const handleNavigation = () => {
//     // navigation.navigate("OtpVerification");
//   };

//   async function sendEmailAsync() {
//     // Setting information to fill the Mail Object
//     const mailOptions = {};
//     mailOptions.body =
//       "<strong>Sick:</strong> " +
//       String(formData.isSick) +
//       "<br><strong>Illness:</strong> " +
//       String(formData.illness) +
//       "<br><strong>Other symptoms:</strong>" +
//       String(formData.otherIllness) +
//       "<br><strong>Details:</strong> " +
//       String(formData.details) +
//       "<br><strong>Estimated length of Absence:</strong> " +
//       String(formData.estimatedAbsence);
//     mailOptions.subject = String(child.FirstName) + " - Absent";
//     mailOptions.recipients = ["david7funnell@gmail.com"];
//     mailOptions.isHtml = true;

//     let result = await MailComposer.composeAsync(mailOptions);
//     while (result.status !== "sent") {
//       if (
//         result.status === "cancelled" ||
//         result.status === "saved" ||
//         result.status === "undetermined"
//       ) {
//         break;
//       }
//     }
//     if (result.status === "sent") {
//       setEmailStatus(false);
//       setTimeout(function () {
//         setSubmit(false);
//         setFormDropdown(false);
//         setStatus("Marked Absent");
//       }, 500);
//     } else {
//       setEmailStatus("You must press send on the email");
//       setSubmit(false);
//     }
//   }

//   const validate = () => {
//     let valid = true;

//     if (formFields.isSick.required) {
//       if (!formData.isSick.trim()) {
//         errors.isSick = "Please select";
//         valid = false;
//       } else delete errors.isSick;
//     }

//     if (formFields.illness.required && formData.isSick === "yes") {
//       if (!formData.illness.trim()) {
//         errors.illness = "please select";
//         valid = false;
//       } else delete errors.illness;

//       if (formData.illness === "other") {
//         if (!formData.otherIllness.trim()) {
//           errors.otherIllness = "please select";
//           valid = false;
//         } else delete errors.otherIllness;
//       }
//     }

//     if (formFields.details.required) {
//       if (!formData.details.trim()) {
//         errors.details = "please enter information";
//         valid = false;
//       } else delete errors.details;
//     }

//     // if (formFields.estimatedAbsence.required) {
//     //   if (!formData.estimatedAbsence.trim()) {
//     //     errors.estimatedAbsence = "please select";
//     //     valid = false;
//     //   } else delete errors.estimatedAbsence;
//     // }

//     setErrors({ ...errors });

//     return valid;
//   };

//   const onSubmit = () => {

//     if (validate()) {
//       setErrors({});
//       setInvalidForm(false);
//       setSubmit(true);
//       handleMarkAsAbsentClick();
//       if (MailComposer.isAvailableAsync()) {
//         sendEmailAsync();
//       } else {
//         setEmailStatus(
//           "Mail is unavailable, please try again later or open your mail app"
//         );
//       }
//       setTimeout(function () {
//         setSubmit(false);
//         setFormDropdown(false);
//         setStatus("Marked Absent");
//       }, 500);
//     } else setInvalidForm(true);
//   };

//   const handleMarkAsAbsentClick = async () => {
//     const handleNavigation = (data) => {
//       console.log("Child marked as absent successully");
//       handleChildSignInStatusCall();
//     };

//     handleChildMarkAsAbsent(
//       {
//         Id: null,
//         ChildID: child.ChildID,
//         ParentID: child.ParentID,
//         // SignDate: getCurrentDate(),
//         // StartDate: getCurrentDate(),
//         // EndDate: getCurrentDate(formData.estimatedAbsence),
//         Notes: formData.illness === 'other' ? formData.otherIllness : formData.illness,
//         Reason: formData.details,
//       },
//       handleNavigation
//     );
//   };

//   return (
//     <Box>
//       {/* IS SICK  */}
//       {!formFields.isSick.disabled && (
//         <FormControl
//           my="5"
//           isRequired={formFields.isSick.required}
//           isInvalid={"isSick" in errors}
//         >
//           <FormControl.Label
//             _text={{
//               bold: true,
//             }}
//           >
//             {" "}
//             Is {child.FirstName} unwell?
//           </FormControl.Label>
//           <Radio.Group
//             name="isSick"
//             accessibilityLabel="Is your child unwell"
//             onChange={(value) => setData({ ...formData, isSick: value })}
//           >
//             <HStack space="10">
//               <Radio value="yes">Yes</Radio>
//               <Radio value="no">No</Radio>
//             </HStack>
//           </Radio.Group>
//           {"isSick" in errors && (
//             <FormControl.ErrorMessage>{errors.isSick}</FormControl.ErrorMessage>
//           )}
//         </FormControl>
//       )}

//       {/* ILLNESS  */}
//       {formFields.illness.disabled === false && formData.isSick === "yes" && (
//         <>
//           <FormControl
//             my="5"
//             isRequired={formFields.illness.required}
//             isInvalid={"illness" in errors}
//           >
//             <FormControl.Label
//               _text={{
//                 bold: true,
//               }}
//             >
//               {" "}
//               What is {child.FirstName}'s illness?
//             </FormControl.Label>
//             <Radio.Group
//               name="illness"
//               accessibilityLabel="What is your child's illness"
//               onChange={(value) => setData({ ...formData, illness: value })}
//             >
//               <Radio my="1" value="flu">
//                 Flu-like symptoms
//               </Radio>
//               <Radio my="1" value="diarrhoea">
//                 Diarrhoea
//               </Radio>
//               <Radio my="1" value="other">
//                 Other
//               </Radio>
//             </Radio.Group>
//             {"illness" in errors && (
//               <FormControl.ErrorMessage>
//                 {errors.illness}
//               </FormControl.ErrorMessage>
//             )}
//           </FormControl>

//           {/* OTHER ILLNESS  */}
//           {formData.illness === "other" && (
//             <FormControl
//               my="5"
//               isRequired={formFields.illness.required}
//               isInvalid={"otherIllness" in errors}
//             >
//               <FormControl.Label
//                 _text={{
//                   bold: true,
//                 }}
//               >
//                 Please specify
//               </FormControl.Label>
//               <Input
//                 onChangeText={(value) => {
//                   setData({ ...formData, otherIllness: value });
//                 }}
//               />
//               <FormControl.HelperText>
//                 Please describe the symptoms
//               </FormControl.HelperText>
//               {"otherIllness" in errors && (
//                 <FormControl.ErrorMessage>
//                   {errors.otherIllness}
//                 </FormControl.ErrorMessage>
//               )}
//             </FormControl>
//           )}
//         </>
//       )}

//       {/* DETAILS  */}
//       {!formFields.details.disabled && (
//         <FormControl
//           my="5"
//           isRequired={formFields.details.required}
//           isInvalid={"details" in errors}
//         >
//           <FormControl.Label
//             _text={{
//               bold: true,
//             }}
//           >
//             Provide further information
//           </FormControl.Label>
//           <TextArea
//             onChangeText={(value) => {
//               setData({ ...formData, details: value });
//             }}
//           />
//           {"details" in errors && (
//             <FormControl.ErrorMessage>
//               {errors.details}
//             </FormControl.ErrorMessage>
//           )}
//         </FormControl>
//       )}

//       {/* EXTENDED ABSENCE  */}
//       {/* {!formFields.estimatedAbsence.disabled && (
//         <FormControl
//           my="5"
//           isRequired={formFields.estimatedAbsence.required}
//           isInvalid={"estimatedAbsence" in errors}
//         >
//           <FormControl.Label
//             _text={{
//               bold: true,
//             }}
//           >
//             How long do you expect {child.FirstName} to be absent
//           </FormControl.Label>
//           <Input
//             onChangeText={(value) => {
//               setData({ ...formData, estimatedAbsence: value });
//             }}
//           />
//           {"estimatedAbsence" in errors && (
//             <FormControl.ErrorMessage>
//               {errors.estimatedAbsence}
//             </FormControl.ErrorMessage>
//           )}
//         </FormControl>
//       )} */}

//       <Button
//         my="2"
//         isLoading={submit}
//         variant="secondary"
//         _loading={{
//           bg: "secondary.500",
//           _text: {
//             color: "white",
//           },
//         }}
//         _spinner={{
//           color: "white",
//         }}
//         isLoadingText="Submitting"
//         onPress={onSubmit}
//       >
//         Mark Absent
//       </Button>
//       <Box>
//         <Text fontSize="xs" color="primary.500">
//           {" "}
//           Submitting this form will open your email to be sent to your center,
//           so please ensure you are logged into your Mail app{" "}
//         </Text>
//       </Box>
//       {invalidForm && (
//         <Box _text={{ color: "red.500" }}>Form not filled out correctly</Box>
//       )}
//       {emailStatus && <Box _text={{ color: "red.500" }}>{emailStatus}</Box>}
//     </Box>
//   );
// }

// export default function CheckIn(props: any) {

//   const dispatch = useDispatch();
//   const isLoading = useSelector((state) => state.activeUser.isLoading);
//   const centerSigninOutSettings = useSelector((state) => state.center.getCenterSigninOutSettings);
//   const childAgeLimit = useSelector((state) => state.center.getChildAgeLimit);
//   const childData = useSelector((state) => state.activeUser.childSigninStatusList);
//   const parent = useSelector((state) => state.activeUser.parent);
//   const netInfo = useSelector((state) => state.global.netInfo);
//   const [userData, setUserData] = useState(null);
//   // const [childData, setChildData] = useState([]);
//   // const [parentID, setParentID] = useState([]);

//   const handleChildSignInStatusList = (data, callback) =>
//     dispatch(childSignInStatusList(data, callback));

//   const handleNavigation = (data) => {};

//   useEffect(() => {
//     if (isEmpty(parent)) {
//       getParent();
//     } 
//   }, []);

//   useEffect(() => {
//     if (!isEmpty(parent)) {
//       setUserData(parent);
//       handleChildSignInStatusCall();
//     } 
//   }, [parent]);

//   useEffect(() => {
//     if (userData && (isEmpty(childAgeLimit) || isEmpty(centerSigninOutSettings))) {
//       dispatch(getCentreSignInOutSettings());
//       dispatch(getChildAgeLimit());
//     }
//   }, [userData])

//   const handleChildSignInStatusCall = async () => {
//     console.log("promise check >>>>>>>> " + parent.ParentId);
//     handleChildSignInStatusList(
//       {
//         AuthorizedToken: "",
//         ParentID: parent?.ParentId,
//       },
//       handleNavigation
//     );
//   };

//   console.log("CheckIn====> childData Length ---",childData.length);
  
//   return (
//     <>
//       <DashboardLayout title="Check In" mobileHeader={{ backButton: false }}>
//         <FullScreenLoader isVisible={isLoading} />
//         <ScrollView p="4" mb={{ base: -10 }}>
//           {childData.length > 0 &&
//             childData.map((data) => {
//               return (
//                 <React.Fragment key={data.ChildID}>
//                   {/* {ChildStatusBox(data)} */}
//                   <ChildStatusBox
//                     child={data}
//                     handleChildSignInStatusCall={handleChildSignInStatusCall}
//                   />
//                 </React.Fragment>
//               );
//             })}
//           <Box py="20" />
//         </ScrollView>
//       </DashboardLayout>
//     </>
//   );
// }
