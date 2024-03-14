import React, {useState} from 'react';
import RoundBtn from '../atoms/roundBtn';
import {StyleSheet, View} from 'react-native';
import {height, width} from '../../global';
import {LANGUAGE, langList} from '../../utils/utils';
import {FlatList} from 'react-native-gesture-handler';
import Text from '@components/atoms/Text';
import {useSelector} from 'react-redux';
import {RootState} from '@/slice/RootReducer';

export default function SetupLang({post, setPost}: any) {
  const language = useSelector((state: RootState) => state.language);
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
      <View>
        <Text style={styles.text}>
          <Text style={styles.highlight}>*{' '}</Text>
          {language.language === LANGUAGE.KO
            ? '최대 2개 선택 가능'
            : 'Maximum two languages'}
        </Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={langList}
          renderItem={({item}) => (
            <View style={{marginLeft: width * 5, marginRight: width * 5}}>
              <RoundBtn
                text={item.text}
                isSelect={selectedLang.includes(item.key)}
                onPress={() => {
                  onPressEvent(item.key);
                }}
              />
            </View>
          )}
          numColumns={3}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginLeft: width * 20,
    color: '#ADADAD',
    marginBottom: height * 15,
  },
  highlight: {
    fontSize: height * 12,
    fontWeight: '600',
    color: '#3DBE14',
  },
});
