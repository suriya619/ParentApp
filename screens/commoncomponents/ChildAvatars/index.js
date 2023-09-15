import {
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
  Avatar,
  useColorModeValue,
} from "native-base";
import React from "react";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";

// import childData from '../../api_data/childData.js';

const ChildAvatars = ({ childData, child, setChild }) => {
  // export default function ChildAvatars({ childData, child, setChild }) {

  const { user, accessToken } = useSelector((state) => state.activeUser);

  const ImagePath = "";

  if (childData?.length < 2) return null;

  return (
    <HStack
      alignItems="center"
      
      py={{ base: 3, md: 4 }}
      borderRadius={{ md: "10" }}
      _light={{
        borderColor: "coolGray.200",
        bg: { base: "#fff" },
      }}
      _dark={{
        borderColor: "coolGray.700",
        bg: { md: "coolGray.900", base: "coolGray.800" },
      }}
      borderWidth={{ md: "1" }}
      borderBottomWidth={{ base: "1" }}
      space={{ base: 1 }}
    >
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {(childData || []).map((item, index) => {
          // console.log("Image Path " ,item.ImagePath)
          return (
            <HStack
            
              key={index}
              px={{ base: 4, md: 4 }}
              flex={1}
              justifyContent="space-evenly"
            >
              <VStack space={1} alignItems="center">
                <Pressable
                  onPress={() => {
                    setChild(item);
                  }}
                  alignItems="center"
                >
                  {() => {
                    return (
                      <>
                        {item.ImagePath != "" ? (
                          <FastImage
                            style={{
                              width: 65,
                              height: 65,
                              borderRadius: 50,
                              borderColor:
                                child?.ChildID === item.ChildID
                                  ? "#e79478"
                                  : null,
                              borderWidth:
                                child?.ChildID === item.ChildID ? 3 : 0,
                            }}
                            source={{
                              uri: item.ImagePath,
                              priority: FastImage.priority.normal,
                            }}
                          />
                        ) : (
                          <Avatar
                            width="16"
                            height="16"
                            bg={child?.ChildID === item.ChildID ? "secondary.100" : "avatarBg"}
                            _text={{ color: child?.ChildID === item.ChildID ? "secondary.600" : "white" }}
                            borderColor={
                              child?.ChildID === item.ChildID
                                ? "secondary.500"
                                : null
                            }
                            borderWidth={
                              child?.ChildID === item.ChildID ? "3" : 0
                            }
                          >
                            {`${item.FirstName.substring(
                              0,
                              1
                            )}${item.LastName.substring(0, 1)}`}
                          </Avatar>
                        )}

                        <Text
                          fontSize="xs"
                          // _dark={{ color: "coolGray.50" }}
                          // _light={{ color: "primary.700" }}
                          mt="1"
                          color={
                            child?.ChildID === item.ChildID
                              ? "#e38467"
                              : useColorModeValue("primary.700", "white")
                          }>
                          {item.FirstName} {item.LastName}
                        </Text>
                      </>
                    );
                  }}
                </Pressable>
              </VStack>
            </HStack>
          );
        })}
      </ScrollView>
    </HStack>
  );
};

export default ChildAvatars