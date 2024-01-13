import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {useFocusEffect} from '@react-navigation/native';
import {apiServer} from '../../utils/metaData';
import {Alarm} from '../../utils/commonInterface';
import AlarmComponent from './AlarmComponent';
import {height} from '../../global';
import NothingShow from '../NothingShow';

const url = `${apiServer}/api/v1/alarm/`;
const timePeriods = ['오늘', '어제', '이번 주', '이전 활동'];
const pageNavigationMap = {
  CLUB: {page: 'ClubPage', idKey: 'clubId'},
  CHAT: {page: 'ChatMain', idKey: 'clubId'},
  NOTICE: {page: 'NoticePage', idKey: 'noticeId'},
  EVENT: {page: 'NoticePage', idKey: 'noticeId'},
};

const AlarmList = ({navigation}: any) => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigateTo = (item: any) => {
    const {page, idKey} = pageNavigationMap[item.type];
    if (page && idKey) {
      navigation.navigate(page, {[idKey]: item[`${idKey}`]});
    }
  };
  const fetchData = async () => {
    try {
      const response = await new RESTAPIBuilder(url, 'GET')
        .setNeedToken(true)
        .build()
        .run();
      if (!response.data) {
        setIsEmpty(false);
        return;
      }
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
      {isEmpty ? (
        Nothing({text: '새로운 알림이 없어요!'})
      ) : (
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
      )}
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
const Nothing = ({text}: {text: string}) => {
  return <NothingShow title={text} styleKiwe={styleKiwe} />;
};
const styleKiwe = StyleSheet.create({
  image: {
    marginTop: height * 200,
    height: height * 170,
  },
  text: {
    fontSize: height * 15,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 3,
  },
});
export default AlarmList;
