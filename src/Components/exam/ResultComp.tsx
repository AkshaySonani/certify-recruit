'use client';
import Image from 'next/image';
import Button from '../Button';
import { useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/service/Helper';

const ResultComp = ({ results }: any) => {
  console.log('results', results);
  const router = useRouter();
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center py-10">
          <Image src={'/MainLogo.svg'} alt="MainLogo" width={334} height={56} />
        </div>
        <div className="flex justify-center ">
          {results?.pass === true ? (
            <Image
              src={'/exam/examPassLogo.svg'}
              alt="MainLogo"
              width={200}
              height={221}
            />
          ) : (
            <Image
              src={'/exam/examFail.svg'}
              alt="MainLogo"
              width={200}
              height={221}
            />
          )}
        </div>
        <div className="mt-10 w-full">
          <p className="text-center text-5xl text-meta-light-blue-3">
            {results?.pass === true
              ? 'Congratulations'
              : 'Batter luck next time'}
          </p>
          <p className="m-auto mt-5 w-[70%] text-center text-lg text-meta-light-blue-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="mt-10 flex justify-center ">
          <Button
            title={'Back to dashboard'}
            btnClass="!h-[37px] !mb-0 !w-auto !px-6"
            handleClick={() => router?.push(ROUTE?.DASHBOARD)}
          />
        </div>
      </div>
    </div>
  );
};
export default ResultComp;
