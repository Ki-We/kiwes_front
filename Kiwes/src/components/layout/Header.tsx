import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import backIcon from 'react-native-vector-icons/Ionicons';
import optionIcon from 'react-native-vector-icons/SimpleLineIcons';
import {width, height} from '../../global';

export default function Header({title, rightBtn, navigatePop}: any) {
  console.log(title);
  return (
    <>
      <View style={styles.header}>
        <backIcon.Button
          backgroundColor="#FFFFFF"
          iconStyle={styles.icon}
          borderRadius={3}
          name="arrow-back"
          color="#303030"
          size={25}
          onPress={() => navigatePop()}
        />

        <Text style={styles.headerText}>{title}</Text>

        <optionIcon.Button
          backgroundColor="#FFFFFF"
          iconStyle={styles.icon}
          borderRadius={3}
          name="options-vertical"
          color={rightBtn ? '#303030' : '#ffffff'}
          size={25}
          onPress={rightBtn}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: width * 10,
    paddingRight: width * 10,
    height: height * 66,
  },
  headerText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: width * 20,
    fontWeight: '600',
  },
  separator: {
    height: height * 25,
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1.5,
    marginBottom: height * 10,
  },
  icon: {
    marginRight: 0,
    padding: 5,
  },
});
