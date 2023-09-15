import { useColorModeValue } from 'native-base';
import React from 'react';
import { View, Dimensions } from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const { width } = Dimensions.get('window');
const SkeltonPlaceholderComp = (props: any) => {
  const { type, count } = props;
  return <View style={{marginTop: 10}}>
    <SkeletonPlaceholder borderRadius={4} backgroundColor={useColorModeValue("#E1E9EE", "#1f2937")} highlightColor={useColorModeValue("#F2F8FC", "#374151")}>
    {[...Array(Math.round(count)).keys()].map((el) => <SkeletonPlaceholder key={`${el}_key_gen`} borderRadius={4} >
    <SkeletonPlaceholder.Item width={width - 30} height={260} borderRadius={0} marginHorizontal={15} marginBottom={10} />
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item marginLeft={18}>
          <SkeletonPlaceholder.Item width={width * 0.4} height={20} />
          <SkeletonPlaceholder.Item  marginTop={6}  width={width * 0.3} height={20} />
          <SkeletonPlaceholder.Item marginTop={6} width={width * 0.5} height={20} />
          <SkeletonPlaceholder.Item marginTop={6} width={width * 0.7} height={20} />
          <SkeletonPlaceholder.Item marginTop={6} width={width * 0.9} height={20} />
          <SkeletonPlaceholder.Item marginTop={6} width={width * 0.9} height={20}  marginBottom={20}/>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>) }
    </SkeletonPlaceholder>
  </View>
}

export default SkeltonPlaceholderComp;