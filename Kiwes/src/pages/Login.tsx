import {StyleSheet, SafeAreaView, Image, Pressable, Text} from 'react-native';
import React, {useCallback} from 'react';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import {apiServer} from '../utils/metaData';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_WEB_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} from '../utils/googleConfig';

export default function Login({navigation}: any) {
  useFocusEffect(
    useCallback(() => {
      checkIsLogin();
      GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
      });
    }, []),
  );
  const checkIsLogin = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData == null) {
      return;
    }

    const tokenData = JSON.parse(userData);
    console.log(tokenData.accessToken);

    const url = `${apiServer}/myid`;
    const result = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => {
        console.log(err);
        AsyncStorage.removeItem('userData');
      });
    if (result.data.nickName === 'NotSet') {
      navigation.reset({
        index: 0,
        routes: [{name: 'ProfileImageSettingPage'}],
      });
    } else if (result) {
      console.log('verify Result : ', result);
      navigation.reset({
        index: 0,
        routes: [{name: 'BottomTab'}],
      });
    }
  };
  const signInWithApple = async () => {
    console.log('연결 필요');
  };
  const signInWithGoogle = async () => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
    });
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn().catch(error => {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Login Cancel : ', error.message);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(`Login Fail(code:${error.code})`, error.message);
      }
      return;
    });
    if (!userInfo) {
      return;
    }
    const result = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body: JSON.stringify({
        code: userInfo.serverAuthCode,
        client_id: GOOGLE_WEB_CLIENT_ID,
        client_secret: GOOGLE_WEB_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: GOOGLE_REDIRECT_URI,
      }),
    }).then(res => {
      return res.json();
    });
    const url = `${apiServer}/login/oauth2/code/google?token=${result?.access_token}`;
    const {data} = await new RESTAPIBuilder(url, 'POST')
      .build()
      .run()
      .catch(err => {
        console.log(err);
      });
    console.log('Login Success');
    const tokenData = {
      userId: data.userId,
      accessToken: data.accessToken,
    };
    await AsyncStorage.setItem('userData', JSON.stringify(tokenData));
    navigation.reset({
      index: 0,
      routes: [{name: 'BottomTab'}], // 로그인 화면의 라우트 이름을 지정
    });
    // await navigation.navigate('BottomTab');
  };

  const signInWithKakao = async () => {
    const result = await KakaoLogin.login().catch(error => {
      console.log(error);
      if (error.code === 'E_CANCELLED_OPERATION') {
        console.log('Login Cancel', error.message);
      } else {
        console.log(`Login Fail(code:${error.code})`, error.message);
      }
      return;
    });
    if (!result) {
      return;
    }

    const url = `${apiServer}/oauth/kakao?token=${result?.accessToken}`;
    const {data} = await new RESTAPIBuilder(url, 'POST')
      .build()
      .run()
      .catch(err => {
        console.log(err);
      });
    console.log('Login Success');
    const tokenData = {
      userId: data.userId,
      accessToken: data.accessToken,
    };
    await AsyncStorage.setItem('userData', JSON.stringify(tokenData));
    navigation.reset({
      index: 0,
      routes: [{name: 'BottomTab'}],
    });
    // await navigation.navigate('BottomTab');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/loginImg.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Pressable onPress={signInWithKakao}>
        <Image
          source={{
            uri: 'https://kiwes2-bucket.s3.ap-northeast-2.amazonaws.com/main/kakao_login.png',
          }}
          style={styles.oauth}
          resizeMode="contain"
        />
      </Pressable>
      <Pressable onPress={signInWithApple}>
        <Image
          source={{
            uri: 'https://kiwes2-bucket.s3.ap-northeast-2.amazonaws.com/main/apple_login.png',
          }}
          style={styles.oauth}
          resizeMode="contain"
        />
      </Pressable>
      <Pressable onPress={signInWithGoogle}>
        <Image
          source={{
            uri: 'https://kiwes2-bucket.s3.ap-northeast-2.amazonaws.com/main/google_login.png',
          }}
          style={styles.oauth}
          resizeMode="contain"
        />
      </Pressable>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    aspectRatio: 1,
    width: '100%',
    marginBottom: 30,
  },
  oauth: {
    aspectRatio: 5,
    width: '70%',
    marginBottom: 5,
  },
});
