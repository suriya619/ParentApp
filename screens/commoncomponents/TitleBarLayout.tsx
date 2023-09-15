import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Hidden, HStack, Icon, IconButton, Text } from "native-base";
import React from "react";

export default function TitleBarLayout(props: any) {
  const navigation = useNavigation();

  return (
    <>
      <Hidden from="md">
        <HStack space="2" px="1" mt="4" pb="4" alignItems="center">
          <IconButton
            variant="unstyled"
            onPress={() => {
              props.onchange();
            }}
            icon={
              <Icon
                alignItems="center"
                justifyContent="center"
                size="6"
                as={AntDesign}
                name="arrowleft"
                color="coolGray.50"
              />
            }
          />
          <Text color="coolGray.50" fontSize="lg">
            {props.titleBarText}
          </Text>
        </HStack>
      </Hidden>
    </>
  );
}
