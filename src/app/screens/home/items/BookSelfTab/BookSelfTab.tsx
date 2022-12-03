import { BlankSpacer, BPText } from "@app/components";
import { appStyle, COLORS, FONT_SIZE, SPACE } from "@app/styles";
import { strings, ICONS } from "@core";
import React from "react";
import { View } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { useViewModel } from "./BookSelfTab.ViewModel";

export const BookSelfTab = () => {
  const { selectors, handlers } = useViewModel();
  const { USER_INFO, BOOKS } = selectors;
  const renderUserAndSearchBar = () => {
    return (
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
    );
  };
  return <View style={appStyle.container}>{renderUserAndSearchBar()}</View>;
};
