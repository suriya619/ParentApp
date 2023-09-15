import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function IocnSubscribe(props: any) {
  return (
    <Svg
      data-name="Subscribe/icon"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      {...props}
      tabIndex="-1"
    >
      <Path
        tabIndex="-1"
        data-name="Subscribe/icon/container"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <Path
        tabIndex="-1"
        data-name="Subscribe/icon/shape"
        d="M18.4 8.8H5.6V7.2h12.8zM16.8 4H7.2v1.6h9.6zm3.2 8v6.4a1.6 1.6 0 01-1.6 1.6H5.6A1.6 1.6 0 014 18.4V12a1.6 1.6 0 011.6-1.6h12.8A1.6 1.6 0 0120 12zm-4.8 3.2l-4.8-2.616v5.224z"
        fill="#6b7280"
      />
    </Svg>
  );
}
