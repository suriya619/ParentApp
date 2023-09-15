import React from "react";
import {
  Center,
  useColorMode,
} from "native-base";

import { Image } from "react-native";

export default function ForgotPwdImageLayout(props: any) {
  const { colorMode } = useColorMode();

  const fpImg = require("../../assets/forgot_password.png");
  const fpMobImg = require("../../assets/forgot_password.png");

  // changes done in metro.config.js

  return (
    <Center
      flex={{ md: 0.7 }}
      pt={{ base: 9, md: "190px" }}
      pb={{ base: "52px", md: "190px" }}
      px={{ base: 4, md: "50px" }}
      _light={{ bg: { base: "white", md: "primary.900" } }}
      _dark={{ bg: { base: "coolGray.800", md: "primary.900" } }}
      borderTopLeftRadius={{ md: "xl" }}
      borderBottomLeftRadius={{ md: "xl" }}
    >
      {colorMode == "light" ? (
        <Image
          w={{ base: "205px", md: "501px" }}
          h={{ base: "160px", md: "544px" }}
          // alt="Your Child's Day"
          resizeMode={"contain"}
          source={fpMobImg}
        />
      ) : (
        <Image
          w={{ base: "205px", md: "501px" }}
          h={{ base: "160px", md: "544px" }}
          // alt="Your Child's Day"
          resizeMode={"contain"}
          source={fpImg}
        />
      )}

      {/* <Hidden from="base" till="md">
        {colorMode == "light" ? (
          <Image
            w={{ base: "205px" }}
            h={{ base: "160px" }} 
            // alt="Your Child's Day"
            resizeMode={"contain"}
            source={fpImg}
          />
        ) : (
          <Image
            w={{ base: "205px" }}
            h={{ base: "160px" }}
            resizeMode={"contain"}
            source={fpImg}
          />
        )}
      </Hidden>
      <Hidden from={"md"}>
        {colorMode == "light" ? (
          <Image
            w={{ base: "205px", md: "501px" }}
            h={{ base: "160px", md: "544px" }}
            // alt="Your Child's Day"
            resizeMode={"contain"}
            source={fpMobImg}
          />
        ) : (
          <Image
            w={{ base: "205px", md: "501px" }}
            h={{ base: "160px", md: "544px" }}
            // alt="Your Child's Day"
            resizeMode={"contain"}
            source={fpImg}
          />
        )}
      </Hidden> */}
      
    </Center>
  );
}
