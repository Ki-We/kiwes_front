'use client';
import React, { useEffect } from 'react';
import useCheckbox from '@/hook/useCheckbox';

type AgreementCheckboxProps = {
  children: React.ReactNode;
};

export default function AgreementCheckbox({ children }: AgreementCheckboxProps) {
  const [isChecked, handleCheckboxChange] = useCheckbox(false);
  useEffect(() => {
    console.log(children);
  }, [isChecked]);
  return (
    <div className="w-full flex my-4">
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="w-6 h-6 accent-primary" />
      <label className="ml-1 text-xs">{children}</label>
    </div>
  );
}
