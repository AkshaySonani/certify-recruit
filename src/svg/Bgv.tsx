import React, { SVGProps } from 'react';

const Bgv = ({ color = '#49556F', ...props }: SVGProps<SVGElement>) => {
  return (
    <svg
      fill="none"
      width={props?.width}
      viewBox="0 0 18 18"
      height={props?.height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 0C1.34315 0 0 1.34315 0 3V15C0 16.6569 1.34315 18 3 18H15C16.6569 18 18 16.6569 18 15V3C18 1.34315 16.6569 0 15 0H3ZM13.7071 6.70711C14.0976 6.31658 14.0976 5.68342 13.7071 5.29289C13.3166 4.90237 12.6834 4.90237 12.2929 5.29289L7 10.5858L5.20711 8.79289C4.81658 8.40237 4.18342 8.40237 3.79289 8.79289C3.40237 9.18342 3.40237 9.81658 3.79289 10.2071L5.58579 12C6.36684 12.7811 7.63317 12.781 8.41421 12L13.7071 6.70711Z"
        fill={color}
      />
    </svg>
  );
};

export default Bgv;
