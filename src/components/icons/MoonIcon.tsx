import React from 'react';

interface MoonIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const MoonIcon: React.FC<MoonIconProps> = ({
  width = 20,
  height = 20,
  color = 'currentColor'
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default MoonIcon;
