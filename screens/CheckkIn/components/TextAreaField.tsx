// import { TextArea } from "native-base";
import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, InputAccessoryView, Platform, Dimensions } from "react-native";
import useThemedStyles from "../../../context/useThemedStyles";
import { AppFontSizes, AppTypography } from "../../../assets/styles/themes";
import Icons from "../../../assets/icons/icons";
import useTheme from "../../../context/useTheme";
import FormLabel from "./FormLabel";

export default function TextAreaField({ formData, setData, type, customStyle, showIcon, onPressIcon, inputHeight, onFocus, nativeIDName, nativeButtonClick }: any) {
  const styles = useThemedStyles(style);
  const [contentHeight, setContentHeight] = React.useState(inputHeight);
  const custTheme = useTheme();
  const renderTextInput = () => {
    return (
      <TextInput
        style={[styles.textInput, customStyle?.textInput ? customStyle?.textInput : null, { height: contentHeight > 80? 80 : contentHeight, minHeight: 44,  maxHeight: 80 }]}
        multiline={true}
        value={formData[type]}
        numberOfLines={customStyle?.numberOfLines ? customStyle?.numberOfLines : 4}
        onContentSizeChange={(event) => {
          setContentHeight(event.nativeEvent.contentSize.height);
        }}
        onChangeText={(value) => {
          setData({ ...formData, [type]: value });
        }}
        onFocus={() => onFocus && onFocus()}
        inputAccessoryViewID={nativeIDName}
      />
    )
  }
  return (
    <>
      {/* <TextArea
        style={{ justifyContent: "flex-start", textAlignVertical: "top" }}
        onChangeText={(value) => {
          setData({ ...formData, [type]: value });
        }}
      /> */}
      {
        !showIcon ? renderTextInput() : <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ flex: 1, marginRight: 12 }}>
            {renderTextInput()}
          </View>
          <TouchableOpacity style={styles.button} onPress={() => onPressIcon()}>
            <Icons type={"MaterialCommunityIcons"} name={"clipboard-text-multiple-outline"} color={styles.iconColor?.color} size={20} />
          </TouchableOpacity>
        </View>
      }
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
    justifyContent: "flex-start",
    textAlignVertical: "top",
    borderColor: theme?.colors?.borderColor,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: theme?.colors?.muted[900],
    fontFamily: AppTypography.Poppins[400].normal,
    fontSize: AppFontSizes.FONT_SIZE_13,
    height: 80
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme?.colors?.borderColor,
    borderWidth: 1,
    borderRadius: 4,
    height: 44,
    width: 44
  },
  iconColor: {
    color: theme?.colors?.primary[675]
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
