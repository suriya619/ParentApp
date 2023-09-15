import {
  HStack,
  Avatar,
} from "native-base";
import React from "react";
import FastImage from "react-native-fast-image";

const StaffAvatars = ({ item }) => {
  return (
    <HStack>
      <>
        {item.ImagePath != "" ? (
          <FastImage
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
            }}
            source={{
              uri: item.ImagePath,
              priority: FastImage.priority.normal,
            }}
          />
        ) : (
          <Avatar
            width="10"
            height="10"
            bg={"avatarBg"}
            _text={{ color: "white" }}
          >
            {`${item.FirstName.substring(
              0,
              1
            )}${item.LastName.substring(0, 1)}`}
          </Avatar>
        )}
      </>
    </HStack>
  );
};

export default StaffAvatars;