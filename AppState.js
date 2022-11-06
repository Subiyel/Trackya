import { createContext } from 'react';
import { useColorScheme } from 'react-native';
import themes from "./src/util/Colors";


const AppStateContext = createContext();

const AppStateProvider = props => {

    const isDarkMode = useColorScheme() === 'dark';
    const ThemeContext = isDarkMode ? themes.dark : themes.light

  return (
    <AppStateContext.Provider value={ThemeContext}>
      {props.children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;