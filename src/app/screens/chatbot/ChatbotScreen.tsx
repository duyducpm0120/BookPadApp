/* eslint-disable no-underscore-dangle */
/* eslint-disable react-native/no-inline-styles */
import { BaseScreen, BlankSpacer, Book } from "@app/components";
import { appStyle, COLORS, SPACE } from "@app/styles";
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
import { Send, Bubble, GiftedChat } from "react-native-gifted-chat";
import { useViewModel } from "./ChatbotScreen.ViewModel";
import { BOT } from "./const";
import type { IChatbotMessage } from "./types";

export const ChatbotScreen: React.FC<any> = (props: any) => {
  const { navigation, route } = props;
  const { USER, onSend, messages } = useViewModel({});

  const { navigateToBookDetailScreen } = useGlobalNavigation();

  const renderRecommendBooks = (params: {
    bubbleProps: BubbleProps<IChatbotMessage>;
    currentMessage: IChatbotMessage;
  }) => {
    const { bubbleProps, currentMessage } = params;
    const bookList: BookModel[] = safeGetArray(currentMessage, "bookList", []);
    if (bookList.length === 0) {
      if (currentMessage.type === BotResponseType.RECOMMEND_BOOK_MORE) {
        return (
          <Bubble
            {...bubbleProps}
            currentMessage={{
              ...currentMessage,
              text: strings.that_is_all,
            }}
          />
        );
      }
      return (
        <Bubble
          {...bubbleProps}
          currentMessage={{
            ...currentMessage,
            text: strings.i_cant_find_suitable_books_for_you,
          }}
        />
      );
    }
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
  };

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
      if (
        currentMessage.type === BotResponseType.RECOMMEND_BOOK ||
        currentMessage.type === BotResponseType.RECOMMEND_BOOK_MORE
      ) {
        return renderRecommendBooks({ bubbleProps, currentMessage });
      }
    }
    return (
      <Bubble
        {...bubbleProps}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.primary.main,
          },
        }}
      />
    );
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
          quickReplyTextStyle={{
            color: COLORS.primary.main,
          }}
          renderSend={(sendProps) => {
            return (
              <Send
                {...sendProps}
                textStyle={{ color: COLORS.primary.main }}
                label={strings.send}
              />
            );
          }}
        />
      </View>
    </BaseScreen>
  );
};
