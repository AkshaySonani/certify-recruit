"use client";
import React from "react";
import Image from "next/image";
import { Listbox } from "@headlessui/react";

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
        className={`${buttonStyle} bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      >
        <span className="block truncate">
          {selectedOption || "Select an option"}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <Image width={18} height={18} alt="Preview" src={"/job/Close.svg"} />
        </span>
      </Listbox.Button>
      <Listbox.Options
        className={`${optionStyle} absolute z-10 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm`}
      >
        {options.map((option: any) => (
          <Listbox.Option
            key={option?.id}
            value={option?.name}
            className={({ active }) =>
              `${active ? "text-white bg-meta-blue-1" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-3 pr-9`
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
                  selected ? "font-semibold" : "font-normal"
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
