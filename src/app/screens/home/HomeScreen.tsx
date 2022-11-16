/* eslint-disable react/react-in-jsx-scope */
import { COLORS } from "@app/styles";
import React from "react";
import { Text, View } from "react-native";
import type { HomeScreenProps } from "./types";

export const HomeScreen = (props: HomeScreenProps) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background.paper,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Screen</Text>
    </View>
  );
};
