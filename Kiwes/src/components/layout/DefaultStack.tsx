import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../../pages/Login';
import BottomTab from './BottomTab';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AlarmPage from '../../pages/AlarmPage';
import Search from '../../pages/Search';
import WishPage from '../../pages/WishPage';
import ProfilePage from '../../pages/ProfilePage';
import AlarmList from '../alarm/AlarmList';
import SettingPage from '../../pages/SettingPage';
import NoticePage from '../../pages/NoticePage';
import ClubDetail from '../../pages/ClubDetail';
import Event from '../../pages/Event';

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
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: 'white',
        },
      }}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomTab" component={BottomTab} />

        {/* 하단 Stack은 bottom 없이 이동되어야 하는 Stack */}

        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="WishPage" component={WishPage} />
        <Stack.Screen name="ClubDetail" component={ClubDetail} />
        <Stack.Screen name="NoticePage" component={NoticePage} />
        <Stack.Screen name="AlarmPage" component={AlarmPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="AlarmList" component={AlarmList} />
        <Stack.Screen name="SettingPage" component={SettingPage} />
        <Stack.Screen name="EventPage" component={Event} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginStack;
