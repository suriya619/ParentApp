import { Checkbox, HStack, Link, Text } from "native-base";
import React from "react";

export default function IacceptLinkTextLayout(props: any) {
  
  const { checked, setChecked } = props;

  return (
    <>
      <Checkbox
        _dark={{
          // @ts-ignore
          _checked: { bg: "primary.800", borderColor: "primary.700" },
        }}
        _light={{
          // @ts-ignore
          _checked: { bg: "primary.900" },
        }}
        isChecked={checked}
        value="demo"
        accessibilityLabel="Remember me"
        onChange={() => setChecked(!checked)}
      >
        <HStack alignItems="center" flexDirection="row" flexWrap="wrap">
          <Text
            fontSize="12"
            color="coolGray.800"
            _dark={{ color: "coolGray.400" }}
            flexWrap="wrap"
          >
            I accept the{" "}
          </Text>
          <Link
            href="https://buildingfutures.com.au/privacy-policy/"
            _text={{
              fontSize: "12",
              fontWeight: "semibold",
              textDecoration: "none",
            }}
            _light={{
              _text: {
                color: "primary.900",
              },
            }}
            _dark={{
              _text: {
                color: "primary.700",
              },
            }}
          >
            Terms of Use
          </Link>
          <Text fontSize="12"> & </Text>

          <Link
            href="https://buildingfutures.com.au/privacy-policy/"
            _text={{
              fontSize: "12",
              fontWeight: "semibold",
              textDecoration: "none",
            }}
            _light={{
              _text: {
                color: "primary.900",
              },
            }}
            _dark={{
              _text: {
                color: "primary.700",
              },
            }}
          >
            Privacy Policy
          </Link>
        </HStack>
      </Checkbox>
    </>
  );
}
