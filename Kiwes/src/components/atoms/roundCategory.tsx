import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../global';
import {categoryIcon, categoryList} from '../../utils/utils';

export default function RoundCategory({id, isSelect, onPress}: any) {
  // if (text == '')
  const category = categoryList.find(c => c.key === id);
  const simple = category ? category.simple : 'UNDEFINED';

  return (
    <Pressable
      style={() => [
        styles.button,
        {
          backgroundColor: isSelect ? '#9BD23C' : '#ffffff',
        },
      ]}
      onPress={onPress}>
      <View style={styles.buttonContent}>
        <Image
          resizeMode="contain"
          source={categoryIcon[id]}
          style={styles.image}
        />
        <Text
          style={{
            ...styles.text,
            color: isSelect ? '#ffffff' : '#303030',
          }}>
          {simple}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: height * 44,
    borderColor: '#9BD23C',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    marginBottom: height * 20,
    paddingLeft: width * 10,
    paddingRight: width * 10,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    marginBottom: width * 3,
    fontFamily: 'Pretendard',
    fontWeight: '300',
    fontSize: width * 13,
  },
  image: {
    marginRight: width * 3,
    width: width * 16,
    height: width * 16,
  },
});
