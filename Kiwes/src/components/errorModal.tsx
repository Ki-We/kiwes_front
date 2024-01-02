import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {colors, width, height} from '../global';

const ErrorModal = ({isVisible, onClose}) => {
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      animationIn={'wobble'}
      animationOut={'fadeOut'}
      onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>전송에 실패하였습니다.{'\n'}</Text>
        <Text style={styles.modalText}>
          네트워크 연결 확인 후{'\n'}다시 시도해주세요.
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    marginTop: height * 250,
    marginBottom: height * 250,
    width: width * 265,
    borderRadius: 20,
    // backgroundColor: '#303030',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 265,
    height: height * 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  modalTitle: {
    textAlign: 'center',
    color: '#F00',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: height * 16,
  },
  modalText: {
    textAlign: 'center',
    // textAlign: 'center',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: height * 16,
  },
});

export default ErrorModal;
