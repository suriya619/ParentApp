import { Center, Stack } from "native-base";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StatusBarLayout from "./StatusBarLayout";

export default function BackgroundLayout(props: any) {
  return (
    <>
      <StatusBarLayout />
      <KeyboardAwareScrollView
        contentContainerStyle={{ width: "100%", height: "100%" }}
        {...props}
      >
        <Center
          my="auto"
          _dark={{ bg: "coolGray.900" }}
          _light={{ bg: "primary.900" }}
          flex="1"
          p={{ md: 8 }}
        >
          <Stack
            w="100%"
            flex="1"
            flexDirection="column"
            safeAreaBottom
          >
            {props.children}
          </Stack>
        </Center>
      </KeyboardAwareScrollView>
    </>
  );
}
