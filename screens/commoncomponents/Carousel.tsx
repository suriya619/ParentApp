import moment from "moment";
import { Center, HStack, Pressable, Text, VStack } from "native-base";
import React, { useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
} from "react-native";
import FastImage from "react-native-fast-image";
import ImageView from "react-native-image-viewing";
import { useDispatch } from "react-redux";
import ImgToBase64 from "react-native-image-base64";
import * as FileSystem from "expo-file-system";

type Carousel = {
  images: any[];
  height: any;
  date: any;
};

const imgetobse64 = async (url) => {
  ImgToBase64.getBase64String(url)
    .then(
      (base64String:any) => {
        return base64String;
      }
    )
    .catch((err:any) => console.log("Err", err));
  // const base64 = await FileSystem.readAsStringAsync(url, {
  //   encoding: "base64",
  // }).then((response) => {
  //   console.log("Respone ", response);
  //   return response;
  // });

  // let imgs;
  // try {
  //   const { uri } = await FileSystem.downloadAsync(
  //     url,
  //     FileSystem.documentDirectory + "bufferimg.jpeg"
  //   );
  //   imgs = await FileSystem.readAsStringAsync(uri, {
  //     encoding: "base64",
  //   });
  //   console.log("Images ======== ", imgs);
  // } catch (err) {
  //   console.log(err);
  // }
  // return imgs;
  //base64 res
  // var data = await RNFS.readFile(url, "base64").then((res) => {
  //   console.log("res=====", res);
  //   return res;
  // });
};

const Carousel = ({ images }:any) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [visible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const ref = React.useRef<ScrollView>(null);
  const imagesforFullScreen = images.map((uri:any) => ({ uri }));
  React.useEffect(() => {
    if (containerWidth)
      ref.current?.scrollTo({ x: activeIndex * containerWidth });
  }, [activeIndex, containerWidth]);

  let timeout = React.useRef<any>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (containerWidth) {
      if (timeout) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        const nextActiveIndex = Math.round(
          e.nativeEvent.contentOffset.x / containerWidth
        );
        if (nextActiveIndex !== activeIndex) {
          setActiveIndex(nextActiveIndex);
        } else {
          ref.current?.scrollTo({ x: activeIndex * containerWidth });
        }
      }, 50);
    }
  };

  const onMomentumScrollEnd = (e: any) => {
    const nextActiveIndex = Math.round(
      e.nativeEvent.contentOffset.x / containerWidth
    );
    if (activeIndex !== nextActiveIndex) {
      setActiveIndex(nextActiveIndex);
      return nextActiveIndex;
    }
  };
  return (
    <VStack
      mx={2}
      style={{ height: images.length > 1 ? 315 : 310 }}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        ref={ref}
        // RN Web doesn't support onMomentumScrollEnd so use onScroll
        onScroll={Platform.OS === "web" ? onScroll : undefined}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        // Paging enabled is only supported in native
        pagingEnabled={Platform.OS !== "web"}
      >
        {images.map((image:any, idx:any) => {
          return (
            <Pressable
              onPress={() => {
                setIsVisible(true);
                setActiveIndex(idx);
              }}
              key={image}
            >
              <FastImage
                key={idx}
                // onLoadEnd={console.log("On Load End")}
                style={{
                  width: containerWidth || Dimensions.get("window").width - 30,
                  height: 310,
                  justifyContent: "center",
                }}
                source={{
                  uri: image,
                  // uri: `data:image/jpeg;base64,${imgetobse64(image)}}`,
                  priority: FastImage.priority.normal,
                  // cache: FastImage.cacheControl.cacheOnly,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </Pressable>
          );
        })}
      </ScrollView>

      <HStack background="#fff" mt={3}>
        {images.length > 1 ? (
          <Center
            justifyContent="center"
            alignItems="center"
            position="absolute"
            alignSelf="center"
            top="0"
            left="0"
            right="0"
            bottom="0"
          >
            <HStack space="1">
              {images.map((_image:any, index:any) => {
                return (
                  <Pressable onPress={() => setActiveIndex(index)} key={index}>
                    <Center
                      bg={
                        index === activeIndex ? "primary.500" : "coolGray.300"
                      }
                      p="1"
                      rounded="full"
                    />
                  </Pressable>
                );
              })}
            </HStack>
          </Center>
        ) : null}
      </HStack>

      {visible ? (
        <ImageView
          key={Math.random()}
          images={imagesforFullScreen}
          imageIndex={activeIndex}
          visible={visible}
          doubleTapToZoomEnabled={false}
          onRequestClose={() => setIsVisible(false)}
        />
      ) : null}
    </VStack>
  );
};

export default React.memo(Carousel);
