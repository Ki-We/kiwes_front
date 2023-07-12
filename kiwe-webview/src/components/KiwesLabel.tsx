import React, { Children } from 'react';

type KiwesLabelProps = {
  children: React.ReactNode;
  isRequired?: boolean;
};

export default function KiwesLabel({ children, isRequired }: KiwesLabelProps) {
  return (
    <div>
      <span>{children}</span>
      {isRequired ? <span className="text-primary">*</span> : <></>}
    </div>
  );
}
