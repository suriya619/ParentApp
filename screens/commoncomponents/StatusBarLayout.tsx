import { Box, StatusBar } from "native-base";
import React from "react";

export default function StatusBarLayout(props: any) {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* <Box safeAreaTop bg="primary.900" />   */}

      <Box
        safeAreaTop
        _light={{ bg: "primary.900" }}
        _dark={{ bg: "coolGray.900" }}
      />
    </>
  );
}
