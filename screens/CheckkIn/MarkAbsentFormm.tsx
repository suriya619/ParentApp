// import * as MailComposer from "expo-mail-composer";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Radio,
  Text,
  ScrollView,
} from "native-base";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { childMarkAsAbsent } from "../../store/auth";
import { TextAreaField } from "./components";
import FormLabel from "./components/FormLabel";
import { formFieldsRequired } from "./FormFields";
import { DashboardLayout } from "../commoncomponents";

const MarkAbsentFormm = ({route}: any) => {

  const {child, setStatus, handleChildSignInStatusCall } = route.params;
  const parent = useSelector((state:any) => state.activeUser.parent);

  const navigation = useNavigation();
  
  const [formData, setData] = useState({
    isSick: "",
    illness: "",
    otherIllness: "",
    details: "",
    estimatedAbsence: "",
  });

  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);

  const formFields = formFieldsRequired.markAbsent;

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.activeUser);

  const handleChildMarkAsAbsent = (data, callback) =>
    dispatch(childMarkAsAbsent(data, callback));
  const handleNavigation = () => {
    // navigation.navigate("OtpVerification");
  };

  async function sendEmailAsync() {
    // Setting information to fill the Mail Object
    const mailOptions = {};
    mailOptions.body =
      "<strong>Sick:</strong> " +
      String(formData.isSick) +
      "<br><strong>Illness:</strong> " +
      String(formData.illness) +
      "<br><strong>Other symptoms:</strong>" +
      String(formData.otherIllness) +
      "<br><strong>Details:</strong> " +
      String(formData.details) +
      "<br><strong>Estimated length of Absence:</strong> " +
      String(formData.estimatedAbsence);
    mailOptions.subject = String(child.FirstName) + " - Absent";
    mailOptions.recipients = ["david7funnell@gmail.com"];
    mailOptions.isHtml = true;

    // let result = await MailComposer.composeAsync(mailOptions);
    while (result.status !== "sent") {
      if (
        result.status === "cancelled" ||
        result.status === "saved" ||
        result.status === "undetermined"
      ) {
        break;
      }
    }
    if (result.status === "sent") {
      setEmailStatus(false);
      setTimeout(function () {
        setSubmit(false);
        setStatus("Marked Absent");
      }, 500);
    } else {
      setEmailStatus("You must press send on the email");
      setSubmit(false);
    }
  }

  const validate = () => {
    let valid = true;

    if (formFields.isSick.required) {
      if (!formData.isSick.trim()) {
        errors.isSick = "Please select";
        valid = false;
      } else delete errors.isSick;
    }

    if (formFields.illness.required && formData.isSick === "yes") {
      if (!formData.illness.trim()) {
        errors.illness = "please select";
        valid = false;
      } else delete errors.illness;

      if (formData.illness === "other") {
        if (!formData.otherIllness.trim()) {
          errors.otherIllness = "please select";
          valid = false;
        } else delete errors.otherIllness;
      }
    }

    if (formFields.details.required) {
      if (!formData.details.trim()) {
        errors.details = "please enter information";
        valid = false;
      } else delete errors.details;
    }

    // if (formFields.estimatedAbsence.required) {
    //   if (!formData.estimatedAbsence.trim()) {
    //     errors.estimatedAbsence = "please select";
    //     valid = false;
    //   } else delete errors.estimatedAbsence;
    // }

    setErrors({ ...errors });

    return valid;
  };

  const onSubmit = () => {
    if (validate()) {
      setErrors({});
      setInvalidForm(false);
      setSubmit(true);
      handleMarkAsAbsentClick();
      // if (MailComposer.isAvailableAsync()) {
      //   sendEmailAsync();
      // } else {
      //   setEmailStatus(
      //     "Mail is unavailable, please try again later or open your mail app"
      //   );
      // }
    } else setInvalidForm(true);
  };

  const handleMarkAsAbsentClick = async () => {
    const handleNavigation = (data) => {
      handleChildSignInStatusCall();
      setSubmit(false);
      navigation.goBack();
      setStatus("Marked Absent");
    };
    handleChildMarkAsAbsent(
      {
        Id: null,
        ChildID: child.ChildID,
        ParentID: child.ParentID,
        // SignDate: getCurrentDate(),
        // StartDate: getCurrentDate(),
        // EndDate: getCurrentDate(formData.estimatedAbsence),
        Notes:
          formData.illness === "other"
            ? formData.otherIllness
            : formData.illness,
        Reason: formData.details,
        UserId: parent.UserId,
        ParentName: `${parent.FirstName} ${parent.LastName}`,
        ChildName: `${child.FirstName} ${child.LastName}`,
      },
      handleNavigation
    );
  };
  const handleSickChange = (value) => {
    setData(formDatas => ({ ...formDatas, illness: value }))
  }
  return (
  <DashboardLayout title={`Mark ${child.FirstName} Absent`}>
    <Box pb="20">
    <ScrollView
     px="4" mb={{ base: -20 }} nestedScrollEnabled bounces={false} keyboardShouldPersistTaps="handled">
      {/* IS SICK  */}
      {!formFields.isSick.disabled && (
        <FormControl
          my="5"
          isRequired={formFields.isSick.required}
          isInvalid={"isSick" in errors}
        >
          <FormLabel labeltext={"Is " + child.FirstName + " unwell?"} />

          <Radio.Group
            name="isSick"
            accessibilityLabel="Is your child unwell"
            onChange={(value) => setData({ ...formData, isSick: value })}
          >
            <HStack space="10">
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </HStack>
          </Radio.Group>
          {"isSick" in errors && (
            <FormControl.ErrorMessage>{errors.isSick}</FormControl.ErrorMessage>
          )}
        </FormControl>
      )}

      {/* ILLNESS  */}
      {formFields.illness.disabled === false && formData.isSick === "yes" && (
        <>
          <FormControl
            my="5"
            isRequired={formFields.illness.required}
            isInvalid={"illness" in errors}
          >
            <FormLabel
              labeltext={"What is " + child.FirstName + "'s illness?"}
            />

            <Radio.Group
              name="illness"
              accessibilityLabel="What is your child's illness"
              value={formData.illness}
              onChange={handleSickChange}
            >
              <Radio my="1" value="flu">
                Flu-like symptoms
              </Radio>
              <Radio my="1" value="diarrhoea">
                Diarrhoea
              </Radio>
              <Radio my="1" value="other">
                Other
              </Radio>
            </Radio.Group>
            {"illness" in errors && (
              <FormControl.ErrorMessage>
                {errors.illness}
              </FormControl.ErrorMessage>
            )}
          </FormControl>

          {/* OTHER ILLNESS  */}
          {formData.illness === "other" && (
            <FormControl
              my="5"
              isRequired={formFields.illness.required}
              isInvalid={"otherIllness" in errors}
            >
              <FormLabel labeltext="Please specify" />

              <Input
                style={{
                  justifyContent: "flex-start",
                  textAlignVertical: "top",
                }}
                onChangeText={(value) => {
                  setData({ ...formData, otherIllness: value });
                }}
              />
              <FormControl.HelperText>
                Please describe the symptoms
              </FormControl.HelperText>
              {"otherIllness" in errors && (
                <FormControl.ErrorMessage>
                  {errors.otherIllness}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
        </>
      )}

      {/* DETAILS  */}
      {!formFields.details.disabled && (
        <FormControl
          my="5"
          isRequired={formFields.details.required}
          isInvalid={"details" in errors}
        >
          <FormLabel labeltext="Provide further information" />

          <TextAreaField formData={formData} type="details" setData={setData} />

          {"details" in errors && (
            <FormControl.ErrorMessage>
              {errors.details}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
      )}

      <Button
        my="2"
        isLoading={submit}
        variant="secondary"
        _loading={{
          bg: "secondary.500",
          _text: {
            color: "white",
          },
        }}
        _spinner={{
          color: "white",
        }}
        isLoadingText="Submitting"
        onPress={onSubmit}
      >
        Mark Absent
      </Button>
      <Box>
        <Text fontSize="xs" color="primary.500">
          {" "}
          Submitting this form will open your email to be sent to your center,
          so please ensure you are logged into your Mail app{" "}
        </Text>
      </Box>
      {invalidForm && (
        <Box _text={{ color: "red.500" }}>Form not filled out correctly</Box>
      )}
      {emailStatus && <Box _text={{ color: "red.500" }}>{emailStatus}</Box>}
    </ScrollView>
    </Box>
  </DashboardLayout>
  );
};

export default React.memo(MarkAbsentFormm, (prevprops, nextprops) => {
  return true;
});
