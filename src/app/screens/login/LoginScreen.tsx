import { BPButton } from "@app/components";
import { appStyle, FONT_SIZE } from "@app/styles";
import { strings } from "@core/assets";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";

export const LoginScreen: React.FC<any> = (props: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View
      style={[
        appStyle.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <BPButton
        type="text"
        title={strings.go_back}
        onPress={() => {
          navigation.goBack();
        }}
        width={180}
        labelStyle={{
          fontSize: FONT_SIZE.fontSize16,
        }}
        uppercase
      />
    </View>
  );
};
