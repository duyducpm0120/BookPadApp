/* eslint-disable react-native/no-inline-styles */
import {
  BaseScreen,
  BlankSpacer,
  Book,
  BPText,
  BPTextInput,
} from "@app/components";
import { appStyle, COLORS, FONT_SIZE, SPACE } from "@app/styles";
import { strings } from "@core";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { LOCAL_ICONS } from "@core/assets/icons/local_icon";
import { useViewModel } from "./WriteReviewScreen.viewModel";
import type { WriteReviewScreenProps } from "./type";

export const WriteReviewScreen: React.FC<any> = (
  props: WriteReviewScreenProps
) => {
  const { navigation, route } = props;
  const { bookData } = route.params;
  const {
    reviews,
    currentStar,
    setCurrentStar,
    createReview,
    comment,
    setComment,
  } = useViewModel({
    bookData,
  });

  const renderReviewStars = () => {
    return [1, 2, 3, 4, 5].map((item) => {
      return (
        <TouchableOpacity
          key={item.toString()}
          style={{
            marginHorizontal: SPACE.spacing8,
          }}
          onPress={() => {
            setCurrentStar(item);
          }}
        >
          <FastImage
            source={LOCAL_ICONS.emptyStar}
            style={{
              width: 28,
              height: 28,
            }}
            tintColor={
              item <= currentStar ? COLORS.primary.main : COLORS.secondary.light
            }
          />
        </TouchableOpacity>
      );
    });
  };

  return (
    <BaseScreen
      tittle={strings.write_review}
      primaryButtonParams={{
        title: strings.send_review,
        onPress: async () => {
          //   getBookLinkAndNavigate();
          createReview();
        },
      }}
    >
      <View style={appStyle.containerPadding16}>
        <BlankSpacer height={SPACE.spacing16} />
        <Book
          data={bookData}
          onPress={() => {
            // navigateToBookDetailScreen({ bookData: item });
          }}
          isHorizontal
        />
        <BlankSpacer height={SPACE.spacing16} />
        <View style={appStyle.columnCenterContainer}>
          <BPText textAlign="center" fontSize={FONT_SIZE.fontSize16}>
            {strings.how_would_you_rate}
          </BPText>
          <BlankSpacer height={SPACE.spacing12} />
          <View style={appStyle.rowFullWidthCenterContainer}>
            {renderReviewStars()}
          </View>
        </View>
        <BlankSpacer height={SPACE.spacing16} />
        <BPTextInput
          multiline
          numberOfLines={5}
          label={`${strings.write_your_review} here`}
          style={{
            height: 150,
          }}
          autoFocus
          value={comment}
          onChangeText={(text) => {
            setComment(text);
          }}
        />
      </View>
    </BaseScreen>
  );
};
