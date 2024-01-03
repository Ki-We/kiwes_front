import React, {useEffect} from 'react';
// import {Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../../pages/Login';
// import SplashPage from '../../pages/SplashPage';
// import Home from '../../pages/Home';
// import CreateMeeting from '../../pages/CreateMeeting';
// import ChatTest from '../../pages/ChatTest';
// import ChatMain from '../../pages/ChatMain';
// import KeyboardTest from '../../pages/KeyboardTest';
import BottomTab from './BottomTab';
import {NavigationContainer} from '@react-navigation/native';
import PostClub from '../../pages/PostClub';

const LoginStack = () => {
  useEffect(() => {
    checkLoginState();
  }, []);

  const checkLoginState = async () => {
    const userData = await AsyncStorage.getItem('userdata');
    console.log(userData);
  };
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />

        {/* 하단 Stack은 bottom 없이 이동되어야 하는 Stack */}

        <Stack.Screen
          name="PostClub"
          component={PostClub}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginStack;
