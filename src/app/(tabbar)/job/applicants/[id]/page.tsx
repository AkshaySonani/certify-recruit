'use client';
import ApplicantDetails from '@/Components/job/applicantDetails';

export function Page({ params }: { params: { id: string } }) {
  return <ApplicantDetails id={params?.id} status="Applicants" />;
}

export default Page;
