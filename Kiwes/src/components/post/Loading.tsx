import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Modal, View, StyleSheet} from 'react-native';

const Loading = () => {
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(false);
    }, 150000);

    return () => {
      clearTimeout(timer); // 컴포넌트가 unmount될 때 타이머 정리
    };
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
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

export default Loading;
