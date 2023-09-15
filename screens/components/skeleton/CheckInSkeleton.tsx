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
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <SkeletonPlaceholder.Item width={60} height={60} borderRadius={60} marginHorizontal={15} marginBottom={10} />
          <SkeletonPlaceholder.Item style={{flex:0.9}}>
            <SkeletonPlaceholder.Item width={width * 0.45} height={20} />
            <SkeletonPlaceholder.Item marginTop={6} width={width * 0.3} height={20} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={width * 0.16} height={20} />
        </View>
      </SkeletonPlaceholder>)}
    </SkeletonPlaceholder>
  </View>
}

export default SkeltonPlaceholderComp;