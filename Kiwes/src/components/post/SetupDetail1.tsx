import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../global';
import DatePicker from 'react-native-date-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';

export default function SetupDetail1({post, setPost}: any) {
  const [date, setDate] = useState(post.date);
  const [open1, setOpen1] = useState(false);
  const [dueTo, setDueTo] = useState(post.dueTo);
  const [open2, setOpen2] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>모임 날짜</Text>
        <Pressable style={styles.date} onPress={() => setOpen1(true)}>
          <Text>{date == '' ? '모임의 일정을 입력해주세요.' : date}</Text>
          <Text>
            <FontAwesomeIcon icon={faCalendar} />
          </Text>
        </Pressable>
        <DatePicker
          mode="date"
          modal
          open={open1}
          date={new Date()}
          onConfirm={date => {
            setOpen1(false);

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const formattedDateString = `${year}-${month}-${day}`;
            setDate(formattedDateString);
            setPost({...post, date: formattedDateString});
          }}
          onCancel={() => {
            setOpen1(false);
          }}
        />

        <Text style={styles.text}>모집 마감일</Text>
        <Pressable style={styles.date} onPress={() => setOpen2(true)}>
          <Text>{dueTo == '' ? '모임 마감일을 입력해주세요.' : dueTo}</Text>
          <Text>
            <FontAwesomeIcon icon={faCalendar} />
          </Text>
        </Pressable>
        <DatePicker
          mode="date"
          modal
          open={open2}
          date={new Date()}
          onConfirm={date => {
            setOpen2(false);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const formattedDateString = `${year}-${month}-${day}`;
            setDueTo(formattedDateString);
            setPost({...post, dueTo: formattedDateString});
          }}
          onCancel={() => {
            setOpen2(false);
          }}
        />

        <Text style={styles.text}>장소</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: width * 20,
  },
  text: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: width * 13,
    color: '#303030',
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    padding: 10,
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: height * 20,
    height: height * 48,
    marginBottom: height * 20,
  },
});
