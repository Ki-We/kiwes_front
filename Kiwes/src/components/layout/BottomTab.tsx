import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import {TouchableOpacity, Image} from 'react-native';
import {width, height} from '../../global';
import ChatMain from '../../pages/ChatMain';
import CreateMeeting from '../../pages/CreateMeeting';
import Home from '../../pages/Home';
import MyPage from '../../pages/MyPage';
import WishList from '../../pages/WishList';

const Tab = createBottomTabNavigator();

export default function BottomTab({navigation}) {
  const onPress = () => navigation.navigate('CreateMeeting');

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#58C047',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'HOME',
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="wish"
        component={WishList}
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
                  width: width * 49,
                  height: height * 46,
                  resizeMode: 'contain',
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
}
