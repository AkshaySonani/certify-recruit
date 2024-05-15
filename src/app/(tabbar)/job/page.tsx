'use client';
import Image from 'next/image';
import Select from '@/Components/Select';
import { useRouter } from 'next/navigation';
import Checkbox from '@/Components/Checkbox';
import DatePicker from 'react-multi-date-picker';
import React, { Fragment, useState } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { TEXT } from '@/service/Helper';
import IndividualJob from '@/Components/job/individual_job';

const jobs = [
  { title: 'Applicants', count: 50 },
  { title: 'Awaiting', count: 10 },
  { title: 'Contacting', count: 20 },
  { title: 'Hired', count: 10 },
];

const SelectOption = [
  { label: 'Select ...', value: '' },
  { label: 'Open', value: 'Open' },
  { label: 'Paused', value: 'Paused' },
  { label: 'Closed', value: 'Closed' },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Page = () => {
  const router = useRouter();
  const [dateRange, setDateRange] = useState(['2024-01-01', '2024-12-31']);

  const jobHandler = (title: string) => {
    if (title === 'Applicants') {
      router.push('/job/applicants');
    } else if (title === 'Awaiting') {
      router.push('/job/awaiting');
    } else if (title === 'Contacting') {
      router.push('/job/contacting');
    } else if (title === 'Hired') {
      router.push('/job/hired');
    }
  };

  return (
    <div>
      <IndividualJob />
    </div>
  );
};

export default Page;
