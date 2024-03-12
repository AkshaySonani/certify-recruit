"use client";
import { useState } from "react";

const Checkbox = ({ label, className }: any) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor="checkboxLabelOne"
        className={`flex cursor-pointer select-none items-center ${className}`}
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelOne"
            className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          <div
            className={`mr-3 flex h-5 w-5 items-center justify-center rounded border ${isChecked && "border-[#013BB7] bg-gray dark:bg-transparent"
              }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isChecked && "bg-[#013BB7]"
                }`}
            ></span>
          </div>
        </div>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
