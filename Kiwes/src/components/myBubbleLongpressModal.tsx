import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {width, height, DeviceHeight} from '../global';
import {apiServer} from '../utils/metaData';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import Clipboard from '@react-native-clipboard/clipboard';
import TranslateModal from './translateModal';
// import TranslateModal from './translateModal2';

const messageLongpressModal = ({
  isVisible,
  onClose,
  chatBubbleData,
  backgroundPosition,
  inBubblePosition,
  bubbleHeight,
  setBubbleData,
}) => {
  const [isTranslateModalVisible, setTranslateModalVisible] = useState(false);
  const toggleTranslateModal = () => {
    setTranslateModalVisible(!isTranslateModalVisible);
  };

  const translate = ({source, target}) => {
    const url = `${apiServer}/translate`;
    const data = {
      source: source,
      target: target,
      text: chatBubbleData,
    };
    new RESTAPIBuilder(url, 'POST')
      .setNeedToken(true)
      .setBody(data)
      .build()
      .run()
      .then(({data}) => {
        console.log(data);
        setBubbleData(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  ///////////////////////////// 에러 수정 이후 지울 예정
  const selectLanguages = () => {
    toggleTranslateModal();
  };
  ///////////////////////////// 에러 수정 이후 지울 예정

  const getAnimationIn = () => {
    return DeviceHeight / 2 >= backgroundPosition.y ? 'fadeInDown' : 'fadeInUp';
  };
  const getAnimationOut = () => {
    return DeviceHeight / 2 >= backgroundPosition.y
      ? 'fadeOutUp'
      : 'fadeOutDown';
  };

  const copyToClipboard = text => {
    Clipboard.setString(text);
    onClose(0);
  };
  // 복사한 내용 쓸일 있을 경우 사용
  // const [copiedText, setCopiedText] = useState('');
  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getString();
  //   setCopiedText(text);
  // };

  return (
    <>
      <Modal
        style={
          DeviceHeight / 2 >= backgroundPosition.y
            ? {
                position: 'absolute',
                top:
                  backgroundPosition.y +
                  (bubbleHeight - inBubblePosition.y - 10),
                right: -10,
              }
            : {
                position: 'absolute',
                top: backgroundPosition.y - (inBubblePosition.y + 110),
                right: -10,
              }
        }
        backdropOpacity={0}
        isVisible={isVisible}
        animationInTiming={100}
        animationOutTiming={100}
        animationIn={getAnimationIn()}
        animationOut={getAnimationOut()}
        onBackdropPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalButtonGroup}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
              onPress={() => {
                copyToClipboard(chatBubbleData);
                // fetchCopiedText();
              }}>
              <Text style={styles.modalText}>복사하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center'}}
              onPress={() => {
                selectLanguages();
                onClose();
              }}>
              <Text style={styles.modalText}>번역하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TranslateModal
        isVisible={isTranslateModalVisible}
        onClose={toggleTranslateModal}
        translate={translate}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    // justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    width: width * 150,
    height: height * 80,
    backgroundColor: '#EDEDED',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1.5,
  },
  modalText: {
    textAlign: 'center',
    color: '#303030',
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: height * 14,
  },
  modalButtonGroup: {
    flex: 1,
    justifyContent: 'space-evenly',
    width: width * 150,
    height: height * 80,
  },
});

export default messageLongpressModal;
