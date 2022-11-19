import type { TextProps } from "react-native";

export interface BPTextProps extends TextProps {
  fontSize?: number;
  textAlign?: "left" | "center" | "right";
  color?: string;
  fontWeight?:
    | "bold"
    | "normal"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | undefined;
}
