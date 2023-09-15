import React from 'react';
import {
  Box,
  VStack,
  StatusBar,
  ScrollView,
  HStack,
  Icon,
  Image,
  Text,
  Hidden,
  useColorMode,
  IconButton,
  Divider,
  Menu,
  Avatar,
  Button,
  Input,
} from 'native-base';

import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function Sidebar() {
  const list = [
    {
      iconName: 'person-outline',
      iconText: 'Contacts',
    },
    {
      iconName: 'groups',
      iconText: 'Group',
    },
    {
      iconName: 'notifications-none',
      iconText: 'Notification',
    },
    {
      iconName: 'shopping-bag',
      iconText: 'Orders',
    },
    {
      iconName: 'settings',
      iconText: 'Settings',
      iconColorLight: 'primary.900',
      textColorLight: 'primary.900',
      iconColorDark: 'violet.500',
      textColorDark: 'violet.500',
    },
    {
      iconName: 'shield',
      iconText: 'Privacy Policy',
    },
    {
      iconName: 'support-agent',
      iconText: 'Help & Support',
    },
    {
      iconName: 'share',
      iconText: 'Refer & Earn',
    },
  ] as any;

  return (
    <Box
      w="80"
      display="flex"
      borderRightWidth="1"
      _light={{ bg: 'white', borderRightColor: 'coolGray.200' }}
      _dark={{ bg: 'coolGray.900', borderRightColor: 'coolGray.800' }}
    >
      <ScrollView>
        <VStack
          pb="4"
          mt="10"
          space="3"
          alignItems="center"
          borderBottomWidth="1"
          _light={{
            borderBottomColor: 'coolGray.200',
          }}
          _dark={{
            borderBottomColor: 'coolGray.800',
          }}
        >
          <Avatar
            source={require('../assets/women.jpg')}
            width={{ base: 20, md: 40 }}
            height={{ base: 20, md: 40 }}
          />
          <HStack alignItems="center" justifyContent="center" space="2">
            <Text
              fontSize="xl"
              fontWeight="bold"
              _light={{ color: 'coolGray.800' }}
            >
              Jane Doe
            </Text>
          </HStack>
          <Text
            fontSize="md"
            fontWeight="medium"
            textAlign="center"
            _light={{ color: 'coolGray.500' }}
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
                    _dark={{ color: 'coolGray.50' }}
                    _light={{ color: 'coolGray.500' }}
                  />
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    _dark={{ color: 'coolGray.50' }}
                    _light={{ color: 'coolGray.800' }}
                  >
                    {item.iconText}
                  </Text>
                </HStack>
              </Button>
            );
          })}
        </VStack>
        <Divider _dark={{ bgColor: 'coolGray.800' }} />
        <Box px="4" py="2">
          <Button variant="ghost" justifyContent="flex-start" py="4" px="5">
            <HStack space="4" alignItems="center">
              <Icon
                size="6"
                as={MaterialIcons}
                name="exit-to-app"
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'coolGray.500' }}
              />
              <Text
                fontSize="md"
                fontWeight="medium"
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'coolGray.800' }}
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
      _dark={{ bg: 'coolGray.900', borderColor: 'coolGray.800' }}
      _light={{
        bg: { base: 'primary.900', md: 'white' },
        borderColor: 'coolGray.200',
      }}
    >
      <VStack
        alignSelf="center"
        width="100%"
        maxW={props.menuButton ? null : '1016px'}
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
                    _light={{ color: 'coolGray.800' }}
                    _dark={{ color: 'coolGray.50' }}
                  />
                }
              />
            )}
            {colorMode == 'light' ? (
              <Image
                h="10"
                w="56"
                alt="Your Child's Day"
                resizeMode="contain"
                source={require('../assets/header_logo_light.png')}
              />
            ) : (
              <Image
                h="10"
                w="56"
                alt="Your Child's Day"
                resizeMode="contain"
                source={require('../assets/header_logo_dark.png')}
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
                  name={'search'}
                  as={FontAwesome}
                  _light={{
                    color: 'coolGray.400',
                  }}
                  _dark={{
                    color: 'coolGray.100',
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
                    color: 'coolGray.200',
                  }}
                  _light={{
                    color: 'coolGray.400',
                  }}
                />
              }
            />
            <Menu
              w="190"
              closeOnSelect={false}
              onOpen={() => console.log('opened')}
              onClose={() => console.log('closed')}
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
                        // borderWidth="1"
                        _dark={{ bg: 'coolGray.200' }}
                        // _dark={{ borderColor: 'primary.700' }}
                        source={{
                          uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        }}
                      />
                    }
                  />
                );
              }}
              //@ts-ignore
              _dark={{ bg: 'coolGray.800', borderColor: 'coolGray.700' }}
            >
              <Menu.Group title="Profile">
                <Menu.Item>Account</Menu.Item>
              </Menu.Group>
              <Divider mt="3" w="100%" _dark={{ bg: 'coolGray.700' }} />
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
      {props.children}
    </VStack>
  );
}

export function MobileHeader(props: any) {
  return (
    <Box
      px="1"
      pt="4"
      pb="4"
      _dark={{ bg: 'coolGray.900', borderColor: 'coolGray.800' }}
      _light={{
        bg: { base: 'primary.900', md: 'white' },
        borderColor: 'coolGray.200',
      }}
    >
      <HStack space="2" alignItems="center">
        <IconButton
          colorScheme="light"
          variant="ghost"
          icon={
            <Icon
              size="6"
              as={AntDesign}
              name={'arrowleft'}
              color="coolGray.50"
            />
          }
        />
        <Avatar
          source={{
            uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          }}
          _dark={{
            borderColor: 'primary.700',
          }}
          w="12"
          h="12"
        />
        <VStack>
          {props.subTitle ? (
            <>
              <Text color="coolGray.50" fontSize="sm" fontWeight="bold">
                {props.title}
              </Text>
              <Text color="coolGray.200" fontSize="xs">
                {props.subTitle}
              </Text>
            </>
          ) : (
            <Text color="coolGray.50" fontSize="lg">
              {props.title}
            </Text>
          )}
        </VStack>
        <HStack ml="auto" space="1" alignItems="center">
          <IconButton
            variant="ghost"
            colorScheme="light"
            icon={
              <Icon
                size="6"
                color="coolGray.50"
                as={MaterialIcons}
                name={'search'}
              />
            }
          />
          <Menu
            p="0"
            trigger={(triggerProps) => {
              return (
                <IconButton
                  variant="ghost"
                  colorScheme="light"
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                  icon={
                    <Icon
                      size="6"
                      color="coolGray.50"
                      name={'dots-vertical'}
                      as={MaterialCommunityIcons}
                    />
                  }
                />
              );
            }}
            placement="bottom right"
          >
            <Menu.Item _dark={{ bg: 'coolGray.900' }}>New group</Menu.Item>
            <Menu.Item _dark={{ bg: 'coolGray.900' }}>New broadcast</Menu.Item>
            <Menu.Item _dark={{ bg: 'coolGray.900' }}>Settings</Menu.Item>
          </Menu>
        </HStack>
      </HStack>
    </Box>
  );
}

export default function ChatLayout({
  displayScreenTitle = true,
  displaySidebar = true,
  header = {
    menuButton: true,
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

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box
        safeAreaTop
        _light={{ bg: 'primary.900' }}
        _dark={{ bg: 'coolGray.900' }}
      />
      <VStack
        flex={1}
        _light={{ bg: 'primary.50' }}
        _dark={{ bg: 'customGray' }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ width: '100%', height: '100%' }}
        >
          <Hidden from="md">
            <MobileHeader
              title={props.title}
              subTitle={props.subTitle}
              backButton={mobileHeader.backButton}
            />
          </Hidden>
          <Hidden till="md">
            <Header
              toggleSidebar={toggleSidebar}
              title={props.title}
              menuButton={displaySidebar}
              searchbar={header.searchbar}
            />
          </Hidden>
          <Box
            flex={1}
            safeAreaBottom
            flexDirection={{ base: 'column', md: 'row' }}
            _light={{
              borderTopColor: 'coolGray.200',
            }}
            _dark={{
              bg: 'coolGray.700',
              borderTopColor: 'coolGray.700',
            }}
          >
            {isSidebarVisible && displaySidebar && (
              <Hidden till="md">
                <Sidebar />
              </Hidden>
            )}

            <VStack alignItems="center" flex={1} p={{ md: 8 }}>
              <MainContent displayScreenTitle={true} {...props} />
            </VStack>
          </Box>
        </KeyboardAwareScrollView>
      </VStack>
    </>
  );
}
