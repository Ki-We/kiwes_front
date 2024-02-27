import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../../pages/Login';
import BottomTab from './BottomTab';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AlarmPage from '../../pages/AlarmPage';
import Search from '../../pages/Search';
import WishPage from '../../pages/WishPage';
import AlarmList from '../alarm/AlarmList';
import SettingPage from '../../pages/SettingPage';
import ClubDetail from '../../pages/ClubDetail';
import Event from '../../pages/Event';
import ReviewPage from '../../pages/ReviewPage';
import QnAPage from '../../pages/QnAPage';
import ProfileImageSettingPage from '../../pages/profileSetting/ProfileImageSettingPage';
import NickNameSettingPage from '../../pages/profileSetting/NickNameSettingPage';
import GenderSettingPage from '../../pages/profileSetting/GenderSettingPage';
import BirthdaySettingPage from '../../pages/profileSetting/BirthdaySettingPage';
import IntroduceSettingPage from '../../pages/profileSetting/IntroduceSettingPage';
import NationSettingPage from '../../pages/basicSetting/NationSettingPage';
import NationDetailSettingPage from '../../pages/basicSetting/NationDetailSettingPage';
import InterestLanguageSettingPage from '../../pages/basicSetting/InterestLanguageSettingPage';
import InterestTopicSettingPage from '../../pages/basicSetting/InterestTopicSettingPage';
import ProfileSettingPage from '../../pages/ProfileSettingPage';
import ChatTest from '../../pages/ChatTest';
import ChatRoom from '../../pages/ChatRoom';
import UploadImageTest from '../UploadImageTest';
import OtherUserPage from '../../pages/OtherUserPage';
import CorrectionPage from '../../pages/CorrectionPage';
import {useDispatch} from 'react-redux';
import {setLanguage} from '@/slice/LanguageSlice';

const LoginStack = () => {
  useEffect(() => {
    checkLoginState();

    getLanguage();
  }, []);

  const checkLoginState = async () => {
    const userData = await AsyncStorage.getItem('userdata');
    console.log('UserData : ', userData);
  };
  const Stack = createStackNavigator();

  const dispatch = useDispatch();
  const getLanguage = async () => {
    let language = await AsyncStorage.getItem('language');
    if (!language) language = 'EN';

    dispatch(setLanguage({language}));
  };
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
        <Stack.Screen
          name="ProfileImageSettingPage"
          component={ProfileImageSettingPage}
        />
        <Stack.Screen
          name="NickNameSettingPage"
          component={NickNameSettingPage}
        />
        <Stack.Screen name="GenderSettingPage" component={GenderSettingPage} />
        <Stack.Screen
          name="BirthdaySettingPage"
          component={BirthdaySettingPage}
        />
        <Stack.Screen
          name="IntroduceSettingPage"
          component={IntroduceSettingPage}
        />
        <Stack.Screen name="NationSettingPage" component={NationSettingPage} />
        <Stack.Screen
          name="NationDetailSettingPage"
          component={NationDetailSettingPage}
        />
        <Stack.Screen
          name="InterestLanguageSettingPage"
          component={InterestLanguageSettingPage}
        />
        <Stack.Screen
          name="InterestTopicSettingPage"
          component={InterestTopicSettingPage}
        />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="WishPage" component={WishPage} />
        <Stack.Screen name="ClubDetail" component={ClubDetail} />
        <Stack.Screen name="AlarmPage" component={AlarmPage} />
        <Stack.Screen name="AlarmList" component={AlarmList} />
        <Stack.Screen name="SettingPage" component={SettingPage} />
        <Stack.Screen
          name="ProfileSettingPage"
          component={ProfileSettingPage}
        />
        <Stack.Screen name="EventPage" component={Event} />
        <Stack.Screen name="ReviewPage" component={ReviewPage} />
        <Stack.Screen name="QnAPage" component={QnAPage} />
        <Stack.Screen name="ChatTest" component={ChatTest} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="UploadImageTest" component={UploadImageTest} />
        <Stack.Screen name="OtherUserPage" component={OtherUserPage} />
        <Stack.Screen name="CorrectionPage" component={CorrectionPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginStack;
