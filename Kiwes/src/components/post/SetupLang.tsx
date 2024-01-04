import React from 'react';
import {Text} from 'react-native';
import RoundBtn from '../atoms/roundBtn';

export default function SetupLang() {
  return (
    <>
      <RoundBtn
        text="한국어"
        onPress={() => {
          return;
        }}
      />
      <Text>한국어</Text>

      <Text>중국어</Text>

      <Text>한국어</Text>

      <Text>한국어</Text>
    </>
  );
}
