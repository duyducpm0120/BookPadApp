/* eslint-disable react-native/no-inline-styles */
import { BaseScreen, BlankSpacer, BPText, BPTextInput } from "@app/components";
import { appStyle, COLORS, FONT_SIZE, SPACE } from "@app/styles";
import { showAlert, strings } from "@core";
import { LOCAL_ICONS } from "@core/assets/icons/local_icon";
import React, { useState } from "react";
import { View } from "react-native";

const IMAGE_HEIGHT = 180;
export const ChangePasswordScreen: React.FC<any> = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      return false;
    }
    return true;
  };

  const standardPassword = () => {
    if (
      newPassword.match(/[a-z]/g) &&
      newPassword.match(/[A-Z]/g) &&
      newPassword.match(/[0-9]/g) &&
      newPassword.match(/[^a-zA-Z\d]/g) &&
      newPassword.length >= 12
    ) {
      return true;
    }
    return false;
  };

  const confirmChangePassword = () => {
    if (newPassword === "" || confirmPassword === "") {
      showAlert({
        title: strings.error,
        message: strings.alert_empty_password,
        primaryButtonParams: {
          label: strings.ok,
          onPress: () => {},
        },
      });
      return;
    }
    if (!validatePassword()) {
      showAlert({
        title: strings.error,
        message: strings.alert_confirm_password,
        primaryButtonParams: {
          label: strings.ok,
          onPress: () => {},
        },
      });
      return;
    }
    if (standardPassword()) {
      // call api change password
    } else {
      showAlert({
        title: strings.error,
        message: strings.password_is_not_standard,
        primaryButtonParams: {
          label: strings.ok,
          onPress: () => {},
        },
      });
    }
  };

  const renderContent = () => {
    return (
      <View style={appStyle.containerPadding16}>
        <BlankSpacer height={SPACE.spacing16} />
        <BPText fontSize={FONT_SIZE.fontSize14} fontWeight="bold">
          {strings.new_password}
        </BPText>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextInput
          label=""
          type="outlined"
          useShadow
          passwordMode
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <BlankSpacer height={SPACE.spacing16} />
        <BPText fontSize={FONT_SIZE.fontSize14} fontWeight="bold">
          {strings.confirm_password}
        </BPText>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextInput
          label=""
          type="outlined"
          useShadow
          passwordMode
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
    );
  };
  return (
    <BaseScreen
      tittle=""
      // headerFloating
      headerType="transparent"
      headerLeftParams={{
        icon: LOCAL_ICONS.leftArrowIcon,
        onPress: () => {},
        iconColor: COLORS.black,
      }}
      headerRightParams={{
        icon: LOCAL_ICONS.checkIcon,
        onPress: () => {
          confirmChangePassword();
        },
        iconColor: COLORS.black,
      }}
    >
      <View style={[appStyle.container, {}]}>{renderContent()}</View>
    </BaseScreen>
  );
};
