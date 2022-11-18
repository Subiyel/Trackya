/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator'
import { PersistGate } from 'redux-persist/integration/react'
import store from './src/store/configureStore';
import { persistStore, persistReducer } from 'redux-persist'
import themes from "./src/util/Colors";
import AppStateProvider from "./AppState"
import Toast from 'react-native-toast-message';
let persistor = persistStore(store)
const ThemeContext = React.createContext(themes.light);
// const {store, persistor} = configureStore();

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

console.log("Store: ", store)
console.log(" persistor: ",persistor )
console.log(" Provider: ",Provider )

console.log(" PersistGate: ",PersistGate )

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex:1,
    backgroundColor: isDarkMode ? Colors.darker : 'white',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppStateProvider>
              <AppNavigator />
              <Toast />
          </AppStateProvider>
        </PersistGate>
       </Provider> 
     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
