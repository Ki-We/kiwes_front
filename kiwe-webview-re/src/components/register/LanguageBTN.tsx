import React from 'react';

type KiewsBTNProps = {
  children: React.ReactNode;
  style?: string;
};

export default function KiewsBTN({ children }: KiewsBTNProps) {
  return (
    <div>
      <button className="rounded-full border-[0.5px] border-primary w-20 h-20 text-primary">{children?.toString().charAt(0)}</button>
      <p className="text-gray-400 mt-5">{children}</p>
    </div>
  );
}
