import { COLORS } from "@app/styles";
import React from "react";
import { View, ActivityIndicator } from "react-native";

export const Loading = (props: { isLoading: boolean }) => {
  const { isLoading } = props;
  if (isLoading)
    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: COLORS.black,
          opacity: 0.6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary.main} />
      </View>
    );
  return <View />;
};
