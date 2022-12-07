import {
  BaseScreen,
  BlankSpacer,
  Book,
  EmptyScreen,
  Review,
} from "@app/components";
import { appStyle, SPACE } from "@app/styles";
import { strings } from "@core";
import React from "react";
import { FlatList } from "react-native";
import { useViewModel } from "./ReviewScreen.viewModel";
import type { ReviewScreenProps } from "./type";

export const ReviewScreen: React.FC<any> = (props: ReviewScreenProps) => {
  const { navigation, route } = props;
  const { bookData } = route.params;
  const { reviews, setReviews, loadMoreReview } = useViewModel({ bookData });

  const listHeader = () => {
    return (
      <>
        <BlankSpacer height={SPACE.spacing16} />
        <Book
          data={bookData}
          onPress={() => {
            // navigateToBookDetailScreen({ bookData: item });
          }}
          isHorizontal
        />
      </>
    );
  };

  const renderReviewList = () => {
    if (reviews.length === 0) {
      return <EmptyScreen content={strings.no_reviews} />;
    }
    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => {
          return <Review data={item} />;
        }}
        keyExtractor={(item) => item.ReviewId}
        onEndReached={() => {
          loadMoreReview();
        }}
        ListHeaderComponent={listHeader()}
        contentContainerStyle={appStyle.containerPadding16}
      />
    );
  };
  return (
    <BaseScreen
      tittle={strings.reviews}
      primaryButtonParams={{
        title: strings.create_review,
        onPress: async () => {
          //   getBookLinkAndNavigate();
        },
      }}
    >
      {renderReviewList()}
    </BaseScreen>
  );
};
