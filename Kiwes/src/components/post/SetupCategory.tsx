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
    justifyContent: 'space-between',
    margin: width * 20,
  },
  text: {
    marginLeft: width * 20,
    color: '#ADADAD',
    marginBottom: height * 15,
  },
  highlight: {
    color: '#3DBE14',
  },
});
