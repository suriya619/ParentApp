import React from "react";
import { Text, StyleSheet } from "react-native";
import useThemedStyles from "../../../context/useThemedStyles";
// import { FormControl, useColorModeValue } from "native-base";
import { AppTypography, AppFontSizes } from "../../../assets/styles/themes";
import useTheme from "../../../context/useTheme";


export default function FormLabel({ labeltext, customStyle, required }: any) {
  const styles = useThemedStyles(style);
  const theme = useTheme();
  return (
    <Text style={[styles.labelText, customStyle?.labelText ? customStyle?.labelText : null]}>
      {labeltext}<Text style={{ color: theme?.colors?.errorColor }}>{required === true ? "*" : ""}</Text>
    </Text>
  );

}

const style = (theme: any) => StyleSheet.create({
  labelText: {
    fontFamily: AppTypography.Poppins[600].normal,
    fontSize: AppFontSizes.FONT_SIZE_13_DOT,
    color: theme?.colors?.labelColor,
    marginBottom: 8
  }
});