import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatRoom from '../../pages/ChatRoom';
import EventStack from './EventStack';

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
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomePage" component={EventStack} />
      {/* 하단 Stack은 bottom 없이 이동되어야 하는 Stack */}
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};
export default HomeStack;
