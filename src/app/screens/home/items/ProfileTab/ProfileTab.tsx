/* eslint-disable react-native/no-inline-styles */
import { BlankSpacer, BPText } from "@app/components";
import { appStyle, SPACE, COLORS, FONT_SIZE } from "@app/styles";
import { strings } from "@core";
import { LOCAL_ICONS } from "@core/assets/images/local_icon";
import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { Avatar } from "react-native-paper";
import { useViewModel } from "./ProfileTab.ViewModel";
import type { ProfileTabRenderDataType } from "./types";

export const ProfileTab = () => {
  const { selectors } = useViewModel();
  const { USER_INFO, BOOKS } = selectors;
  const renderData: ProfileTabRenderDataType[] = [
    {
      title: strings.update_profile,
      icon: LOCAL_ICONS.userProfile,
      onPress: () => {},
    },
    {
      title: strings.settings,
      icon: LOCAL_ICONS.setting,
      onPress: () => {},
    },
    {
      title: strings.change_password,
      icon: LOCAL_ICONS.changePassword,
      onPress: () => {},
    },
    {
      title: strings.logout,
      icon: LOCAL_ICONS.exit,
      onPress: () => {},
    },
  ];
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
            size={70}
            style={{ backgroundColor: COLORS.white }}
          />
          <BlankSpacer width={SPACE.spacing12} />
          <View style={appStyle.columnLeftContainer}>
            <BPText
              fontSize={FONT_SIZE.fontSize16}
              fontWeight="600"
            >{`${USER_INFO.NickName}`}</BPText>
            <BPText
              fontSize={FONT_SIZE.fontSize12}
            >{`${USER_INFO.Email}`}</BPText>
          </View>
        </View>
      </View>
    );
  };
  const renderContent = () => {
    return (
      <FlatList
        scrollEnabled={false}
        data={renderData}
        keyExtractor={(item, index) => {
          return `${item.title} ${index}`;
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={[
                appStyle.columnLeftContainer,
                { marginVertical: SPACE.spacing12 },
              ]}
            >
              <View style={appStyle.rowFullWidthSpaceBetweenContainer}>
                <View style={appStyle.rowLeftContainer}>
                  <FastImage
                    source={item.icon}
                    style={{
                      height: 28,
                      width: 28,
                    }}
                    tintColor={COLORS.black}
                  />
                  <BlankSpacer width={SPACE.spacing16} />
                  <BPText fontSize={FONT_SIZE.fontSize16}>{item.title}</BPText>
                </View>
                <FastImage
                  source={LOCAL_ICONS.rightArrowIcon}
                  style={{
                    height: 24,
                    width: 24,
                    right: 0,
                  }}
                  tintColor={COLORS.black}
                />
              </View>
              <BlankSpacer height={SPACE.spacing8} />
              <BlankSpacer height={1} color={COLORS.secondary.light} />
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {renderUserAndSearchBar()}
      <BlankSpacer height={SPACE.spacing16} />
      <BlankSpacer height={5} color={COLORS.secondary.light} />
      {renderContent()}
    </View>
  );
};
