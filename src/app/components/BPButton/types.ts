import type { TextStyle, ViewStyle } from "react-native";
import type { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export interface BPButtonProps {
  // ...
  type: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  icon?: IconSource;
  title: string;
  uppercase?: boolean;
  color?: string;
  textColor?: string;
  onPress: () => void;
  style?: ViewStyle;
  width?: number | string;
  height?: number | string;
  labelStyle?: TextStyle;
}
