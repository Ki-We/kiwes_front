'use client';
import KiwesButton from '@/components/KiwesButton';
import KiwesLabel from '@/components/KiwesLabel';
import ProgressiveBar from '@/components/ProgressiveBar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function page() {
  const [progress, setProgress] = useState(0);
  const updateProgress = () => {
    if (progress < 100) {
      setProgress(progress + 25);
    }
  };

  useEffect(() => {
    console.log(progress);
  }, [progress]);
  return (
    <main className="text-center w-full">
      <header>
        <p>프로필설정</p>
        <ProgressiveBar percent={progress} />
      </header>
      <article>
        {progress == 0 ? (
          <div className="">
            <KiwesLabel isRequired>프로필 이미지</KiwesLabel>
            <input type="file" accept="image/jpg,image/jpeg, image/png " className="w-20 h-20 bg-[url('/images/kiweDefaultProfile.png')] rounded-full "></input>
          </div>
        ) : (
          <></>
        )}
        {progress == 25 ? (
          <div>
            <KiwesLabel isRequired>닉네임</KiwesLabel>
          </div>
        ) : (
          <></>
        )}
        <KiwesButton onClick={updateProgress}>next</KiwesButton>
      </article>
    </main>
  );
}
