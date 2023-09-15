import React from 'react';
import {
  VStack,
  Box,
  HStack,
  Icon,
  Text,
  Link,
  Button,
  Image,
  IconButton,
  Center,
  FormControl,
  Hidden,
  Input,
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import GuestLayout from '../layouts/GuestLayout';
function PinInput() {
  return (
    <HStack space="2">
      {[1, 2, 3, 4, 5, 6].map((e, i) => (
        <Input
          key={i}
          variant="underlined"
          boxSize="12"
          textAlign="center"
          borderBottomWidth="2"
          fontSize="lg"
          _light={{ color: 'coolGray.800' }}
          _dark={{ color: 'coolGray.400' }}
        />
      ))}
    </HStack>
  );
}
export default function OtpVerification({ props, navigation }: any) {
  return (
    <GuestLayout>
      <Hidden from="md">
        <HStack space="2" px="1" mt="4" mb="5" alignItems="center">
          <Text color="coolGray.50" fontSize="lg">
            OTP Verification
          </Text>
        </HStack>
      </Hidden>
      <Hidden till="md">
        <Center
          flex="1"
          bg="primary.900"
          px={{ base: '4', md: '8' }}
          borderTopLeftRadius={{ md: 'xl' }}
          borderBottomLeftRadius={{ md: 'xl' }}
        >
          <Image
            h="24"
            size="80"
            alt="Your Child's Day "
            resizeMode={'contain'}
            source={require('./components/logo.png')}
          />
        </Center>
      </Hidden>
      <Box
        py={{ base: '6', md: '12' }}
        px={{ base: '4', md: '10' }}
        _light={{ bg: 'white' }}
        _dark={{ bg: 'coolGray.800' }}
        flex="1"
        borderTopRightRadius={{ md: 'xl' }}
        borderBottomRightRadius={{ md: 'xl' }}
      >
        <VStack justifyContent="space-between" flex="1" space="24">
          <Box>
            <VStack space={{ base: '4', md: '5' }}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'coolGray.800' }}
              >
                Enter OTP
              </Text>
              <HStack space="2" alignItems="center">
                <Text
                  _light={{ color: 'coolGray.800' }}
                  _dark={{ color: 'coolGray.400' }}
                >
                  We have sent the OTP code to
                </Text>
                <Text
                  fontWeight="bold"
                  _light={{ color: 'coolGray.800' }}
                  _dark={{ color: 'coolGray.400' }}
                >
                  87******47
                </Text>
              </HStack>
            </VStack>
            <VStack space="12" mt="6">
              <FormControl>
                <PinInput />
                <FormControl.HelperText mt="7">
                  <HStack>
                    <Text
                      _light={{ color: 'coolGray.800' }}
                      _dark={{ color: 'coolGray.400' }}
                    >
                      Didn’t receive the OTP?{' '}
                    </Text>
                    <Link
                      href="https://buildingfutures.com.au/privacy-policy/"
                      _text={{
                        _light: { color: 'primary.900' },
                        _dark: { color: 'primary.700' },
                        fontWeight: 'bold',
                        textDecoration: 'none',
                      }}
                    >
                      RESEND OTP
                    </Link>
                  </HStack>
                </FormControl.HelperText>
              </FormControl>
              <Button
                onPress={() => {
                  navigation.navigate('MainNavigator')
                }}
                py="3"
                size="md"
                _light={{
                  bg: 'primary.900',
                }}
                _dark={{
                  bg: 'primary.700',
                  _pressed: { bg: 'primary.500' },
                }}
              >
                PROCEED
              </Button>
            </VStack>
          </Box>
          <HStack
            mt="28"
            space="1"
            safeAreaBottom
            alignItems="center"
            justifyContent="center"
          >
            <Text
              _light={{ color: 'coolGray.800' }}
              _dark={{ color: 'coolGray.400' }}
            >
              Already have an account?
            </Text>
            <Link
              href="https://nativebase.io"
              _text={{
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
              _light={{
                _text: {
                  color: 'primary.900',
                },
              }}
              _dark={{
                _text: {
                  color: 'violet.500',
                },
              }}
            >
              Sign up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </GuestLayout>
  );
}
