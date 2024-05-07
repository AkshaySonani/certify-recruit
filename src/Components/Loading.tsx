import React from 'react';

const Loading = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <div
      aria-label="Loading..."
      role="status"
      className="fixed left-0 top-0 z-50 flex h-svh w-svw items-center justify-center bg-black bg-opacity-50"
    >
      <svg
        className="h-10 w-10 animate-spin stroke-white"
        viewBox="0 0 256 256"
      >
        <line
          x1={128}
          y1={32}
          x2={128}
          y2={64}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={24}
        />
        <line
          x1="195.9"
          y1="60.1"
          x2="173.3"
          y2="82.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={24}
        />
        <line
          x1={224}
          y1={128}
          x2={192}
          y2={128}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={24}
        ></line>
        <line
          x1="195.9"
          y1="195.9"
          x2="173.3"
          y2="173.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={24}
        />
        <line
          x1={128}
          y1={224}
          x2={128}
          y2={192}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={24}
        ></line>
        <line
          x1="60.1"
          y1="195.9"
          x2="82.7"
          y2="173.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={24}
        />
        <line
          x1={32}
          y1={128}
          x2={64}
          y2={128}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={24}
        />
        <line
          x1="60.1"
          y1="60.1"
          x2="82.7"
          y2="82.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={24}
        ></line>
      </svg>
      <span className="ml-2 text-xl font-medium text-white">Loading...</span>
    </div>
  ) : null;
};

export default Loading;
