import { BlankSpacer, BPButton, BPText, BPTextInput } from "@app/components";
import { appStyle, COLORS, FONT_SIZE, SPACE } from "@app/styles";
import { IMAGES, strings } from "@core/assets";
import React, { useMemo } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useViewModel } from "./LoginScreen.ViewModel";

export const LoginScreen: React.FC<any> = (props: any) => {
  const { onLogin, email, setEmail, password, setPassword } = useViewModel();
  const passwordIcon = useMemo(() => {
    return (
      <TouchableOpacity>
        <Image
          style={{ width: 24, height: 24, backgroundColor: "red" }}
          source={IMAGES.show}
        />
      </TouchableOpacity>
    );
  }, []);
  return (
    <View
      style={[
        appStyle.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Image
        source={IMAGES.appName}
        style={{ height: 60, width: "100%" }}
        resizeMode="contain"
      />
      <BlankSpacer height={SPACE.spacing12} />
      <BPTextInput
        type="outlined"
        label={strings.email}
        autoFocus
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <BlankSpacer height={SPACE.spacing12} />
      <BPTextInput
        type="outlined"
        label={strings.password}
        passwordMode
        // right={passwordIcon}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <BlankSpacer height={SPACE.spacing16} />
      <TouchableOpacity
        style={appStyle.rowFullWidthRightContainer}
        onPress={() => {}}
      >
        <BPText color={COLORS.primary.main} fontSize={FONT_SIZE.fontSize14}>
          {`${strings.forgot_password}?`}
        </BPText>
      </TouchableOpacity>
      <BlankSpacer height={SPACE.spacing16} />
      <BPButton
        type="text"
        title={strings.login}
        onPress={() => {
          // navigation.goBack();
          onLogin();
        }}
        width={180}
        labelStyle={{
          fontSize: FONT_SIZE.fontSize16,
        }}
        uppercase
      />
      <BlankSpacer height={SPACE.spacing16} />
      <View style={appStyle.rowFullWidthCenterContainer}>
        <BPText
          color={COLORS.black}
          fontSize={FONT_SIZE.fontSize14}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <BPText color={COLORS.black} fontSize={FONT_SIZE.fontSize14}>
            {`${strings.dont_have_account} `}
          </BPText>
          <TouchableOpacity>
            <BPText color={COLORS.primary.main} fontSize={FONT_SIZE.fontSize14}>
              {strings.sign_up}
            </BPText>
          </TouchableOpacity>
          {/* <BPText color={COLORS.primary.main} fontSize={FONT_SIZE.fontSize14}>
            {strings.sign_up}
          </BPText> */}
        </BPText>
      </View>
    </View>
  );
};
