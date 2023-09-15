import React, {useState} from 'react';
import { Appearance } from 'react-native';
import { Text, VStack, HStack, Pressable, Divider, useColorModeValue, useColorMode, CheckIcon } from 'native-base';
import { DashboardLayout } from './commoncomponents';
import { useNavigation } from '@react-navigation/native';
import useTheme from '../context/useTheme';

function OptionItem({ title, onPress, position, tick }: any) {
  return (
    <Pressable px={{ base: 4 }} py={{ base: 4 }}
      onPress={onPress}
      _pressed={{
        bg: useColorModeValue("coolGray.100","coolGray.500"),
        borderBottomRadius: position === "3" ? "8" : "0",
        borderTopRadius: position === "1" ? "8" : "0",
      }}
     >
      <HStack alignContent="center" justifyContent="space-between"  >
      <Text
        fontSize="md"
        fontWeight="medium"
        letterSpacing="0.5"
        _light={{ color: 'coolGray.800' }}
        _dark={{ color: 'coolGray.50' }}
      >
        {title}
      </Text>
      {tick ? 
        <CheckIcon size="5" color="emerald.500" />
      : <></>
      }
      </HStack>
    </Pressable>
  );
}

export default function DarkMode(props: any) {

  const navigation = useNavigation();
  const { colorMode, setColorMode } = useColorMode();
  const [mode, setMode] = useState<string>(colorMode === "dark" ? "dark" : "light");
  const systemMode = Appearance.getColorScheme() ?? 'light';
  const theme = useTheme();

  const ChangeColorMode = (mode: string) => () => {
    setColorMode(mode);
    setMode(mode);
    theme.toggleTheme(mode);
    setTimeout(()=>{
      navigation.goBack();
    }, 1000)
  }

  return (
    <DashboardLayout title="Dark Mode">
      <VStack
        m="6"
        borderRadius="8"
        _light={{
          bg: { base: 'coolGray.200' },
        }}
        _dark={{
          bg: 'coolGray.800',
        }}
      >
        <OptionItem title="On" onPress={ChangeColorMode("dark")} position="1" tick={mode === "dark"} />
        <Divider bg={useColorModeValue("white", "coolGray.500")} />
        <OptionItem title="Off" onPress={ChangeColorMode("light")} position="2" tick={mode === "light"} />
        <Divider bg={useColorModeValue("white", "coolGray.500")}  />
        <OptionItem title="Use System" onPress={ChangeColorMode(systemMode)} position="3" />
      </VStack>
    </DashboardLayout>
  );
}