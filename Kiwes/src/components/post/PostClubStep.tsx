import React from 'react';
import {FunnelProps, StepProps} from '../../hooks/useFunnel';
import PostLayout from './PostLayout';
import SetupLang from './SetupLang';
import SetupCategory from './SetupCategory';
import SetupLayout from './SetupLayout';
import SetupDetail1 from './SetupDetail1';
import SetupDetail2 from './SetupDetail2';
import SetupDetail3 from './SetupDetail3';

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
            isStart={true}
            title={'모임에서 사용할\n언어를 골라주세요.'}
            onNext={() => nextClickHandler(steps[1])}>
            <SetupLang />
          </SetupLayout>
        </Step>
        <Step name="카테고리">
          <SetupLayout
            title={'모임의 카테고리를\n골라주세요.'}
            onPrev={() => nextClickHandler(steps[0])}
            onNext={() => nextClickHandler(steps[2])}>
            <SetupCategory />
          </SetupLayout>
        </Step>
        <Step name="상세정보1">
          <SetupLayout
            title={'모임의 날짜와 마감일,\n장소를 알려주세요.'}
            onPrev={() => nextClickHandler(steps[1])}
            onNext={() => nextClickHandler(steps[3])}>
            <SetupDetail1 />
          </SetupLayout>
        </Step>
        <Step name="상세정보2">
          <SetupLayout
            title={'모임의 비용과 참여인원,\n성별을 골라주세요'}
            onPrev={() => nextClickHandler(steps[2])}
            onNext={() => nextClickHandler(steps[4])}>
            <SetupDetail2 />
          </SetupLayout>
        </Step>
        <Step name="상세정보3">
          <SetupLayout
            title={'모임의 정보를\n입력해주세요.'}
            onPrev={() => nextClickHandler(steps[3])}
            onNext={() => {
              console.log('작성 완료');
            }}>
            <SetupDetail3 />
          </SetupLayout>
        </Step>
      </Funnel>
    </PostLayout>
  );
};

export default PostClubStep;
