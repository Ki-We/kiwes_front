import {StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {height, width} from '../../global';

export const renderLocationDetail = ({clubInfo}: any) => {
  if (!clubInfo) {
    return null;
  }
  const baseInfo = clubInfo.baseInfo;
  return (
    <View style={styles.locationContent}>
      <Text style={styles.locationTitleText}>{baseInfo.locationKeyword}</Text>
      <Text style={styles.locationText}>{baseInfo.location}</Text>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1, height: height * 140}}
          initialRegion={{
            latitude: baseInfo.latitude, // 37.5001
            longitude: baseInfo.longitude, // 37.5001
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />

        {/* <WebView 
    source={{
      html: `
        <div style="display: flex; justify-content: center; width: 100%; height: 100%;">
          <iframe
            width="100%"
            height="100%"

            style="border: 4px solid #9BD23C;"
            src="https://www.google.com/maps/embed/v1/view?key=${GOOGLE_WEB_API_KIEY}&center=${baseInfo.latitude},${baseInfo.longitude}&zoom=15"
            allowfullscreen
          ></iframe>
        </div>
      `,
    }}
    style={{ flex: 1, height: height * 140 }}
    /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationImage: {
    marginLeft: width * 30,
    marginBottom: height * 20,
  },
  locationText: {
    fontSize: height * 13,
    fontWeight: '500',
    color: '#8A8A8A',
  },
  mapContainer: {
    marginTop: height * 10,
    borderWidth: 4,
    borderColor: '#9BD23C',
    borderRadius: 30,
    overflow: 'hidden',
  },
  locationTitleText: {
    fontSize: height * 16,
    fontWeight: 'bold',
    color: '#303030',
  },
  locationText: {
    fontSize: height * 13,
    fontWeight: '500',
    color: '#8A8A8A',
  },
});
