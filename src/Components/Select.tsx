"use client";
import Image from "next/image";
import React, { useState } from "react";

interface SelectProps {
  options: { label: string; value: string }[];
}

const Select: React.FC<SelectProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div className="mb-4.5">
      <div className="relative z-20 bg-transparent">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full min-w-80 appearance-none rounded-lg border border-stroke bg-transparent px-5 py-2 outline-none transition focus:border-meta-blue-1 active:border-meta-blue-1 ${
            isOptionSelected ? "text-black" : ""
          }`}
        >
          {options.map((item: any) => {
            return (
              <option value={item.value} className="text-meta-purple-1">
                {item.label}
              </option>
            );
          })}
          {/* <option value="" disabled className="text-meta-purple-1">
            Select ...
          </option>
          <option value="Paused" className="text-meta-purple-1">
            Paused
          </option>
          <option value="Active" className="text-meta-purple-1">
            Active
          </option> */}
        </select>
        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <Image
            src={"/dashboard/SelectDown.svg"}
            alt="Icon"
            width={14}
            height={14}
          />
        </span>
      </div>
    </div>
  );
};

export default Select;
