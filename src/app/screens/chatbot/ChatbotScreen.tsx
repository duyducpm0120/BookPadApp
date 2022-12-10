/* eslint-disable react-native/no-inline-styles */
import { BaseScreen } from "@app/components";
import { appStyle } from "@app/styles";
import { strings } from "@core";
import React from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useViewModel } from "./ChatbotScreen.ViewModel";

export const ChatbotScreen: React.FC<any> = (props: any) => {
  const { navigation, route } = props;
  const { USER, onSend, messages } = useViewModel({});

  return (
    <BaseScreen
      tittle={strings.bookpad_chatbot}
      // primaryButtonParams={undefined}
    >
      <View style={appStyle.containerPadding16}>
        {/* <BPText>asdasd</BPText> */}
        <GiftedChat messages={messages} user={USER} onSend={onSend} />
      </View>
    </BaseScreen>
  );
};
