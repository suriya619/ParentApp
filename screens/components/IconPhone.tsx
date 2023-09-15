import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function IconPhone(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16.023}
      height={16.023}
      {...props}
      tabIndex="-1"
    >
      <Path
        tabIndex="-1"
        data-name="Icon material-local-phone"
        d="M3.222 6.935A13.485 13.485 0 009.089 12.8l1.958-1.958a.885.885 0 01.908-.214 10.154 10.154 0 003.178.507.893.893 0 01.89.89v3.107a.893.893 0 01-.89.89A15.132 15.132 0 010 .89.893.893 0 01.89 0h3.116a.893.893 0 01.89.89A10.113 10.113 0 005.4 4.068a.893.893 0 01-.223.908L3.222 6.935z"
        fill="#4c1d95"
      />
    </Svg>
  );
}
