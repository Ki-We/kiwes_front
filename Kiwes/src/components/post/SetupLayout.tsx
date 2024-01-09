import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {height, width} from '../../global';

export default function SetupLayout({
  isStart = false,
  isEnd = false,
  title,
  children,
  onPrev,
  onNext,
}: any) {
  return (
    // <View style={styles1.container}>
    //   <View style={styles1.case1} />
    //   <View style={styles1.case2} />
    // </View>
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <ScrollView style={styles.middleContainer}>{children}</ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable
          style={isStart ? styles.prevBtn1 : styles.prevBtn2}
          onPress={
            isStart
              ? () => {
                  return;
                }
              : onPrev
          }>
          <View style={styles.btn}>
            <Text style={isStart ? styles.prevColor1 : styles.prevColor2}>
              이전
            </Text>
          </View>
        </Pressable>
        <Pressable style={styles.nextBtn} onPress={onNext}>
          <View style={styles.btn}>
            <Text style={styles.nextColor}>{isEnd ? '등록' : '다음'}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    height: 100,
    marginTop: height * 15,
    marginLeft: width * 20,
  },
  title: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: width * 24,
    color: '#303030',
    whiteSpace: 'pre-line',
  },
  middleContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    height: '100%',
  },
  prevBtn1: {
    width: width * 135,
    height: height * 40,
    backgroundColor: '#DADADA',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    margin: 10,
  },
  prevColor1: {
    fontFamily: 'Pretendard',
    fontWeight: '600',
    fontSize: width * 16,
    color: '#E8E8E8',
  },
  prevBtn2: {
    width: width * 135,
    height: height * 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#DADADA',
    margin: 10,
  },
  prevColor2: {
    fontFamily: 'Pretendard',
    fontWeight: '600',
    fontSize: width * 16,
    color: '#303030',
  },
  nextBtn: {
    width: width * 135,
    height: height * 40,
    backgroundColor: '#58C047',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#58C047',
    margin: 10,
  },
  nextColor: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: width * 16,
    color: '#ffffff',
  },
});
