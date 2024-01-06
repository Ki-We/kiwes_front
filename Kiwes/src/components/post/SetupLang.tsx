import React, {useState} from 'react';
import RoundBtn from '../atoms/roundBtn';
import {StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../global';
import {langList} from '../../utils/utils';

export default function SetupLang({post, setPost}: any) {
  const [selectedLang, setSelectedLang] = useState<String[]>(post.languages);
  const checkLang = () => {
    if (selectedLang.length >= 2) return false;
    return true;
  };
  const onPressEvent = (lang: String) => {
    if (selectedLang.includes(lang)) {
      var s = selectedLang.filter(function (item) {
        return item !== lang;
      });
      setSelectedLang(s);
      setPost({...post, languages: s});
      return;
    }
    if (checkLang()) {
      setSelectedLang([...selectedLang, lang]);
      setPost({...post, languages: [...selectedLang, lang]});
    }
  };
  return (
    <>
      <View style={styles.text}>
        <Text>
          <Text style={styles.highlight}>*</Text> 최대 2개 선택 가능
        </Text>
      </View>
      <View style={styles.container}>
        {langList.map(lang => (
          <RoundBtn
            text={lang}
            isSelect={selectedLang.includes(lang)}
            onPress={() => {
              onPressEvent(lang);
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
