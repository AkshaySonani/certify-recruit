import React, { SVGProps } from 'react';

const Sense = ({ color = '#49556F', ...props }: SVGProps<SVGElement>) => {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_974_544)">
        <path d="M10.5707 0H4.85742V6.56341H10.5707V0Z" fill="#FFDA44" />
        <path
          d="M8.68935 17.1661L5.9656 15.2043L0 21.6504V22.9997H11.4995V15.1416L8.68935 17.1661Z"
          fill="#6E76E5"
        />
        <path
          d="M17.0339 15.2043L14.3107 17.1661L11.4995 15.1416V22.9997H23V21.6504L17.0339 15.2043Z"
          fill="#515BE0"
        />
        <path
          d="M11.4995 15.1416V10.2285H10.5707L5.96561 15.2044L8.68936 17.1661L11.4995 15.1416Z"
          fill="#99E9EC"
        />
        <path
          d="M11.4995 15.1416L14.3107 17.1661L17.0339 15.2043L14.3107 17.1661L11.4995 15.1416Z"
          fill="#99E9EC"
        />
        <path
          d="M11.4995 10.2285V15.1416L14.3107 17.1661L17.0339 15.2044L12.4285 10.2285H11.4995Z"
          fill="#66DDE2"
        />
        <path
          d="M12.4285 10.2288C12.4293 10.2288 12.4293 0 12.4293 0H10.5707V10.2288H12.4285Z"
          fill="#957856"
        />
      </g>
      <defs>
        <clipPath id="clip0_974_544">
          <rect width="23" height="23" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Sense;
