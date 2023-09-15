import * as React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';
import { Platform } from 'react-native';


export default function IconDailyCare({props, color}: any) {
  return (
        <Svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <Path d="M16,7.415 L16,9.415 C16,9.967 15.552,10.415 15,10.415 L13,10.415 C12.45,10.415 12,9.965 12,9.415 L12,7.415 C12,6.863 12.448,6.415 13,6.415 L15,6.415 C15.552,6.415 16,6.863 16,7.415 L16,7.415 Z M5,10.415 C4.45,10.415 4,9.965 4,9.415 L4,7.415 C4,6.863 4.448,6.415 5,6.415 L7,6.415 C7.552,6.415 8,6.863 8,7.415 L8,9.415 C8,9.967 7.552,10.415 7,10.415 L5,10.415 Z M5,11.415 L15,11.415 C15,18.415 5,18.415 5,11.415 L5,11.415 Z M10,18 C5.589,18 2,14.411 2,10 C2,5.589 5.589,2 10,2 C14.411,2 18,5.589 18,10 C18,14.411 14.411,18 10,18 L10,18 Z M10,0 C4.477,0 0,4.477 0,10 C0,15.523 4.477,20 10,20 C15.523,20 20,15.523 20,10 C20,4.477 15.523,0 10,0 L10,0 Z" id="path-1" 
           fill={color}  />
            <G id="IconDailyCare" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <G id="Icon/20px/clock-[#1315]">
                    <G id="Group" mask="url(#mask-2)">
                        <G transform="translate(-1.000000, -1.000000)" id="⚙️Atoms/Colour/White">
                        { Platform.OS==="ios" && <Rect id="Colour" fill="#56939F" x="0" y="0" width="22" height="22" /> }
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
  );
}

