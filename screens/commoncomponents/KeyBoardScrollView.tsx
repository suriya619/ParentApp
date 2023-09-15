import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function KeyBoardScrollView(props: any) {
  return (
    <>
      <KeyboardAwareScrollView
        _light={{ bg: { base: "white", md: "primary.900" } }}
        _dark={{ bg: { base: "coolGray.800", md: "primary.900" } }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
        style={{ flex: 1 }}
        bounces={false}
        keyboardShouldPersistTaps="always"
      >
        {props.children}
      </KeyboardAwareScrollView>
    </>
  );
}
