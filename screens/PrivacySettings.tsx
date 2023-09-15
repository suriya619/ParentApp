import React from 'react';
import { HStack, Text, VStack, Icon, Pressable } from 'native-base';
import DashboardLayout from './commoncomponents/DashboardLayout';
import { MaterialIcons } from '@expo/vector-icons';

function OptionItem({ title, defaultOption }: any) {
  return (
    <Pressable>
      <HStack justifyContent="space-between" alignItems="center">
        <VStack>
          <Text
            fontSize="md"
            fontWeight="medium"
            letterSpacing="0.5"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
          >
            {title}
          </Text>
          <Text
            fontSize="sm"
            _light={{ color: 'coolGray.500' }}
            _dark={{ color: 'coolGray.300' }}
            letterSpacing="0.5"
          >
            {defaultOption}
          </Text>
        </VStack>
        <Icon as={MaterialIcons} name="chevron-right" color="coolGray.400" />
      </HStack>
    </Pressable>
  );
}

export default function PrivacySettings({props, navigation}: any) {
  return (
    <DashboardLayout title="Privacy Settings">
      <VStack
        px={{ base: 4, md: 8 }}
        py={{ base: 4, md: 8 }}
        borderRadius={{ md: '8' }}
        _light={{
          borderColor: 'coolGray.200',
          bg: { base: 'white' },
        }}
        _dark={{
          borderColor: 'coolGray.800',
          bg: 'coolGray.800',
        }}
        borderWidth={{ md: '1' }}
        borderBottomWidth="1"
        space={4}
      >
        <VStack space={4}>
          <OptionItem title="Blocked Users" defaultOption="None" />
          <OptionItem title="Phone Number" defaultOption="Nobody" />
          <OptionItem title="Last Seen & Online" defaultOption="My Contacts" />
          <OptionItem title="Profile Photo" defaultOption="Nobody" />
          <OptionItem title="Calls" defaultOption="My Contacts" />
          <OptionItem title="Groups" defaultOption="Everybody" />
        </VStack>
      </VStack>
    </DashboardLayout>
  );
}
