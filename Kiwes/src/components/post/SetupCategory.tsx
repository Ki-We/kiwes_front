import React, {useState} from 'react';
import RoundCategory from '../atoms/roundCategory';
import {StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../global';
import {categoryList} from '../../utils/utils';

export default function SetupCategory({post, setPost}: any) {
  const [category, setCategory] = useState(post.category);
  return (
    <>
      <View style={styles.text}>
        <Text>
          <Text style={styles.highlight}>*</Text> 하나만 선택 가능
        </Text>
      </View>
      <View style={styles.container}>
        {categoryList.map(({key, text}, i) => (
          <RoundCategory
            id={key}
            key={`category_${i}`}
            text={text}
            isSelect={category === key}
            onPress={() => {
              setCategory(key);
              setPost({...post, category: key});
            }}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: width * 20,
    gap: 5,
  },
  text: {
    marginLeft: width * 20,
    color: '#ADADAD',
  },
  highlight: {
    color: '#3DBE14',
    fontSize: height * 12,
    fontWeight: '600',
  },
});
