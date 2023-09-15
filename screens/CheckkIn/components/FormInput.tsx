// import { TextArea } from "native-base";
import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, InputAccessoryView, Platform, Dimensions } from "react-native";
import useThemedStyles from "../../../context/useThemedStyles";
import { AppFontSizes, AppTypography } from "../../../assets/styles/themes";
import useTheme from "../../../context/useTheme";
import FormLabel from "./FormLabel";

export default function FormInputText({ placeholder, onChangeText, onFocus, nativeIDName, nativeButtonClick }: any) {
  const styles = useThemedStyles(style);
  const custTheme = useTheme();
  
  return (
    <>
     <TextInput
      placeholder={placeholder || ""}
      onChangeText={onChangeText}
      style={styles.textInput}
      onFocus={onFocus}
      inputAccessoryViewID={nativeIDName}
    />
     {Platform.OS === 'ios' && nativeIDName && <InputAccessoryView nativeID={nativeIDName}>
        <View style={styles.accessory}>
          <TouchableOpacity onPress={() => nativeButtonClick ? nativeButtonClick() : {}}>
            <FormLabel labeltext={nativeIDName} customStyle={{
              labelText: {
                color: custTheme?.colors?.blueGray[500],
                marginBottom: 0
              }
            }} />
            <View style={{ height: 1, backgroundColor: custTheme?.colors?.blueGray[500], marginTop: Platform.select({ ios: -4, android: -7 }) }} />
          </TouchableOpacity>
        </View>
    </InputAccessoryView>}
    </>
  );
}

const style = (theme: any) => StyleSheet.create({
  textInput: {
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
  accessory: {
    width: Dimensions.get('window').width,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8
  }
})
