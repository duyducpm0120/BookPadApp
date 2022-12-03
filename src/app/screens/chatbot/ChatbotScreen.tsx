/* eslint-disable react-native/no-inline-styles */
import { BaseScreen } from "@app/components";
import { appStyle } from "@app/styles";
import { strings } from "@core";
import React from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

export const ChatbotScreen: React.FC<any> = (props: any) => {
  const { navigation, route } = props;
  const messages = [
    {
      _id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
    {
      _id: 2,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "React Native 2",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
    {
      _id: 3,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "React Native 2",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
  ];

  return (
    <BaseScreen
      tittle={strings.bookpad_chatbot}
      // primaryButtonParams={undefined}
    >
      <View style={appStyle.containerPadding16}>
        {/* <BPText>asdasd</BPText> */}
        <GiftedChat
          messages={messages}
          user={{
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          }}
        />
      </View>
    </BaseScreen>
  );
};
