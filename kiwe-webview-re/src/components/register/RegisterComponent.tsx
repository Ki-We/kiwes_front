import AgreementCheckbox from '@/components/register/AgreementCheckbox'
import KiwesButton from '@/components/register/KiwesButton'
import LanguageBTN from '@/components/register/LanguageBTN'
import Image from 'next/image'

export default function RegisterComponent() {
  return (
    <>
      <Image
        src="/images/logo.png"
        alt="logo"
        width={233}
        height={107}
        className="mx-auto mt-10"
      />
      <div className="mt-10 ">
        <h1 className="text-xl font-basic text-gray-400">Select Language</h1>
        <div className="flex justify-center gap-x-10 mt-8">
          <LanguageBTN>한국어</LanguageBTN>
          <LanguageBTN>English</LanguageBTN>
        </div>
      </div>
      <div className="mt-10 w-4/5 mx-auto">
        <AgreementCheckbox>
          이용약관 동의 / Terms and Conditions Agreement
        </AgreementCheckbox>
        <AgreementCheckbox>
          개인정보 처리방침 동의 / Privacy Policy Agreement
        </AgreementCheckbox>
      </div>
      <KiwesButton>next</KiwesButton>
    </>
  )
}
