import { BaseScreen, BPText } from "@app/components";
import { appStyle } from "@app/styles";
import React from "react";
import { ScrollView } from "react-native";
import { useViewModel } from "./ReviewScreen.viewModel";
import type { ReviewScreenProps } from "./type";

export const ReviewScreen: React.FC<any> = (props: ReviewScreenProps) => {
  const { navigation, route } = props;
  const { bookData } = route.params;
  const { reviews, setReviews } = useViewModel({ bookData });
  return (
    <BaseScreen tittle="Review">
      <ScrollView contentContainerStyle={appStyle.containerPadding16}>
        <BPText>asdasd</BPText>
      </ScrollView>
    </BaseScreen>
  );
};
