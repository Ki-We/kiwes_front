import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {width, height, DeviceWidth} from '../global';
import Icon from 'react-native-vector-icons/FontAwesome5';

const TranslateModal = ({isVisible, onClose}) => {
  const SourceComponent = ({source, onSelect}) => {
    return (
      <TouchableOpacity
        onPress={onSelect}
        style={{
          padding: 10,
          borderWidth: 1,
          alignItems: 'center',
          backgroundColor: '#EDEDED',
        }}>
        <Text>{source}</Text>
      </TouchableOpacity>
    );
  };

  const sourceOptions = [
    'Data1',
    'Data2',
    'Data3',
    'Data4',
    'Data5',
    'Data6',
    'Data7',
    'Data8',
    'Data9',
    'Data10',
    'Data11',
    'Data12',
    'Data13',
    'Data14',
  ];
  const [selectedSource, setSelectedSource] = useState('Data1');

  const handleSourceSelect = source => {
    setSelectedSource(source);
  };

  return (
    <Modal
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      backdropOpacity={0.2}
      isVisible={isVisible}
      animationInTiming={100}
      animationOutTiming={100}
      onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalSelectContainer}>
          {selectedSource ? (
            <View style={styles.modalButtonGroup}>
              <SourceComponent
                source={selectedSource}
                // isSelected={true}
                onSelect={() => setSelectedSource('')}
              />
            </View>
          ) : (
            <View style={styles.modalButtonGroup}>
              <ScrollView>
                {sourceOptions.map((source, index) => (
                  <SourceComponent
                    key={index}
                    source={source}
                    // isSelected={false}
                    onSelect={() => handleSourceSelect(source)}
                  />
                ))}
              </ScrollView>
            </View>
          )}
          <Icon
            name="arrow-right"
            color={'black'}
            size={25}
            style={{marginTop: 17}}
          />
          {selectedSource ? (
            <View style={styles.modalButtonGroup}>
              <SourceComponent
                source={selectedSource}
                // isSelected={true}
                onSelect={() => setSelectedSource('')}
              />
            </View>
          ) : (
            <View style={styles.modalButtonGroup}>
              <ScrollView>
                {sourceOptions.map((source, index) => (
                  <SourceComponent
                    key={index}
                    source={source}
                    // isSelected={false}
                    onSelect={() => handleSourceSelect(source)}
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <View style={styles.modalTextContainer}>
          <Text>asdfasdf</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    // justifyContent: 'center',
    flex: 1,
    // alignItems: 'center',
    width: DeviceWidth - 40,
    height: height * 400,
    backgroundColor: '#FFFFFF',
    // borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1.5,
  },
  modalSelectContainer: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  modalText: {
    textAlign: 'center',
    color: '#303030',

    fontWeight: '700',
    fontSize: height * 16,
  },
  modalButtonGroup: {
    margin: 10,
    width: width * 130,
  },
  modalTextContainer: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    height: height * 220,
    padding: 20,
  },
});

export default TranslateModal;
