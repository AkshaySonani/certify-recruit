import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";

const AutoComplete = ({
  value,
  filterArr,
  query,
  setQuery,
  name,
  placeholder,
  handleChange,
}: any) => {
  return (
    <Combobox value={value} onChange={(e: any) => handleChange(e)}>
      <div className="relative">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border focus:outline-none border-meta-light-blue-1 sm:text-sm">
          <Combobox.Input
            className="w-full py-3 pl-3 pr-10  focus:outline-none text-base leading-5 text-gray-900"
            displayValue={(person: any) => person?.name}
            placeholder={placeholder}
            name={name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Image
              alt="Icon"
              width={14}
              height={14}
              src={"/dashboard/SelectDown.svg"}
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filterArr?.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filterArr?.map((el: any) => (
                <Combobox.Option
                  key={el._id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 p-1 pl-4 pr-4 ${
                      active ? "bg-meta-blue-1 text-white" : "text-gray-900"
                    }`
                  }
                  value={el}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        } text-sm `}
                      >
                        {el.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};
export default AutoComplete;
