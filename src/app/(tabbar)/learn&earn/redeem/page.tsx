'use client';
import Button from '@/Components/Button';
import { APPLICANT_STATUS } from '@/constant/Enum';
import { TEXT } from '@/service/Helper';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import ReactApexChart from 'react-apexcharts';

const data = [
  { no: 1, week: 'Monday', score: '08/10', time: '4:30', status: 'Complete' },
  { no: 2, week: 'Tuesday', score: '00/10', time: '0:00', status: 'Missed' },
  {
    no: 3,
    week: 'Wednesday',
    score: '10/10',
    time: '5:00',
    status: 'Complete',
  },
  { no: 4, week: 'Thursday', score: '10/10', time: '2:30', status: 'Complete' },
  { no: 5, week: 'Friday', score: '10/10', time: '3:30', status: 'Complete' },
];
const TopRankData = [
  {
    rank: 20,
    name: 'Kate Tanner',
    department: 'HR',
    experience: '6+ years',
    time: '4:30',
    score: '60%',
  },
  {
    rank: 1,
    name: 'Kate Tanner',
    department: 'HR',
    experience: '6+ years',
    time: '2:00',
    score: '70%',
  },
  {
    rank: 2,
    name: 'Kate Tanner',
    department: 'HR',
    experience: '6+ years',
    time: '2:30',
    score: '70%',
  },
  {
    rank: 3,
    name: 'Kate Tanner',
    department: 'HR',
    experience: '6+ years',
    time: '3:00',
    score: '70%',
  },
  {
    rank: 4,
    name: 'Kate Tanner',
    department: 'HR',
    experience: '6+ years',
    time: '3:30',
    score: '70%',
  },
  {
    rank: 5,
    name: 'Kate Tanner',
    department: 'HR',
    experience: '6+ years',
    time: '3:40',
    score: '69%',
  },
  {
    rank: 6,
    name: 'Kate Tanner',
    department: 'HR',
    experience: '6+ years',
    time: '3:45',
    score: '69%',
  },
];

const series = [
  {
    name: 'Rank',
    data: [10, 5, 0, 1, 7, 4, 6],
  },
];

const options = {
  chart: {
    type: 'line',
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },
  toolbar: {
    show: false, // Disable the toolbar
  },
  title: {
    text: 'Weekly Ranking ',
    align: 'left',
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
};

const Page = () => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="mb-4 text-2xl font-semibold text-meta-purple-1">
          {TEXT?.LEARN_AND_EARN}
        </div>

        <Menu as="div" className="relative ">
          <Menu.Button className="relative mt-2 flex w-full appearance-none items-center justify-between rounded-lg border border-meta-light-blue-1 px-3 py-3 outline-none transition">
            <p className="pr-5 text-base font-medium text-meta-purple-1">
              Start Exam
            </p>
            <Image
              alt="Icon"
              width={14}
              height={14}
              src={'/dashboard/SelectDown.svg'}
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-75"
            leaveTo="transform opacity-0 scale-95"
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leaveFrom="transform opacity-100 scale-100"
          >
            <Menu.Items className="absolute right-0 z-30 max-h-[200px] w-full min-w-36 origin-top-right divide-y divide-gray-200 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div>
                {APPLICANT_STATUS?.map((el: any) => {
                  return (
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          //   onClick={() => statusUpdateApi(item?._id, el)}
                          className={classNames(
                            active
                              ? 'bg-meta-blue-1 text-white'
                              : 'text-gray-900',
                            'block px-4 py-2 text-sm capitalize',
                          )}
                        >
                          {el}
                        </div>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="mt-5 flex w-full gap-4">
        <div className="  w-1/2 rounded-2xl border border-meta-light-blue-1">
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={200}
          />
        </div>
        <div className="w-1/2 ">
          <div className="container mx-auto rounded-2xl border border-meta-light-blue-1 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-meta-purple-1 ">
                Weekly Score Detail
              </h2>
              <button className="text-sm font-medium text-meta-light-blue-3">
                View more
              </button>
            </div>
            <table className="min-w-full  bg-white">
              <thead>
                <tr className="text-sm font-medium text-meta-light-blue-3">
                  <th className="border-b px-4 py-2">No</th>
                  <th className="border-b px-4 py-2">Week</th>
                  <th className="border-b px-4 py-2">Score</th>
                  <th className="border-b px-4 py-2">Time</th>
                  <th className="border-b px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr
                    key={row.no}
                    className="text-base font-medium text-meta-light-blue-3"
                  >
                    <td className="px-4 py-2 text-center">{row.no}</td>
                    <td className="px-4 py-2 text-center">{row.week}</td>
                    <td className="px-4 py-2 text-center">{row.score}</td>
                    <td className="px-4 py-2 text-center">{row.time}</td>
                    <td
                      className={`px-4 py-2 text-center ${row.status === 'Missed' ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Today Top 10 Ranking</h2>
          <div>
            <Button title={' Redeem Prize'} btnClass="!w-[120px] !mb-0" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-meta-light-blue-1 shadow-inner">
              <tr>
                <th className=" px-6 py-4">
                  <div className="text-base font-medium text-meta-light-blue-3">
                    Rank
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="text-base font-medium text-meta-light-blue-3">
                    Name
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="text-base font-medium text-meta-light-blue-3">
                    Department
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="text-base font-medium text-meta-light-blue-3">
                    Experience
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="text-base font-medium text-meta-light-blue-3">
                    Time
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="text-base font-medium text-meta-light-blue-3">
                    Score
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {TopRankData.map((row: any) => {
                return (
                  <tr>
                    <td className="px-6 py-4 text-gray-500">
                      <div>
                        <div className="text-base font-medium text-meta-purple-1">
                          {row.rank}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center">
                        <Image
                          alt="Icon"
                          width={31}
                          height={31}
                          src={'/dashboard/photo.svg'}
                        />
                        <div className="pl-4 text-base font-medium text-meta-purple-1">
                          {row.name}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      <div>
                        <div className="text-base font-medium text-meta-purple-1">
                          {' '}
                          {row.department}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div>
                        <div className="text-base font-medium text-meta-purple-1">
                          {row.experience}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div>
                        <div className="text-base font-medium text-meta-purple-1">
                          {row.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div>
                        <div className="text-base font-medium text-meta-green-1">
                          {row.score}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Page;
