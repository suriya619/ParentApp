import { useColorModeValue } from 'native-base';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function IconHome(props: any) {
  const iconBgColor = useColorModeValue('#4c1d95', '#7c3aed');

  return (
    <Svg
      tabIndex="-1"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      {...props}
    >
      <G tabIndex="-1" data-name="Group 97889">
        <Path
          tabIndex="-1"
          data-name="Icon material-home"
          d="M10.2 20v-5.647h3.6V20h4.5v-7.529H21L12 4l-9 8.471h2.7V20z"
          fill={iconBgColor}
        />
        <Path
          tabIndex="-1"
          data-name="Rectangle 164565"
          fill="none"
          d="M0 0h24v24H0z"
        />
      </G>
    </Svg>
  );
}
