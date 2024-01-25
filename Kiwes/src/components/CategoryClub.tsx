import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import BoardList from './BoardList';
import {apiServer} from '../utils/metaData';
import {width, height} from '../global';
import {allCategoryList as categories} from '../utils/utils';
import {FlatList} from 'react-native-gesture-handler';
const url = `${apiServer}/api/v1/heart/club_list?cursor=`;
const CategoryClub = ({navigation, route}: any) => {
  const {selectedCategory} = route.params;
  const [selected, setSelected] = useState(selectedCategory);
  const [category, setCategory] = useState({key: '0', name: '전체'});

  const navigateToClub = (clubId: any) => {
    navigation.navigate('ClubPage', {clubId: clubId});
  };

  // const renderNewCategories = () => {
  //   return categories.map((category, index) => (
  //     <TouchableOpacity
  //       key={category.key}
  //       style={[
  //         styles.newCategoryItem,
  //         index === categories.length - 1 ? styles.lastNewCategoryItem : null,
  //       ]}
  //       onPress={() => {}}>
  //       <Text style={styles.categoryText}>{category.name}</Text>
  //     </TouchableOpacity>
  //   ));
  // };

  const [modalVisible, setModalVisible] = useState(false);

  const renderCategories = () => {
    return categories.map(category => (
      <TouchableOpacity
        key={`category_${category.key}`}
        style={[
          styles.categoryItem,
          category.key === selected ? styles.selectedCategory : null,
        ]}
        onPress={() => setSelected(category.key)}>
        <Text style={[category.key === selected ? styles.selectedText : null]}>
          {category.text}
        </Text>
      </TouchableOpacity>
    ));
  };

  const [containerWidth, setContainerWidth] = useState(0);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              console.log('Add button pressed');
              setModalVisible(true);
            }}
            style={styles.addButtonContainer}>
            <Image
              source={require('../../assets/images/categoryAdd.png')}
              style={styles.addButton}
            />
          </TouchableOpacity>

          <View style={styles.scrollView}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.scrollContainer}>
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
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.categorySelectionText}>카테고리 선택</Text>
                <Image source={require('../../assets/images/close.png')} />
              </TouchableOpacity>
              <View style={styles.modalCategoriesContainer}>
                <FlatList
                  data={categories}
                  onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
                  ItemSeparatorComponent={() => (
                    <View style={{height: height * 35}}></View>
                  )}
                  renderItem={({item}) => (
                    <View style={{width: containerWidth / 2}}>
                      {item.key === selected ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={[
                              styles.modalCategoryText,
                              styles.modalCategorySelectedText,
                            ]}>
                            {item.simple}
                          </Text>
                          <Image
                            source={require('../../assets/images/check.png')}
                            style={styles.checkImage}
                          />
                        </View>
                      ) : (
                        <TouchableOpacity
                          key={item.key}
                          onPress={() => {
                            setSelected(item.key);
                            setModalVisible(false);
                          }}>
                          <Text style={styles.modalCategoryText}>
                            {item.simple}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                  numColumns={2}
                />
              </View>
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
    paddingLeft: width * 40,
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
  selectedText: {
    color: '#FFFFFF',
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
    color: '#8A8A8A',
  },
  modalCategorySelectedText: {
    color: '#000',
  },
  categorySelectionText: {
    // 카테고리 선택
    fontSize: width * 14,
    color: '#000',
    right: width * 195,
  },
  modalCategory: {
    // 카테고리 아이템
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
  checkImage: {
    width: width * 15,
    height: height * 15,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginRight: 30,
  },
  modalCategoriesContainer: {
    marginTop: height * 70,
    marginBottom: height * 40,
    paddingHorizontal: width * 10,
  },
});

export default CategoryClub;
