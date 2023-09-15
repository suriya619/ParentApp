// import { Button } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity, ActivityIndicator, Text, View } from "react-native"
import useThemedStyles from "../../../context/useThemedStyles";
import { AppFontSizes, AppTypography } from "../../../assets/styles/themes";

export default function SubmitButton(props: any) {
  const styles = useThemedStyles(style);

  return (
    <>
      {/* <Button
        my="2"
        isLoading={props.submit}
        _loading={{
          bg: "secondary.500",
          _text: {
            color: "white",
          },
        }}
        _spinner={{ color: "white" }}
        isLoadingText="Submitting"
        onPress={() => {
          props.onchange();
        }}
      >
        {props.text}
      </Button> */}
      <TouchableOpacity onPress={() => props.onchange()} style={[styles.buttonView, props.submit ? styles.loadingView : {},  props.variant === 'secondary'? styles.secButtonView : {}, props.buttonStyle]}>
        {props.submit && <View style={styles.mr5}>
          <ActivityIndicator size={20} color={styles.whiteColor.color} />
        </View>}
        <Text style={[styles.buttonText, props.submit ? styles.whiteColor : {}]}>{props.submit ? 'Submitting' : props.text}</Text>
      </TouchableOpacity>
    </>
  );
}

const style = (theme: any) => StyleSheet.create({
  buttonView: {
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: theme.colors?.oracle[600],
    borderWidth: 1,
    borderColor: theme.colors?.oracle[700],
  },
  buttonText: {
    fontFamily: AppTypography.Poppins[700].normal,
    lineHeight: 24,
    fontSize: AppFontSizes.FONT_SIZE_12,
    color: theme.colors?.commonWhite
  },
  whiteColor: {
    color: theme?.colors?.commonWhite
  },
  loadingView: {
    backgroundColor: theme?.colors?.secondary[500],
    opacity: 0.4,
    borderWidth: 0,
  },
  mr5:{
    marginRight: 5
  },
  secButtonView: { 
    backgroundColor: theme?.colors?.secondary[700],
    borderColor: theme?.colors?.secondary[800],
    borderWidth: 1
  }
})
