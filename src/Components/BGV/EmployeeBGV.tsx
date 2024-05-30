import Image from 'next/image';

const EmployeeBGV = () => {
  const status = 'verified';
  return (
    <div>
      <div className="mb-4 text-2xl font-semibold text-meta-purple-1">BGV</div>

      <div>
        <p className="mt-5 text-xl font-bold text-meta-purple-1">
          What is the process for BGV and how is it done?{' '}
        </p>
        <div className="pt-3">
          <p className="text-lg font-medium text-meta-light-blue-3">
            The background verification process encompasses checking the
            credibility of the candidate's past employment details, their
            educational qualifications, if there are any ongoing or past court
            cases against the candidate - with the idea of hiring the right
            candidate for the job.
          </p>
          <p className="pt-5 text-lg font-medium text-meta-light-blue-3">
            With the changing work environment and new data protection laws,
            companies cannot afford even a minor glitch in the resume. One wrong
            candidate is hired, and your market reputation earned over the years
            goes for a toss. A few easy steps of background verification can
            bring about a profitable change in your company.
          </p>
        </div>

        <div className="mt-10">
          <div className="m-auto  flex w-[60%]  justify-between   rounded-full bg-meta-blue-1 p-2">
            <input
              type="email"
              placeholder="luna@gmail.com"
              className="rounded-full bg-meta-blue-1 px-4 py-2 text-white outline-none"
            />
            <button className="flex items-center rounded-full bg-white px-4  text-meta-blue-1">
              <Image
                alt="search"
                width={11}
                height={11}
                src={'/dashboard/search.svg'}
              />
              <p className="pl-2 text-sm font-medium">Search</p>
            </button>
          </div>
        </div>
        <div className="mt-8 flex w-full justify-center">
          <div className="h-auto w-56 rounded-3xl bg-white  shadow-md ">
            <div className="flex h-28 justify-end rounded-t-3xl bg-meta-blue-1    pt-2">
              <div className="mr-2 h-[23px] w-fit rounded-lg bg-white px-5 py-2">
                <p className="rounded-md font-bold text-meta-blue-1 ">Verify</p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                alt="search"
                width={11}
                height={11}
                src={'/dashboard/search.svg'}
              />
            </div>
            <div className=" h-[219px] rounded-b-3xl bg-meta-light-blue-2">
              <h2 className="text-lg font-bold text-gray-800">{'name'}</h2>
              <p className="text-sm text-gray-500">{'designation'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeeBGV;
