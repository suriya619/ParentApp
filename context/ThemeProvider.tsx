import React, { useEffect, useState } from 'react';
import { useColorMode } from 'native-base';
import { appThemeColor } from '../assets/styles/colors';

export const ThemeContext = React.createContext<any>({});

const ThemeProvider = ({ children } : any) => {
  const { colorMode } = useColorMode();
  const [isLightTheme, setLightTheme] = useState(true);

  useEffect(() => {
    getTheme();
  }, [colorMode]);

  const getTheme = async () => {
    setLightTheme(colorMode === "dark" ? false : true);
  }

  const toggleTheme = (theme: string) => {
    setLightTheme(theme === "dark"? false : true);
  }

  const theme = {
    colors: isLightTheme ? appThemeColor.light : appThemeColor.dark,
    toggleTheme,
    isLightTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;