'use client';
import React from 'react';
import Image from 'next/image';
import { Listbox } from '@headlessui/react';

const SelectBox = ({
  options,
  buttonStyle,
  optionStyle,
  selectedOption,
  setSelectedOption,
}: any) => {
  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      <Listbox.Button
        className={`${buttonStyle} relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
      >
        <span className="block truncate">
          {selectedOption || 'Select an option'}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <Image width={18} height={18} alt="Preview" src={'/job/Close.svg'} />
        </span>
      </Listbox.Button>
      <Listbox.Options
        className={`${optionStyle} absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
      >
        {options.map((option: any) => (
          <Listbox.Option
            key={option?.id}
            value={option?.name}
            className={({ active }) =>
              `${active ? 'bg-meta-blue-1 text-white' : 'text-gray-900'}
                          relative cursor-default select-none py-2 pl-3 pr-9`
            }
            onClick={() => {
              setSelectedOption((selectedOption: any) => [
                ...selectedOption,
                option,
              ]);
            }}
          >
            {({ selected }) => (
              <span
                className={`${
                  selected ? 'font-semibold' : 'font-normal'
                } block truncate`}
              >
                {option?.name}
              </span>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default SelectBox;
