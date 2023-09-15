import React from 'react';
import { Text, VStack, Center, Button, Image, useColorMode } from 'native-base';
import DashboardLayout from './commoncomponents/DashboardLayout';

function ScreenButtons(props: any) {
  return (
    <>
      <Center pb={{ base: 0, md: 5 }} w="100%">
        <Button
          borderRadius="4"
          width="100%"
          size="lg"
          mt={{ base: 32, md: 10 }}
          _light={{ bg: 'primary.900' }}
          _dark={{ bg: 'primary.700', _pressed: { bg: 'primary.500' } }}
          onPress={() => console.log('this button will update the app')}
          _text={{ fontSize: 'sm' }}
        >
          UPDATE
        </Button>
        <Button
          borderRadius="4"
          borderWidth="1"
          _light={{ borderColor: 'primary.900' }}
          _dark={{ borderColor: 'coolGray.500' }}
          variant="outline"
          width="100%"
          size="lg"
          mt="3"
          onPress={() => console.log('this button will cancel this process')}
          _text={{
            fontSize: 'sm',
            _light: { color: 'primary.900' },
            _dark: { color: 'coolGray.500' },
          }}
        >
          NOT NOW
        </Button>
      </Center>
    </>
  );
}
export default function AppUpdate(props: any) {
  
  const { colorMode } = useColorMode();
  return (
    <DashboardLayout displaySidebar={false} title="App updates">
      <VStack
        px={{ base: 4, md: 32 }}
        py={{ base: 4, md: 4 }}
        borderRadius={{ md: '8' }}
        _light={{
          borderColor: 'coolGray.200',
          bg: { base: 'coolGray.50' },
        }}
        _dark={{
          borderColor: 'coolGray.800',
          bg: { md: 'coolGray.900', base: 'coolGray.800' },
        }}
        borderWidth={{ md: 1 }}
        borderBottomWidth="1"
        space={4}
        alignItems="center"
      >
        <Center mt="4">
          {colorMode == 'light' ? (
            <Image
              size={{ base: 64, md: 64 }}
              source={require('../assets/rocket_light.png')}
              alt="Alternet Text"
            />
          ) : (
            <Image
              size={{ base: 64, md: 64 }}
              source={require('../assets/rocket_dark.png')}
              alt="Alternet Text"
            />
          )}
        </Center>

        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          textAlign="center"
          fontWeight="bold"
          letterSpacing="0.4"
          _light={{ color: 'coolGray.800' }}
          _dark={{ color: 'white' }}
          mt="8"
        >
          New update available
        </Text>
        <Text
          mt={{ base: 2, md: 0 }}
          _light={{ color: 'coolGray.800' }}
          _dark={{ color: 'coolGray.400' }}
          fontSize="sm"
          textAlign="center"
          fontWeight="normal"
          px={{ base: 0, md: 24, lg: 32, xl: 32 }}
        >
          The current version of the app is out of the date and wills stop
          working soon.To keep using, please install the latest update.
        </Text>
        <ScreenButtons />
      </VStack>
    </DashboardLayout>
  );
}
