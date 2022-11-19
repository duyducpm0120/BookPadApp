/* eslint-disable react/react-in-jsx-scope */
import { BlankSpacer, BPText } from "@app/components";
import { appStyle, COLORS, FONT_SIZE, SPACE } from "@app/styles";
import { ICONS, strings } from "@core";
import React from "react";
import { ScrollView, View } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useViewModel } from "./HomeScreen.ViewModel";
import type { HomeScreenProps } from "./types";

export const HomeScreen = (props: HomeScreenProps) => {
  const { selectors } = useViewModel({});
  const { USER_INFO, BOOKS } = selectors;
  return (
    <SafeAreaView style={[appStyle.container, {}]}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <View
          style={[
            appStyle.rowFullWidthSpaceBetweenContainer,
            // { backgroundColor: "red" },
          ]}
        >
          <View style={[appStyle.rowLeftContainer]}>
            <Avatar.Image
              source={{ uri: USER_INFO.ProfilePicUrl }}
              size={SPACE.spacing40}
              style={{ backgroundColor: COLORS.white }}
            />
            <BlankSpacer width={SPACE.spacing12} />
            <BPText
              fontSize={FONT_SIZE.fontSize14}
              fontWeight="600"
            >{`${strings.hello}, ${USER_INFO.NickName}`}</BPText>
          </View>
          <IconButton
            icon={{ uri: ICONS.search }}
            size={SPACE.spacing24}
            iconColor={COLORS.black}
            style={{ margin: 0 }}
            onPress={() => {
              console.log("search");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
