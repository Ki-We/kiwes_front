import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {height, width} from '../../global';
import DatePicker from 'react-native-date-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import Text from '@components/atoms/Text';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {GOOGLE_WEB_API_KIEY} from '../../utils/googleConfig';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {LocationType} from '../../utils/commonInterface';
import {RootState} from '@/slice/RootReducer';
import {useSelector} from 'react-redux';
import {LANGUAGE} from '@/utils/utils';

export default function SetupDetail1({post, setPost}: any) {
  const [date, setDate] = useState(post.date);
  const [open1, setOpen1] = useState(false);
  const [dueTo, setDueTo] = useState(post.dueTo);
  const [open2, setOpen2] = useState(false);
  const [search, setSearch] = useState(post.locationKeyword);
  const [searchResult, setSearchResult] = useState<LocationType[]>([]);
  const language = useSelector((state: RootState) => state.language);

  const searchLocation = async () => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&language=ko&key=${GOOGLE_WEB_API_KIEY}`;
    const {results}: any = await new RESTAPIBuilder(url, 'GET')
      .build()
      .run()
      .catch(err => {
        console.log('search location err : ', err);
        return;
      });

    const result = results.map((r: any) => {
      return {
        address: r.formatted_address,
        latitude: r.geometry.location.lat,
        longitude: r.geometry.location.lng,
        name: r.name,
      };
    });

    setSearchResult(result);
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>모임 날짜</Text>
        <Pressable style={styles.date} onPress={() => setOpen1(true)}>
          <Text style={dueTo == '' ? styles.dateText : styles.selectedDate}>
            {date == ''
              ? language.language == LANGUAGE.KO
                ? '모임의 일정을 입력해주세요.'
                : 'Enter the schedule of the Meetups'
              : date}
          </Text>
          <Text>
            <FontAwesomeIcon icon={faCalendar} />
          </Text>
        </Pressable>
        <DatePicker
          mode="date"
          modal
          open={open1}
          title={
            language.language == LANGUAGE.KO ? '날짜 선택' : 'Select the Date'
          }
          confirmText={language.language == LANGUAGE.KO ? '확인' : 'Confirm'}
          cancelText={language.language == LANGUAGE.KO ? '취소' : 'Cancel'}
          date={new Date()}
          onConfirm={date => {
            setOpen1(false);

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const formattedDateString = `${year}-${month}-${day}`;
            setDate(formattedDateString);
            setPost({...post, date: formattedDateString});
          }}
          onCancel={() => {
            setOpen1(false);
          }}
        />

        <Text style={styles.text}>모집 마감일</Text>
        <Pressable style={styles.date} onPress={() => setOpen2(true)}>
          <Text style={dueTo == '' ? styles.dateText : styles.selectedDate}>
            {dueTo == ''
              ? language.language == LANGUAGE.KO
                ? '모집 마감일을 입력해주세요.'
                : 'Enter the application deadline'
              : dueTo}
          </Text>
          <Text>
            <FontAwesomeIcon icon={faCalendar} />
          </Text>
        </Pressable>
        <DatePicker
          mode="date"
          modal
          open={open2}
          title={
            language.language == LANGUAGE.KO ? '날짜 선택' : 'Select the Date'
          }
          confirmText={language.language == LANGUAGE.KO ? '확인' : 'Confirm'}
          cancelText={language.language == LANGUAGE.KO ? '취소' : 'Cancel'}
          date={new Date()}
          onConfirm={date => {
            setOpen2(false);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const formattedDateString = `${year}-${month}-${day}`;
            setDueTo(formattedDateString);
            setPost({...post, dueTo: formattedDateString});
          }}
          onCancel={() => {
            setOpen2(false);
          }}
        />

        <Text style={styles.text}>장소</Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={search}
            style={styles.input}
            placeholderTextColor={'#C2C2C2'}
            placeholder={
              language.language == LANGUAGE.KO
                ? '모임 장소를 검색해주세요.'
                : 'Search for the Meetups Location'
            }
            onChangeText={text => {
              setSearch(text);
            }}
            onSubmitEditing={searchLocation}
            returnKeyType="search"
          />
          <Pressable style={styles.iconContainer} onPress={searchLocation}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Pressable>
        </View>
        {searchResult.length > 0 && (
          <View style={styles_location.container}>
            <FlatList
              data={searchResult}
              renderItem={({item}) => (
                <Pressable
                  style={styles_location.content}
                  onPress={() => {
                    setPost({
                      ...post,
                      location: item.address,
                      locationKeyword: item.name,
                      latitude: item.latitude,
                      longitude: item.longitude,
                    });
                    setSearch(item.name);
                    setSearchResult([]);
                  }}>
                  <Text style={styles_location.name}>{item.name}</Text>
                  <Text style={styles_location.address}>{item.address}</Text>
                </Pressable>
              )}
              ItemSeparatorComponent={() => (
                <View style={{height: height * 10}}></View>
              )}
              numColumns={1}
            />
          </View>
        )}
      </View>
    </>
  );
}

const styles_location = StyleSheet.create({
  container: {
    height: height * 150,
    marginLeft: width * 5,
  },
  content: {
    flex: 1,
  },
  address: {
    fontSize: 13,
    color: '#303030',
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    color: '#303030',
    fontWeight: 'bold',
    marginBottom: 3,
  },
});
const styles = StyleSheet.create({
  container: {
    margin: width * 20,
  },
  text: {
    fontWeight: '600',
    fontSize: height * 13,
    color: '#303030',
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    padding: 10,
    fontSize: height * 13,
    color: '#8A8A8A',
    marginTop: height * 20,
    height: height * 48,
    marginBottom: height * 20,
  },
  dateText: {
    fontSize: height * 13,
    fontWeight: '500',
    color: '#C2C2C2',
  },
  selectedDate: {
    fontSize: height * 13,
    fontWeight: '500',
    color: '#8A8A8A',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    marginTop: height * 20,
    height: height * 48,
    marginBottom: height * 20,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    fontSize: height * 13,
    fontWeight: '500',
    flex: 1,
    color: '#8A8A8A',
  },
  iconContainer: {
    marginRight: width * 5,
  },
  searhText: {
    marginLeft: width * 3,
  },
  // map: {
  //   flex: 1,
  //   height: height * 150,
  // },
});
