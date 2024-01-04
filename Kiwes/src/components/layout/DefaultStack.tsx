import React, {useEffect} from 'react';
// import {Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../../pages/Login';
import BottomTab from './BottomTab';
import {NavigationContainer} from '@react-navigation/native';
import PostClub from '../../pages/PostClub';
import WishList from '../../pages/WishList';
import ClubPage from '../../pages/ClubPage';
import AlarmPage from '../../pages/AlarmPage';
import ApprovalPage from '../ApprovalList';

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
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomTab" component={BottomTab} />

        {/* 하단 Stack은 bottom 없이 이동되어야 하는 Stack */}

        <Stack.Screen name="PostClub" component={PostClub} />
        <Stack.Screen name="WishPage" component={WishList} />
        <Stack.Screen name="ClubPage" component={ClubPage} />
        <Stack.Screen name="AlarmPage" component={AlarmPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginStack;
