import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {width, height} from '../../global';
import backIcon from 'react-native-vector-icons/Ionicons';

const GenderSettingPage = ({navigation}) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelection = gender => {
    setSelectedGender(gender);
  };

  const renderRadioButton = gender => (
    <TouchableOpacity
      style={styles.radioButtonCircle}
      onPress={() => handleGenderSelection(gender)}>
      {selectedGender === gender && styles.selected ? (
        <View style={styles.selected}></View>
      ) : (
        <View></View>
      )}
    </TouchableOpacity>
  );

  const handleNext = () => {
    navigation.navigate('BirthdaySettingPage');
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
          width: '60%',
          height: height * 4,
          backgroundColor: 'black',
          marginBottom: 100,
        }}></View>
      <View
        style={{
          height: height * 40,
          flexDirection: 'row',
          paddingLeft: width * 20,
          padding: 5,
        }}>
        <Text style={styles.mainText}>성별</Text>
        <Text style={[styles.mainText, {color: '#58C047'}]}> *</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.radioButtonContainer}>
          {renderRadioButton('남성')}
          <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;남</Text>
        </View>
        <View style={styles.radioButtonContainer}>
          {renderRadioButton('여성')}
          <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;여</Text>
        </View>
      </View>
      {selectedGender != null ? (
        <TouchableOpacity style={styles.nextButton1} onPress={handleNext}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'Pretendard',
              fontSize: width * 18,
              fontWeight: '700',
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
              fontSize: width * 18,
              fontWeight: '700',
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
    fontSize: width * 20,
    fontWeight: '900',
  },
  mainText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: width * 15,
    fontWeight: '600',
  },
  mainContainer: {
    height: height * 268,
    flexDirection: 'row',
    paddingLeft: width * 20,
    paddingTop: height * 30,
  },
  radioButtonContainer: {
    width: '50%',
    flexDirection: 'row',
  },
  radioButtonCircle: {
    borderColor: '#58C047',
    borderWidth: 2,
    padding: 2,
    width: 24,
    height: 24,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: '#58C047',
    width: 12,
    height: 12,
    borderRadius: 50,
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
  },
});

export default GenderSettingPage;
