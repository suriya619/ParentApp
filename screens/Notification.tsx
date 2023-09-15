import React from 'react';
import {
  HStack,
  Text,
  Divider,
  VStack,
  Button,
  Avatar,
  ScrollView,
} from 'native-base';

import DashboardLayout from './commoncomponents/DashboardLayout';
function TodayNotification(props: any) {
  const List = [
    {
      imageUrl: require('../assets/smiling.jpg'),
      name: 'John Doe',
      reaction: 'reacted to your post.',
      time: '2m',
      reactionIcon: 'heart',
      secondImageUrl: require('../assets/smiling.jpg'),
    },
    {
      imageUrl: require('../assets/smiling.jpg'),
      name: 'Richard Miles',
      reaction: 'liked your post.',
      time: '10m',
      reactionIcon: 'like1',
      secondImageUrl: require('../assets/smiling.jpg'),
    },
  ];
  return (
    <>
      {List.map((item, index) => {
        return (
          <VStack key={index}>
            <HStack justifyContent="space-between" alignItems="center" mt="4">
              <HStack alignItems="center">
                <Avatar source={item.imageUrl} mr="1" />
                <Avatar.Badge bg={'red.500'} zIndex={1} mb={9} left={10} />

                <Text fontWeight="bold" fontSize="sm" pr="0.5">
                  {item.name}
                </Text>
                <Text fontSize="sm" pr="0.5">
                  {item.reaction}
                </Text>

                <Text
                  mt="1"
                  fontSize="xs"
                  _light={{ color: 'coolGray.500' }}
                  _dark={{ color: 'coolGray.400' }}
                  textAlign="center"
                >
                  {item.time}
                </Text>
              </HStack>

              <Avatar
                width="9"
                height="9"
                borderRadius="1"
                source={item.secondImageUrl}
              />
            </HStack>
            {index == List.length - 1 ? null : (
              <Divider
                _light={{ bg: 'coolGray.300' }}
                _dark={{ bg: 'coolGray.600' }}
                width="100%"
                mt={3}
              />
            )}
          </VStack>
        );
      })}
    </>
  );
}

function YesterdayNotification(props: any) {
  const secondList = [
    {
      imageUrl: require('../assets/smiling.jpg'),
      name: 'Lance Bog',
      reaction: 'reacted to your post.',
      time: '12h',
      reactionIcon: 'heart',
      secondImageUrl: require('../assets/smiling.jpg'),
    },
    {
      imageUrl: require('../assets/handsome.jpg'),
      name: 'Jennifer',
      reaction: 'commented on your post.',
      time: '10h',
      reactionIcon: '',
      secondImageUrl: require('../assets/table.jpg'),
    },
    {
      imageUrl: require('../assets/man.jpg'),
      name: 'Parsley Pro',
      reaction: 'started following you',
      time: '2m',
      reactionIcon: 'heart',
      secondImageUrl: require('../assets/table.jpg'),
    },
    {
      imageUrl: require('../assets/nice-girl.jpg'),
      name: 'Jeffery Joln ',
      reaction: 'reacted to your post.',
      time: '2m',
      reactionIcon: 'heart',
      secondImageUrl: require('../assets/table.jpg'),
    },
    {
      imageUrl: require('../assets/smiling.jpg'),
      name: 'Terence G ',
      reaction: 'reacted to your post.',
      time: '24h',
      secondImageUrl: require('../assets/table.jpg'),
    },
    {
      imageUrl: require('../assets/table.jpg'),
      name: 'Willie Wilsey ',
      reaction: 'reacted to your post.',
      time: '12h',
      reactionIcon: 'heart',
      secondImageUrl: require('../assets/smiling.jpg'),
    },
    {
      imageUrl: require('../assets/women.jpg'),
      name: 'Sankalp',
      reaction: 'reacted to your post.',
      time: '12m',
      reactionIcon: 'heart',
      secondImageUrl: require('../assets/smiling.jpg'),
    },
    {
      imageUrl: require('../assets/joker.png'),
      name: 'John Doe',
      reaction: 'reacted to your post.',
      time: '18h',
      reactionIcon: 'heart',
      secondImageUrl: require('../assets/smiling.jpg'),
    },
  ];
  return (
    <>
      {secondList.map((item, index) => {
        return (
          <VStack key={index} pb={{ base: 2 }}>
            <HStack justifyContent="space-between" alignItems="center" mt="4">
              <HStack
                justifyContent="space-between"
                alignItems="center"
                space={1}
              >
                <Avatar source={item.imageUrl} mr="1" />

                <Text fontWeight="bold" fontSize="sm" pr="0.5">
                  {item.name}
                </Text>
                <Text fontSize="sm" pr="0.5">
                  {item.reaction}
                </Text>

                <Text
                  mt="1"
                  fontSize="xs"
                  _light={{ color: 'coolGray.500' }}
                  _dark={{ color: 'coolGray.400' }}
                >
                  {item.time}
                </Text>
              </HStack>

              {item.reaction == 'started following you' ? (
                <Button
                  size="xs"
                  borderRadius="0.5"
                  py="2"
                  _light={{ bg: 'primary.900' }}
                  _dark={{ bg: 'primary.700' }}
                  _text={{
                    fontSize: { base: 10, md: 'xs' },
                    fontWeight: 'semibold',
                  }}
                >
                  Follow back
                </Button>
              ) : (
                <Avatar
                  width="9"
                  height="9"
                  borderRadius="1"
                  source={item.secondImageUrl}
                />
              )}
            </HStack>
            {index == secondList.length - 1 ? null : (
              <Divider
                _light={{ bg: 'coolGray.300' }}
                _dark={{ bg: 'coolGray.600' }}
                width="100%"
                mt={3}
              />
            )}
          </VStack>
        );
      })}
    </>
  );
}
export default function (props: any) {
  return (
    <DashboardLayout title={' Notifications'}>
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
        >
          <VStack px={{ base: 4, md: 8 }} mt="4">
            <Text
              fontSize="md"
              fontWeight="bold"
              _dark={{ color: 'coolGray.50' }}
              _light={{ color: 'coolGray.800' }}
            >
              Today
            </Text>
            <TodayNotification />
          </VStack>
          <VStack px={{ base: 4, md: 8 }} mt="4" justifyContent="space-between">
            <Text
              fontSize="md"
              fontWeight="bold"
              _dark={{ color: 'coolGray.50' }}
              _light={{ color: 'coolGray.800' }}
            >
              Yesterday
            </Text>
            <YesterdayNotification />
          </VStack>
        </VStack>
      </ScrollView>
    </DashboardLayout>
  );
}
