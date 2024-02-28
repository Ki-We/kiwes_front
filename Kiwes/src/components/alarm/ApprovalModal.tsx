import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '@components/atoms/Text';
import Modal from 'react-native-modal';
import {width, height} from '../../global';
import {useSelector} from 'react-redux';
import {RootState} from '@/slice/RootReducer';
import {LANGUAGE} from '@/utils/utils';

const ApprovalModal = ({isVisible, onClose, member, exitClub, modaltype}) => {
  const language = useSelector((state: RootState) => state.language);
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.TextContainer}>
          <Text style={styles.modalText}>
            {language.language == LANGUAGE.KO ? (
              <>
                <Text style={styles.highlight}>{member?.nickname}님</Text>
                <Text style={styles.modalText}>
                  을{'\n'}
                  {modaltype}하시겠습니까?
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.modalText}>
                  Would you like to{'\n'}
                  {modaltype == '승인' ? 'approve' : 'reject'}{' '}
                  <Text style={styles.highlight}>{member?.nickname}</Text>?
                </Text>
              </>
            )}
          </Text>
        </View>
        <View style={styles.modalButtonGroup}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.modalText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => {
              exitClub({data: member?.memberId});
              onClose();
            }}>
            <Text style={styles.modalText}>확인</Text>
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
  highlight: {
    color: '#3DBE14',
    fontWeight: '600',
    fontSize: height * 16,
    lineHeight: height * 30,
  },
  modalText: {
    textAlign: 'center',
    color: '#303030',
    fontWeight: '600',
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
    width: width * 135,
  },
});

export default ApprovalModal;
