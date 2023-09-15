import { Entypo } from "@expo/vector-icons";
import { Icon, IconButton, useColorModeValue } from "native-base";
import React, { useEffect, useState } from "react";
import FloatingLabelInput from "../components/FloatingLabelInput";

export default function TextLayout(props: any) {
  const [fieldText, setFieldText] = useState("");
  const [showPass, setShowPass] = useState(true);
  useEffect(() => {
    setFieldText(props.value)
  }, [props.value]);
  return (
    <>
      <FloatingLabelInput
        keyboardType={props.keyboardType}
        py="3"
        maxLength={props.maxLength}
        isRequired
        defaultValue={fieldText}
        type={props.isshowPass && showPass ? "password" : ""}
        label={props.labelText}
        labelColor="#9ca3af"
        labelBGColor={useColorModeValue("#fff", "#1f2937")}
        borderRadius="4"
        fontWeight="semibold"
        _text={{
          fontSize: "sm",
          fontWeight: "semibold",
        }}
        _dark={{
          borderColor: "coolGray.700",
        }}
        _light={{
          borderColor: "coolGray.300",
        }}
        value={props.value || fieldText}
        onChangeText={(text) => {
          setFieldText(text);
          props.onChange(text, props.name);
        }}
        InputRightElement={
          props.isshowPass ? (
            <IconButton
              mr="1"
              variant="unstyled"
              icon={
                <Icon
                  size="4"
                  color="coolGray.400"
                  as={Entypo}
                  name={props.isshowPass && showPass ? "eye-with-line" : "eye"}
                />
              }
              onPress={() => {
                setShowPass(!showPass);
                props.onShowPass(!showPass);
              }}
            />
          ) : null
        }
      />
    </>
  );
}
