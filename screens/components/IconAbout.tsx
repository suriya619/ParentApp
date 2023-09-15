import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { useColorMode, useColorModeValue } from 'native-base';

export default function IconAbout(props: any) {
  const iconBgColor = useColorModeValue('#6b7280', '#d1d5db');
  return (
    <Svg
      tabIndex="-1"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      {...props}
    >
      <G tabIndex="-1" data-name="Group 97649">
        <Path
          tabIndex="-1"
          data-name="Icon material-perm-device-information"
          d="M12.545 7.909h-1.636v1.636h1.636zm0 3.273h-1.636v4.909h1.636zm3.273-8.174L7.636 3A1.641 1.641 0 006 4.636v14.728A1.641 1.641 0 007.636 21h8.182a1.641 1.641 0 001.636-1.636V4.636a1.634 1.634 0 00-1.636-1.628zm0 14.719H7.636V6.273h8.182z"
          fill={iconBgColor}
        />
        <G tabIndex="-1" data-name="Group 97648">
          <Path
            tabIndex="-1"
            data-name="Path 79446"
            d="M0 0h24v24H0z"
            fill="none"
          />
        </G>
      </G>
    </Svg>
  );
}
