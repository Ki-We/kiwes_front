import {View, Button} from 'react-native';
import React from 'react';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import axios from 'axios';

export default function KakaoTest() {
  const signInWithKakao = async () => {
    const result = await KakaoLogin.login().catch(error => {
      console.log(error);
      if (error.code === 'E_CANCELLED_OPERATION') {
        console.log('Login Cancel', error.message);
      } else {
        console.log(`Login Fail(code:${error.code})`, error.message);
      }
    });

    console.log('Login Success', JSON.stringify(result));

    const loginResult = await axios
      .post(`https://api.kiwes.org/oauth/kakao?token=${result?.accessToken}`)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });

    console.log('loginResult : ', loginResult);
  };

  return (
    <View>
      <Button title="로그인" onPress={signInWithKakao} />
    </View>
  );
}
