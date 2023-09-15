import * as React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';
import { Platform } from 'react-native';

export default function IconCheckIn({props, color}: any) {
    return (
        <Svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <Path d="M18,10 C18,5.589 14.411,2 10,2 C5.589,2 2,5.589 2,10 C2,14.411 5.589,18 10,18 C14.411,18 18,14.411 18,10 M20,10 C20,15.523 15.523,20 10,20 C4.477,20 0,15.523 0,10 C0,4.477 4.477,0 10,0 C15.523,0 20,4.477 20,10 M16,11 C16,11.552 15.552,12 15,12 L11,12 C9.895,12 9,11.105 9,10 L9,5 C9,4.448 9.448,4 10,4 C10.552,4 11,4.448 11,5 L11,9 C11,9.55 11.45,10 12,10 L15,10 C15.552,10 16,10.448 16,11" id="path-1" 
             fill={color} />
            <G id="Icon---Check-In" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
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