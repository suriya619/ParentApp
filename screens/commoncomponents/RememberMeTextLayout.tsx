import { Checkbox, Text } from "native-base";
import React from "react";

export default function RememberMeTextLayout(props: any) {
  const [checked, setChecked] = React.useState(false);

  return (
    <>
      <Checkbox
        _dark={{
          value: "checkbox",
          _checked: {
            value: "checkbox",
            bg: "primary.700",
            borderColor: "primary.700",
            _icon: { color: "white" },
          },
        }}
        _light={{
          value: "checkbox",
          _checked: {
            value: "checkbox",
            bg: "primary.900",
            borderColor: "primary.900",
          },
        }}
        mt="5"
        // defaultIsChecked
        value="demo"
        accessibilityLabel="Remember me"
        isChecked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
        onPress={() => {
          props.onchange(!checked);
        }}
      >
        <Text
          pl="1"
          fontWeight="normal"
          _light={{ color: "coolGray.800" }}
          _dark={{ color: "coolGray.400" }}
        >
          Remember me and keep me logged in
        </Text>
      </Checkbox>
    </>
  );
}
