import React from 'react';
import {
  HStack,
  Icon,
  Text,
  VStack,
  Avatar,
  Pressable,
  useColorModeValue,
  Button,
  Modal,
  useDisclose,
  Center,
  useBreakpointValue,
  ScrollView,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import FloatingLabelInput from './components/FloatingLabelInput';
import DashboardLayout from './commoncomponents/DashboardLayout';
import IconPhoto from './components/IconPhoto';
import IconRemovePhoto from './components/IconRemovePhoto';
import IconCamera from './components/IconCamera';
import { Platform } from 'react-native';

export default function EditAccount(props: any) {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [modalVisible, setModalVisible] = React.useState(false);
  const bgColor = useBreakpointValue({
    base: '#1f2937',
    lg: '#111827',
    md: '#111827',
    xl: '#111827',
  });
  return (
    <DashboardLayout title="Edit Profile">
      <VStack
        px={{ base: 4, md: 8, lg: 32 }}
        py={{ base: 16, md: 8 }}
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
        space="4"
      >
        <ScrollView>
        <HStack
          mb="3"
          alignItems="center"
          justifyContent={{ md: 'space-between', base: 'space-around' }}
        >
          <Avatar source={require('../assets/women.jpg')} w="24" h="24">
            <Avatar.Badge
              _light={{ bg: 'coolGray.50' }}
              _dark={{ bg: 'coolGray.50', borderColor: 'coolGray.50' }}
              p={3}
              alignItems="center"
              justifyContent="center"
            >
              <Pressable
                onPress={
                  Platform.OS === 'ios'
                    ? onOpen
                    : () => {
                        setModalVisible(!modalVisible);
                      }
                }
              >
                <Center>
                  <Icon
                    size="5"
                    as={Ionicons}
                    name={'camera-outline'}
                    _light={{ color: 'coolGray.900' }}
                    _dark={{ color: 'coolGray.500', bg: 'coolGray.50' }}
                  />
                </Center>
              </Pressable>
            </Avatar.Badge>
          </Avatar>
        </HStack>

        <FloatingLabelInput
          p="3"
          isRequired
          borderRadius="4"
          label="Full Name"
          labelColor={useColorModeValue('#6b7280', '#d1d5db')}
          defaultValue={'John Legend'}
          labelBGColor={useColorModeValue('#fff', bgColor)}
          _text={{
            fontSize: 'sm',
            fontWeight: 'medium',
          }}
          _dark={{
            borderColor: 'coolGray.700',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
        />

        <FloatingLabelInput
          p="3"
          isRequired
          borderRadius="4"
          label="Email"
          labelColor={useColorModeValue('#6b7280', '#d1d5db')}
          defaultValue={'jondoe@example.com'}
          labelBGColor={useColorModeValue('#fff', bgColor)}
          _text={{
            fontSize: 'sm',
            fontWeight: 'medium',
          }}
          _dark={{
            borderColor: 'coolGray.700',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
        />
        <FloatingLabelInput
          p="3"
          isRequired
          borderRadius="4"
          label="Contact Number"
          labelColor={useColorModeValue('#6b7280', '#d1d5db')}
          defaultValue={'+91-8239635900'}
          labelBGColor={useColorModeValue('#fff', bgColor)}
          _text={{
            fontSize: 'sm',
            fontWeight: 'medium',
          }}
          _dark={{
            borderColor: 'coolGray.700',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
        />
        <FloatingLabelInput
          p="3"
          isRequired
          borderRadius="4"
          label="Address"
          labelColor={useColorModeValue('#6b7280', '#d1d5db')}
          defaultValue={'301, Bakers Street'}
          labelBGColor={useColorModeValue('#fff', bgColor)}
          _text={{
            fontSize: 'sm',
            fontWeight: 'medium',
          }}
          _dark={{
            borderColor: 'coolGray.700',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
        />
        <HStack alignItems="center" justifyContent="space-between">
          <FloatingLabelInput
            p="3"
            w="100%"
            containerWidth="48%"
            isRequired
            borderRadius="4"
            label="City"
            labelColor={useColorModeValue('#6b7280', '#d1d5db')}
            defaultValue={'Rochester'}
            labelBGColor={useColorModeValue('#fff', bgColor)}
            _text={{
              fontSize: 'sm',
              fontWeight: 'medium',
            }}
            _dark={{
              borderColor: 'coolGray.700',
            }}
            _light={{
              borderColor: 'coolGray.200',
            }}
          />
          <FloatingLabelInput
            p="3"
            w="100%"
            containerWidth="48%"
            isRequired
            borderRadius="4"
            label="State"
            labelColor={useColorModeValue('#6b7280', '#d1d5db')}
            defaultValue={'New York'}
            labelBGColor={useColorModeValue('#fff', bgColor)}
            _text={{
              fontSize: 'sm',
              fontWeight: 'medium',
            }}
            _dark={{
              borderColor: 'coolGray.700',
            }}
            _light={{
              borderColor: 'coolGray.200',
            }}
          />
        </HStack>
        <HStack alignItems="center" justifyContent="space-between">
          <FloatingLabelInput
            p="3"
            w="100%"
            containerWidth="48%"
            isRequired
            borderRadius="4"
            label="Zip code"
            labelColor={useColorModeValue('#6b7280', '#d1d5db')}
            defaultValue={'11357'}
            labelBGColor={useColorModeValue('#fff', bgColor)}
            _text={{
              fontSize: 'sm',
              fontWeight: 'medium',
            }}
            _dark={{
              borderColor: 'coolGray.700',
            }}
            _light={{
              borderColor: 'coolGray.200',
            }}
          />
          <FloatingLabelInput
            p="3"
            w="100%"
            containerWidth="48%"
            isRequired
            borderRadius="4"
            label="Country"
            labelColor={useColorModeValue('#6b7280', '#d1d5db')}
            defaultValue={'USA'}
            labelBGColor={useColorModeValue('#fff', bgColor)}
            _text={{
              fontSize: 'sm',
              fontWeight: 'medium',
            }}
            _dark={{
              borderColor: 'coolGray.700',
            }}
            _light={{
              borderColor: 'coolGray.200',
            }}
          />
        </HStack>
        <Button
          mt={{ base: '70' }}
          onPress={() => {
            console.log('hello');
          }}
          size="md"
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
            _pressed: { bg: 'primary.500' },
          }}
        >
          SAVE
        </Button>
        </ScrollView>
      </VStack>
      

      <Modal
        isOpen={modalVisible}
        onClose={setModalVisible}
        size="md"
        marginX="auto"
      >
        <Modal.Content
          _dark={{ bg: 'coolGray.800' }}
          _light={{ bg: 'coolGray.50' }}
          px="10"
          py="6"
        >
          <Text
            fontSize="xl"
            fontWeight="medium"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
          >
            Profile Picture
          </Text>
          <HStack space="6" justifyContent="space-between" mt="8">
            <Pressable
              onPress={() => {
                console.log('hello');
              }}
            >
              <VStack space="1" alignItems="center">
                <IconPhoto />
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  _light={{ color: 'coolGray.800' }}
                  _dark={{ color: 'coolGray.50' }}
                >
                  Photos
                </Text>
              </VStack>
            </Pressable>
            <Pressable
              onPress={() => {
                console.log('hello');
              }}
            >
              <VStack space="1" alignItems="center">
                <IconCamera />
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  _light={{ color: 'coolGray.800' }}
                  _dark={{ color: 'coolGray.50' }}
                >
                  Camera
                </Text>
              </VStack>
            </Pressable>
            <Pressable
              onPress={() => {
                console.log('hello');
              }}
            >
              <VStack space="1" alignItems="center">
                <IconRemovePhoto />
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  _light={{ color: 'coolGray.800' }}
                  _dark={{ color: 'coolGray.50' }}
                >
                  Remove photo
                </Text>
              </VStack>
            </Pressable>
          </HStack>
        </Modal.Content>
      </Modal>
     
    </DashboardLayout>
  );
}
