'use client';
import ApplicantDetails from '@/Components/job/applicantDetails';

export function Page({ params }: { params: { id: string } }) {
  return <ApplicantDetails id={params?.id} status="Hired" />;
}

export default Page;
