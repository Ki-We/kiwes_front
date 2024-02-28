import React, {useCallback, useState} from 'react';
import {FunnelProps, StepProps} from '../../hooks/useFunnel';
import PostLayout from './PostLayout';
import SetupLang from './SetupLang';
import SetupCategory from './SetupCategory';
import SetupLayout from './SetupLayout';
import SetupDetail1 from './SetupDetail1';
import SetupDetail2 from './SetupDetail2';
import SetupDetail3 from './SetupDetail3';
import {apiServer, chatServer} from '../../utils/metaData';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import {useFocusEffect} from '@react-navigation/native';

export interface ProfileSetupInterface {
  navigation: any;
  initPost: any;
  steps: string[];
  nextClickHandler: (nextStep: string) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
  url: string;
  type: string[];
}

const PostClubStep = ({
  navigation,
  initPost,
  steps,
  nextClickHandler,
  Funnel,
  Step,
  url,
  type,
}: ProfileSetupInterface) => {
  const [post, setPost] = useState(initPost);

  const postClub = async () => {
    console.log(post);
    if (post.title == '' || post.imageSource == '') return;
    const {data} = await new RESTAPIBuilder(url, type[0])
      .setNeedToken(true)
      .setBody(post)
      .build()
      .run()
      .catch(err => {
        console.log('post club err1 : ', err);
      });

    console.log(`${data.clubId} 모임 개설 완료`);
    await uploadClubImage(data.clubId).catch(err => {
      console.log('post club err2 : ', err);
    });
    console.log(`${data.clubId} 모임 이미지 업로드 완료`);

    // 채팅 서버 Create Room
    const chatUrl = `${chatServer}/room`;
    const {msg} = await new RESTAPIBuilder(chatUrl, 'POST')
      .setNeedToken(true)
      .setBody({clubId: data.clubId})
      .build()
      .run()
      .catch(err => {
        console.log('post club err3 : ', err);
      });
    console.log(`모임 개설 Chatting : ${msg}`);

    navigation.navigate('ClubDetail', {clubId: data.clubId});
  };
  const uploadClubImage = async (clubId: number) => {
    if (!post.imageSource || typeof post.imageSource === 'number') {
      throw new Error('이미지를 선택해주세요');
    } else if (post.imageSource.startsWith('https')) {
      return;
    }
    const imageUrl = `${apiServer}/api/v1/club/article/presigned-url?clubId=${clubId}`;
    const presignedResponse = await new RESTAPIBuilder(imageUrl, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => {
        console.log('post club err3 : ', err);
      });
    const presignedUrl = presignedResponse.data;
    const imageData = await RNFS.readFile(post.imageSource, 'base64');
    const binaryData = new Buffer(imageData, 'base64');

    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: binaryData,
    });
    if (!uploadResponse.ok) {
      const errorMessage = await uploadResponse.text();
      console.log('post club err4 : ', errorMessage);
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        nextClickHandler('언어');
        setPost(initPost);
      };
    }, []),
  );

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
            nextButton={type[1]}
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
