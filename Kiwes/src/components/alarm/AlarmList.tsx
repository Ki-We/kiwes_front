import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {useFocusEffect} from '@react-navigation/native';
import {apiServer} from '../../utils/metaData';
import {Alarm} from '../../utils/commonInterface';
import AlarmComponent from './AlarmComponent';

const url = `${apiServer}/api/v1/alarm/`;
const timePeriods = ['오늘', '어제', '이번 주', '이전 활동'];

const AlarmList = ({navigation}: any) => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const navigateTo = (item: any) => {
    item.type === 'CLUB' || 'CHAT'
      ? navigation.navigate('ClubPage', {clubId: item.club_id})
      : navigation.navigate('ProfilePage', {memberId: item.member_id});
  };
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
      fetchData();
      return () => {
        fetchData();
      };
    }, []),
  );
  return (
    <>
      <ScrollView style={styles.container}>
        {timePeriods.map(period => {
          const filteredAlarms = alarms.filter(
            r => r.createAfterDay === period,
          );
          return (
            filteredAlarms.length > 0 && (
              <View style={styles.alarmContainer}>
                <Text style={styles.title}>{period}</Text>
                {filteredAlarms.map((r, index) => (
                  <AlarmComponent
                    key={index}
                    item={r}
                    navigateTo={() => navigateTo(r)}
                  />
                ))}
              </View>
            )
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  alarmContainer: {
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 5,
    paddingBottom: 10,
    marginBottom: 5,
  },
  profilContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#58C047',
    marginBottom: 10,
    margin: 5,
  },
});
export default AlarmList;
