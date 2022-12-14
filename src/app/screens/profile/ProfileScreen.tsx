/* eslint-disable react-native/no-inline-styles */
import { BaseScreen, BlankSpacer, BPText, BPTextInput } from "@app/components";
import { appStyle, COLORS, FONT_SIZE, SPACE } from "@app/styles";
import { Gender, strings } from "@core";
import { LOCAL_ICONS } from "@core/assets/icons/local_icon";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import CheckBox from "@react-native-community/checkbox";
import { launchImageLibrary } from "react-native-image-picker";
import { useViewModel } from "./ProfileScreen.ViewModel";

const IMAGE_HEIGHT = 180;
export const ProfileScreen: React.FC<any> = () => {
  const { selectors, handlers } = useViewModel();
  const { updateUserProfile } = handlers;
  const { width } = useWindowDimensions();
  const { USER_INFO } = selectors;
  const [nickname, setNickname] = useState(USER_INFO.NickName);
  const [gender, setGender] = useState(USER_INFO.Gender);
  const [email, setEmail] = useState(USER_INFO.Email);
  const [phone, setPhone] = useState(USER_INFO.Phone);

  const openImageLibrary = async () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        // maxWidth: RESPONSIVE.pixelSizeHorizontal(100),
        // maxHeight: RESPONSIVE.pixelSizeHorizontal(100),
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User canceled image picker");
        } else if (response.errorMessage) {
          console.log("Image picker error", response.errorMessage);
        } else if (response.errorCode) {
          console.log("Error code ", response.errorCode);
        } else {
          updateUserProfile(response);
        }
      }
    );
  };

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
          <BlankSpacer height={SPACE.spacing4} />
          <TouchableOpacity>
            <BPText
              fontSize={FONT_SIZE.fontSize16}
              color={COLORS.white}
              fontWeight="bold"
              style={{
                textDecorationLine: "underline",
              }}
              onPress={openImageLibrary}
            >
              {`${strings.upload_image}`}
            </BPText>
          </TouchableOpacity>
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
          onChangeText={(text) => {
            setNickname(text);
          }}
          disabled
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
          disabled
        />
        <BlankSpacer height={SPACE.spacing16} />
        <BPText fontSize={FONT_SIZE.fontSize14} fontWeight="bold">
          {strings.gender}
        </BPText>
        <BlankSpacer height={SPACE.spacing8} />
        <View style={appStyle.rowLeftContainer}>
          <CheckBox
            disabled
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
            disabled
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
          onChangeText={(text) => {
            setPhone(text);
          }}
          keyboardType="numeric"
          disabled
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
