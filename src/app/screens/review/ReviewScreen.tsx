import {
  BaseScreen,
  BlankSpacer,
  Book,
  EmptyScreen,
  Review,
} from "@app/components";
import { appStyle, SPACE } from "@app/styles";
import { strings, useGlobalNavigation } from "@core";
import React from "react";
import { FlatList } from "react-native";
import { useViewModel } from "./ReviewScreen.viewModel";
import type { ReviewScreenProps } from "./type";

export const ReviewScreen: React.FC<any> = (props: ReviewScreenProps) => {
  const { navigation, route } = props;
  const { bookData } = route.params;
  const { reviews, setReviews, loadMoreReview, USER_INFO, onPressDelete } =
    useViewModel({
      bookData,
    });
  const { navigateToWriteReviewScreen } = useGlobalNavigation();

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
    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => {
          return (
            <Review
              data={item}
              showDelete={item.Owner.NickName === USER_INFO.NickName}
              onPressDelete={() => {
                onPressDelete(item.BookReviewId);
              }}
            />
          );
        }}
        keyExtractor={(item) => item.BookReviewId + item.Owner.NickName}
        onEndReached={() => {
          loadMoreReview();
        }}
        ListHeaderComponent={listHeader()}
        contentContainerStyle={appStyle.containerPadding16}
        ListEmptyComponent={<EmptyScreen content={strings.no_reviews} />}
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
          navigateToWriteReviewScreen({
            bookData,
          });
        },
      }}
    >
      {renderReviewList()}
    </BaseScreen>
  );
};
