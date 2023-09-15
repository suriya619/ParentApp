import { Link } from "native-base";
import React from "react";

export default function LinkTextLayout(props: any) {
  return (
    <>
      <Link
        onPress={() => {
          props.onchange();
        }}
        ml={props.linkText === "Forgot password?" ? "auto" : null}
        _text={{
          fontSize: "sm",
          fontWeight: "bold",
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
        {props.linkText}
      </Link>
    </>
  );
}
