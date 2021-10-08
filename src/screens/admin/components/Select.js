import { CheckIcon, FormControl, Select } from "native-base";
import React from "react";
import { Controller } from "react-hook-form";

export const SelectField = ({
  name,
  placeholder,
  label,
  control,
  items = [],
}) => {
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            onValueChange={onChange}
            selectedValue={value}
            minWidth="200"
            placeholder={placeholder}
            _selectedItem={{
              bg: "green.600",
              endIcon: <CheckIcon size={5} />,
            }}
            mt="1"
          >
            {items.map((item) => (
              <Select.Item key={item._id} label={item.name} value={item._id} />
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};
