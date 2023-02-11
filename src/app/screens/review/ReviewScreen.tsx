/* eslint-disable react-native/no-inline-styles */
import {
  BaseScreen,
  BlankSpacer,
  Book,
  EmptyScreen,
  Review,
  ReviewTag,
} from "@app/components";
import { appStyle, SPACE } from "@app/styles";
import { strings, useGlobalNavigation } from "@core";
import React from "react";
import { FlatList, ScrollView } from "react-native";
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
  const reviewArr = ["All", "1", "2", "3", "4", "5"];
  const [currentReview, setCurrentReview] = React.useState("All");

  const renderReviewFilter = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {reviewArr.map((item, index) => {
          return (
            <>
              <BlankSpacer width={SPACE.spacing4} />
              <ReviewTag
                star={String(item)}
                total={
                  item === "All"
                    ? String(reviews.length)
                    : String(
                        reviews.filter(
                          (i) => i.BookReviewScore === Number(item)
                        ).length
                      )
                }
                onPress={() => {
                  setCurrentReview(item);
                }}
                key={-index}
                isSelect={item === currentReview}
                hideStar={item === "All"}
              />
              <BlankSpacer width={SPACE.spacing4} />
            </>
          );
        })}
      </ScrollView>
    );
  };

  const displayReviews = reviews.filter((item) => {
    if (currentReview === "All") {
      return true;
    }
    return item.BookReviewScore === Number(currentReview);
  });

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
        {renderReviewFilter()}
        <BlankSpacer height={SPACE.spacing16} />
      </>
    );
  };

  const renderReviewList = () => {
    return (
      <FlatList
        data={displayReviews}
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
          // loadMoreReview();
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
