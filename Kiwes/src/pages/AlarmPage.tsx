import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import backIcon from 'react-native-vector-icons/Ionicons';
import {width, height} from '../global';
import AlarmStack from '../components/layout/AlarmStack';
import ApprovalStack from '../components/layout/ApprovalStack';
import Text from '@components/atoms/Text';

const AlarmPage = ({navigation}: any) => {
  const [selectedTab, setSelectedTab] = useState('알림');
  return (
    <>
      <View style={styles.header}>
        <View style={styles.container}>
          <backIcon.Button
            backgroundColor="#FFFFFF"
            iconStyle={styles.container}
            borderRadius={3}
            name="arrow-back"
            color="#303030"
            size={20}
            onPress={() => navigation.pop()}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.tapContainer}>
            <TouchableOpacity
              style={[
                styles.tap,
                selectedTab === '알림' ? styles.tap : styles.tapUnSelected,
              ]}
              onPress={() => setSelectedTab('알림')}>
              <Text
                style={[
                  styles.tapText,
                  selectedTab === '알림'
                    ? styles.tapText
                    : styles.tapUnSelectedText,
                ]}>
                알림
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tap,
                selectedTab === '승인' ? styles.tap : styles.tapUnSelected,
              ]}
              onPress={() => setSelectedTab('승인')}>
              <Text
                style={[
                  styles.tapText,
                  selectedTab === '승인'
                    ? styles.tapText
                    : styles.tapUnSelectedText,
                ]}>
                승인
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        {selectedTab === '알림' ? <AlarmStack /> : <ApprovalStack />}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: height * 77,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  icon: {
    marginLeft: width * 10,
  },
  tapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  tap: {
    borderColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    flex: 0.5,
    borderBottomWidth: 3,
    paddingBottom: height * 7,
  },
  tapText: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: height * 24,
    fontWeight: '700',
  },
  tapUnSelected: {
    marginBottom: height * 1,
    borderBottomWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  tapUnSelectedText: {
    color: 'rgba(0, 0, 0, 0.4)',
  },
});

export default AlarmPage;
