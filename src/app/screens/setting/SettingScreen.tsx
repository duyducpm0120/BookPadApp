/* eslint-disable react-native/no-inline-styles */
import { BaseScreen, BlankSpacer, BPText } from "@app/components";
import { appStyle, COLORS, FONT_FAMILY, FONT_SIZE, SPACE } from "@app/styles";
import { strings, ThemeList } from "@core";
import { LOCAL_ICONS } from "@core/assets/images/local_icon";
import React, { useState } from "react";
import { useWindowDimensions, View } from "react-native";

import { LanguageList } from "@core/const/LanguageList";
import DropDownPicker from "react-native-dropdown-picker";
import { useViewModel } from "./SettingScreen.ViewModel";

const IMAGE_HEIGHT = 180;
export const SettingScreen: React.FC<any> = () => {
  const { selectors } = useViewModel();
  const { width } = useWindowDimensions();

  const [language, setLanguage] = useState("English");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [theme, setTheme] = useState<string>("Light");
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const renderContent = () => {
    return (
      <View style={appStyle.containerPadding16}>
        <BlankSpacer height={SPACE.spacing16} />
        <BPText fontSize={FONT_SIZE.fontSize14} fontWeight="bold">
          {strings.language}
        </BPText>
        <BlankSpacer height={SPACE.spacing12} />
        <View
          style={[
            appStyle.rowFullWidthLeftContainer,
            {
              zIndex: 1000,
            },
          ]}
        >
          <DropDownPicker
            open={showLanguageDropdown}
            setOpen={() => {
              setShowLanguageDropdown(!showLanguageDropdown);
            }}
            value={language}
            setValue={setLanguage}
            items={LanguageList}
            // setItems={setLanguageItems}
            textStyle={{
              fontSize: FONT_SIZE.fontSize14,
              fontFamily: FONT_FAMILY.Montserrat,
            }}
            style={{
              borderColor: COLORS.primary.main,
            }}
            dropDownContainerStyle={{
              borderColor: COLORS.primary.main,
            }}
            placeholder={language}
          />
        </View>
        <BlankSpacer height={SPACE.spacing16} />
        <BPText fontSize={FONT_SIZE.fontSize14} fontWeight="bold">
          {strings.theme}
        </BPText>
        <BlankSpacer height={SPACE.spacing12} />
        <View
          style={[
            appStyle.rowFullWidthLeftContainer,
            {
              zIndex: -1,
            },
          ]}
        >
          <DropDownPicker
            open={showThemeDropdown}
            setOpen={() => {
              setShowThemeDropdown(!showThemeDropdown);
            }}
            value={theme}
            setValue={setTheme}
            items={ThemeList}
            // setItems={setLanguageItems}
            textStyle={{
              fontSize: FONT_SIZE.fontSize14,
              fontFamily: FONT_FAMILY.Montserrat,
            }}
            style={{
              borderColor: COLORS.primary.main,
              zIndex: -1,
            }}
            dropDownContainerStyle={{
              borderColor: COLORS.primary.main,
              zIndex: -1,
            }}
            placeholder={theme}
          />
        </View>
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
        onPress: () => {},
        iconColor: COLORS.black,
      }}
    >
      <View style={[appStyle.container, {}]}>{renderContent()}</View>
    </BaseScreen>
  );
};
