import { StyleSheet } from "react-native";
import { COLORS } from "./colors";
import { SPACE } from "./space";

export const appStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.default,
    padding: SPACE.spacing16,
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});
