import * as React from 'react';
import Svg, { G, Circle, Path, Ellipse } from 'react-native-svg';
import { useColorMode } from 'native-base';

export default function IconLocationColor(props: any) {
  const { colorMode } = useColorMode();
  return (
    <Svg
      tabIndex="-1"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
    >
      <G id="Group_667" data-name="Group 667" transform="translate(-47 -280)">
        <Circle
          id="Ellipse_22"
          data-name="Ellipse 22"
          cx="7.5"
          cy="7.5"
          r="7.5"
          transform="translate(47 280)"
          fill="#fff"
        />
        <Path
          id="Icon_awesome-check-circle"
          data-name="Icon awesome-check-circle"
          d="M15.563,8.062a7.5,7.5,0,1,1-7.5-7.5A7.5,7.5,0,0,1,15.563,8.062ZM7.195,12.034l5.565-5.565a.484.484,0,0,0,0-.684L12.075,5.1a.484.484,0,0,0-.684,0L6.853,9.639,4.734,7.52a.484.484,0,0,0-.684,0L3.366,8.2a.484.484,0,0,0,0,.684l3.145,3.145a.484.484,0,0,0,.684,0Z"
          transform="translate(46.438 279.438)"
          //   fill={'#9ca3af'}
          fill={colorMode == 'light' ? '#4C1D95' : '#7C3AED'}
        />
      </G>
    </Svg>
  );
}
