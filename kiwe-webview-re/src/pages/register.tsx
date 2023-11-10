import Seo from '@/components/Seo'
import CommonLayout from '@/components/layout/CommonLayout'
import RegisterComponent from '@/components/register/RegisterComponent'
import React from 'react'

export default function register() {
  return (
    <CommonLayout>
      <Seo />
      <main className="text-center">
        <RegisterComponent />
      </main>
    </CommonLayout>
  )
}
