import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../global';
import DatePicker from 'react-native-date-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../../utils/googleConfig';

export default function SetupDetail1({post, setPost}: any) {
  const [date, setDate] = useState(post.date);
  const [open1, setOpen1] = useState(false);
  const [dueTo, setDueTo] = useState(post.dueTo);
  const [open2, setOpen2] = useState(false);
  const [location, setLocation] = useState({lat: 0, lng: 0});

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>모임 날짜</Text>
        <Pressable style={styles.date} onPress={() => setOpen1(true)}>
          <Text>{date == '' ? '모임의 일정을 입력해주세요.' : date}</Text>
          <Text>
            <FontAwesomeIcon icon={faCalendar} />
          </Text>
        </Pressable>
        <DatePicker
          mode="date"
          modal
          open={open1}
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
          <Text>{dueTo == '' ? '모임 마감일을 입력해주세요.' : dueTo}</Text>
          <Text>
            <FontAwesomeIcon icon={faCalendar} />
          </Text>
        </Pressable>
        <DatePicker
          mode="date"
          modal
          open={open2}
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
          <GooglePlacesAutocomplete
            styles={{
              textInput: {
                backgroundColor: '#F7F7F7', // 이 부분에 원하는 색상을 입력하세요.
              },
            }}
            placeholder="모임 장소를 검색해주세요"
            minLength={2}
            keyboardShouldPersistTaps={'handled'}
            fetchDetails={false}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no results')}
            keepResultsAfterBlur={true}
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
              setPost({...post, locationsKeyword: data});
              setLocation({
                lat: details?.geometry.location.lat || 0,
                lng: details?.geometry.location.lng || 0,
              });
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
            }}
          />
          {/* <TextInput
            style={styles.input}
            placeholderTextColor={'#8A8A8A'}
            placeholder="모임 장소를 검색해주세요"
            onChangeText={text => {
              setPost({...post, locationsKeyword: text});
            }}
          /> */}
          <View style={styles.iconContainer}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </View>
        </View>
        <View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.7749,
              longitude: -122.4194,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {location && (
              <Marker
                coordinate={{
                  latitude: location.lat,
                  longitude: location.lng,
                }}
                title="Selected Location"
              />
            )}
          </MapView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: width * 20,
  },
  text: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: width * 13,
    color: '#303030',
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    padding: 10,
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: height * 20,
    height: height * 48,
    marginBottom: height * 20,
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
    fontSize: 13,
    flex: 1,
  },
  iconContainer: {
    marginRight: width * 5,
  },
  map: {
    flex: 1,
    height: height * 150,
  },
});
