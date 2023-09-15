import { Appearance, Dimensions } from 'react-native';
import { extendTheme, theme as nbTheme, themeTools, StorageManager, ColorMode  } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

const paTheme = extendTheme({
  // Colors and Fonts
  config: {
    initialColorMode: Appearance.getColorScheme() ?? 'light',
  },
  colors: {
    // Oracle
    primary: {
      50: "#F4F9FB",
      100: "#CDDCE1",
      200: "#A6BFC8",
      300: "#80A1AC",
      400: "#5C8490",
      500: "#366775",
      600: "#2D5662",
      700: "#244B56",
      800: "#1B3C46",
      900: "#132D35",
    },
    // Manhattan
    secondary: {
      50: "#FDF3F2",
      100: "#FBE7E5",
      200: "#F9DCD8",
      300: "#F7D0CB",
      400: "#EFB9A9",
      500: "#F4AC94",
      600: "#EA9575",
      700: "#D66D50",
      800: "#9A4933",
      900: "#5E2516",
    },
    // Changing blueGray
    blueGray: {
      50: "#FBFBFD",
    },
    // CustomGray color for Dark mode
    customGray: "#6b7280",
    avatarBg: "#9fbbc1",
  },

  fontConfig: {
    Poppins: {
      100: {
        normal: "Poppins_100Thin",
        italic: "Poppins_100Thin_Italic",
      },
      200: {
        normal: "Poppins_200ExtraLight",
        italic: "Poppins_200ExtraLight_Italic",
      },
      300: {
        normal: "Poppins_300Light",
        italic: "Poppins_300Light_Italic",
      },
      400: {
        normal: "Poppins_400Regular",
        italic: "Poppins_400Regular_Italic",
      },
      500: {
        normal: "Poppins_500Medium",
        italic: "Poppins_500Medium_Italic",
      },
      600: {
        normal: "Poppins_600SemiBold",
        italic: "Poppins_600SemiBold_Italic",
      },
      700: {
        normal: "Poppins_700Bold",
        italic: "Poppins_700Bold_Italic",
      },
      800: {
        normal: "Poppins_800ExtraBold",
        italic: "Poppins_800ExtraBold_Italic",
      },
      900: {
        normal: "Poppins_900Black",
        italic: "Poppins_900Black_Italic",
      },
    },
  },

  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },

  //Styling Components
  components: {
    Text: {
      baseStyle: (props: any) => {
        return {
          colorScheme: themeTools.mode("primary.900", "white")(props),
        };
      },
    },
    Toast: {
      baseStyle: {
        width: Dimensions.get('window').width - 20
      }
    },
    Button: {
      variants: {
        primary: ({ colorMode }) => {
          return {
            bg: colorMode === "light" ? "primary.600" : "primary.800",
            rounded: 4,
            borderWidth: 1,
            borderColor: "primary.800",
            _text: {
              color: "primary.50",
            },
            shadow: 2,
            _pressed: {
              bg: colorMode === "light" ? "primary.300" : "primary.400",
            },
          };
        },
        secondary: ({ colorMode }) => {
          return {
            bg: "secondary.700",
            rounded: 4,
            borderWidth: 1,
            borderColor: "secondary.800",
            _text: {
              color: "secondary.50",
            },
            shadow: 2,
            _hover: "secondary.800",
            _pressed: {
              bg: "secondary.500",
            },
          };
        },
        light: ({ colorMode }) => {
          return {
            bg: "#FFF",
            rounded: 4,
            borderWidth: 1,
            borderColor: "#D8DCE6",
            _text: {
              color: colorMode === "light" ? "primary.500" : "primary.700",
            },
            shadow: 2,
            _pressed: {
              bg: "#F6F7F9",
            },
          };
        },
        second1: ({ colorMode }) => {
          return {
            bg: "secondary.100",
            rounded: 4,
            _text: {
              color: colorMode === "light" ? "secondary.700" : "secondary.700",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "xs"
            },
            // shadow: 2,
            _pressed: {
              bg: "#F6F7F9",
            },
          };
        },
        prime1: ({ colorMode }) => {
          return {
            bg: "primary.100",
            rounded: 4,
            _text: {
              color: colorMode === "light" ? "primary.700" : "primary.700",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "xs"
            },
            // shadow: 2,
            _pressed: {
              bg: "#F6F7F9",
            },
          };
        },
      },
      sizes: {
        lg: {
          px: 6,
          py: 4,
          _text: {
            fontSize: "lg",
          },
        },
        md: {
          px: 4,
          py: 3,
          _text: {
            fontSize: "md",
          },
        },
        sm: {
          px: 4,
          py: 2,
          _text: {
            fontSize: "sm",
          },
        },
        xs: {
          px: 2,
          py: 1,
          _text: {
            fontSize: "xs",
          },
        },
      },
    },
    Radio: {
      baseStyle: (props: any) => {
        return {
          _text: { 
            color: themeTools.mode("primary.600", "white")(props)
          },
          bg: themeTools.mode("primary.50", "coolGray.500")(props),
          borderColor: themeTools.mode("primary.200", "white")(props),
        };
      },
    },
    Text: {
      baseStyle: (props: any) => {
        return {
          color: themeTools.mode("primary.700", "coolGray.500")(props),
        };
      },
    },
  },
});

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};

export { paTheme, colorModeManager };
