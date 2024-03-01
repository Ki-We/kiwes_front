import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {height, width} from '../../global';
import {TextInput} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faWon} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import Text from '@components/atoms/Text';
import GenderBtn from './genderBtn';
import {RootState} from '@/slice/RootReducer';
import {useSelector} from 'react-redux';
import {LANGUAGE} from '@/utils/utils';

export default function SetupDetail2({post, setPost}: any) {
  const [gender, setGender] = useState(post.gender);
  const [cost, setCost] = useState(post.cost);
  const [maxPeople, setMaxPeople] = useState(post.maxPeople);
  const language = useSelector((state: RootState) => state.language);
  const genderList = [
    {key: 'MALE', text: '남자만'},
    {key: 'FEMALE', text: '여자만'},
    {key: 'ALL', text: '누구나'},
  ];
  console.log('setupdetail2 : ', post);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>인당 예상비용</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={cost.toString()}
            style={styles.input}
            placeholderTextColor={'#C2C2C2'}
            maxLength={6}
            placeholder={
              language.language == LANGUAGE.KO
                ? '인당 예상비용을 입력해주세요. ( 100만원 미만 )'
                : 'Enter the estimated cost/n'
            }
            keyboardType="number-pad"
            onChangeText={text => {
              if (Number.isNaN(Number(text))) {
                setCost(0);
                setPost(prevPost => ({...prevPost, cost: 0}));
                return;
              }
              setCost(Number(text));
              setPost(prevPost => ({...prevPost, cost: Number(text)}));
            }}
          />
          <View style={styles.iconContainer}>
            <FontAwesomeIcon icon={faWon} />
          </View>
        </View>

        <Text style={styles.text}>모임 인원</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={maxPeople.toString()}
            style={styles.input}
            placeholderTextColor={'#C2C2C2'}
            placeholder={
              language.language == LANGUAGE.KO
                ? '모임 인원을 입력해주세요. ( 100명 미만 )'
                : 'Enter the number of participants'
            }
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={text => {
              if (Number.isNaN(Number(text))) {
                setMaxPeople(0);
                setPost(prevPost => ({...prevPost, maxPeople: 0}));
                return;
              }
              setMaxPeople(Number(text));
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
              text={language.language == LANGUAGE.KO ? text : key}
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
