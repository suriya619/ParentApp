const commonColor = {
    commonWhite: '#FFFFFF',
    commonBlack: '#000000',
    gray:{
      100: "#E2E5ED",
      200: "#EAEDF3",
    },
    trueGray:{
      50: '#fafafa',
      300: '#d4d4d4',
      400: '#a3a3a3',
      700: '#404040',
    },
    coolGray:{
      50: '#f9fafb',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    muted: {
      500: '#737373',
      800: '#262626',
      900: '#171717',
    },
    primary: {
      50: "#F4F9FB",
      100: "#CDDCE1",
      200: "#A6BFC8",
      300: "#80A1AC",
      350: "#688C97",
      400: "#5C8490",
      500: "#366775",
      600: "#2D5662",
      650: "#245f6b",
      675: "#226978",
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
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      500: "#64748B",
      600: "#475569",
    },
    oracle:{
      600: "#245F6B",
      700: "#1F515B"
    },
    // CustomGray color for Dark mode
    customGray: "#6b7280",
    avatarBg: "#9fbbc1",
    errorColor: "#DC2626",
  };
  
const light = {
  themeColor: commonColor.commonWhite,
  white: '#000000',
  sky: '#DE5E69',
  primaryColor: "#132D35",
  primaryTextColor: commonColor.primary[500],
  secondaryColor: commonColor.secondary[600],
  borderColor: commonColor.gray[100],
  splashBgColor: commonColor.primary[900],
  modalBgColor: commonColor.commonWhite,
  iconColor: commonColor.muted[500],
  labelColor: commonColor.primary[675],
  activeRadioColor: commonColor.primary[600],
  inactiveRadioColor: commonColor.primary[200],
  blueGrayIconColor: commonColor.blueGray[500],
  ...commonColor,
};

const dark = {
  themeColor: commonColor.coolGray[800],
  white: '#FFFFFF',
  sky: '#831a23',
  primaryColor: "#222836",
  primaryTextColor: commonColor.coolGray[900],
  secondaryColor: commonColor.secondary[600],
  borderColor: commonColor.blueGray[500],
  splashBgColor: commonColor.coolGray[900],
  modalBgColor: commonColor.muted[800],
  iconColor: commonColor.trueGray[400],
  labelColor: commonColor.commonWhite,
  activeRadioColor: commonColor.primary[500],
  inactiveRadioColor: commonColor.muted[500],
  blueGrayIconColor: commonColor.blueGray[500],
  ...commonColor,
};

const appThemeColor = { light, dark };

export { appThemeColor };