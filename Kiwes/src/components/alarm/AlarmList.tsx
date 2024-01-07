import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {useFocusEffect} from '@react-navigation/native';
import {apiServer} from '../../utils/metaData';

const url = `${apiServer}/api/v1/alarm`;

const AlarmList = ({navigation}: any) => {
  const [alarms, setAlarms] = useState([]);

  const fetchData = async () => {
    try {
      const response = await new RESTAPIBuilder(url, 'GET')
        .setNeedToken(true)
        .build()
        .run();
      setAlarms(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useFocusEffect(
    useCallback(() => {
      // fetchData();
      return () => {
        // fetchData();
      };
    }, []),
  );
  return (
    <>
      <View style={styles.container}>
        <Text>알람</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default AlarmList;
