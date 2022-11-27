import { BaseScreen, BPText } from "@app/components";
import { appStyle, COLORS } from "@app/styles";
import { LOCAL_ICONS } from "@core/assets/images/local_icon";
import React from "react";
import { ScrollView } from "react-native";

export const ProfileScreen: React.FC<any> = () => {
  return (
    <BaseScreen
      tittle=""
      headerFloating
      headerType="transparent"
      headerLeftParams={{
        icon: LOCAL_ICONS.leftArrowIcon,
        onPress: () => {},
        iconColor: COLORS.black,
      }}
    >
      <ScrollView contentContainerStyle={[appStyle.containerPadding16, {}]}>
        <BPText>asdasd</BPText>
      </ScrollView>
    </BaseScreen>
  );
};
