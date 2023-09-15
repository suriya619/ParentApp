import { Button, Text } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Keyboard } from "react-native";


export default function ButtonLayout(props: any) {
  const [fieldText, setFieldText] = useState("");
  const [showPass, setShowPass] = useState(true);

  // pageType prop it identify from which screen ButtonLayout is called. Based on it button Layout will be rendered accordingly
  // onchange prop is to handle the click events of button in the respective callback.
  // type prop is used to set the variant property of button.(only when it is called via Splash Screen)
  // nameText prop is used to assign the label of the button.

  return (
    <>
      {props.pageType === "Splash" ? (
        <Button
          variant={props.type}
          size="lg"
          onPress={() => {
            Keyboard.dismiss()
            props.onchange();
          }}
        >
          {props.nameText}
        </Button>
      ) : (
        // <Button
        //   onPress={() => {
        //     Keyboard.dismiss()
        //     props.onchange();
        //   }}
        //   mt="5"
        //   size="md"
        //   py="3"
        //   borderRadius="4"
        //   _text={{
        //     fontWeight: "medium",
        //   }}
        //   _light={{
        //     bg: "primary.900",
        //   }}
        //   _dark={{
        //     bg: "primary.700",
        //     _pressed: { bg: "primary.500" },
        //   }}
        // >
        //   {props.nameText}
        // </Button>
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              props.onchange();
            }}
            style={[{
              backgroundColor: "#132D35",
              // paddingVertical: 12,
              width: '100%',
              height: 45,
              borderRadius: 4,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20
            }, props.style]}
            >
              <Text fontSize="md" color={"white"} fontWeight="medium">{props.nameText}</Text>
    </TouchableOpacity>
      )}
    </>
  );
}
