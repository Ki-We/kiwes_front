import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {width, height} from '../../global';

const ReivewErrorModal = ({isVisible, onClose}) => {
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.TextContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.modalTitle}>모임 가입자</Text>
            <Text style={styles.modalText}>에 한하여,</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.modalTitle}>한번만 </Text>
            <Text style={styles.modalText}>작성 가능합니다!</Text>
          </View>
        </View>
        <View style={styles.modalButtonGroup}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => {
              onClose();
            }}>
            <Text>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    width: width * 265,
    height: height * 165,
    borderRadius: 20,
  },
  modalContainer: {
    alignItems: 'center',
    width: width * 265,
    height: height * 176,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  TextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 126,
    width: width * 265,
  },
  modalTitle: {
    textAlign: 'center',
    color: '#3DBE14',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: height * 16,
  },
  modalText: {
    textAlign: 'center',
    color: '#303030',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: height * 16,
  },
  modalButtonGroup: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: width * 265,
    height: height * 50,
    borderTopColor: '#8A8A8A',
    borderTopWidth: 1,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 135,
    borderRightColor: '#8A8A8A',
    borderRightWidth: 1,
  },
  acceptButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 40,
    width: width * 135,
  },
});

export default ReivewErrorModal;
