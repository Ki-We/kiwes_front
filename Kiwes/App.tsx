import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import DefaultStack from './src/components/layout/DefaultStack';

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <>
      <DefaultStack />
    </>
  );
}

export default App;
