import React from 'react';
import {StyleSheet, SafeAreaView, View, TouchableOpacity} from 'react-native';
import Text from '@components/atoms/Text';
import Modal from 'react-native-modal';
import {height, width} from '../global';

function ProfileImageUploadModal({
  isVisible,
  onClose,
  setImageBasic,
  setImageFromLibrary,
}) {
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}>
      <SafeAreaView style={styles.modalContainer}>
        <TouchableOpacity
          style={[styles.button, {borderBottomWidth: 1.5}]}
          onPress={() => {
            setImageBasic(true);
            onClose();
          }}>
          <Text style={styles.text}>기본 이미지</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setImageFromLibrary();
            onClose();
          }}>
          <Text style={styles.text}>갤러리에서 가져오기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    padding: 0,
    margin: 0,
    height: height * 100,
    borderRadius: 20,
  },
  modalContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 350,
    height: height * 180,
    backgroundColor: '#FFFFFF',
    borderTopStartRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 90,
    width: width * 350,
    borderTopStartRadius: 20,
    borderTopRightRadius: 20,
  },
  text: {
    color: '#303030',
    fontSize: height * 18,
    fontWeight: '600',
  },
});

export default ProfileImageUploadModal;
