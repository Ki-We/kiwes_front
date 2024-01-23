import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import backIcon from 'react-native-vector-icons/Ionicons';
import cameraIcon from 'react-native-vector-icons/FontAwesome';
import {width, height} from '../../global';
import ProfileImageUploadModal from '../../components/ProfileImageUploadModal';

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

let imagePath =
  'https://s3-alpha-sig.figma.com/img/747c/b110/aab5c4d20ab8d710ceb49bd7c856a200?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RwnEfVVa6Vt2Drr4~v8aHdrXf42XiLwhO9tooS1b1La~cSbirqZ73z00gRIZ7YpuJRCv~dAGuayDgM5nYEiYa81SJf39zlSksEzdD01iQ9Xu~KilPwubhwlHDrQTgYuqORLF6-6sut-H8CMGBdu98z4JUKQWFdvo0SSxhhgSTOXGm3br26u~RITGwkvFnjcLP5LKvFVhCDsbB70wnPM2Z7YbYb9OhY2oFTbGjc7xmJAw6B5HmzdHXE4Ahb6cgkP-IbdtNXjUtBKXkRXqD-SZPgz4b~5nT9lX3WkvrkI4JkA-8P5mqpxUH7M2lX51jVzWTyLZrbvDbW4GPLw6auYzvA__';

const ProfilePictureSettingPage = ({navigation}) => {
  const [response, setResponse] = useState('');
  const [imageFile, setImageFile] = useState(imagePath);
  const onPickImage = response => {
    if (response.didCancel || !response) {
      return;
    }
    // console.log('PickImage', res);
    console.log(response);
    setResponse(response);
    setImageFile(response.assets[0].uri);
  };
  const setImageBasic = () => {
    setImageFile(imagePath);
  };
  // 갤러리에서 사진 선택
  const setImageFromLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const modalOpen = () => {
    if (Platform.OS === 'android') {
      setModalVisible(true);
    } else {
    }
  };

  const handleNext = () => {
    navigation.navigate('NickNameSettingPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{width: width * 50}}>
          <backIcon.Button
            backgroundColor="#FFFFFF"
            iconStyle={{marginRight: 0, padding: 5}}
            borderRadius={3}
            name="arrow-back"
            color="#303030"
            size={25}
            onPress={() => navigation.pop()}
          />
        </View>
        <Text style={styles.headerText}>프로필 설정</Text>
        <View style={{width: width * 50}}></View>
      </View>
      <View
        style={{
          width: '20%',
          height: height * 4,
          backgroundColor: 'black',
          marginBottom: height * 100,
        }}></View>
      <View
        style={{
          height: height * 40,
          flexDirection: 'row',
          paddingLeft: 20,
          padding: 5,
        }}>
        <Text style={styles.mainText}>프로필 이미지 (선택)</Text>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <Image
            source={{uri: imageFile}}
            style={styles.image}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              top: height * 145,
              left: width * 115,
              height: height * 50,
              width: width * 50,
            }}>
            <TouchableOpacity onPress={modalOpen}>
              <Image
                source={require('../../../assets/images/camera.png')}
                style={styles.cameraIcon}
                resizeMode="cover"
              />
            </TouchableOpacity>
            {/* <cameraIcon.Button
              backgroundColor="#FFFFFF"
              iconStyle={{marginRight: 0, padding: 5}}
              borderRadius={50}
              name="camera"
              color="black"
              size={25}
              onPress={modalOpen}
            /> */}
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text
          style={{
            color: '#FFFFFF',
            fontFamily: 'Pretendard',
            fontSize: width * 18,
            fontWeight: '700',
          }}>
          다음
        </Text>
      </TouchableOpacity>
      <ProfileImageUploadModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        setImageBasic={setImageBasic}
        setImageFromLibrary={setImageFromLibrary}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: width * 10,
    height: height * 66,
    borderBottomWidth: height * 1,
    borderBottomColor: '#989898',
    marginBottom: height * -2,
  },
  headerText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: width * 20,
    fontWeight: '900',
  },
  mainText: {
    color: '#303030',
    fontFamily: 'Pretendard',
    fontSize: width * 15,
    fontWeight: '600',
  },
  imageContainer: {
    marginTop: height * 20,
    height: height * 200,
    marginBottom: height * 60,
    alignItems: 'center',
  },
  image: {
    width: width * 150,
    height: height * 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    backgroundColor: '#000000',
    borderRadius: 25,
    width: width * 35,
    height: height * 35,
  },
  nextButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 50,
    width: width * 340,
    borderWidth: 2,
    borderColor: '#58C047',
    backgroundColor: '#58C047',
    borderRadius: 8,
  },
});

export default ProfilePictureSettingPage;
