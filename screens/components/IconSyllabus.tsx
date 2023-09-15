import { useColorModeValue } from 'native-base';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function IconSyllabus(props: any) {
  const iconBgColor = useColorModeValue('#4c1d95', '#6d28d9');
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      {...props}
      tabIndex="-1"
    >
      <G data-name="Syllabus/icon" tabIndex="-1">
        <Path
          tabIndex="-1"
          data-name="Syllabus/icon/container"
          fill="none"
          d="M0 0h22v22H0z"
        />
        <Path
          tabIndex="-1"
          data-name="Syllabus/icon/shape 4"
          d="M19.291 3.577a10.37 10.37 0 00-3.2-.477 8.237 8.237 0 00-5.027 1.431A8.237 8.237 0 006.037 3.1 8.237 8.237 0 001.01 4.531v13.978a.5.5 0 00.457.477c.091 0 .137-.048.229-.048a10.77 10.77 0 014.342-1.05 8.237 8.237 0 015.027 1.431 10.659 10.659 0 015.027-1.431 8.98 8.98 0 014.342 1 .4.4 0 00.229.048.5.5 0 00.457-.477V4.531a6.137 6.137 0 00-1.829-.954zm0 12.881a10.209 10.209 0 00-3.2-.477 10.659 10.659 0 00-5.027 1.431V6.439a10.659 10.659 0 015.027-1.431 10.209 10.209 0 013.2.477z"
          fill={iconBgColor}
        />
        <Path
          tabIndex="-1"
          data-name="Syllabus/icon/shape 3"
          d="M15.568 8.696a11.8 11.8 0 012.523.262V7.424a13.627 13.627 0 00-2.523-.242 11.613 11.613 0 00-4.541.838v1.675a9.369 9.369 0 014.541-.999z"
          fill={iconBgColor}
        />
        <Path
          tabIndex="-1"
          data-name="Syllabus/icon/shape 2"
          d="M11.027 10.705v1.675a9.369 9.369 0 014.541-1 11.8 11.8 0 012.523.262v-1.537a13.627 13.627 0 00-2.523-.242 11.8 11.8 0 00-4.541.842z"
          fill={iconBgColor}
        />
        <Path
          tabIndex="-1"
          data-name="Syllabus/icon/shape 1"
          d="M15.568 12.561a11.613 11.613 0 00-4.541.838v1.675a9.369 9.369 0 014.541-1 11.8 11.8 0 012.523.262v-1.533a12.814 12.814 0 00-2.523-.242z"
          fill={iconBgColor}
        />
      </G>
    </Svg>
  );
}
