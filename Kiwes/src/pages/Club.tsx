import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';

const Club = ({ navigation, route }: any) => {
  const { selectedCategory } = route.params;
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await fetch('https://api.example.com/categories');
  //       const data = await response.json();
  //       setCategories(data.categories);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const [categories] = useState([
    { key: '0', name: '전체' },
    { key: '1', name: 'K-pop' },
    { key: '2', name: '맛집/카페' },
    { key: '3', name: '스터디' },
    { key: '4', name: '여행' },
    { key: '5', name: '게임/보드게임' },
    { key: '6', name: '문화/전시/공연' },
    { key: '7', name: '술' },
    { key: '8', name: '한국 문화' },
    { key: '9', name: '영화/드라마/애니' },
    { key: '10', name: '파티/클럽' },
    { key: '11', name: '스포츠' },
    { key: '12', name: '공예/그림' },
    { key: '13', name: '봉사활동' },
    { key: '14', name: '기타' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const renderCategories = () => {
    return categories.map((category) => (
      <TouchableOpacity
        key={category.key}
        style={[
          styles.categoryItem,
          selectedCategory === category.name ? styles.selectedCategory : null,
        ]}
        onPress={() => navigation.navigate('Club', { selectedCategory: category.name })}
      >
        <Text style={styles.categoryText}>{category.name}</Text>
      </TouchableOpacity>
    ));
  };

  const renderNewCategories = () => {
    return categories.map((category) => (
      <TouchableOpacity
        key={category.key}
        style={styles.newCategoryItem}
        onPress={() => {
          // Handle selecting new category
        }}
      >
        <Text style={styles.categoryText}>{category.name}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
        {renderCategories()}
      </ScrollView>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButtonContainer}>
        <Image source={require('../../assets/images/add.png')} style={styles.addButton} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>카테고리 선택</Text>
            <Text style={styles.modalCategory}>전체</Text>
            <Text style={styles.modalCategory}>K-pop</Text>
            <Text style={styles.modalCategory}>맛집/카페</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  addButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 0,
  },
  addButton: {
    width: 50,
    height: 50,
  },
  scrollContainer: {
    marginTop: 20,
    paddingBottom: 10,
    height: 50,
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#9BD23C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 12,
    color: '#303030',
  },
  selectedCategory: {
    backgroundColor: '#9BD23C',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCategory: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
});

export default Club;
