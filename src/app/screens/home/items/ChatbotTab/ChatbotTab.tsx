import { BlankSpacer, BPButton, BPText } from "@app/components";
import { appStyle, FONT_SIZE, SPACE, TEXT_COLOR } from "@app/styles";
import { IMAGES } from "@core";
import React from "react";
import { ScrollView } from "react-native";
import FastImage from "react-native-fast-image";
import { useViewModel } from "./ChatbotTab.ViewModel";

export const ChatbotTab = () => {
  const { selectors, handlers } = useViewModel();
  const { USER_INFO, BOOKS } = selectors;

  const bookLibraryChatbotIntroduction =
    "Hi, I am your book library chatbot. I can help you to find your favorite books. You can also ask me to recommend you some books. Let's get started!";

  return (
    <ScrollView
      contentContainerStyle={[
        appStyle.centerContainer,
        {
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        },
      ]}
    >
      <FastImage
        source={IMAGES.chatbot}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <BlankSpacer height={SPACE.spacing32} />
      <BPText
        fontSize={FONT_SIZE.fontSize16}
        color={TEXT_COLOR.light}
        textAlign="center"
      >
        {bookLibraryChatbotIntroduction}
      </BPText>
      <BlankSpacer height={SPACE.spacing32} />
      <BPButton
        type="text"
        title="GET STARTED"
        onPress={() => {
          console.log("get started");
        }}
        width={180}
      />
    </ScrollView>
  );
};
