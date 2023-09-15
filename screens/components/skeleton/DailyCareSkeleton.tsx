import React from 'react';
import { View, Dimensions } from 'react-native';
import { useColorModeValue } from 'native-base';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const { width } = Dimensions.get('window');

const SkeltonPlaceholderComp = (props: { count: number, type: string }): JSX.Element => {
  const { type, count = 1 } = props;
  return <View style={{ marginTop: 10 }}>
    <SkeletonPlaceholder borderRadius={4} backgroundColor={useColorModeValue("#E1E9EE", "#1f2937")} highlightColor={useColorModeValue("#F2F8FC", "#374151")}>
      {[...Array(Math.round(count)).keys()].map((el) => <SkeletonPlaceholder key={`${el}_key_gen`} borderRadius={4} >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
          <SkeletonPlaceholder.Item width={45} height={45} borderRadius={45} marginHorizontal={15} />
          <SkeletonPlaceholder.Item style={{flex:0.9}}>
            <SkeletonPlaceholder.Item width={width * 0.55} height={20} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={width * 0.10} height={20} />
        </View>
      </SkeletonPlaceholder>)}
    </SkeletonPlaceholder>
  </View>
}

export default SkeltonPlaceholderComp;