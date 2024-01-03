import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashPage from '../../pages/SplashPage';
import Home from '../../pages/Home';
import ChatTest from '../../pages/ChatTest';
import KeyboardTest from '../../pages/KeyboardTest';

const HomeStack = () => {
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
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="HomePage"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Splash" component={SplashPage} />
      <Stack.Screen name="Test" component={ChatTest} />
      <Stack.Screen name="KeyboardTest" component={KeyboardTest} />
    </Stack.Navigator>
  );
};

export default HomeStack;
