import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { useColorMode, useColorModeValue } from 'native-base';
export default function IconHelp(props: any) {
  const iconBgColor = useColorModeValue('#6b7280', '#d1d5db');
  return (
    <Svg
      tabIndex="-1"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      {...props}
    >
      <G tabIndex="-1" data-name="Group 97650">
        <Path
          tabIndex="-1"
          data-name="Icon material-help"
          d="M12 3a9 9 0 109 9 9 9 0 00-9-9zm.9 15.3h-1.8v-1.8h1.8zm1.863-6.975l-.81.828A3.064 3.064 0 0012.9 14.7h-1.8v-.45a3.623 3.623 0 011.053-2.55l1.116-1.134A1.76 1.76 0 0013.8 9.3a1.8 1.8 0 00-3.6 0H8.4a3.6 3.6 0 017.2 0 2.864 2.864 0 01-.837 2.025z"
          fill={iconBgColor}
        />
        <G tabIndex="-1" data-name="Group 97647">
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
