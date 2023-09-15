import * as React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { useColorMode, useColorModeValue } from 'native-base';
export default function IconLegal(props: any) {
  const iconBgColor = useColorModeValue('#6b7280', '#d1d5db');
  return (
    <Svg
      tabIndex="-1"
      data-name="Group 97654"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      {...props}
    >
      <G tabIndex="-1" data-name="Group 97651">
        <Path
          tabIndex="-1"
          data-name="Rectangle 164507"
          fill="none"
          d="M0 0h24v24H0z"
        />
      </G>
      <G tabIndex="-1" data-name="Group 97653">
        <G
          tabIndex="-1"
          data-name="Group 97652"
          transform="translate(4 3)"
          fill={iconBgColor}
        >
          <Path
            tabIndex="-1"
            data-name="Path 79450"
            d="M15.158 3.273L7.579 0 0 3.273v4.909A10.229 10.229 0 007.579 18a9.58 9.58 0 004.952-3.035L9.9 12.412a4.3 4.3 0 01-5.3-.524 4.012 4.012 0 010-5.785 4.3 4.3 0 015.954 0 4.009 4.009 0 01.546 5.147l2.442 2.373a10.2 10.2 0 001.617-5.441z"
          />
          <Circle
            tabIndex="-1"
            data-name="Ellipse 20"
            cx={2.532}
            cy={2.532}
            r={2.532}
            transform="translate(4.948 6.561)"
          />
        </G>
      </G>
    </Svg>
  );
}
