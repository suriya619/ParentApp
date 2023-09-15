import React from "react";
import { Text, StyleSheet } from "react-native";
import useThemedStyles from "../../../context/useThemedStyles";
import { AppFontSizes, AppTypography } from "../../../assets/styles/themes";


export default function ErrorText({ errorMessage }: any) {
  const styles = useThemedStyles(style);
  return (
    <Text style={styles.errorText}>{errorMessage}</Text>
  );

}

const style = (theme: any) => StyleSheet.create({
  errorText: {
    fontFamily: AppTypography.Poppins[400].normal,
    fontSize: AppFontSizes.FONT_SIZE_10,
    color: theme?.colors?.errorColor,
    lineHeight: 18
  }
});