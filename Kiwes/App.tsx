import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import DefaultStack from './src/components/layout/DefaultStack';

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000); // 3초 후에 스플래시 화면을 숨깁니다.
  }, []);

  return (
    <>
      <DefaultStack />
    </>
  );
}

export default App;
