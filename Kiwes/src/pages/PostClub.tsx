import {Text, View} from 'react-native';
import Header from '../components/layout/Header';
import PostClubStep from '../components/post/PostClubStep';
import {useFunnel} from '../hooks/useFunnel';

const steps = ['언어', '카테고리', '상세정보1', '상세정보2'];
export default function PostClub({navigation}: any) {
  const {Funnel, Step, setStep} = useFunnel(steps[0]);

  const nextClickHandler = (s: string) => {
    if (!steps.includes(s)) setStep(steps[0]);
    setStep(s);
  };
  return (
    <>
      <Header navigation={navigation} title={'모임 개설'} />
      <Text>PostClub</Text>
      <PostClubStep
        steps={steps}
        nextClickHandler={nextClickHandler}
        Funnel={Funnel}
        Step={Step}
      />
    </>
  );
}
