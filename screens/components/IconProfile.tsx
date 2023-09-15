import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function IconProfile(props: any) {
  return (
    <Svg
      tabIndex="-1"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      {...props}
    >
      <G tabIndex="-1" data-name="Group 97837">
        <Path
          tabIndex="-1"
          data-name="Rectangle 255"
          fill="none"
          d="M0 0h24v24H0z"
        />
        <Path
          tabIndex="-1"
          data-name="Path 360"
          d="M0 0h24v24H0z"
          fill="none"
        />
        <Path
          tabIndex="-1"
          data-name="Path 361"
          d="M12 4a4 4 0 104 4 4 4 0 00-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          fill="#6b7280"
        />
      </G>
    </Svg>
  );
}
