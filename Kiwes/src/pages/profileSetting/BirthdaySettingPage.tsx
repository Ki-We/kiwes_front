import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import {width, height} from '../../global';
import backIcon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';

const BirthdaySettingPage = ({route, navigation}) => {
  const {nickname, gender} = route.params;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);
  const [birthday, setBirthday] = useState('');

  const handleNext = () => {
    navigation.navigate('IntroduceSettingPage', {
      nickname: nickname,
      gender: gender,
      birthday: birthday,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{width: width * 50}}>
          <backIcon.Button
            backgroundColor="#FFFFFF"
            iconStyle={{marginRight: 0, padding: 5}}
            borderRadius={3}
            name="arrow-back"
            color="#303030"
            size={25}
            onPress={() => navigation.pop()}
          />
        </View>
        <Text style={styles.headerText}>프로필 설정</Text>
        <View style={{width: width * 50}}></View>
      </View>
      <View
        style={{
          width: '80%',
          height: height * 4,
          backgroundColor: 'black',
          marginBottom: 100,
        }}></View>
      <View
        style={{
          height: height * 40,
          flexDirection: 'row',
          paddingLeft: 20,
          padding: 5,
        }}>
        <Text style={styles.mainText}>생년월일</Text>
        <Text style={[styles.mainText, {color: '#58C047'}]}> *</Text>
      </View>
      <View style={styles.mainContainer}>
        <Pressable style={styles.dateInput} onPress={() => setOpen(true)}>
          {checkStatus === true ? (
            <Text style={styles.inputText}>{birthday}</Text>
          ) : (
            <Text style={styles.inputText}>클릭해주세요</Text>
          )}
        </Pressable>
        <DatePicker
          modal
          open={open}
          mode="date"
          date={date}
          onConfirm={date => {
            setDate(date);
            setBirthday(
              date.getFullYear() +
                '-' +
                (date.getMonth() + 1).toString().padStart(2, '0') +
                '-' +
                date.getDate().toString().padStart(2, '0'),
            );
            setOpen(false);
            setCheckStatus(true);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      {checkStatus === true ? (
        <TouchableOpacity style={styles.nextButton1} onPress={handleNext}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'Pretendard',
              fontSize: height * 18,
              fontWeight: '600',
            }}>
            다음
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.nextButton2}>
          <Text
            style={{
              color: '#DADADA',
              fontFamily: 'Pretendard',
              fontSize: height * 18,
              fontWeight: '600',
            }}>
            다음
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: width * 10,
    height: height * 66,
    borderBottomWidth: height * 1,
    borderBottomColor: '#989898',
    marginBottom: height * -2,
  },
  headerText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: height * 20,
    fontWeight: '600',
  },
  mainText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: height * 15,
    fontWeight: '600',
  },
  mainContainer: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateInput: {
    height: height * 40,
    width: '100%',
    padding: 5,
    borderBottomWidth: 1,
  },
  inputText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: height * 15,
    fontWeight: '500',
  },
  nextButton1: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 50,
    width: width * 340,
    borderWidth: 2,
    borderColor: '#58C047',
    backgroundColor: '#58C047',
    borderRadius: 8,
    marginTop: height * 195,
  },
  nextButton2: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 50,
    width: width * 340,
    borderWidth: 2,
    borderColor: '#DADADA',
    borderRadius: 8,
    marginTop: height * 195,
  },
});

export default BirthdaySettingPage;
