import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function IconPerson(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={8.83}
      height={13.95}
      {...props}
      tabIndex="-1"
    >
      <Path
        tabIndex="-1"
        data-name="icon/shape 2"
        d="M8.823 13.122l-.6-4.651a.738.738 0 00-.166-.376L5.8 5.369V.63C5.8.182 5.55 0 5.075 0h-1.47A.65.65 0 003.3.091L.606 1.347A1.2 1.2 0 000 2.484v2.587a.725.725 0 101.45 0V2.766a.313.313 0 01.174-.281l1.276-.65v2.983a.623.623 0 00.182.444L6.743 9a.3.3 0 01.087.178l.563 4.148a.718.718 0 00.717.622h.079a.748.748 0 00.634-.826z"
        fill="#6b7280"
      />
    </Svg>
  );
}
