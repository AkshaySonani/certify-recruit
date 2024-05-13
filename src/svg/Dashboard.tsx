import React, { SVGProps } from 'react';

const Dashboard = ({ color = '#49556F', ...props }: SVGProps<SVGElement>) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 19 19"
      width={props?.width}
      height={props?.height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="7" width="9" height="12" rx="3" fill={color} />
      <rect x="10" width="9" height="12" rx="3" fill={color} />
      <rect x="10" y="13" width="9" height="6" rx="3" fill={color} />
      <rect width="9" height="6" rx="3" fill={color} />
    </svg>
  );
};

export default Dashboard;
