/* eslint-disable react-native/no-inline-styles */
import { BaseScreen, BlankSpacer, BPText, BPTextInput } from "@app/components";
import { appStyle, COLORS, FONT_SIZE, SPACE } from "@app/styles";
import { Gender, strings } from "@core";
import { LOCAL_ICONS } from "@core/assets/images/local_icon";
import React, { useState } from "react";
import { Image, ScrollView, useWindowDimensions, View } from "react-native";
import { Avatar } from "react-native-paper";
import CheckBox from "@react-native-community/checkbox";
import { useViewModel } from "./ProfileScreen.ViewModel";

const IMAGE_HEIGHT = 180;
export const ProfileScreen: React.FC<any> = () => {
  const { selectors } = useViewModel();
  const { width } = useWindowDimensions();
  const { USER_INFO } = selectors;
  const [nickname, setNickname] = useState(USER_INFO.NickName);
  const [gender, setGender] = useState(USER_INFO.Gender);
  const [email, setEmail] = useState(USER_INFO.Email);
  const [phone, setPhone] = useState(USER_INFO.Phone);

  const renderImageAndName = () => {
    return (
      <>
        <Image
          source={{ uri: USER_INFO.ProfilePicUrl }}
          style={{
            width,
            height: IMAGE_HEIGHT,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            width,
            height: IMAGE_HEIGHT,
            position: "absolute",
            backgroundColor: COLORS.black,
            opacity: 0.6,
          }}
        />
        <View
          style={[
            appStyle.columnCenterContainer,
            {
              position: "absolute",
              justifyContent: "flex-end",
              alignItems: "center",
              width,
              height: IMAGE_HEIGHT,
              paddingBottom: SPACE.spacing24,
            },
          ]}
        >
          <Avatar.Image
            source={{ uri: USER_INFO.ProfilePicUrl }}
            style={{
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.transparent,
            }}
          />
          <BPText
            fontSize={FONT_SIZE.fontSize16}
            color={COLORS.white}
            // fontWeight="bold"
          >
            {USER_INFO.NickName}
          </BPText>
        </View>
      </>
    );
  };

  const renderInfo = () => {
    return (
      <View style={appStyle.containerPadding16}>
        <BlankSpacer height={SPACE.spacing16} />
        <BPText fontSize={FONT_SIZE.fontSize14} fontWeight="bold">
          {strings.nick_name}
        </BPText>
        <BPTextInput
          useShadow
          type="outlined"
          label=""
          autoFocus
          value={nickname}
          onChangeText={(text) => {}}
        />
        <BlankSpacer height={SPACE.spacing16} />
        <BPText fontSize={FONT_SIZE.fontSize14} fontWeight="bold">
          {strings.email}
        </BPText>
        <BPTextInput
          useShadow
          type="outlined"
          label=""
          value={email}
          onChangeText={(text) => {}}
          editable={false}
        />
        <BlankSpacer height={SPACE.spacing16} />
        <BPText fontSize={FONT_SIZE.fontSize14} fontWeight="bold">
          {strings.gender}
        </BPText>
        <BlankSpacer height={SPACE.spacing8} />
        <View style={appStyle.rowLeftContainer}>
          <CheckBox
            disabled={false}
            value={gender === Gender.MALE}
            onValueChange={(newValue) => {
              setGender(Gender.MALE);
            }}
            // tintColors={{ true: COLORS.primary.main, false: COLORS.primary.main }}
            // tintColor={COLORS.primary.main}
            onCheckColor={COLORS.primary.main}
            onTintColor={COLORS.primary.main}
            style={{ width: 20, height: 20 }}
          />
          <BlankSpacer width={SPACE.spacing8} />
          <BPText fontSize={FONT_SIZE.fontSize14}>{strings.male}</BPText>
          <BlankSpacer width={SPACE.spacing24} />
          <CheckBox
            disabled={false}
            value={gender === Gender.FEMALE}
            onValueChange={(newValue) => {
              setGender(Gender.FEMALE);
            }}
            // tintColors={{ true: COLORS.primary.main, false: COLORS.primary.main }}
            // tintColor={COLORS.primary.main}
            onCheckColor={COLORS.primary.main}
            onTintColor={COLORS.primary.main}
            style={{ width: 20, height: 20 }}
          />
          <BlankSpacer width={SPACE.spacing8} />
          <BPText fontSize={FONT_SIZE.fontSize14}>{strings.female}</BPText>
        </View>

        <BlankSpacer height={SPACE.spacing16} />
        <BPText fontSize={FONT_SIZE.fontSize14} fontWeight="bold">
          {strings.Phone}
        </BPText>
        <BPTextInput
          useShadow
          type="outlined"
          label=""
          value={phone}
          onChangeText={(text) => {}}
          keyboardType="numeric"
        />
      </View>
    );
  };
  return (
    <BaseScreen
      tittle=""
      headerFloating
      headerType="transparent"
      headerLeftParams={{
        icon: LOCAL_ICONS.leftArrowIcon,
        onPress: () => {},
        iconColor: COLORS.white,
      }}
      headerRightParams={{
        icon: LOCAL_ICONS.checkIcon,
        onPress: () => {},
        iconColor: COLORS.white,
      }}
    >
      <ScrollView contentContainerStyle={[appStyle.container, {}]}>
        {renderImageAndName()}
        {renderInfo()}
      </ScrollView>
    </BaseScreen>
  );
};
