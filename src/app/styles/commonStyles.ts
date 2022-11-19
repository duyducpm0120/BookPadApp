import { StyleSheet } from "react-native";
import { COLORS } from "./colors";
import { SPACE } from "./space";

export const appStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.default,
    paddingHorizontal: SPACE.spacing16,
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
  rowFullWidthCenterContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowFullWidthRightContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  rowFullWidthLeftContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rowFullWidthSpaceBetweenContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowCenterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  rowLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rowSpaceBetweenContainer: {
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
