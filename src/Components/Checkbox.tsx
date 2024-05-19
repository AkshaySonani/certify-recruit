'use client';
import { useState } from 'react';

const Checkbox = ({
  label,
  className,
  isChecked,
  value,
  name,
  handleChange,
}: any) => {
  console.log('checked', isChecked);
  console.log('value', value);

  return (
    <div>
      <label
        htmlFor="checkboxLabelOne"
        className={`flex cursor-pointer select-none items-center ${className} `}
      >
        <div className="relative">
          <input
            type="checkbox"
            name={name}
            value={value}
            className="sr-only"
            onChange={(e) => handleChange(e)}
          />
          <div
            className={`mr-3 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked && 'bg-gray border-meta-blue-1 dark:bg-transparent'
            }`}
          >
            <span
              className={`h-2.5 w-2.5  rounded-sm ${
                isChecked && 'bg-meta-blue-1'
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
