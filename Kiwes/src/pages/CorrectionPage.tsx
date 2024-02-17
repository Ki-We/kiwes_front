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

  const nextClickHandler = (s: string) => {
    if (!steps.includes(s)) setStep(steps[0]);
    setStep(s);
  };
  const navigatePop = () => {
    navigation.pop();
  };

  return (
    <>
      <Header navigatePop={navigatePop} title={'모임 개설'} />
      <PostClubStep
        initPost={initPost}
        navigation={navigation}
        steps={steps}
        nextClickHandler={nextClickHandler}
        Funnel={Funnel}
        Step={Step}
      />
    </>
  );
};

export default CorrectionPage;
