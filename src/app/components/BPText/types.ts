import type { TextProps } from "react-native";

export interface BPTextProps extends TextProps {
  fontSize?: number;
  textAlign?: "left" | "center" | "right";
  color?: string;
}
