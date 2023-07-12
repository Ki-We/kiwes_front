import KiwesButton from '@/components/KiwesButton';
import Image from 'next/image';
import React from 'react';

export default function page() {
  return (
    <main className="flex justify-center">
      <div className="w-4/5 mt-16 text-center">
        <h1 className="text-primary text-3xl font-bold text-left">KiWES</h1>
        <Image src="/images/kiwesBird.png" alt="logo" width={233} height={107} className="ml-auto mt-10" />
        <div className="mt-16">
          <KiwesButton color="bg-yellow-400">kakao login</KiwesButton>
        </div>
      </div>
    </main>
  );
}
