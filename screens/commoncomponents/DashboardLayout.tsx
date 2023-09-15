import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Menu,
  ScrollView,
  StatusBar,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import React from "react";
import { StyleSheet, View, Text as RNText, TouchableOpacity } from "react-native";
import useThemedStyles from "../../context/useThemedStyles";
import { AppFontSizes, AppTypography } from "../../assets/styles/themes";
import Icons from "../../assets/icons/icons";
import useTheme from "../../context/useTheme";

export function Sidebar() {
  const list = [
    {
      iconName: "person-outline",
      iconText: "Contacts",
    },
    {
      iconName: "groups",
      iconText: "Group",
    },
    {
      iconName: "notifications-none",
      iconText: "Notification",
    },
    {
      iconName: "shopping-bag",
      iconText: "Orders",
    },
    {
      iconName: "settings",
      iconText: "Settings",
      iconColorLight: "primary.900",
      textColorLight: "primary.900",
      iconColorDark: "violet.500",
      textColorDark: "violet.500",
    },
    {
      iconName: "shield",
      iconText: "Privacy Policy",
    },
    {
      iconName: "support-agent",
      iconText: "Help & Support",
    },
    {
      iconName: "share",
      iconText: "Refer & Earn",
    },
  ] as any;
  return (
    <Box
      w="80"
      borderRightWidth="1"
      display="flex"
      _light={{ bg: "white", borderRightColor: "coolGray.200" }}
      _dark={{ bg: "coolGray.900", borderRightColor: "coolGray.800" }}
    >
      <ScrollView>
        <VStack
          pb="4"
          mt="10"
          space="3"
          alignItems="center"
          borderBottomWidth="1"
          _light={{
            borderBottomColor: "coolGray.200",
          }}
          _dark={{
            borderBottomColor: "coolGray.800",
          }}
        >
          <Avatar
            source={require("../../assets/women.jpg")}
            width={{ base: 20, md: 40 }}
            height={{ base: 20, md: 40 }}
          />
          <HStack alignItems="center" justifyContent="center" space="2">
            <Text
              fontSize="xl"
              fontWeight="bold"
              _light={{ color: "coolGray.800" }}
            >
              Jane Doe
            </Text>
          </HStack>
          <Text
            fontSize="md"
            fontWeight="medium"
            textAlign="center"
            _light={{ color: "coolGray.500" }}
          >
            janedoe2@mydomain.com
          </Text>
        </VStack>
        <VStack px="4" py="4">
          {list.map((item: any, idx: number) => {
            return (
              <Button
                key={idx}
                variant="ghost"
                justifyContent="flex-start"
                py="4"
                px="5"
              >
                <HStack space="4" alignItems="center">
                  <Icon
                    size="6"
                    as={MaterialIcons}
                    name={item.iconName}
                    _dark={{ color: "coolGray.50" }}
                    _light={{ color: "coolGray.500" }}
                  />
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    _dark={{ color: "coolGray.50" }}
                    _light={{ color: "coolGray.800" }}
                  >
                    {item.iconText}
                  </Text>
                </HStack>
              </Button>
            );
          })}
        </VStack>
        <Divider _dark={{ bgColor: "coolGray.800" }} />
        <Box px="4" py="2">
          <Button variant="ghost" justifyContent="flex-start" py="4" px="5">
            <HStack space="4" alignItems="center">
              <Icon
                size="6"
                as={MaterialIcons}
                name="exit-to-app"
                _dark={{ color: "coolGray.50" }}
                _light={{ color: "coolGray.500" }}
              />
              <Text
                fontSize="md"
                fontWeight="medium"
                _dark={{ color: "coolGray.50" }}
                _light={{ color: "coolGray.800" }}
              >
                Logout
              </Text>
            </HStack>
          </Button>
        </Box>
      </ScrollView>
    </Box>
  );
}

export function Header(props: any) {

  const { colorMode } = useColorMode();

  return (
    <Box
      px="6"
      pt="3"
      pb="3"
      borderBottomWidth="1"
      _dark={{ bg: "coolGray.900", borderColor: "coolGray.800" }}
      _light={{
        bg: { base: "primary.500", md: "white" },
        borderColor: "coolGray.200",
      }}
    >
      <VStack
        alignSelf="center"
        width="100%"
        maxW={props.menuButton ? null : "1016px"}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <HStack space="4" alignItems="center">
            {props.menuButton && (
              <IconButton
                variant="ghost"
                colorScheme="light"
                onPress={props.toggleSidebar}
                icon={
                  <Icon
                    size="6"
                    name="menu-sharp"
                    as={Ionicons}
                    _light={{ color: "coolGray.800" }}
                    _dark={{ color: "coolGray.50" }}
                  />
                }
              />
            )}

            {colorMode == "light" ? (
              <Image
                h="10"
                w="56"
                alt="Your Child's Day"
                resizeMode="contain"
                source={require("../../assets/header_logo_light.png")}
              />
            ) : (
              <Image
                h="10"
                w="56"
                alt="Your Child's Day"
                resizeMode="contain"
                source={require("../../assets/header_logo_dark.png")}
              />
            )}
          </HStack>
          {props.searchbar && (
            <Input
              px="4"
              w="30%"
              size="sm"
              placeholder="Search"
              InputLeftElement={
                <Icon
                  px="2"
                  size="4"
                  name={"search"}
                  as={FontAwesome}
                  _light={{
                    color: "coolGray.400",
                  }}
                  _dark={{
                    color: "coolGray.100",
                  }}
                />
              }
            />
          )}

          <HStack space="2" alignItems="center">
            <IconButton
              variant="ghost"
              colorScheme="light"
              icon={
                <Icon
                  size="6"
                  name="bell"
                  as={FontAwesome}
                  _dark={{
                    color: "coolGray.200",
                  }}
                  _light={{
                    color: "coolGray.400",
                  }}
                />
              }
            />
            <Menu
              closeOnSelect={false}
              w="200"
              placement="bottom right"
              onOpen={() => console.log("opened")}
              onClose={() => console.log("closed")}
              trigger={(triggerProps) => {
                return (
                  <IconButton
                    {...triggerProps}
                    variant="ghost"
                    colorScheme="light"
                    icon={
                      <Avatar
                        w="8"
                        h="8"
                        _dark={{ bg: "coolGray.200" }}
                        source={require("../../assets/women.jpg")}
                      />
                    }
                  />
                );
              }}
              //@ts-ignore
              _dark={{ bg: "coolGray.800", borderColor: "coolGray.700" }}
            >
              <Menu.Group title="Profile">
                <Menu.Item>Account</Menu.Item>
              </Menu.Group>
              <Divider mt="3" w="100%" _dark={{ bg: "coolGray.700" }} />
              <Menu.Group title="Shortcuts">
                <Menu.Item>Settings</Menu.Item>
                <Menu.Item>Logout</Menu.Item>
              </Menu.Group>
            </Menu>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}

function MainContent(props: any) {
  return (
    <VStack maxW="1016px" flex={1} width="100%">
      {/* {props.displayScreenTitle && (
        <Hidden till="md">
          <HStack mb="4" space={2} alignItems="center">
            <Text
              fontSize="lg"
              _dark={{ color: "coolGray.50" }}
              _light={{ color: "coolGray.800" }}
            >
              {props.title}
            </Text>
          </HStack>
        </Hidden>
      )} */}
      {props.children}
    </VStack>
  );
}

export function MobileHeader(props: any) {
  const navigation = useNavigation();
  const { colorMode } = useColorMode();
  const styles = useThemedStyles(style);
  const theme = useTheme();
  return (
    <>
      {/* <Box
        px="1"
        pt={{ base: "2", md: "6" }}
        pb={{ base: "1", md: "5" }}
        _dark={{ bg: "coolGray.900", borderColor: "coolGray.800" }}
        _light={{
          bg: "primary.500",
          borderColor: "coolGray.200",
        }}
      >
        <HStack justifyContent="space-between">
          <HStack
            flex="1"
            justifyContent="space-between"
            alignItems="center"
          >
            <HStack alignItems="center" >
              {props.backButton && (
                <IconButton
                  variant="ghost"
                  _pressed={{
                    bg: colorMode === "light" ? "primary.300" : "coolGray.500",
                  }}
                  colorScheme="light"
                  onPress={() => {
                    navigation.goBack();
                  }}
                  icon={
                    <Icon
                      size="6"
                      as={AntDesign}
                      name="arrowleft"
                      color="coolGray.50"
                    />
                  }
                />
              )}

              <Text flexShrink="1" color="coolGray.50" fontSize="lg" px="3">
                {props.title}
              </Text>
            </HStack>

            {props.notificon && (
              <IconButton
                variant="ghost"
                colorScheme="light"
                onPress={() => {
                  navigation.navigate("Notification");
                }}
                icon={
                  <Icon
                    size="6"
                    name="bell"
                    as={FontAwesome}
                    _dark={{
                      color: "coolGray.200",
                    }}
                    _light={{
                      color: "coolGray.50",
                    }}
                  />
                }
              />
            )}
          </HStack>
        </HStack>
      </Box> */}
      <View style={styles.headerView}>
        <View style={styles.contentView}>
          <View style={styles.titleView}>
            {props.backButton && (
              <TouchableOpacity
                style={styles.iconButtonView}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icons type="AntDesign" name={"arrowleft"} color={theme?.colors?.coolGray[50]} size={24} />
              </TouchableOpacity>
            )}

            <RNText style={styles.headerTitle}>
              {props.title}
            </RNText>
          </View>
          {props.notificon && (
            <TouchableOpacity
              style={styles.iconButtonView}
              onPress={() => {
                navigation.navigate("Notification");
              }}
            >
              <Icons type="FontAwesome" name={"bell"} color={theme?.isLightTheme? theme?.colors?.coolGray[50] : theme?.colors?.coolGray[200]} size={24} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}

const style = (theme: any) => StyleSheet.create({
  headerView: {
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 4,
    backgroundColor: theme?.colors?.primaryTextColor,
    borderColor: theme?.isLightTheme ? theme?.colors?.coolGray[200] : theme?.colors?.coolGray[800]
  },
  contentView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  contentInnerView: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center"
  },
  headerTitle: {
    lineHeight: 27,
    flexShrink: 1,
    paddingHorizontal: 12,
    fontFamily: AppTypography.Poppins[400].normal,
    fontSize: AppFontSizes.FONT_SIZE_17,
    color: theme?.colors?.coolGray[50]
  },
  iconButtonView: {
    borderRadius: 4,
    padding: 10
  }
})

export default function DashboardLayout({
  scrollable = true,
  displayScreenTitle = true,
  displaySidebar = true,
  header = {
    searchbar: false,
  },
  mobileHeader = {
    backButton: true,
  },
  ...props
}: any) {
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(true);
  function toggleSidebar() {
    setIsSidebarVisible(!isSidebarVisible);
  }

  // const safeAreaProps = useSafeArea({
  //   safeAreaTop: '20',
  //   //  pt: 15
  // });

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box
        safeAreaTop
        _light={{ bg: "#366775" }}
        _dark={{ bg: "coolGray.900" }}
      />

      <VStack flex={1} _light={{ bg: "#fff" }} _dark={{ bg: "coolGray.50" }}>
        {/* <Hidden from="md"> */}
        <MobileHeader
          title={props.title}
          backButton={mobileHeader.backButton}
          notificon={mobileHeader.notificon}
        />
        {/* </Hidden> */}
        {/* <Hidden till="md">
          <Header
            toggleSidebar={toggleSidebar}
            title={props.title}
            menuButton={displaySidebar}
            searchbar={header.searchbar}
          />
        </Hidden> */}

        <Box
          flex={1}
          safeAreaBottom
          flexDirection={{ base: "column", md: "row" }}
          _light={{
            borderTopColor: "coolGray.200",
          }}
          _dark={{
            bg: "coolGray.700",
            borderTopColor: "coolGray.700",
          }}
        >
          {/* {isSidebarVisible && displaySidebar && (
            <Hidden till="md">
              <Sidebar />
            </Hidden>
          )} */}

          {/* <Hidden till="md">
            <ScrollView
              flex={1}
              p={{ md: 5 }}
              contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
            >
              <MainContent {...props} displayScreenTitle={displayScreenTitle} />
            </ScrollView>
          </Hidden> */}

          {/* <Hidden from="md"> */}
          <MainContent {...props} displayScreenTitle={displayScreenTitle} />
          {/* </Hidden> */}
        </Box>
      </VStack>
    </>
  );
}
