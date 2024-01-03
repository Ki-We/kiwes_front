import {FunnelProps, StepProps} from '../../hooks/useFunnel';
import PostLayout from './PostLayout';
import {Text} from 'react-native';
import SetupLang from './SetupLang';
import SetupLayout from './SetupLayout';

export interface ProfileSetupInterface {
  steps: string[];
  nextClickHandler: (nextStep: string) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
}

const PostClubStep = ({
  steps,
  nextClickHandler,
  Funnel,
  Step,
}: ProfileSetupInterface) => {
  return (
    <PostLayout>
      <Funnel>
        <Step name="언어">
          <SetupLayout
            title="모임에서 사용할 언어를 골라주세요"
            onNext={() => nextClickHandler(steps[1])}>
            <SetupLang />
          </SetupLayout>
        </Step>
        <Step name="카테고리">
          <SetupLayout
            title="모임의 카테고리를 골라주세요."
            onNext={() => nextClickHandler(steps[2])}>
            <Text>반가워요</Text>
          </SetupLayout>
        </Step>
        <Step name="상세정보1">
          <SetupLayout
            title="모임의 날짜와 마감일, 장소를 알려주세요"
            onNext={() => nextClickHandler(steps[3])}>
            <Text>반가워요</Text>
          </SetupLayout>
        </Step>
        <Step name="상세정보2">
          <SetupLayout
            title="모임의 비용과 참여인원, 성별을 골라주세요"
            onNext={() => nextClickHandler(steps[4])}>
            <Text>반가워요</Text>
          </SetupLayout>
        </Step>
        <Step name="상세정보3">
          <SetupLayout
            title="모임의 정보를 입력해주세요."
            onNext={() => {
              console.log('작성 완료');
            }}>
            <Text>반가워요</Text>
          </SetupLayout>
        </Step>
      </Funnel>
    </PostLayout>
  );
};

export default PostClubStep;
