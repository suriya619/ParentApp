import * as React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';
import { Platform } from 'react-native';

export default function IconLearning({props, color}: any) {


    return (
        <Svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <Path d="M3,11 L17,11 C17.552,11 18,10.552 18,10 C18,9.448 17.552,9 17,9 L3,9 C2.448,9 2,9.448 2,10 C2,10.552 2.448,11 3,11 Z M20,11 C20,12.105 19.105,13 18,13 L2,13 C0.895,13 0,12.105 0,11 L0,9 C0,7.895 0.895,7 2,7 L18,7 C19.105,7 20,7.895 20,9 L20,11 Z M3,4 L11,4 C11.552,4 12,3.552 12,3 C12,2.448 11.552,2 11,2 L3,2 C2.448,2 2,2.448 2,3 C2,3.552 2.448,4 3,4 Z M14,4 C14,5.105 13.105,6 12,6 L2,6 C0.895,6 0,5.105 0,4 L0,2 C0,0.895 0.895,-2.4492936e-16 2,-2.4492936e-16 L12,-2.4492936e-16 C13.105,-2.4492936e-16 14,0.895 14,2 L14,4 Z M9,18 L17,18 C17.552,18 18,17.552 18,17 C18,16.448 17.552,16 17,16 L9,16 C8.448,16 8,16.448 8,17 C8,17.552 8.448,18 9,18 Z M20,18 C20,19.105 19.105,20 18,20 L8,20 C6.895,20 6,19.105 6,18 L6,16 C6,14.895 6.895,14 8,14 L18,14 C19.105,14 20,14.895 20,16 L20,18 Z" id="path-1" 
                fill={color} />
            <G id="Icon---Learning" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
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