/* eslint-disable react-native/no-inline-styles */
import { appStyle, COLORS } from "@app/styles";
import React, { forwardRef } from "react";
import { TextInput } from "react-native-paper";
import type { BPTextInputProps } from "./types";

export const BPTextInput = forwardRef(
  (
    props: BPTextInputProps,
    // ref:
    //   | ((instance: BPTextInputHandles | null) => void)
    //   | React.RefObject<BPTextInputHandles | null>
    //   | null
    //   | undefined
    ref: any
  ) => {
    const {
      style = undefined,
      value = undefined,
      type = "outlined",
      label,
      onChangeText = () => {},
      passwordMode,
      useShadow = false,
      ...rest
    } = props;

    const shadowStype = useShadow
      ? {
          ...appStyle.shadowContainer,
        }
      : {};

    return (
      <TextInput
        ref={ref}
        {...rest}
        style={{
          width: "100%",
          height: 50,
          ...style,
          ...shadowStype,
        }}
        mode={type}
        label={label}
        //   outlineColor={COLORS.primary.main}
        activeOutlineColor={COLORS.primary.main}
        clearButtonMode="while-editing"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={passwordMode}
        outlineColor={COLORS.transparent}
      />
    );
  }
);
