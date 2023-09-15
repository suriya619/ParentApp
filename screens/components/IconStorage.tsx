import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { useColorMode, useColorModeValue } from 'native-base';

export default function IconStorage(props: any) {
  const iconBgColor = useColorModeValue('#6b7280', '#d1d5db');
  return (
    <Svg
      tabIndex="-1"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      {...props}
    >
      <G tabIndex="-1" data-name="Group 97657">
        <Path
          tabIndex="-1"
          data-name="Icon material-storage"
          d="M3 19.186h18v-3.8H3zm1.8-2.847h1.8v1.9H4.8zM3 4v3.8h18V4zm3.6 2.847H4.8v-1.9h1.8zM3 13.491h18v-3.8H3zm1.8-2.847h1.8v1.9H4.8z"
          fill={iconBgColor}
        />
        <G tabIndex="-1" data-name="Group 97656">
          <G tabIndex="-1" data-name="Group 97647">
            <Path
              tabIndex="-1"
              data-name="Path 79446"
              d="M0 0h24v24H0z"
              fill="none"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}
