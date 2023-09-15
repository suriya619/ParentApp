import { Divider, HStack, Text } from "native-base";
import React from "react";

export default function ORLayout() {
  return (
    <>
      <HStack
        mt="3"
        space="2"
        mb={{ base: 1, md: 1 }}
        alignItems="center"
        justifyContent="center"
      >
        <Divider
          w="30%"
          _light={{ bg: { base: "coolGray.300", md: "coolGray.200" } }}
          _dark={{ bg: "coolGray.700" }}
        ></Divider>
        <Text
          fontWeight="medium"
          color={{ base: "coolGray.500", md: "coolGray.300" }}
          _light={{
            color: { base: "coolGray.500", md: "coolGray.300" },
          }}
          _dark={{
            color: { base: "coolGray.500", md: "coolGray.300" },
          }}
        >
          or
        </Text>
        <Divider
          w="30%"
          _light={{ bg: { base: "coolGray.300", md: "coolGray.200" } }}
          _dark={{ bg: "coolGray.700" }}
        ></Divider>
      </HStack>
    </>
  );
}
