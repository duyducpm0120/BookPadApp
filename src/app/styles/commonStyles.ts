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
  rowCenterContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowRightContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  rowBetweenContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  columnCenterContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
