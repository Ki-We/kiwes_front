import React from 'react';
import Header from '../components/layout/Header';
import PostClubStep from '../components/post/PostClubStep';
import {useFunnel} from '../hooks/useFunnel';

const steps = ['언어', '카테고리', '상세정보1', '상세정보2', '상세정보3'];
export default function PostClub({navigation}: any) {
  const {Funnel, Step, setStep} = useFunnel(steps[0]);

  const nextClickHandler = (s: string) => {
    if (!steps.includes(s)) setStep(steps[0]);
    setStep(s);
  };
  const navigatePop = () => {
    navigation.navigate('HomePage');
  };
  return (
    <>
      <Header navigatePop={navigatePop} title={'모임 개설'} />
      <PostClubStep
        navigation={navigation}
        steps={steps}
        nextClickHandler={nextClickHandler}
        Funnel={Funnel}
        Step={Step}
      />
    </>
  );
}
