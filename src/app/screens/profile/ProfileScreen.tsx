import { BaseScreen, BPText } from "@app/components";
import { appStyle } from "@app/styles";
import React from "react";
import { ScrollView } from "react-native";

export const ProfileScreen: React.FC<any> = () => {
  return (
    <BaseScreen tittle="" headerFloating headerType="transparent">
      <ScrollView contentContainerStyle={[appStyle.containerPadding16, {}]}>
        <BPText>asdasd</BPText>
      </ScrollView>
    </BaseScreen>
  );
};
