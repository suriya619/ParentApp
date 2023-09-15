import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { Icon } from 'native-base';

export default function IconSuccessful(props: any) {
  return (
    <Svg
      //   xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
    >
      <Path
        tabIndex="-1"
        id="Icon_Done"
        data-name="Icon/Done"
        d="M33,3A30,30,0,1,0,63,33,30.011,30.011,0,0,0,33,3ZM27,48,12,33l4.23-4.23L27,39.51,49.77,16.74,54,21Z"
        transform="translate(-3 -3)"
        fill="#34d399"
      />
    </Svg>
  );
}
