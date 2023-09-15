import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useColorMode, useColorModeValue } from 'native-base';

export default function IconTermsAndCondition(props: any) {
  const iconBgColor = useColorModeValue('#6b7280', '#d1d5db');
  return (
    <Svg
      tabIndex="-1"
      data-name="Group 97645"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      {...props}
    >
      <Path
        tabIndex="-1"
        data-name="Path 79446"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <Path
        tabIndex="-1"
        data-name="Path 79447"
        d="M14 3H6.8a1.8 1.8 0 00-1.791 1.8L5 19.2A1.8 1.8 0 006.791 21H17.6a1.805 1.805 0 001.8-1.8V8.4zm1.8 14.4H8.6v-1.8h7.2zm0-3.6H8.6V12h7.2zm-2.7-4.5c-1.238-1.237 0-4.95 0-4.95l4.95 4.95s-3.713 1.237-4.95 0z"
        fill={iconBgColor}
      />
    </Svg>
  );
}
