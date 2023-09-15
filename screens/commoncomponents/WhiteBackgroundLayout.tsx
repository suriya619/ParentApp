import { Hidden, Text, VStack } from "native-base";
import React from "react";

export default function WhiteBackgroundLayout(props: any) {
  //Here props. text is used to display " Sign in /SignUp to continue! " text, which will be visible in large screens.
  // This text will display above the Username TextInput Field Form.

  return (
    <>
      <VStack
        flex="1"
        w="full"
        px="7"
        py="9"
        _light={{ bg: "white" }}
        _dark={{ bg: "coolGray.800" }}
        space="3"
        justifyContent="space-between"
        borderTopLeftRadius="2xl"
        borderTopRightRadius="2xl"
      >
        {props.children}
      </VStack>
    </>
  );
}
