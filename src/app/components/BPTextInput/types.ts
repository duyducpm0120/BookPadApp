import type { TextStyle } from "react-native";
import type { TextInputProps } from "react-native-paper";

type TextInputPropsWithoutTheme = Omit<TextInputProps, "theme">;

export type BPTextInputProps = TextInputPropsWithoutTheme & {
  label: string;
  style?: TextStyle;
  type?: "flat" | "outlined";
  passwordMode?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  useShadow?: boolean;
  activeOutlineColor?: string;
};
