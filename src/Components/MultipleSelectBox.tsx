import { FieldProps } from "formik";
import React from "react";
import Select from "react-select";

interface Option {
  label: string;
  value: string;
}

export const MultipleSelectBox = ({
  className,
  placeholder,
  field,
  form,
  name,
  style,
  value,
  options,
  isMulti = false,
}: any) => {
  const onChange = (option: any) => {
    form.setFieldValue(
      name,
      isMulti
        ? (option as Option[]).map((item: Option) => item?.value)
        : (option as Option).value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option: any) => value.indexOf(option.value) >= 0)
        : options.find((option: any) => option.value === value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <Select
      className={className}
      controlShouldRenderValue={false}
      name={name}
      styles={style}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  );
};

export default MultipleSelectBox;
