import { useNavigation } from "@react-navigation/native";
import { HStack, Text } from "native-base";
import React from "react";
import LinkTextLayout from "./LinkTextLayout";

export default function TextWithLinkLayout(props: any) {
  const navigation = useNavigation();

  return (
    <>
      <HStack
        space="1"
        safeAreaBottom
        alignItems="center"
        justifyContent="center"
        mt={{ base: "auto", md: "8" }}
      >
        <Text
          _light={{ color: "coolGray.800" }}
          _dark={{ color: "coolGray.400" }}
        >
          {props.titletext}
        </Text>

        <LinkTextLayout onchange={props.onchange} linkText={props.linkText} />
      </HStack>
    </>
  );
}
