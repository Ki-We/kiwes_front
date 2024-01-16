import React from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import BoardList from '../components/BoardList';
import {apiServer} from '../utils/metaData';
import {width, height} from '../global';
import Icon from 'react-native-vector-icons/Ionicons';
const url = `${apiServer}/api/v1/heart/club_list?cursor=`;
const CategoryClub = ({navigation, route}: any) => {
  const {selectedCategory} = route.params;
  const navigateToClub = (clubId: any) => {
    navigation.navigate('ClubPage', {clubId: clubId});
  };

  const renderNewCategories = () => {
    return categories.map((category, index) => (
      <TouchableOpacity
        key={category.key}
        style={[
          styles.newCategoryItem,
          index === categories.length - 1 ? styles.lastNewCategoryItem : null,
        ]}
        onPress={() => {}}>
        <Text style={styles.categoryText}>{category.name}</Text>
      </TouchableOpacity>
    ));
  };
  const [categories] = useState([
    {key: '0', name: '전체'},
    {key: '1', name: 'K-pop'},
    {key: '2', name: '맛집/카페'},
    {key: '3', name: '스터디'},
    {key: '4', name: '여행'},
    {key: '5', name: '게임/보드게임'},
    {key: '6', name: '문화/전시/공연'},
    {key: '7', name: '술'},
    {key: '8', name: '한국 문화'},
    {key: '9', name: '영화/드라마/애니'},
    {key: '10', name: '파티/클럽'},
    {key: '11', name: '스포츠'},
    {key: '12', name: '공예/그림'},
    {key: '13', name: '봉사활동'},
    {key: '14', name: '기타'},
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
        onPress={() =>
          navigation.navigate('CategoryClub', { selectedCategory: category.name })
        }
      >
        <Text style={styles.categoryText}>{category.name}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log('Add button pressed');
            setModalVisible(true);
          }}
          style={styles.addButtonContainer}
        >
          <Image
            source={require('../../assets/images/categoryAdd.png')}
            style={styles.addButton}
          />
        </TouchableOpacity>

        <View style={styles.scrollView}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.scrollContainer}
          >
            {renderCategories()}
          </ScrollView>
          </View>
        </View>
        <BoardList url={url} navigateToClub={navigateToClub} />
        <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    console.log('Modal closed');
    setModalVisible(false);
  }}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>카테고리 선택</Text>
      <View style={styles.modalCategoriesContainer}>
        {categories.reduce((rows, category, index) => {
          if (index % 2 === 0) {
            rows.push([category]);
          } else {
            rows[rows.length - 1].push(category);
          }
          return rows;
        }, []).map((row, rowIndex) => (
          <View key={rowIndex} style={styles.modalCategoryRow}>
            {row.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={styles.modalCategoryItem}
                onPress={() => {
                  console.log('Selected Category:', category.name);
                  setModalVisible(false);
                }}
              >
                <Text style={[styles.modalCategoryText, { color: '#8A8A8A' }]}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity
  style={styles.closeButton}
  onPress={() => setModalVisible(false)}
>
  <Text style={styles.categorySelectionText}>카테고리 선택</Text>
  <Image
    source={require('../../assets/images/close.png')}
    style={styles.closeImage}
  />
</TouchableOpacity>
    </View>
  </View>
</Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerText: {
    flex: 1,
    color: '#303030',
    fontFamily: 'Pretendard-Bold',
    fontSize: width * 24,
    fontWeight: '600',
  },
  alarm: {
    marginRight: 10,
  },
  addButton: {
    left: -11,
    top: 16,
    width: 28,
    height: 28,
  },
  addButtonContainer: {
    position: 'absolute',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  scrollContainer: {
    paddingBottom: 10,
    height: 50,
    marginTop: 10,
  },
  scrollView: {
    left: 40,
  },
  lastNewCategoryItem: {
    marginRight: 20,
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
    padding: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  modalCategoryText: {
    fontSize: 18,
  },
  modalCategoryRow: {
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 10,
  },
  categorySelectionText: { // 카테고리 선택
    fontSize: 16,
    marginBottom: 30,
    color: '#8A8A8A',
    right: width * 190,
    top: height * 5,
  },
  modalCategory: { // 카테고리 아이템
    fontSize: 16,
    marginBottom: 50,
  },
  closeButton: {
    position: 'absolute',
    right: width * 30,
    top: height * 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  modalCategoriesContainer: {
    marginTop: 50,
  },
  modalCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default CategoryClub;
