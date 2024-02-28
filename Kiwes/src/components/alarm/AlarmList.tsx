import React, {useCallback, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Text from '@components/atoms/Text';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {useFocusEffect} from '@react-navigation/native';
import {apiServer} from '../../utils/metaData';
import {Alarm} from '../../utils/commonInterface';
import AlarmComponent from './AlarmComponent';
import {height, width} from '../../global';
import NothingShow from '../NothingShow';
import {useSelector} from 'react-redux';
import {RootState} from '@/slice/RootReducer';

const timePeriods = ['오늘', '어제', '이번 주', '이전 활동'];
const pageNavigationMap = {
  CLUB: {page: 'ClubDetail', idKey: 'clubId'},
  CHAT: {page: 'ChatMain', idKey: 'clubId'},
  NOTICE: {page: 'NoticePage', idKey: 'noticeId'},
  EVENT: {page: 'EventPage', idKey: 'noticeId'},
  ACCESS: {page: 'RequestList', idKey: 'clubId'},
};

const AlarmList = ({navigation}: any) => {
  const language = useSelector((state: RootState) => state.language);
  const url = `${apiServer}/api/v1/alarm/?lang=${language.language}`;
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigateTo = (item: any) => {
    const {page, idKey} = pageNavigationMap[item.type];
    if (page && idKey) {
      navigation.navigate(page, {[idKey]: item[`${idKey}`]});
    }
  };
  const navigateToProile = (item: any) => {
    navigation.navigate('OtherUserPage', {memberId: item.senderId});
  };
  const fetchData = async () => {
    try {
      console.log(url);
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
          {timePeriods.map((period, index) => {
            const filteredAlarms = alarms.filter(
              r => r.createAfterDay === period,
            );
            return (
              filteredAlarms.length > 0 && (
                <View key={index} style={styles.alarmContainer}>
                  <Text style={styles.title}>{period}</Text>
                  {filteredAlarms.map((r, index) => (
                    <AlarmComponent
                      key={index}
                      item={r}
                      navigateTo={() => navigateTo(r)}
                      navigateToProile={() => navigateToProile(r)}
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
    padding: width * 5,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: width * 5,
    paddingBottom: width * 10,
  },
  profilContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: height * 15,
    fontWeight: '600',
    color: '#58C024',
    margin: width * 10,
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
    fontSize: height * 16,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: height * 3,
  },
});
export default AlarmList;
