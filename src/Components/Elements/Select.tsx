"use client";
import Image from "next/image";
import React, { useState } from "react";

const Select: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div className="mb-4.5">
      {/* <label className="mb-2.5 block text-black dark:text-white">

        Subject{" "}
      </label> */}

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full min-w-80 appearance-none rounded-lg border border-stroke bg-transparent px-5 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? "text-black dark:text-white" : ""
            }`}
        >
          <option value="" disabled className="text-text/secondary">
            Select ...
          </option>
          <option value="Paused" className="text-text/secondary">
            Paused
          </option>
          <option value="Active" className="text-text/secondary">
            Active
          </option>
        </select>

        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <Image src={"/dashboard/SelectDown.svg"} alt="Icon" width={14} height={14} />
        </span>
      </div>
    </div>
  );
};

export default Select;
