import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {width, height, DeviceWidth} from '../global';
import Icon from 'react-native-vector-icons/FontAwesome5';

const TranslateModal = ({
  isVisible,
  onClose,
  setLanguages,
  setAndTranslate,
}) => {
  const [isSourceSelect, setSourceSelect] = useState(true);
  const checkSourceSelect = () => {
    setSourceSelect(!isSourceSelect);
  };

  const [isTargetSelect, setTargetSelect] = useState(true);
  const checkTargetSelect = () => {
    setTargetSelect(!isTargetSelect);
  };
  //////////////// source 언어
  const SourceComponent = ({source}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // onSelect();
          checkSourceSelect();
          setSelectedSource(source);
        }}
        style={{
          padding: 10,
          borderWidth: 1,
          alignItems: 'center',
          backgroundColor: '#EDEDED',
        }}>
        <Text style={styles.modalText}>{source}</Text>
      </TouchableOpacity>
    );
  };

  const sourceOptions = [
    '한국어(ko)',
    '영어(en)',
    '일본어(ja)',
    '중국어 간체(zh-CN)',
    '중국어 번체(zh-TW)',
    '베트남어(vi)',
    '인도네시아어(id)',
    '태국어(th)',
    '독일어(de)',
    '러시아어(ru)',
    '스페인어(es)',
    '이탈리아어(it)',
    '프랑스어(fr)',
  ];
  const [selectedSource, setSelectedSource] = useState('번역 전 언어');

  // const handleSourceSelect = source => {
  //   console.log(source);
  //   setSelectedSource(source);
  //   console.log(selectedSource);
  // };
  //////////////// source 언어

  //////////////// target 언어
  const TargetComponent = ({target}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          // onSelect();
          checkTargetSelect();
          setSelectedTarget(target);
        }}
        style={{
          padding: 10,
          borderWidth: 1,
          alignItems: 'center',
          backgroundColor: '#EDEDED',
        }}>
        <Text style={styles.modalText}>{target}</Text>
      </TouchableOpacity>
    );
  };

  let targetOptions = [];
  if (selectedSource === '영어(en)') {
    targetOptions = [
      '한국어(ko)',
      '일본어(ja)',
      '중국어 간체(zh-CN)',
      '중국어 번체(zh-TW)',
      '프랑스어(fr)',
    ];
  } else if (selectedSource === '한국어(ko)') {
    targetOptions = [
      '영어(en)',
      '일본어(ja)',
      '중국어 간체(zh-CN)',
      '중국어 번체(zh-TW)',
      '베트남어(vi)',
      '인도네시아어(id)',
      '태국어(th)',
      '독일어(de)',
      '러시아어(ru)',
      '스페인어(es)',
      '이탈리아어(it)',
      '프랑스어(fr)',
    ];
  } else if (selectedSource === '일본어(ja)') {
    targetOptions = [
      '한국어(ko)',
      '영어(en)',
      '중국어 간체(zh-CN)',
      '중국어 번체(zh-TW)',
    ];
  } else if (selectedSource === '중국어 간체(zh-CN)') {
    targetOptions = [
      '한국어(ko)',
      '영어(en)',
      '일본어(ja)',
      '중국어 번체(zh-TW)',
    ];
  } else if (selectedSource === '중국어 번체(zh-TW)') {
    targetOptions = [
      '한국어(ko)',
      '영어(en)',
      '일본어(ja)',
      '중국어 간체(zh-CN)',
    ];
  } else if (selectedSource === '베트남어(vi)') {
    targetOptions = ['한국어(ko)'];
  } else if (selectedSource === '인도네시아어(id)') {
    targetOptions = ['한국어(ko)'];
  } else if (selectedSource === '태국어(th)') {
    targetOptions = ['한국어(ko)'];
  } else if (selectedSource === '독일어(de)') {
    targetOptions = ['한국어(ko)'];
  } else if (selectedSource === '러시아어(ru)') {
    targetOptions = ['한국어(ko)'];
  } else if (selectedSource === '스페인어(es)') {
    targetOptions = ['한국어(ko)'];
  } else if (selectedSource === '이탈리아어(it)') {
    targetOptions = ['한국어(ko)'];
  } else if (selectedSource === '프랑스어(fr)') {
    targetOptions = ['한국어(ko)', '영어(en)'];
  } else {
    // Handle other cases if needed
  }

  const [selectedTarget, setSelectedTarget] = useState('번역할 언어');

  const handleTargetSelect = target => {
    setSelectedTarget(target);
  };
  //////////////// target 언어

  const getSourceCode =
    selectedSource && selectedSource.split('(')[1]?.split(')')[0];
  const getTargetCode =
    selectedTarget && selectedTarget.split('(')[1]?.split(')')[0];

  return (
    <Modal
      style={{
        position: 'absolute',
        top: height * 200,
        left: 0,
      }}
      backdropOpacity={0.2}
      isVisible={isVisible}
      animationInTiming={100}
      animationOutTiming={100}
      onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalSelectContainer}>
          {isSourceSelect ? (
            <View style={styles.modalButtonGroup}>
              <SourceComponent
                source={selectedSource}
                // onSelect={() => setSelectedSource(selectedSource)}
              />
            </View>
          ) : (
            <View style={styles.modalButtonGroup}>
              <ScrollView style={{height: 50}}>
                {sourceOptions.map((source, index) => (
                  <SourceComponent
                    key={index}
                    source={source}
                    // onSelect={() => handleSourceSelect(source)}
                  />
                ))}
              </ScrollView>
            </View>
          )}
          <Icon
            name="arrow-right"
            color={'black'}
            size={25}
            style={{marginTop: 17}}
          />
          {isTargetSelect ? (
            <View style={styles.modalButtonGroup}>
              <TargetComponent
                target={selectedTarget}
                // isSelected={true}
                // onSelect={() => setSelectedTarget('')}
              />
            </View>
          ) : (
            <View style={styles.modalButtonGroup}>
              <ScrollView>
                {targetOptions.map((target, index) => (
                  <TargetComponent
                    key={index}
                    target={target}
                    // isSelected={false}
                    // onSelect={() => handleTargetSelect(target)}
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <View style={{}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#EDEDED',
              marginBottom: 20,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 100,
              height: height * 40,
              width: width * 150,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              console.log(selectedSource, selectedTarget);
              onClose();
              if (
                selectedSource === '번역 될 언어' ||
                selectedTarget === '번역할 언어'
              ) {
                setAndTranslate({
                  sourceLanguage: 'en',
                  targetLanguage: 'ko',
                });
              } else {
                setAndTranslate({
                  sourceLanguage: getSourceCode,
                  targetLanguage: getTargetCode,
                });
              }
              setSelectedSource('번역 될 언어');
              setSelectedTarget('번역할 언어');
            }}>
            <Text style={styles.modalText}>번역하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    width: DeviceWidth - 40,
    height: height * 200,
    backgroundColor: '#FFFFFF',
    borderColor: 'black',
    borderWidth: 1.5,
  },
  modalSelectContainer: {
    marginTop: 10,
    height: height * 120,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  modalText: {
    textAlign: 'center',
    color: '#303030',
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: height * 15,
  },
  modalButtonGroup: {
    margin: 10,
    width: width * 130,
  },
});

export default TranslateModal;
