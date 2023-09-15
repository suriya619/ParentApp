import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Center,
  Hidden,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
} from "native-base";
import React from "react";

export default function WelcomeTextHeader(props: any) {
  const navigation = useNavigation();

  return (
    <>
      {/* <Hidden from="md"> */}
        <VStack px={{ base: 4, md: 0 }} mb="5" space="3">
          <HStack space="2" alignItems="center">
            <IconButton
              variant="unstyled"
              pl="0"
              onPress={() => {
                props.onchange();
              }}
              icon={
                <Icon
                  size="6"
                  as={AntDesign}
                  name="arrowleft"
                  color="coolGray.50"
                />
              }
            />
            <Text color="coolGray.50" fontSize="lg">
              {props.titlebarText}
            </Text>
          </HStack>
          <VStack space="2">
            <Text fontSize="3xl" fontWeight="bold" color="coolGray.50">
              {props.welcomeText}
            </Text>
            <Text
              fontSize="md"
              fontWeight="normal"
              _dark={{
                color: "coolGray.400",
              }}
              _light={{
                color: "primary.300",
              }}
            >
              {props.signintocontText}
            </Text>
          </VStack>
        </VStack>
      {/* </Hidden> */}

      {/* <Hidden till="md">
        <Center
          flex="1"
          bg="primary.900"
          borderTopLeftRadius={{ base: "0", md: "xl" }}
          borderBottomLeftRadius={{ base: "0", md: "xl" }}
        >
          <Image
            source={require("../components/logo.png")}
            h="24"
            size="80"
            alt="Your Child's Day "
            resizeMode={"contain"}
          />
        </Center>
      </Hidden> */}
    </>
  );
}
