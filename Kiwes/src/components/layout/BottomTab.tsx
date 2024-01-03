import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, Image} from 'react-native';
import {width, height} from '../../global';
import ChatMain from '../../pages/ChatMain';
import CreateMeeting from '../../pages/CreateMeeting';
import MyPage from '../../pages/MyPage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HomeStack from './HomeStack';
import WishStack from './WishStack';

const Tab = createBottomTabNavigator();

const BottomTab = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  const onPress = () => navigation.navigate('CreateMeeting');
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: height * 65 + insets.bottom,
          paddingTop: height * 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Pretendard-Bold',
          fontSize: width * 10,
          fontWeight: '600',
          paddingBottom: height * 5,
        },
        tabBarActiveTintColor: '#58C047',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'HOME',
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          tabBarLabel: 'HOME',
        }}
      />
      <Tab.Screen
        name="wish"
        component={WishStack}
        options={{
          title: 'WISH',
          tabBarIcon: ({color, size}) => (
            <Icon name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateMeeting"
        component={CreateMeeting}
        options={{
          headerShown: false,
          tabBarButton: () => (
            <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
              <Image
                source={{
                  uri: 'https://s3-alpha-sig.figma.com/img/677f/08a0/65dea42679c06af145f80d3ab5b3d92e?Expires=1696204800&Signature=oGyNfscQ5ZpnKOEED1l7A3B6si9Y4ma5kK50tE1ZyWaFBKkr-no9MCykDBEjPAbkarnNzTRq~bKOulU~semnqW0OFZnOhBXb77PaB5vIaUYA8C2nF~y-EnzFAEwrQrFmzVDGk29r3KZR2a9kukprq6d3nWTlr-o9WDiZp~gW5td0QQQ1keq-4K8CSfUoPiGErPvhOP5AS-FqKrXjvir2mYJvpaZEgYvUDPq8vbCUPtHe3ttPyCpVKxL4HbqEEDPQT--lFFX~6ZAgv6XauEkCtvSzPs1kdeMS4W9rwB20CBLx2pMtkjj3AzMedSq9u66e~3Vhy4zfUS56rD8FSNARpg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
                }}
                style={{
                  // marginTop: height * 10,
                  width: width * 49,
                  height: height * 46,
                  resizeMode: 'center',
                }}
              />
            </TouchableOpacity>
            // >
          ),
        }}
      />
      <Tab.Screen
        name="ChatMain"
        component={ChatMain}
        options={{
          headerShown: false,
          title: 'CHAT',
          tabBarIcon: ({color, size}) => (
            <Icon name="chatbox-ellipses-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          title: 'MY',
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTab;
