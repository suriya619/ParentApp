import { Center, Stack } from "native-base";
import React from "react";

export default function WhiteBgLayout(props: any) {
  return (
    <>
      <Center
        my="auto"
         w="full"
        // mx="7"
        _dark={{ bg: "white" }}
        _light={{ bg: { md: "white", base: "white" } }}
        flex="1"
      >
        <Stack
          w="100%"
          maxW={{ md: "780px" }}
          flex={{ base: "1", md: undefined }}
          flexDirection={{ base: "column", md: "row" }}
        >
          {props.children}
        </Stack>
      </Center>
    </>
  );
}
