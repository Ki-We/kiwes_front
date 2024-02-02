import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import DefaultStack from './src/components/layout/DefaultStack';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

const reducers = (state = {isChange: false}, action: any) => {
  switch (action.type) {
    case 'PROFILE_CHANGE':
      return {isChange: true};
    case 'PROFILE_CACHE':
      return {isChange: false};
    default:
      return state;
  }
};
const store = createStore(reducers);
function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <>
      <Provider store={store}>
        <DefaultStack />
      </Provider>
    </>
  );
}

export default App;
