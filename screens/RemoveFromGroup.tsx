import React from 'react';
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Avatar,
  Image,
  Pressable,
  useColorMode,
  Switch,
  Center,
  Badge,
  Modal,
  Button,
  Divider,
  ScrollView,
} from 'native-base';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import DashboardLayout from './commoncomponents/DashboardLayout';

const userList = [
  {
    imageUrl: require('../assets/handsome.jpg'),
    name: 'Abhilash',
    status: 'Available',
    role: 'Admin',
  },
  {
    imageUrl: require('../assets/women.jpg'),
    name: 'Kattie',
    status: 'Live High',
  },
  {
    imageUrl: require('../assets/young-girl.jpg'),
    name: 'Kattie',
    status: 'Live High',
  },
  {
    imageUrl: require('../assets/thinking-girl.jpg'),
    name: 'Kattie',
    status: 'Live High',
  },
  {
    imageUrl: require('../assets/nice-girl.jpg'),
    name: 'Swapna',
  },
  {
    imageUrl: require('../assets/man.jpg'),
    name: 'John Lli',
    status: 'Available over a call',
  },
  {
    imageUrl: require('../assets/thinking-girl.jpg'),
    name: 'Mary J',
    status: 'Make it happen',
  },
  {
    imageUrl: require('../assets/handsome.jpg'),
    name: 'Swapna',
    status: 'Make it happen',
  },
  {
    imageUrl: require('../assets/confident-man.jpg'),
    name: 'Mary J',
  },
  {
    imageUrl: require('../assets/handsome.jpg'),
    name: 'Mary J',
  },
  {
    imageUrl: require('../assets/eclipse1.jpeg'),
    name: 'Sankalp',
  },
];
const userListTemplate = (user: any, displayDivider: boolean) => {
  return (
    <>
      <HStack justifyContent="space-between" mb="2">
        <HStack space="2" alignItems="center">
          <Avatar source={user.imageUrl}></Avatar>
          <VStack>
            <Text
              fontWeight="medium"
              fontSize="md"
              _light={{ color: 'coolGray.800' }}
              _dark={{ color: 'coolGray.50' }}
            >
              {user.name}
            </Text>
            <Text
              fontWeight="medium"
              fontSize="xs"
              _light={{ color: 'coolGray.400' }}
              _dark={{ color: 'coolGray.200' }}
            >
              {user.status}
            </Text>
          </VStack>
        </HStack>
        {user.role && (
          <Center>
            <Badge
              padding="1"
              borderRadius="4"
              _light={{
                _text: {
                  color: 'primary.900',
                  fontSize: 'xs',
                  fontWeight: 'medium',
                },
                borderColor: 'primary.900',
                bg: 'primary.200',
              }}
              _dark={{
                _text: {
                  color: 'coolGray.50',
                  fontSize: 'xs',
                  fontWeight: 'medium',
                },
                borderColor: 'coolGray.50',
                bg: 'coolGray.900',
              }}
            >
              {user.role}
            </Badge>
          </Center>
        )}
      </HStack>
      {displayDivider && <Divider />}
    </>
  );
};

export default function RemoveFromGroup(props: any) {
  const { colorMode } = useColorMode();
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <>
      <DashboardLayout title="Remove">
        <ScrollView>
          <VStack
            borderRadius={{ md: '8' }}
            _light={{
              borderColor: 'coolGray.200',
              bg: { base: 'white' },
            }}
            _dark={{
              borderColor: 'coolGray.800',
              bg: { md: 'coolGray.900', base: 'coolGray.800' },
            }}
            borderWidth={{ md: '1' }}
            borderBottomWidth="1"
            overflow="hidden"
          >
            <Box h="56" justifyContent="flex-end">
              <Image
                zIndex={-1}
                position="absolute"
                source={{
                  uri: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8&w=1000&q=80',
                }}
                alt="Alternate Text"
                top="0"
                right="0"
                left="0"
                bottom="0"
              />

              <HStack
                px="30"
                justifyContent="space-between"
                alignItems="center"
                bg="#22222299"
              >
                <VStack py="2">
                  <Text color="coolGray.50" fontWeight="bold" fontSize="md">
                    UNITED LEGENDS
                  </Text>
                  <Text color="coolGray.200">Created by Marsh</Text>
                </VStack>

                <Pressable>
                  <Icon
                    size="6"
                    as={MaterialIcons}
                    name="create"
                    color="coolGray.50"
                  />
                </Pressable>
              </HStack>
            </Box>

            <VStack _light={{ bg: 'white' }} _dark={{ bg: 'coolGray.900' }}>
              <HStack
                py="4"
                px="8"
                justifyContent="space-between"
                alignItems="center"
                _light={{ bg: 'coolGray.100' }}
                _dark={{ bg: 'coolGray.800' }}
              >
                <Text
                  fontWeight="medium"
                  _light={{ color: 'coolGray.800' }}
                  _dark={{ color: 'coolGray.50' }}
                  fontSize="sm"
                >
                  Mute Notifications
                </Text>

                <Switch size="sm" colorScheme="primary.900" />
              </HStack>
              <VStack
                px="8"
                space="4"
                my="4"
                _light={{ bg: 'white' }}
                _dark={{ bg: 'coolGray.900' }}
              >
                <Pressable>
                  <HStack alignItems="center" space="4">
                    <Center bg="primary.900" p="2" rounded="full">
                      <Icon
                        as={AntDesign}
                        name="adduser"
                        color="coolGray.50"
                        size="sm"
                      />
                    </Center>
                    <Text
                      fontWeight="medium"
                      _light={{ color: 'coolGray.800' }}
                      _dark={{ color: 'coolGray.50' }}
                      fontSize="sm"
                    >
                      Add Participants
                    </Text>
                  </HStack>
                </Pressable>
                <Divider />
                <Pressable>
                  <HStack alignItems="center" space="4">
                    <Center bg="primary.900" p="2" rounded="full">
                      <Icon
                        as={MaterialIcons}
                        name="insert-link"
                        color="coolGray.50"
                        size="sm"
                      />
                    </Center>
                    <Text
                      fontWeight="medium"
                      _light={{ color: 'coolGray.800' }}
                      _dark={{ color: 'coolGray.50' }}
                      fontSize="sm"
                    >
                      Invite via link
                    </Text>
                  </HStack>
                </Pressable>
              </VStack>

              <VStack
                py="4"
                px="8"
                space="4"
                _light={{ bg: 'coolGray.100' }}
                _dark={{ bg: 'coolGray.800' }}
              >
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <HStack alignItems="center" space="4">
                    <Center bg="red.700" p="2" rounded="full">
                      <Icon
                        as={MaterialIcons}
                        name="exit-to-app"
                        color="coolGray.50"
                        size="sm"
                      />
                    </Center>
                    <Text fontWeight="medium" fontSize="sm" color="red.700">
                      Exit Group
                    </Text>
                  </HStack>
                </Pressable>
              </VStack>
              <Text
                _light={{ color: 'primary.900' }}
                _dark={{ color: 'coolGray.50' }}
                px="8"
                pt="3"
                fontSize="xs"
              >
                {userList.length} Participants
              </Text>
            </VStack>
            <VStack
              px="8"
              space="2"
              py="4"
              _light={{ bg: 'white' }}
              _dark={{ bg: 'coolGray.900' }}
            >
              {userList.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    {userListTemplate(data, index !== userList.length - 1)}
                  </React.Fragment>
                );
              })}
            </VStack>

            <Modal isOpen={modalVisible} onClose={setModalVisible}>
              <Modal.Content
                _light={{ bg: 'white' }}
                _dark={{ bg: 'coolGray.800' }}
              >
                <Modal.Body>
                  <VStack
                    space="4"
                    justifyContent="center"
                    alignItems="center"
                    px="4"
                    py="4"
                  >
                    <Modal.CloseButton />

                    <Avatar
                      source={{
                        uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                      }}
                      borderWidth="2"
                      _dark={{
                        borderColor: 'primary.700',
                      }}
                      w="20"
                      h="20"
                    />
                    <Text textAlign="center">
                      Are you sure that you want to remove Kattie from group?
                    </Text>
                    <HStack space="2" w="100%" justifyContent="center">
                      <Button
                        onPress={() => console.log('button pressed')}
                        flex={1}
                        size="sm"
                        borderRadius="4"
                        variant="outline"
                        _text={{
                          fontSize: 'sm',
                          fontWeight: 'medium',
                        }}
                      >
                        NO
                      </Button>
                      <Button
                        onPress={() => console.log('button pressed')}
                        flex={1}
                        size="sm"
                        borderRadius="4"
                        _text={{
                          fontSize: 'sm',
                          fontWeight: 'medium',
                        }}
                        _light={{
                          bg: 'primary.900',
                        }}
                        _dark={{
                          bg: 'primary.700',
                        }}
                      >
                        YES
                      </Button>
                    </HStack>
                  </VStack>
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </VStack>
        </ScrollView>
      </DashboardLayout>
    </>
  );
}
