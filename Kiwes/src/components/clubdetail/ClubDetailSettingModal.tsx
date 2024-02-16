import React from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import Text from '@components/atoms/Text';
import Modal from 'react-native-modal';
import {height, width} from '../../global';

function ClubDetailSettingModal({
  isVisible,
  onClose,
  navigateToCorrection,
  DeleteClub,
}: any) {
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}>
      <SafeAreaView style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigateToCorrection();
            onClose();
          }}>
          <Text style={styles.text}>수정하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            DeleteClub();
            onClose();
          }}>
          <Text style={[styles.text, {color: '#FF0000'}]}>삭제하기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    height: height * 100,
    borderRadius: 20,
  },
  modalContainer: {
    marginBottom: height * -20,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 340,
    height: height * 160,
    backgroundColor: '#FFFFFF',
    borderTopStartRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 80,
    width: width * 340,
    borderTopStartRadius: 20,
    borderTopRightRadius: 20,
    borderBottomColor: '8A8A8A',
    borderBottomWidth: 1,
  },
  text: {
    color: '#303030',

    fontSize: height * 18,
    fontWeight: '700',
  },
});

export default ClubDetailSettingModal;
