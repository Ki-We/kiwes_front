import React, {useEffect, useState} from 'react';
import {FunnelProps, StepProps} from '../../hooks/useFunnel';
import PostLayout from './PostLayout';
import SetupLang from './SetupLang';
import SetupCategory from './SetupCategory';
import SetupLayout from './SetupLayout';
import SetupDetail1 from './SetupDetail1';
import SetupDetail2 from './SetupDetail2';
import SetupDetail3 from './SetupDetail3';
import {apiServer} from '../../utils/metaData';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';

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
  const [post, setPost] = useState({
    category: '',
    content: '',
    cost: -1,
    date: '',
    dueTo: '',
    gender: '남자만',
    languages: [],
    location: '',
    locationsKeyword: '',
    maxPeople: 0,
    title: '',
  });

  useEffect(() => {
    console.log(post);
  }, [post]);

  const postClub = () => {
    const url = `${apiServer}/api/v1/club/article`;
    new RESTAPIBuilder(url, 'POST')
      .setNeedToken(true)
      .setBody(post)
      .build()
      .run()
      .then(({data}) => {
        console.log(data);
        console.log('등록 완료');
      })
      .catch(err => {
        console.log('err : ', err);
      });
  };

  return (
    <PostLayout>
      <Funnel>
        <Step name="언어">
          <SetupLayout
            isStart={true}
            title={'모임에서 사용할\n언어를 골라주세요.'}
            onNext={() => {
              if (post.languages.length == 0) return;
              nextClickHandler(steps[1]);
            }}>
            <SetupLang post={post} setPost={setPost} />
          </SetupLayout>
        </Step>
        <Step name="카테고리">
          <SetupLayout
            title={'모임의 카테고리를\n골라주세요.'}
            onPrev={() => nextClickHandler(steps[0])}
            onNext={() => {
              if (post.category == '') return;
              nextClickHandler(steps[2]);
            }}>
            <SetupCategory post={post} setPost={setPost} />
          </SetupLayout>
        </Step>
        <Step name="상세정보1">
          <SetupLayout
            title={'모임의 날짜와 마감일,\n장소를 알려주세요.'}
            onPrev={() => nextClickHandler(steps[1])}
            onNext={() => {
              if (post.date == '' || post.dueTo == '') return;
              nextClickHandler(steps[3]);
            }}>
            <SetupDetail1 post={post} setPost={setPost} />
          </SetupLayout>
        </Step>
        <Step name="상세정보2">
          <SetupLayout
            title={'모임의 비용과 참여인원,\n성별을 골라주세요'}
            onPrev={() => nextClickHandler(steps[2])}
            onNext={() => {
              if (post.cost < 0 || post.maxPeople == 0) return;
              nextClickHandler(steps[4]);
            }}>
            <SetupDetail2 post={post} setPost={setPost} />
          </SetupLayout>
        </Step>
        <Step name="상세정보3">
          <SetupLayout
            isEnd={true}
            title={'모임의 정보를\n입력해주세요.'}
            onPrev={() => nextClickHandler(steps[3])}
            onNext={postClub}>
            <SetupDetail3 post={post} setPost={setPost} />
          </SetupLayout>
        </Step>
      </Funnel>
    </PostLayout>
  );
};

export default PostClubStep;
