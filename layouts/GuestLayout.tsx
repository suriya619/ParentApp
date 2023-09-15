import React from 'react';
import { Box, StatusBar, Center, Stack } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StatusBarLayout from '../screens/commoncomponents/StatusBarLayout';

export default function GuestLayout(props: any) {
  return (
  <>   
{/*   
  <Center my="auto" bg="primary.900" flex="1" p={{ md: 8 }}> */}

    <StatusBarLayout></StatusBarLayout>
      <KeyboardAwareScrollView
        contentContainerStyle={{ width: '100%', height: '100%' }}>
      <Center
          my="auto"
          _dark={{ bg: 'coolGray.900' }}
          _light={{ bg: { md: '#2E165B', base: 'primary.900' } }}
          flex="1"
          p={{ md: 8 }}>
          <Stack
            w="100%"
            maxW={{ md: '1016px' }}
            flex={{ base: '1', md: undefined }}
            flexDirection={{ base: 'column', md: 'row' }}>
              
            {props.children}            
          </Stack>          
        </Center>
      </KeyboardAwareScrollView>
    </>
  );
}
