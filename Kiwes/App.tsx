import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import DefaultStack from './src/components/layout/DefaultStack';
import {Provider} from 'react-redux';
import {Store} from '@/slice/Store';

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <Provider store={Store}>
      <DefaultStack />
    </Provider>
  );
}

export default App;
