import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import Modal2 from 'react-native-modal';
import {width, height, DeviceWidth} from '../global';
import Icon from 'react-native-vector-icons/FontAwesome5';

const TranslateModal = ({isVisible, onClose, translate}) => {
  const [selectedSource, setSelectedSource] = useState('영어');
  const [selectedTarget, setSelectedTarget] = useState('한국어');
  const [sourceModalVisible, setSourceModalVisible] = useState(false);
  const [targetModalVisible, setTargetModalVisible] = useState(false);
  const [sourceModalPosition, setSourceModalPosition] = useState({
    top: 0,
    left: 0,
  });
  const [targetModalPosition, setTargetModalPosition] = useState({
    top: 0,
    left: 0,
  });
  const sourceRef = useRef(null);
  const targetRef = useRef(null);

  const sourceOptions = [
    '한국어',
    '영어',
    '일본어',
    '중국어 간체',
    '중국어 번체',
    '베트남어',
    '인도네시아어',
    '태국어',
    '독일어',
    '러시아어',
    '스페인어',
    '이탈리아어',
    '프랑스어',
  ];
  let targetOptions = [];
  if (selectedSource === '영어') {
    targetOptions = [
      '한국어',
      '일본어',
      '중국어 간체',
      '중국어 번체',
      '프랑스어',
    ];
  } else if (selectedSource === '한국어') {
    targetOptions = [
      '영어',
      '일본어',
      '중국어 간체',
      '중국어 번체',
      '베트남어',
      '인도네시아어',
      '태국어',
      '독일어',
      '러시아어',
      '스페인어',
      '이탈리아어',
      '프랑스어',
    ];
  } else if (selectedSource === '일본어') {
    targetOptions = ['한국어', '영어', '중국어 간체', '중국어 번체'];
  } else if (selectedSource === '중국어 간체') {
    targetOptions = ['한국어', '영어', '일본어', '중국어 번체'];
  } else if (selectedSource === '중국어 번체') {
    targetOptions = ['한국어', '영어', '일본어', '중국어 간체'];
  } else if (selectedSource === '베트남어') {
    targetOptions = ['한국어'];
  } else if (selectedSource === '인도네시아어') {
    targetOptions = ['한국어'];
  } else if (selectedSource === '태국어') {
    targetOptions = ['한국어'];
  } else if (selectedSource === '독일어') {
    targetOptions = ['한국어'];
  } else if (selectedSource === '러시아어') {
    targetOptions = ['한국어'];
  } else if (selectedSource === '스페인어') {
    targetOptions = ['한국어'];
  } else if (selectedSource === '이탈리아어') {
    targetOptions = ['한국어'];
  } else if (selectedSource === '프랑스어') {
    targetOptions = ['한국어', '영어'];
  }

  const languageCodeMap = {
    한국어: 'ko',
    영어: 'en',
    일본어: 'ja',
    '중국어 간체': 'zh-CN',
    '중국어 번체': 'zh-TW',
    베트남어: 'vi',
    인도네시아어: 'id',
    태국어: 'th',
    독일어: 'de',
    러시아어: 'ru',
    스페인어: 'es',
    이탈리아어: 'it',
    프랑스어: 'fr',
  };
  const valueToCodeMap = value => {
    const selectedTopicCode = languageCodeMap[value];
    return selectedTopicCode;
  };

  const openSourceModal = event => {
    if (sourceRef && sourceRef.current) {
      sourceRef.current.measure((fx, fy, width, height, px, py) => {
        setSourceModalPosition({top: py, left: px});
        setSourceModalVisible(true);
      });
    }
  };
  const openTargetModal = event => {
    if (targetRef && targetRef.current) {
      targetRef.current.measure((fx, fy, width, height, px, py) => {
        setTargetModalPosition({top: py, left: px});
        setTargetModalVisible(true);
      });
    }
  };

  const closeSourceModal = () => {
    setSourceModalVisible(false);
  };
  const closeTargetModal = () => {
    setTargetModalVisible(false);
  };
  const handleSourceSelection = source => {
    setSelectedSource(source);
  };
  const handleTargetSelection = target => {
    setSelectedTarget(target);
  };

  return (
    <Modal2
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
          <TouchableOpacity
            ref={sourceRef}
            onPress={openSourceModal}
            style={styles.languageSelectButton}>
            <Text style={styles.modalText}>{selectedSource}</Text>
          </TouchableOpacity>
          <Icon
            name="arrow-right"
            color={'black'}
            size={25}
            style={{marginTop: 17, marginLeft: 10, marginRight: 10}}
          />
          <TouchableOpacity
            ref={targetRef}
            onPress={openTargetModal}
            style={styles.languageSelectButton}>
            <Text style={styles.modalText}>{selectedTarget}</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: width * 15, marginBottom: height * 10}}>
          <Image
            source={require('../../assets/images/translateKiwe.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFFFFF',
              marginBottom: 20,
              borderColor: '#58C047',
              borderWidth: 2,
              borderRadius: 30,
              height: height * 40,
              width: width * 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              onClose();
              translate({
                source: valueToCodeMap(selectedSource),
                target: valueToCodeMap(selectedTarget),
              });
            }}>
            <Text style={styles.modalText}>번역하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={sourceModalVisible}
        onRequestClose={closeSourceModal}>
        <ScrollView
          style={[
            styles.buttonContainer,
            {top: sourceModalPosition.top, left: sourceModalPosition.left},
          ]}>
          {sourceOptions.map((source, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleSourceSelection(source);
                closeSourceModal();
              }}
              style={{
                padding: height * 10,
                borderTopWidth: index === 0 ? 2 : 0,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                borderBottomWidth: 2,
                borderTopStartRadius: index === 0 ? 20 : 0,
                borderTopRightRadius: index === 0 ? 20 : 0,
                borderBottomLeftRadius:
                  index === sourceOptions.length - 1 ? 20 : 0,
                borderBottomEndRadius:
                  index === sourceOptions.length - 1 ? 20 : 0,
                borderColor: '#DADADA',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  selectedSource === source ? '#EDEDED' : 'white',
              }}>
              {selectedSource === source ? (
                <View
                  style={{
                    width: width * 120,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.modalText}>{source}</Text>
                </View>
              ) : (
                <Text style={styles.modalText}>{source}</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
      <Modal
        transparent={true}
        visible={targetModalVisible}
        onRequestClose={closeTargetModal}>
        <ScrollView
          style={[
            styles.buttonContainer,
            {top: targetModalPosition.top, left: targetModalPosition.left},
          ]}>
          {targetOptions.map((target, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleTargetSelection(target);
                closeTargetModal();
                console.log(selectedSource);
              }}
              style={{
                width: width * 120,
                height: height * 40,
                // padding: height * 10,
                borderTopWidth: index === 0 ? 2 : 0,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                borderBottomWidth: 2,
                borderTopStartRadius: index === 0 ? 20 : 0,
                borderTopRightRadius: index === 0 ? 20 : 0,
                borderBottomLeftRadius:
                  index === targetOptions.length - 1 ? 20 : 0,
                borderBottomEndRadius:
                  index === targetOptions.length - 1 ? 20 : 0,
                borderColor: '#DADADA',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  selectedTarget === target ? '#EDEDED' : 'white',
              }}>
              {selectedTarget === target ? (
                <Text style={styles.modalText}>{target}</Text>
              ) : (
                <Text style={styles.modalText}>{target}</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
    </Modal2>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    width: DeviceWidth - 40,
    height: height * 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
  },
  modalSelectContainer: {
    marginTop: 10,
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
  languageSelectButton: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 120,
    height: height * 40,
    backgroundColor: '#FFFFFF',
    borderColor: '#DADADA',
    borderWidth: 2,
    borderRadius: 30,
  },
  buttonContainer: {
    position: 'absolute',
    width: width * 120,
    height: height * 200,
    backgroundColor: '#FFFFFF',
    // borderColor: '#DADADA',
    // borderWidth: 2,
    // borderRadius: 20,
  },
  image: {
    width: width * 170,
    height: height * 150,
  },
});

export default TranslateModal;
