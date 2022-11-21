import { appStyle, COLORS, FONT_SIZE, SPACE } from "@app/styles";
import { useGlobalNavigation } from "@core";
import { LOCAL_ICONS } from "@core/assets/images/img";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { IconButton } from "react-native-paper";
import { BPText } from "../BPText";
import type { BaseScreenProps } from "./types";

export const BaseScreen = (props: BaseScreenProps) => {
  const { goBack } = useGlobalNavigation();
  const {
    tittle,
    children = null,
    headerLeftParams = {
      icon: LOCAL_ICONS.leftArrowIcon,
      onPress: goBack,
    },
    headerRightParams = {
      icon: { uri: LOCAL_ICONS.leftArrowIcon },
      onPress: () => {},
    },
  } = props;
  console.log("props asdasd", props);
  return (
    <SafeAreaView style={appStyle.containerPadding16}>
      <View
        style={[
          appStyle.rowSpaceBetweenContainer,
          { paddingHorizontal: SPACE.spacing8 },
        ]}
      >
        <IconButton
          icon={headerLeftParams.icon}
          size={SPACE.spacing24}
          iconColor={COLORS.black}
          style={{ margin: 0, backgroundColor: COLORS.white }}
          onPress={() => {
            goBack();
          }}
        />
        <BPText fontSize={FONT_SIZE.fontSize16} fontWeight="600">
          {tittle}
        </BPText>
        <IconButton
          icon={headerRightParams.icon}
          size={SPACE.spacing24}
          iconColor={COLORS.black}
          style={{ margin: 0, backgroundColor: COLORS.white }}
          onPress={headerRightParams.onPress}
        />
      </View>
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};
