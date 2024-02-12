import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
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
        <FontAwesomeIcon
          style={{margin: 0, padding: 0}}
          icon={faCircleExclamation}
          size={25}
          color={'red'}
        />
        <Text style={styles.modalText}>Host는 채팅방 퇴장이 불가합니다!</Text>
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
    height: height * 175,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  modalText: {
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontWeight: '600',
    fontSize: height * 16,
    marginTop: height * 15,
    color: '#303030',
  },
});

export default ErrorModal;
