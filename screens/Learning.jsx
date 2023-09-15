import React from "react";
import { useState } from "react";
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Avatar,
  Image,
  Pressable,
  IconButton,
  Center,
  ScrollView,
  Link,
} from "native-base";
import DashboardLayout from "./commoncomponents/DashboardLayout";
import { Feather, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import ChildAvatars from "./commoncomponents/ChildAvatars";
import { Carousel } from "./commoncomponents/Carousel";

const profiles = [
  {
    profileImageUrl: null,
    userName: "Pink Tower",
    userPlace: "Sensorial > Visual",
    timeStamp: "12:30pm",
    feedImageCaption: "First Day At Office. Excited!",
    feedImageUrl: "https://wallpaperaccess.com/full/317501.jpg",
    imageResLight: require("./components/lightMode.jpg"),
    imageResDark: require("./components/darkMode.jpeg"),
    likeIconName: "hearto",
    commentIconName: "message-circle",
    topIconName: "more-vertical",
    shareIconName: "paper-plane-outline",
    likesNumber: "Visual Discrimination",
    likedBy: "",
    commentPersonName:
      "3 dimensions, associated stereognostic sense experience",
    commentText: "",
    numberOfComment: "Staff Name ",
    commentOne: "Staff Comments",
    commentTwo: "",
  },
  {
    profileImageUrl: null,
    userName: "Pink Tower",
    userPlace: "Sensorial > Visual",
    timeStamp: "12:30pm",
    feedImageCaption: "First Day At Office. Excited!",
    feedImageUrl: "https://wallpaperaccess.com/full/317501.jpg",
    imageResLight: require("./components/lightMode.jpg"),
    imageResDark: require("./components/darkMode.jpeg"),
    likeIconName: "hearto",
    commentIconName: "message-circle",
    topIconName: "more-vertical",
    shareIconName: "paper-plane-outline",
    likesNumber: "Visual Discrimination",
    likedBy: "",
    commentPersonName:
      "3 dimensions, associated stereognostic sense experience",
    commentText: "",
    numberOfComment: "Staff Name ",
    commentOne: "Staff Comments",
    commentTwo: "",
  },
];
const iconList = [
  {
    iconName: "plus",
    iconText: "Maths",
  },
  {
    iconName: "lightbulb-outline",
    iconText: "Physics",
  },
  {
    iconName: "beaker",
    iconText: "Chemistry",
  },
  {
    iconName: "virus-outline",
    iconText: "Biology",
  },
];

const trending = [
  {
    imageUri: require("../assets/houseplant.jpg"),
  },
  {
    imageUri: require("../assets/living.jpg"),
  },
  {
    imageUri: require("../assets/women.jpg"),
  },
  {
    imageUri: require("../assets/young-girl.jpg"),
  },
  {
    imageUri: require("../assets/chair.jpeg"),
  },
  {
    imageUri: require("../assets/lamp.jpeg"),
  },
];

function Card(props: any) {
  return (
    <Box width={{ md: 226, base: 320 }} mt="3">
      <Image
        borderTopRadius="lg"
        width={{ md: 226, base: 320 }}
        height="24"
        source={props.item.imageUri}
        alt="Alternate Text"
      />
      <HStack
        borderWidth="1"
        borderTopRadius="none"
        borderRadius="lg"
        _light={{ borderColor: "coolGray.100", bg: "white" }}
        _dark={{ borderColor: "coolGray.700", bg: "coolGray.700" }}
        px="3"
        pt="3"
        justifyContent="space-between"
        alignItems="center"
      >
        <VStack>
          <Text
            fontSize="xs"
            _light={{ color: "coolGray.900" }}
            _dark={{ color: "coolGray.100" }}
            fontWeight="medium"
          >
            Chapter 1
          </Text>
          <Text
            fontSize="sm"
            fontWeight="bold"
            _light={{ color: "coolGray.900" }}
            _dark={{ color: "coolGray.100" }}
          >
            Theory of relativity
          </Text>
          <HStack space="5" mt={1}>
            <Text
              fontSize="xs"
              textAlign="center"
              _light={{ color: "coolGray.800" }}
              _dark={{ color: "coolGray.300" }}
            >
              Active Users
            </Text>
            <Avatar.Group size="xs" mb={5}>
              <Avatar source={require("../assets/women.jpg")}></Avatar>
              <Avatar source={require("../assets/nice-girl.jpg")}></Avatar>
              <Avatar source={require("../assets/smiling.jpg")}></Avatar>
            </Avatar.Group>
          </HStack>
        </VStack>
        <Center bg="red.400" p="1" rounded="full" mb="8">
          <IconButton
            variant="unstyled"
            icon={
              <Icon
                as={Entypo}
                name="controller-play"
                color="coolGray.50"
                size="xs"
              />
            }
          />
        </Center>
      </HStack>
    </Box>
  );
}

function TrendCard(props: any) {
  return (
    <Box
      _light={{ bg: "white" }}
      _dark={{ bg: "coolGray.700" }}
      width={{ md: 300, base: 157 }}
      mt="3"
      rounded="lg"
    >
      <Image
        borderTopRadius="lg"
        width={{ md: 300, base: 157 }}
        height={{ md: 143, base: 24 }}
        source={props.item.imageUri}
        alt="Alternate Text"
      />
      <HStack
        px="3"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        borderWidth="1"
        borderTopRadius="none"
        borderRadius="lg"
        _light={{ borderColor: "coolGray.100" }}
        _dark={{ borderColor: "coolGray.800" }}
      >
        <Text
          _light={{ color: "coolGray.900" }}
          _dark={{ color: "coolGray.50" }}
        >
          Courses {props.courseNo}
        </Text>
      </HStack>
    </Box>
  );
}

const CurrentLearning = () => {
  return profiles.map((item, index) => {
    return (
      <React.Fragment key={index}>
        <VStack
          key={index}
          py={{ base: 4, md: 4 }}
          mb={index === profiles.length - 1 ? "180" : "3"}
          borderRadius={{ md: "8" }}
          _light={{
            borderColor: "coolGray.200",
            bg: { base: "coolGray.50", md: "white" },
          }}
          _dark={{
            borderColor: "coolGray.700",
            bg: { md: "coolGray.900", base: "coolGray.800" },
          }}
          borderWidth={{ md: 1 }}
          space={4}
          width="full"
        >
          <HStack justifyContent="space-between">
            <HStack space={2} alignItems="center" px="4">
              <Avatar
                borderWidth="1"
                _light={{ borderColor: "primary.900" }}
                _dark={{ borderColor: "primary.700" }}
                source={{
                  uri: item.profileImageUrl,
                }}
                width="8"
                height="8"
              />
              <VStack>
                <Text
                  _light={{ color: "coolGray.800" }}
                  _dark={{ color: "coolGray.50" }}
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  {item.userName}
                </Text>
                <Text
                  _light={{ color: "coolGray.500" }}
                  _dark={{ color: "coolGray.300" }}
                  fontSize="xs"
                >
                  {item.userPlace}
                </Text>
              </VStack>
            </HStack>
            <Text
              fontSize="xs"
              _light={{ color: "coolGray.500" }}
              _dark={{ color: "coolGray.300" }}
              pr="3"
            >
              {item.timeStamp}
            </Text>
          </HStack>
          <HStack>
            <Carousel
              images={[
                require("./components/lightMode.jpg"),
                require("./components/darkMode.jpeg"),
                require("./components/lightMode.jpg"),
                require("./components/darkMode.jpeg"),
              ]}
              height="72"
            />
          </HStack>
          <VStack px="4" space={1}>
            <HStack alignItems="center" space={2}>
              <Link
                href=""
                _text={{
                  textDecorationLine: "none",
                  fontSize: "xs",
                  fontWeight: "medium",
                  _light: { color: "coolGray.800" },
                  _dark: { color: "coolGray.50" },
                }}
              >
                {item.likesNumber}
              </Link>

              <Link
                href=""
                _text={{
                  textDecorationLine: "none",
                  fontSize: "xs",
                  fontWeight: "medium",
                  _light: { color: "coolGray.800" },
                  _dark: { color: "coolGray.50" },
                }}
              >
                {item.likedBy}
              </Link>
            </HStack>
            <HStack alignItems="center" space={2}>
              <Link
                href=""
                _text={{
                  textDecorationLine: "none",
                  fontSize: "xs",
                  fontWeight: "normal",
                  _light: { color: "coolGray.800" },
                  _dark: { color: "coolGray.50" },
                }}
              >
                {item.commentPersonName}
              </Link>
              <Text
                fontSize="xs"
                fontWeight="normal"
                _light={{ color: "coolGray.800" }}
                _dark={{ color: "coolGray.400" }}
              >
                {item.commentText}
              </Text>
            </HStack>
            <Pressable
              onPress={() => {
                console.log("hello");
              }}
            >
              <Text
                fontSize="sm"
                fontWeight="medium"
                _light={{ color: "coolGray.500" }}
                _dark={{ color: "coolGray.400" }}
              >
                {item.numberOfComment}
              </Text>
            </Pressable>
            <HStack space={1} alignItems="center">
              <Text
                fontSize="xs"
                fontWeight="normal"
                _light={{ color: "coolGray.800" }}
                _dark={{ color: "coolGray.50" }}
              >
                {item.commentOne}
              </Text>
              <Text
                fontSize="xs"
                fontWeight="normal"
                _light={{ color: "coolGray.800" }}
                _dark={{ color: "coolGray.400" }}
              >
                {item.commentTwo}
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </React.Fragment>
    );
  });
};

const Curriculum = () => {
  return (
    <VStack
      px={{ base: 4, md: 6 }}
      pb={{ base: 200, md: 6 }}
      borderRadius={{ md: "8" }}
      _light={{
        borderColor: "coolGray.200",
        bg: { base: "white" },
      }}
      _dark={{
        borderColor: "coolGray.800",
        bg: "coolGray.800",
      }}
      borderWidth={{ md: "1" }}
    >
      <VStack
        borderRadius="lg"
        _light={{ bg: { md: "white" } }}
        _dark={{ bg: "coolGray.800" }}
      >
        <VStack
          mt="4"
          pb={{ md: 3 }}
          borderTopWidth={{ md: 1 }}
          borderBottomWidth={{ md: 1 }}
          _light={{
            borderColor: "coolGray.200",
          }}
          _dark={{
            borderColor: "coolGray.700",
          }}
        >
          <Text
            _dark={{ color: "coolGray.50" }}
            _light={{ color: "coolGray.800" }}
            fontSize="sm"
            fontWeight="semibold"
          >
            Resume Your Course
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            mx="-6"
          >
            <HStack space="2" mx="6">
              {trending.map((item, index) => {
                return (
                  <Pressable key={index}>
                    <Card item={item} key={index} />
                  </Pressable>
                );
              })}
            </HStack>
          </ScrollView>
        </VStack>
        <VStack
          mt="4"
          pb={{ md: 3 }}
          borderTopWidth={{ md: 1 }}
          borderBottomWidth={{ md: 1 }}
          _light={{
            borderColor: "coolGray.200",
          }}
          _dark={{
            borderColor: "coolGray.700",
          }}
        >
          <Text
            _dark={{ color: "coolGray.50" }}
            _light={{ color: "coolGray.800" }}
            fontSize="md"
            mt="1"
            fontWeight="semibold"
          >
            Categories
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            mx="-6"
          >
            <HStack
              mx="6"
              space="7"
              justifyContent="space-between"
              mt="4"
              alignItems="center"
            >
              {iconList.map((item, index) => {
                return (
                  <VStack space="2" w={60} key={index} alignItems="center">
                    <Center
                      _light={{ bg: "primary.100" }}
                      _dark={{ bg: "coolGray.700" }}
                      p="2"
                      rounded="full"
                      w="12"
                      h="12"
                    >
                      <IconButton
                        variant="unstyled"
                        icon={
                          <Icon
                            as={MaterialCommunityIcons}
                            name={item.iconName}
                            _light={{ color: "primary.900" }}
                            _dark={{ color: "coolGray.50" }}
                            size="5"
                          />
                        }
                      />
                    </Center>
                    <Text
                      fontSize="10"
                      _light={{ color: "coolGray.500" }}
                      _dark={{ color: "coolGray.50" }}
                      textAlign="center"
                    >
                      {item.iconText}
                    </Text>
                  </VStack>
                );
              })}
              <VStack space="2" w={60} alignItems="center">
                <Center
                  _light={{ bg: "primary.100" }}
                  _dark={{ bg: "coolGray.700" }}
                  p="2"
                  rounded="full"
                  w="12"
                  h="12"
                >
                  <IconButton
                    variant="unstyled"
                    icon={
                      <Icon
                        as={Feather}
                        name={"more-vertical"}
                        _light={{ color: "coolGray.800" }}
                        _dark={{ color: "coolGray.50" }}
                        size="sm"
                      />
                    }
                  />
                </Center>
                <Text
                  fontSize="12"
                  _light={{ color: "coolGray.500" }}
                  _dark={{ color: "coolGray.50" }}
                >
                  More
                </Text>
              </VStack>
            </HStack>
          </ScrollView>
        </VStack>

        <Text
          _dark={{ color: "coolGray.50" }}
          _light={{ color: "coolGray.800" }}
          fontSize="md"
          mt="5"
          fontWeight="semibold"
        >
          Trending Courses
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          mx="-6"
        >
          <HStack space="2" mx="6">
            {trending.map((item, index) => {
              return (
                <Pressable key={index}>
                  <TrendCard item={item} courseNo={index + 1} key={index} />
                </Pressable>
              );
            })}
          </HStack>
        </ScrollView>
      </VStack>
    </VStack>
  );
};

const LearningTabs = ({ tabName, setTabName }) => {
  return (
    <>
      <Box
        rounded="sm"
        _light={{ bg: "white" }}
        _dark={{ bg: "customGray" }}
        width={{ base: "100%", md: "96%" }}
      >
        <HStack>
          <Pressable
            alignItems="center"
            flex={1}
            p="2"
            onPress={() => {
              setTabName("Today's Learning");
            }}
            borderBottomWidth={"3px"}
            px={{ base: 0, md: 0 }}
            _light={{
              borderBottomColor:
                tabName == "Today's Learning" ? "secondary.500" : "coolGray.50",
            }}
            _dark={{
              borderBottomColor:
                tabName == "Today's Learning" ? "primary.400" : "customGray",
            }}
          >
            <Text
              fontWeight="medium"
              _light={{
                color:
                  tabName == "Today's Learning"
                    ? "coolGray.800"
                    : "coolGray.400",
              }}
              _dark={{
                color:
                  tabName == "Today's Learning"
                    ? "coolGray.50"
                    : "coolGray.400",
              }}
            >
              Today's Learning
            </Text>
          </Pressable>
          <Pressable
            alignItems="center"
            flex={1}
            p="2"
            onPress={() => {
              setTabName("Curriculum");
            }}
            borderBottomWidth={"3px"}
            _light={{
              borderBottomColor:
                tabName == "Curriculum" ? "secondary.500" : "coolGray.50",
            }}
            _dark={{
              borderBottomColor:
                tabName == "Curriculum" ? "primary.400" : "customGray",
            }}
          >
            <Text
              fontWeight="medium"
              _light={{
                color:
                  tabName == "Curriculum" ? "coolGray.800" : "coolGray.400",
              }}
              _dark={{
                color: tabName == "Curriculum" ? "coolGray.50" : "coolGray.400",
              }}
            >
              Curriculum
            </Text>
          </Pressable>
        </HStack>
      </Box>
    </>
  );
};

export default function (props) {
  const [tabName, setTabName] = React.useState("Today's Learning");
  const child = props.childSelector[0];
  const setChild = props.childSelector[1];

  //console.log("Child=====>" ,child);
  // console.log("SetChild====> ", setChild)

  return (
    <DashboardLayout
      title="Learning"
      displayScreenTitle={false}
      displaySidebar={false}
      mobileHeader={{ backButton: false, notificon: false }}
    >
      <VStack mb="10">
        <ChildAvatars child={child} setChild={setChild} />
        {/* <LearningTabs tabName={tabName} setTabName={setTabName} /> */}
        <ScrollView>
          <VStack
            borderRadius={{ md: "8" }}
            _light={{
              borderColor: "coolGray.200",
              bg: { base: "white" },
            }}
            _dark={{
              borderColor: "coolGray.800",
              bg: { md: "coolGray.900", base: "coolGray.800" },
            }}
            alignItems="center"
            flex={1}
          >
            <CurrentLearning />
          </VStack>
        </ScrollView>
      </VStack>
    </DashboardLayout>
  );
}
