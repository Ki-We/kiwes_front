import React from 'react';
import Header from '../components/layout/Header';
import PostClubStep from '../components/post/PostClubStep';
import {useFunnel} from '../hooks/useFunnel';
import {apiServer} from '../utils/metaData';

const steps = ['언어', '카테고리', '상세정보1', '상세정보2', '상세정보3'];
const CorrectionPage = ({route, navigation}: any) => {
  const {baseInfo} = route.params;
  const {Funnel, Step, setStep} = useFunnel(steps[0]);
  const url = `${apiServer}/api/v1/club/article/${baseInfo.clubId}`;
  console.log(baseInfo.date);
  const initPost = {
    category: baseInfo.tags[0],
    content: baseInfo.content,
    cost: baseInfo.cost,
    date: baseInfo.dateInfo[0],
    dueTo: baseInfo.dateInfo[1],
    gender: baseInfo.gender,
    languages:
      baseInfo.tags.length >= 3
        ? [baseInfo.tags[1], baseInfo.tags[2]]
        : [baseInfo.tags[1]],
    location: baseInfo.location,
    locationKeyword: baseInfo.locationKeyword,
    latitude: baseInfo.latitude,
    longitude: baseInfo.longitude,
    maxPeople: baseInfo.maxPeople,
    title: baseInfo.title,
    imageSource: baseInfo.thumbnailImageUrl,
  };
  const nextClickHandler = (s: string) => {
    if (!steps.includes(s)) setStep(steps[0]);
    setStep(s);
  };
  const navigatePop = () => {
    navigation.pop();
  };
  const type = ['PUT', '수정'];
  return (
    <>
      <Header navigatePop={navigatePop} title={'모임 수정'} />
      <PostClubStep
        initPost={initPost}
        navigation={navigation}
        steps={steps}
        nextClickHandler={nextClickHandler}
        Funnel={Funnel}
        Step={Step}
        url={url}
        type={type}
      />
    </>
  );
};

export default CorrectionPage;
