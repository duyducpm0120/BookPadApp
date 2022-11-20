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
  const { tittle, children = null } = props;
  console.log("props asdasd", props);
  return (
    <SafeAreaView style={appStyle.containerPadding16}>
      <ScrollView>
        <View style={appStyle.rowCenterContainer}>
          <IconButton
            icon={LOCAL_ICONS.leftArrowIcon}
            size={SPACE.spacing24}
            iconColor={COLORS.black}
            style={{ margin: 0 }}
            onPress={() => {
              goBack();
            }}
          />
          <BPText fontSize={FONT_SIZE.fontSize16} fontWeight="600">
            {tittle}
          </BPText>
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
