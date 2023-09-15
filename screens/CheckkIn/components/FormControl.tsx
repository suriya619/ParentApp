import React from "react";
import { View, StyleSheet } from "react-native";
import useThemedStyles from "../../../context/useThemedStyles";

export default function FormControl({ children, onLayout }: any) {
  const styles = useThemedStyles(style);
  return (
    <View style={styles.formControl} onLayout={onLayout}>{children}</View>
  );

}

const style = (theme: any) => StyleSheet.create({
  formControl: {
    marginVertical: 20
  }
});