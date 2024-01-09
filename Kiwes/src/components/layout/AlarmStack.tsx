import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AlarmList from '../alarm/AlarmList';

const AlarmStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="AlarmList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AlarmList" component={AlarmList} />
    </Stack.Navigator>
  );
};
export default AlarmStack;
