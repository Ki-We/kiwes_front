import React from 'react';

type KiwesButton = {
  children: React.ReactNode;
  color?: string;
  onClick?: (event: React.MouseEvent) => void;
};

export default function KiwesButton({ children, color = 'bg-primary', onClick }: KiwesButton) {
  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button className={`w-4/5 ${color} rounded-md h-9 text-white`} onClick={handleClick}>
      {children?.toString().toUpperCase()}
    </button>
  );
}
