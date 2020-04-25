/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Root} from 'native-base';
import SplashScreen from 'react-native-splash-screen';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
// Imports: Redux Persist Persister
import {store, persistor} from './src/_store/store';

import {isSignedIn} from './src/_services';
import {createRootNavigator} from './src/router';
import {checkPermission} from './src/_services/firebase';

const App: () => React$Node = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [checkedSignIn, setCheckedSignIn] = useState(false);

  useEffect(() => {
    checkSignIn();
    SplashScreen.hide();
    checkPermission();
  }, []);

  const checkSignIn = () => {
    isSignedIn()
      .then(res => {
        setSignedIn(res);
        setCheckedSignIn(true);
      })
      .catch(err => alert('An error occurred', err));
  };

  const Layout = createRootNavigator(signedIn);
  return !checkedSignIn ? null : (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root>
            <Layout />
          </Root>
        </PersistGate>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
