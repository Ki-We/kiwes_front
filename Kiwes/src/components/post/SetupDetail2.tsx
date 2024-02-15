import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../global';
import {TextInput} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faWon} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import GenderBtn from './genderBtn';

export default function SetupDetail2({post, setPost}: any) {
  const [gender, setGender] = useState(post.gender);
  const genderList = [
    {key: 'MALE', text: '남자만'},
    {key: 'FEMALE', text: '여자만'},
    {key: 'ALL', text: '누구나'},
  ];
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>인당 예상비용</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#C2C2C2'}
            placeholder="인당 예상비용을 입력해주세요"
            keyboardType="number-pad"
            onChangeText={text => {
              setPost({...post, cost: Number(text)});
            }}
          />
          <View style={styles.iconContainer}>
            <FontAwesomeIcon icon={faWon} />
          </View>
        </View>

        <Text style={styles.text}>모임 인원</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#C2C2C2'}
            placeholder="모임 인원을 입력해주세요"
            keyboardType="number-pad"
            onChangeText={text => {
              setPost({...post, maxPeople: Number(text)});
            }}
          />
          <View style={styles.iconContainer}>
            <FontAwesomeIcon icon={faUser} />
          </View>
        </View>

        <Text style={styles.text}>모집 성별</Text>
        <View style={styles.btnContainer}>
          {genderList.map(({key, text}, i) => (
            <GenderBtn
              key={`gender_${i}`}
              text={text}
              isSelect={gender === key}
              onPress={() => {
                setGender(key);
                setPost({...post, gender: key});
              }}
            />
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: width * 20,
  },
  text: {
    fontWeight: '600',
    fontSize: height * 13,
    color: '#303030',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    marginTop: height * 20,
    height: height * 48,
    marginBottom: height * 20,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    fontSize: height * 13,
    fontWeight: '500',
    color: '#8A8A8A',
    flex: 1,
  },
  iconContainer: {
    marginRight: width * 5,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 20,
  },
});
