// import * as MailComposer from "expo-mail-composer";
import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProp, useNavigation,ParamListBase } from "@react-navigation/native";
import { childMarkAsAbsent } from "../../../store/auth";
import { SubmitButton, TextAreaField } from "../components";
import FormLabel from "../components/FormLabel";
import { formFieldsRequired } from "../FormFields";
import { DashboardLayout } from "../../commoncomponents";
import useThemedStyles from "../../../context/useThemedStyles";
import FormControl from "../components/FormControl";
import RadioGroup from "../components/RadioGroup";
import ErrorText from "../components/ErrorText";
import { AppFontSizes, AppTypography } from "../../../assets/styles/themes";

type MarkAbsentNavigationProp = NavigationProp<ParamListBase>;
const MarkAbsent = ({ route }: any) => {

  const { child, setStatus, handleChildSignInStatusCall } = route.params;
  const parent = useSelector((state: any) => state.activeUser.parent);

  const navigation = useNavigation<MarkAbsentNavigationProp>();

  const [formData, setData] = useState({
    isSick: "",
    illness: "",
    otherIllness: "",
    details: "",
    estimatedAbsence: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [submit, setSubmit] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");

  const formFields = formFieldsRequired.markAbsent;
  const styles = useThemedStyles(style);
  const dispatch = useDispatch();
  const userData = useSelector((state:any) => state.activeUser);

  const handleChildMarkAsAbsent = (data:any, callback:any) =>
    dispatch(childMarkAsAbsent(data, callback));
  const handleNavigation = () => {
    // navigation.navigate("OtpVerification");
  };

  async function sendEmailAsync() {
    // Setting information to fill the Mail Object
    const mailOptions:any = {};
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
      setEmailStatus("");
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

    if (formData.isSick === "no" && formFields.details.required) {
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
    const handleNavigation = (data: any, statusCode: any) => {
      if (statusCode === 200) {
        handleChildSignInStatusCall();
        setSubmit(false);
        navigation.navigate("Check-In")
        setStatus("Marked Absent");
      } else {
        setSubmit(false);
      }
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

  return (
    <DashboardLayout title={`Mark ${child.FirstName} Absent`}>
      <ScrollView
        style={styles.contentContainer}
        nestedScrollEnabled
        bounces={false}
        keyboardShouldPersistTaps="handled">
        {/* IS SICK  */}
        {!formFields.isSick.disabled && (
          <FormControl
            my="5"
            isRequired={formFields.isSick.required}
            isInvalid={"isSick" in errors}
          >
            <FormLabel labeltext={"Is " + child.FirstName + " unwell?"} required={formFields.isSick.required} />

            <RadioGroup
              name="isSick"
              options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]}
              onChange={(value: any) => {
                setData({ ...formData, isSick: value });
                delete errors?.isSick;
              }}
              selected={formData?.isSick}
              isInvalid={"isSick" in errors}
            />
            {"isSick" in errors && (
              <ErrorText
                errorMessage={errors.isSick}
              />
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
                required={formData.isSick === "yes" && formFields.illness.required}
              />

              <RadioGroup
                name="illness"
                options={[{ label: "Flu-like symptoms", value: "flu" }, { label: "Diarrhoea", value: "diarrhoea" }, { label: "Other", value: "other" }]}
                onChange={(value: any) => {
                  setData({ ...formData, illness: value });
                  delete errors?.illness;
                }}
                selected={formData?.illness}
                radioControlStyle={styles.radioControl}
                isInvalid={"illness" in errors}
              />
              {"illness" in errors && (
                <ErrorText
                  errorMessage={errors.illness}
                />
              )}
            </FormControl>

            {/* OTHER ILLNESS  */}
            {formData.illness === "other" && (
              <FormControl
                my="5"
                isRequired={formFields.illness.required}
                isInvalid={"otherIllness" in errors}
              >
                <FormLabel labeltext="Please specify" required={formData.isSick === "yes" && formData.illness === "other" && formFields.illness.required} />

                <TextInput
                  onChangeText={(value) => {
                    setData({ ...formData, otherIllness: value });
                    delete errors.otherIllness;
                  }}
                  style={styles.inputStyle}
                />
                <Text style={styles.helperText}>
                  Please describe the symptoms
                </Text>
                {"otherIllness" in errors && (
                  <ErrorText
                    errorMessage={errors.otherIllness}
                  />
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
            <FormLabel labeltext="Provide further information" required={formData.isSick === "no" && formFields.details.required} />

            <TextAreaField formData={formData} type="details" setData={(data: any) => {
              setData(data);
              delete errors.details;
            }} />

            {"details" in errors && (
              <ErrorText
                errorMessage={errors.details}
              />
            )}
          </FormControl>
        )}

        <SubmitButton
          variant="secondary"
          submit={submit}
          text="Mark Absent"
          onchange={onSubmit}
        />
        {/* <Button
          my="2"
          isLoading={true || submit}
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
        </Button> */}
        <View>
          <Text style={styles.infoText}>
            {" "}
            Submitting this form will open your email to be sent to your center,
            so please ensure you are logged into your Mail app{" "}
          </Text>
        </View>
        {invalidForm && (
          <Text style={styles.inValidColor}>Form not filled out correctly</Text>
        )}
        {emailStatus != "" && <Text style={styles.inValidColor}>{emailStatus}</Text>}
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
    fontFamily: AppTypography.Poppins[400].normal
  },
  infoText: {
    color: theme?.colors?.primary[500],
    fontFamily: AppTypography.Poppins[400].normal,
    fontSize: AppFontSizes?.FONT_SIZE_10
  }
})

export default React.memo(MarkAbsent, (prevprops, nextprops) => {
  return true;
});
