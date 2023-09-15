import { Platform } from 'react-native';
import { normalize } from './normalise';

const AppColors = {
  PRIMARYCOLOR: '#121212',
  SECONDARYCOLOR: '#F2F2F2',

  PLACEHOLDERTEXT: '#0000004d',
  BUTTON_SHADOWCOLOR: 'rgba(255,255,255,0.5)',
  INPUTBGCOLOR: '#EAEAEA',
  SUCCESSCIRCLE_BORDERCOLOR: '#ffffffba',
  REPORT_MENU_BGCOLOR: '#282727',

  SEARCH_INPUT_BGCOLOR: '#1E1E1E',
  REDCOLOR: '#519777',
  ITEMDIVIDER: '#3E3E3E',
};

const AppTypography = {
  Poppins: {
    100: {
      normal: "Poppins-Thin",
      italic: "Poppins-ThinItalic",
    },
    200: {
      normal: "Poppins-ExtraLight",
      italic: "Poppins-ExtraLightItalic",
    },
    300: {
      normal: "Poppins-Light",
      italic: "Poppins-LightItalic",
    },
    400: {
      normal: "Poppins-Regular",
      italic: "Poppins-Italic",
    },
    500: {
      normal: "Poppins-Medium",
      italic: "Poppins-MediumItalic",
    },
    600: {
      normal: "Poppins-SemiBold",
      italic: "Poppins-SemiBoldItalic",
    },
    700: {
      normal: "Poppins-Bold",
      italic: "Poppins-BoldItalic",
    },
    800: {
      normal: "Poppins-ExtraBold",
      italic: "Poppins-ExtraBoldItalic",
    },
    900: {
      normal: "Poppins-Black",
      italic: "Poppins-BlackItalic",
    },
  },
};

const AppFontSizes = {
  FONT_SIZE_xs: normalize(Platform.select({ ios: 8, android: 11 })),
  FONT_SIZE_10: normalize(Platform.select({ ios: 9, android: 12 })),
  FONT_SIZE_11: normalize(Platform.select({ ios: 10, android: 13 })),
  FONT_SIZE_12: normalize(Platform.select({ ios: 11, android: 14 })),
  FONT_SIZE_13: normalize(Platform.select({ ios: 12, android: 14.5 })),
  FONT_SIZE_13_DOT: normalize(Platform.select({ ios: 12.5, android: 15 })),
  FONT_SIZE_14: normalize(Platform.select({ ios: 13, android: 16 })),
  FONT_SIZE_15: normalize(Platform.select({ ios: 14, android: 17 })),
  FONT_SIZE_17: normalize(Platform.select({ ios: 15, android: 18 })),
  FONT_SIZE_18: normalize(Platform.select({ ios: 16, android: 19 })),
  FONT_SIZE_20: normalize(Platform.select({ ios: 18, android: 21 })),
  FONT_SIZE_22: normalize(Platform.select({ ios: 22, android: 23 })),
  FONT_SIZE_23: normalize(Platform.select({ ios: 23, android: 24 })),
  FONT_SIZE_24: normalize(Platform.select({ ios: 24, android: 25 })),
  FONT_SIZE_35: normalize(Platform.select({ ios: 34, android: 35 })),
  FONT_SIZE_2xl: normalize(Platform.select({ ios: 22, android: 23 })),
};

export { AppColors, AppTypography, AppFontSizes };
