'use client';
import React from 'react';
import JobPostingFormMain from '@/Components/Job_posting/jobPostingFormMain';

function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <JobPostingFormMain id={params?.id} />
    </div>
  );
}

export default Page;
