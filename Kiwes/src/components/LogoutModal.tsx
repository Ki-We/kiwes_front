import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {width, height} from '../global';
import Text from '@components/atoms/Text';

const LogoutModal = ({isVisible, onClose, exitClub, modaltype}) => {
  const logoutMessage = `${modaltype}하시겠습니까?`;
  const secessionMessage =
    '탈퇴 즉시 회원 정보는 삭제되며,\n 탈퇴 후 30일간 재가입이 불가합니다.';
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.TextContainer}>
          <Text style={styles.modalTitle}>{modaltype}</Text>
          {modaltype === '로그아웃' ? (
            <Text style={styles.logout}>{logoutMessage}</Text>
          ) : (
            <Text style={styles.secession}>{secessionMessage}</Text>
          )}
        </View>
        <View style={styles.modalButtonGroup}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={{color: '#303030'}}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => {
              exitClub();
              onClose();
            }}>
            <Text style={{color: '#303030'}}>확인</Text>
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
    justifyContent: 'center',
    height: height * 126,
    width: width * 265,
  },
  modalTitle: {
    textAlign: 'center',
    color: '#3DBE14',

    fontWeight: '800',
    fontSize: height * 18,
    marginBottom: 10,
  },
  logout: {
    textAlign: 'center',
    color: '#303030',

    fontWeight: '500',
    fontSize: height * 16,
  },
  secession: {
    textAlign: 'center',
    color: '#303030',

    fontWeight: '500',
    fontSize: height * 14,
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
    width: width * 135,
  },
});

export default LogoutModal;
