import React, {useEffect} from 'react';
import {Dimensions,} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../../pages/Login';
import SplashPage from '../../pages/SplashPage';
import Home from '../../pages/Home';
import CreateMeeting from '../../pages/CreateMeeting';
import ChatTest from '../../pages/ChatTest';
import ChatMain from '../../pages/ChatMain';
import ChatRoom from '../../pages/ChatRoom';
import KeyboardTest from '../../pages/KeyboardTest';
import BottomTab from './BottomTab';
import { NavigationContainer } from '@react-navigation/native';

const LoginStack = () => {
  console.log(Dimensions.get('screen').height);
  useEffect(() => {
    checkLoginState();
  }, []);
  const checkLoginState = async () => {
    const userData = await AsyncStorage.getItem('userdata');
    console.log(userData);
  };
  const Stack = createStackNavigator();
  return (
    <NavigationContainer >
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
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default LoginStack;