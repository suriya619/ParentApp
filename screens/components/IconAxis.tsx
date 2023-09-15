import * as React from 'react';
import Svg, { G, Path, Ellipse, Image } from 'react-native-svg';

export default function IconConfirm(props: any) {
  return (
    <Svg
      tabIndex="-1"
      //   xmlns="http://www.w3.org/2000/svg"
      //   xmlnsXlink="http://www.w3.org/1999/xlink"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      <Image
        id="Image"
        width="30"
        height="30"
        xlinkHref="data:image/png;base64,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"
      />
    </Svg>
  );
}
