import React, {useEffect, useState} from 'react';
import {Modal, Image, View, StyleSheet} from 'react-native';

const images = [
  require('../../../assets/images/loadingKiwe0.png'),
  require('../../../assets/images/loadingKiwe1.png'),
];

const KiweLoading = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(false); // 3초 후 모달 닫기
    }, 4000);

    const imageTimer = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % images.length); // 0, 1, 2, 0, 1, 2, ...
    }, 1000); // 0.5초 간격으로 이미지 변경

    return () => {
      clearTimeout(timer); // 컴포넌트가 unmount될 때 타이머 정리
      clearInterval(imageTimer); // 컴포넌트가 unmount될 때 이미지 타이머 정리
    };
  }, []); // 컴포넌트가 mount될 때만 실행

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.container}>
        <Image
          source={images[imageIndex]}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default KiweLoading;
