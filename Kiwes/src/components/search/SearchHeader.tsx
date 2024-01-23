import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import backIcon from 'react-native-vector-icons/Ionicons';
import {width, height} from '../../global';
import {TextInput} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

export default function SearchHeader({navigation, doSearch}: any) {
  const [search, setSearch] = useState('');
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
          onPress={() => navigation.pop()}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#8A8A8A'}
            placeholder="  검색어를 입력하세요"
            onChangeText={text => setSearch(text)}
            onSubmitEditing={() => doSearch(search)}
            returnKeyType="search"
          />
          <Pressable
            style={styles.iconContainer}
            onPress={() => doSearch(search)}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 0,
    padding: 5,
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: width * 10,
    paddingRight: width * 10,
    height: height * 66,
  },
  separator: {
    height: height * 25,
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1.5,
    marginBottom: height * 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#EDEDED',
    marginTop: height * 20,
    height: height * 36,
    marginBottom: height * 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    fontSize: 13,
    color: '#8A8A8A',
    flex: 1,
  },
  iconContainer: {
    marginRight: width * 5,
  },
});
