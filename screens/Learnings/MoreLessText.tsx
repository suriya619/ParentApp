import { Text, View } from "native-base";
import React, { useCallback, useState } from "react";
import ReadMore from 'react-native-read-more-text';
import { Platform } from 'react-native';
const MoreLessText = ({ item, paddingTop }) => {
  const noOflines = 3;
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  }
  
  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length > noOflines);
  }, []);
  const _renderTruncatedFooter = (handlePress: any) => {
    return (
      <Text
        fontSize="13"
        fontWeight="medium"
        _light={{ color: "black" }}
        _dark={{ color: "secondary.50" }}
        style={{ lineHeight: 21, color: "#336c78" }}
        onPress={handlePress}>
        Read more
      </Text>
    );
  }

  const _renderRevealedFooter = (handlePress: any) => {
    return (
      <Text
        fontSize="13"
        fontWeight="medium"
        _light={{ color: "black" }}
        _dark={{ color: "secondary.50" }}
        style={{ lineHeight: 21, color: "#336c78" }}
        onPress={handlePress}>
        Show less
      </Text>
    );
  }

  return (
    <View px={5} mb={3} pt={paddingTop? paddingTop : 0}>
      {Platform.OS === "ios" ? <ReadMore
        numberOfLines={noOflines}
        renderTruncatedFooter={_renderTruncatedFooter}
        renderRevealedFooter={_renderRevealedFooter}
      // onReady={this._handleTextReady}
      >
        <Text
          fontWeight="light"
          _light={{ color: "black" }}
          _dark={{ color: "secondary.50" }}
          style={{ lineHeight: 16, fontSize: 12, paddingHorizontal: 5 }}>
          {item}
        </Text>
      </ReadMore>
        : <>
          {item? <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : noOflines}
            fontWeight="light"
            _light={{ color: "black" }}
            _dark={{ color: "secondary.50" }}
            style={{ lineHeight: 16, fontSize: 12 }}>{item}</Text> : null}

          {
            lengthMore ? <Text
              onPress={toggleNumberOfLines}
              fontSize="13"
              fontWeight="medium"
              _light={{ color: "black" }}
              _dark={{ color: "secondary.50" }}
              style={{ lineHeight: 21, color: "#336c78" }}>{textShown ? 'Show less' : 'Read more'}</Text>
              : null
          }
        </>}
    </View>
  )
}
export default MoreLessText;
