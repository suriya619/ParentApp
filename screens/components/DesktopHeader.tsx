import React from 'react';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  HStack,
  Icon,
  useColorMode,
  Image,
  Avatar,
  IconButton,
  Menu,
  Pressable,
} from 'native-base';

export default function DesktopHeader(props: any) {
  const { colorMode } = useColorMode();
  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      display={{ base: 'none', md: 'flex' }}
    >
      <HStack space="8" alignItems="center">
        <IconButton
          variant="unstyled"
          icon={
            <Icon
              size="6"
              name={'menu-sharp'}
              as={Ionicons}
              _light={{ color: 'coolGray.800' }}
              _dark={{ color: 'coolGray.50' }}
            />
          }
          onPress={() => {
            console.log('hello');
          }}
        />

        {colorMode == 'light' ? (
          <Image
            h="12"
            w="64"
            alt="Your Child's Day "
            resizeMode={'contain'}
            source={require('../../../header_logo_light.png')}
          />
        ) : (
          <Image
            h="12"
            w="64"
            alt="Your Child's Day "
            resizeMode={'contain'}
            source={require('../../../header_logo_dark.png')}
          />
        )}
      </HStack>

      <HStack space="5" alignItems="center">
        <IconButton
          variant="unstyled"
          icon={
            <Icon
              size="6"
              name={'bell'}
              as={FontAwesome}
              color="coolGray.400"
            />
          }
          onPress={() => {
            console.log('hello');
          }}
        />
        <Menu
          p="0"
          trigger={(triggerProps) => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <Avatar
                  w="8"
                  h="8"
                  borderWidth="2"
                  _dark={{ borderColor: 'primary.700' }}
                  source={{
                    uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                  }}
                />
              </Pressable>
            );
          }}
          mr="38"
          placement="bottom left"
        >
          <Menu.Item _dark={{ bg: 'coolGray.900' }}>Logout</Menu.Item>
          {/* <Menu.Item _dark={{ bg: 'coolGray.900' }}>New broadcast</Menu.Item>
          <Menu.Item _dark={{ bg: 'coolGray.900' }}>Settings</Menu.Item> */}
        </Menu>
      </HStack>
    </HStack>
  );
}
