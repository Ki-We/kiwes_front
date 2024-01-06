import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ApprovalList from '../alarm/ApprovalList';
import RequestList from '../alarm/RequestList';
import WatingList from '../alarm/WaitingList';

const AlarmStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="ApprovalList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ApprovalList" component={ApprovalList} />
      <Stack.Screen name="RequestList" component={RequestList} />
      <Stack.Screen name="WatingList" component={WatingList} />
    </Stack.Navigator>
  );
};
export default AlarmStack;
