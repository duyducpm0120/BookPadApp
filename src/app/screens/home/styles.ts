import { COLORS, SPACE } from "@app/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bottomTabContainer: {
    backgroundColor: COLORS.white,
    height: 70,
    position: "absolute",
    marginLeft: SPACE.spacing16,
    bottom: SPACE.spacing24,
    borderRadius: 22,
    justifyContent: "space-between",
    paddingHorizontal: SPACE.spacing32,
  },
});
