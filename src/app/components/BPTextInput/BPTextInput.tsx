/* eslint-disable react-native/no-inline-styles */
import { COLORS } from "@app/styles";
import React from "react";
import { TextInput } from "react-native-paper";
import type { BPTextInputProps } from "./types";

export const BPTextInput: React.FC<BPTextInputProps> = (
  props: BPTextInputProps
) => {
  const {
    style = undefined,
    value = undefined,
    type = "outlined",
    label,
    onChangeText = () => {},
    passwordMode,
    ...rest
  } = props;
  return (
    <TextInput
      {...rest}
      style={{
        width: "100%",
        height: 50,
        ...style,
      }}
      mode={type}
      label={label}
      //   outlineColor={COLORS.primary.main}
      activeOutlineColor={COLORS.primary.main}
      clearButtonMode="while-editing"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={passwordMode}
    />
  );
};
