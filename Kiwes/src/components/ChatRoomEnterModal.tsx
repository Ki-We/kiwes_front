import React from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {width, height} from '../global';
import Text from '@components/atoms/Text';
import {LANGUAGE} from '@/utils/utils';
import {useSelector} from 'react-redux';
import {RootState} from '@/slice/RootReducer';

const ErrorModal = ({isVisible, onClose}) => {
  const language = useSelector((state: RootState) => state.language);
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      animationIn={'wobble'}
      animationOut={'fadeOut'}
      onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>NOTICE{'\n'}</Text>
        <Text style={styles.modalText}>
          {language.language == LANGUAGE.KO
            ? '채팅방 알림이 오지 않으니\n채팅방을 수시로 확인해주세요.'
            : 'There is no chat notification,\nplease check the chat frequently.'}
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
    width: width * 270,
    borderRadius: 20,
    // backgroundColor: '#303030',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 270,
    height: height * 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  modalTitle: {
    textAlign: 'center',
    color: '#F00',

    fontWeight: '500',
    fontSize: height * 16,
  },
  modalText: {
    textAlign: 'center',
    // textAlign: 'center',

    fontWeight: '500',
    fontSize: height * 16,
  },
});

export default ErrorModal;
