import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {width, height} from '../global';
import {apiServer, jwtToken} from '../utils/metaData';
import {RESTAPIBuilder} from '../utils/restapiBuilder';

const KickModal = ({kickedData, onClose, kickUser, clubId}) => {
  const doKickUser = () => {
    kickUser(kickedData.id, kickedData.name);
    const url = `${apiServer}/api/v1/club/kick/${clubId}/${kickedData.id}`;
    new RESTAPIBuilder(url, 'DELETE')
      .setNeedToken(true)
      .build()
      .run()
      .then(({data}) => {
        console.log(data);
        onClose(0);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <Modal
      style={styles.modal}
      isVisible={kickedData.isVisible}
      animationIn={'wobble'}
      animationOut={'fadeOut'}
      onBackdropPress={() => {
        onClose(0);
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.TextContainer}>
          <Text style={styles.modalTitle}>
            {kickedData.name} 님을{'\n'}
          </Text>
          <Text style={styles.modalText}>퇴장 하시겠습니까?</Text>
        </View>
        <View style={styles.modalButtonGroup}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              onClose(0);
            }}>
            <Text>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={doKickUser}>
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
    // marginTop: height * 250,
    // marginBottom: height * 250,
    width: width * 265,
    height: height * 165,
    borderRadius: 20,
    // backgroundColor: '#303030',
  },
  modalContainer: {
    // justifyContent: 'center',
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

export default KickModal;
