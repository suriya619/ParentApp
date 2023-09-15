import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useThemedStyles from "../../../context/useThemedStyles";
import useTheme from "../../../context/useTheme";
import { AppFontSizes, AppTypography } from "../../../assets/styles/themes";
import Icons from "../../../assets/icons/icons";

export default function RadioGroup({ options, onChange, selected, radioControlStyle, isInvalid }: any) {
  const theme = useTheme();
  const styles = useThemedStyles(style);
  return (
    <View style={radioControlStyle ? radioControlStyle : styles.radioControl}>
      {
        (options || []).map((ele: any) => (
          <TouchableOpacity style={styles.radioItem} activeOpacity={1} onPress={() => onChange(ele?.value)}>
            <View style={styles.radioIcon}>
              <Icons type="Ionicons" name={!isInvalid? (ele?.value === selected ? "radio-button-on" : "radio-button-off") : "radio-button-off"} color={!isInvalid? (ele?.value === selected ? theme?.colors?.activeRadioColor : theme?.colors?.inactiveRadioColor) : theme?.colors?.errorColor} size={24} />
            </View>
            <Text style={styles.radioLabel}>{ele?.label}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );

}

const style = (theme: any) => StyleSheet.create({
  radioControl: {
    display: 'flex',
    flexDirection: 'row',
  },
  radioItem: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 40
  },
  radioIcon: {
    marginRight: 8
  },
  radioLabel: {
    fontFamily: AppTypography.Poppins[400].normal,
    color: theme?.colors?.activeRadioColor,
    fontSize: AppFontSizes.FONT_SIZE_14,
    lineHeight: 24
  },
});