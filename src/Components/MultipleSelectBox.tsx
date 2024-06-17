import React from 'react';
import Select from 'react-select';

export const MultipleSelectBox = ({
  form,
  name,
  field,
  style,
  value,
  options,
  isMulti = false,
  className,
  onKeyDown,
  placeholder,
  components,
  handleChange,
}: any) => {
  const onChange = (option: any) =>
    form ? form.setFieldValue(name, option) : handleChange(option);
  return (
    <Select
      name={name}
      value={value}
      styles={style}
      options={options}
      isMulti={isMulti}
      onChange={onChange}
      className={className}
      components={components}
      placeholder={placeholder}
      controlShouldRenderValue={false}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
        onKeyDown(e?.target?.value);
      }}
    />
  );
};

export default MultipleSelectBox;
