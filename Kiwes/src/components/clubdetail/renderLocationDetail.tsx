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
        {baseInfo.latitude != 0 && baseInfo.longitude != 0 && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1, height: height * 180}}
            initialRegion={{
              latitude: parseFloat(baseInfo.latitude),
              longitude: parseFloat(baseInfo.longitude),
              latitudeDelta: 0.000922,
              longitudeDelta: 0.000421,
            }}
          />
        )}
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
