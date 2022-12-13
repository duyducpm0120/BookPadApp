/* eslint-disable no-underscore-dangle */
/* eslint-disable react-native/no-inline-styles */
import { BaseScreen, BlankSpacer, Book } from "@app/components";
import { appStyle, SPACE } from "@app/styles";
import type { BookModel } from "@core";
import {
  useGlobalNavigation,
  BotResponseType,
  safeGet,
  safeGetArray,
  strings,
} from "@core";
import React from "react";
import { FlatList, View } from "react-native";
import type { BubbleProps } from "react-native-gifted-chat";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { useViewModel } from "./ChatbotScreen.ViewModel";
import { BOT } from "./const";
import type { IChatbotMessage } from "./types";

export const ChatbotScreen: React.FC<any> = (props: any) => {
  const { navigation, route } = props;
  const { USER, onSend, messages } = useViewModel({});

  const { navigateToBookDetailScreen } = useGlobalNavigation();

  const renderBubble = (bubbleProps: BubbleProps<IChatbotMessage>) => {
    const currentMessage: IChatbotMessage = safeGet(
      bubbleProps,
      "currentMessage",
      {
        _id: 0,
        text: "",
        createdAt: new Date(),
        user: {},
        type: BotResponseType.NONE,
        data: [],
      }
    );
    if (currentMessage.user._id === BOT._id) {
      if (currentMessage.type === BotResponseType.TEXT)
        return <Bubble {...bubbleProps} />;
      if (currentMessage.type === BotResponseType.RECOMMEND_BOOK) {
        const bookList: BookModel[] = safeGetArray(
          currentMessage,
          "bookList",
          []
        );
        return (
          <FlatList
            data={bookList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <>
                  <Book
                    key={-index}
                    data={item}
                    onPress={() => {
                      navigateToBookDetailScreen({
                        bookData: item,
                      });
                    }}
                  />
                  {index < bookList.length - 1 ? (
                    <BlankSpacer height={SPACE.spacing16} />
                  ) : null}
                </>
              );
            }}
            contentContainerStyle={[
              appStyle.columnLeftContainer,
              {
                marginTop: SPACE.spacing12,
              },
            ]}
          />
        );
      }
    }
    return <Bubble {...bubbleProps} />;
  };

  return (
    <BaseScreen
      tittle={strings.bookpad_chatbot}
      // primaryButtonParams={undefined}
    >
      <View style={appStyle.containerPadding16}>
        {/* <BPText>asdasd</BPText> */}
        <GiftedChat
          messages={messages}
          user={USER}
          onSend={onSend}
          renderBubble={renderBubble}
        />
      </View>
    </BaseScreen>
  );
};
