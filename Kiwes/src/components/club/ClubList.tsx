import {Image, View, Text, Modal, StyleSheet} from 'react-native';
import {height, width} from '../../global';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {allCategoryList as categories, langList} from '../../utils/utils';
import {useEffect, useState} from 'react';
import {apiServer} from '../../utils/metaData';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {BoardPost} from '../../utils/commonInterface';
import BoardDefaultList from '../BoardDefaultList';

export default function ClubList({navigation, selectedItem, type}: any) {
  const [selected, setSelected] = useState(selectedItem);
  const [modalVisible, setModalVisible] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [data, setData] = useState<BoardPost[]>([]);

  const renderItems = () => {
    if (type == 'category') return renderCategories();
    else if (type == 'language') return renderLangagues();
  };

  const renderLangagues = () => {
    return langList.map(lang => (
      <TouchableOpacity
        key={`language_${lang.key}`}
        style={[
          styles.categoryItem,
          lang.key === selected ? styles.selectedCategory : null,
        ]}
        onPress={() => setSelected(lang.key)}>
        <Text style={[lang.key === selected ? styles.selectedText : null]}>
          {lang.text}
        </Text>
      </TouchableOpacity>
    ));
  };
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

  const navigateToClub = (clubId: any) => {
    navigation.navigate('Home', {
      screen: 'ClubDetail',
      params: {clubId: clubId},
    });
  };

  useEffect(() => {
    type == 'category' ? fetchCategory(0) : fetchLanguage(0);
    console.log('change selected menu');
  }, [selected]);

  const fetchCategory = (cursor: number) => {
    if (selected == 'ALL') return getAllClub(cursor);
    else return getSpecifiedClub(cursor);
  };
  const getAllClub = async (cursor: number) => {
    console.log('getAllClub cursor : ', cursor);
    const url = `${apiServer}/api/v1/club/getClubs?cursor=${cursor}`;
    const {data} = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => console.error('get All club : ', err));
    setData(data);
    return data;
  };
  const getSpecifiedClub = async (cursor: number) => {
    const url = `${apiServer}/api/v1/club/category?cursor=${cursor}`;
    const postData = {sortedBy: [selected]};
    const {data} = await new RESTAPIBuilder(url, 'POST')
      .setNeedToken(true)
      .setBody(postData)
      .build()
      .run()
      .catch(error => {
        console.error('get Specified club - catgory : ', error);
      });
    setData(data);
    return data;
  };
  const fetchLanguage = async (cursor: number) => {
    const postData = {sortedBy: [selected]};
    const url = `${apiServer}/api/v1/club/language?cursor=${cursor}`;
    const {data} = await new RESTAPIBuilder(url, 'POST')
      .setNeedToken(true)
      .setBody(postData)
      .build()
      .run()
      .catch(error => {
        console.error('get Specified club - language: ', error);
      });
    setData(data);
    return data;
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.addButtonContainer}>
            <Image
              source={require('../../../assets/images/categoryAdd.png')}
              style={styles.addButton}
            />
          </TouchableOpacity>

          <View style={styles.scrollView}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.scrollContainer}>
              {renderItems()}
            </ScrollView>
          </View>
        </View>
        <BoardDefaultList
          fetchData={type == 'category' ? fetchCategory : fetchLanguage}
          data={data}
          selected={selected}
          navigateToClub={navigateToClub}
        />
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
                <Text
                  style={[
                    [
                      styles.selectionText,
                      type == 'category'
                        ? styles.categorySelectionText
                        : styles.languageSelectionText,
                    ],
                  ]}>
                  {type == 'category' ? '카테고리' : '언어'} 선택
                </Text>
                <Image source={require('../../../assets/images/close.png')} />
              </TouchableOpacity>
              <View style={styles.modalCategoriesContainer}>
                <FlatList
                  data={type == 'category' ? categories : langList}
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
                            source={require('../../../assets/images/check.png')}
                            style={styles.checkImage}
                          />
                        </View>
                      ) : (
                        <TouchableOpacity
                          key={item.key}
                          onPress={() => {
                            console.log('선탣!!');
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
}

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
  selectionText: {
    fontSize: width * 14,
    color: '#000',
  },
  categorySelectionText: {
    right: width * 170,
  },
  languageSelectionText: {
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
    top: height * 10,
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
    marginTop: height * 80,
    marginBottom: height * 40,
    paddingHorizontal: width * 10,
  },
});
