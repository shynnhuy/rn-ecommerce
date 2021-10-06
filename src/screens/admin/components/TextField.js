import { FormControl, Input, TextArea } from "native-base";
import React from "react";
import { Controller } from "react-hook-form";
import { View, Text } from "react-native";

export const TextField = ({
  control,
  name,
  label,
  placeholder,
  required = false,
  keyboardType = "default",
  textArea = false,
}) => {
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        control={control}
        rules={{
          required: required,
        }}
        render={({ field: { onChange, onBlur, value } }) =>
          !textArea ? (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              keyboardType={keyboardType}
            />
          ) : (
            <TextArea
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              keyboardType={keyboardType}
            />
          )
        }
        name={name}
        defaultValue=""
      />
    </FormControl>
  );
};
