import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AlarmList from '../alarm/AlarmList';
import RequestList from '../alarm/RequestList';
import ClubApproval from '../alarm/ClubApproval';

const AlarmStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="AlarmList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AlarmList" component={AlarmList} />
      <Stack.Screen name="RequestList" component={RequestList} />
      <Stack.Screen name="ClubApprovalList" component={ClubApproval} />
    </Stack.Navigator>
  );
};
export default AlarmStack;
