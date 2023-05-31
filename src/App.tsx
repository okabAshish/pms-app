import React from 'react';
import {StatusBar} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import Navigator from './Navigator';
import store from './store';

type Props = {};

const App = (props: Props) => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <StatusBar
          barStyle={'dark-content'}
          showHideTransition={'fade'}
          backgroundColor={'#fff'}
        />
        <Navigator />
      </Provider>
    </PaperProvider>
  );
};

export default App;
