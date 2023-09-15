import { Button, Text as TextLabel } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native"
import useThemedStyles from "../../../context/useThemedStyles";
import { AppFontSizes, AppTypography } from "../../../assets/styles/themes";
import useTheme from "../../../context/useTheme";

export default function FormButton(props: any) {
  const theme = useTheme();
  const styles = useThemedStyles(style);

  return (
    <>
      {/* <Button
        variant={props.varianttype}
        size="sm"
        mt="1"
        flex={1}
        onPress={() => {
          props.onchange();
        }}
        {...props}
      >
        {(props.varianttype === "prime1" || props.varianttype === "second1") ? <TextLabel style={styles.prime1} color={props.varianttype === "second1" ? "secondary.700" : "primary.700"}>{props.text}</TextLabel> :  props.text } 
      </Button> */}
      <TouchableOpacity onPress={() => props.onchange()} style={[styles.buttonView, (props.varianttype === "prime1" || props.varianttype === "second1") ? { backgroundColor: props.varianttype === "prime1"? theme?.colors?.primary[100] : theme?.colors?.secondary[100]} : {}]}>
        {(props.varianttype === "prime1" || props.varianttype === "second1") ? <Text style={[styles.prime1, { color: props.varianttype === "second1" ? theme?.colors?.secondary[700] : theme?.colors?.primary[700]}]}>{props.text}</Text> :  <Text style={styles.buttonText}>{props.text}</Text> } 
      </TouchableOpacity>
    </>
  );
}

const style = (theme: any) => StyleSheet.create({
  prime1: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 12,
    fontFamily: "Poppins_700Bold"
  },
  buttonView: {
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: theme?.colors?.primary[100],
  },
  buttonText: {
    lineHeight: 21,
    color: theme?.colors?.primary[900],
    fontFamily: AppTypography.Poppins[400].normal,
    fontSize: AppFontSizes.FONT_SIZE_12
  }
})