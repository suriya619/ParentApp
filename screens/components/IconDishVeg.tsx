import * as React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';

export default function IconDishVeg(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      {...props}
      tabIndex="-1"
    >
      <G data-name="Icon/veg" transform="translate(-16 -324)" tabIndex="-1">
        <G
          data-name="icon/container"
          fill="#fff"
          stroke="#079561"
          tabIndex="-1"
        >
          <Path tabIndex="-1" stroke="none" d="M16 324h18v18H16z" />
          <Path tabIndex="-1" fill="none" d="M16.5 324.5h17v17h-17z" />
        </G>
        <Circle
          tabIndex="-1"
          data-name="icon/shape"
          cx={4}
          cy={4}
          r={4}
          transform="translate(21 329)"
          fill="#079561"
        />
      </G>
    </Svg>
  );
}
