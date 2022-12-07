import type { BookModel } from "@core";
import {
  useGlobalNavigation,
  strings,
  getMessageFromError,
  showAlert,
  useGlobalState,
  useGlobalLoading,
  useMount,
} from "@core";
import type { ReviewModel } from "@core/models/ReviewModel";
import { deleteBookReview, getBookReview } from "@core/services";
import { useState } from "react";

export const useViewModel = (props: { bookData: BookModel }) => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const { bookData } = props;
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const { TOKEN, USER_INFO } = useGlobalState();
  const { goBack } = useGlobalNavigation();

  const loadMoreReview = async () => {
    try {
      const res = await getBookReview({
        token: TOKEN,
        lastBookId: Number(reviews[reviews.length - 1].BookId),
        limit: 5,
        bookId: bookData.BookId,
      });
      if (res.length === 0) {
        return;
      }
      setReviews([...reviews, ...res]);
    } catch (err) {
      showAlert({
        title: strings.error,
        message: getMessageFromError(err),
      });
    }
  };

  const deleteReview = async (reviewId: number) => {
    try {
      showGlobalLoading();
      const res = await deleteBookReview({
        token: TOKEN,
        bookReviewId: reviewId,
      });
      hideGlobalLoading();
      goBack();
    } catch (err) {
      hideGlobalLoading();
      showAlert({
        title: strings.error,
        message: getMessageFromError(err),
      });
    }
  };

  const onPressDelete = (reviewId: number) => {
    showAlert({
      title: strings.delete_review,
      message: strings.delete_review_confirm,
      primaryButtonParams: {
        label: strings.delete,
        onPress: () => deleteReview(reviewId),
      },
      secondaryButtonParams: {
        label: strings.cancel,
        onPress: () => {},
      },
    });
  };

  useMount(async () => {
    try {
      showGlobalLoading();
      const res = await getBookReview({
        token: TOKEN,
        lastBookId: 0,
        limit: 5,
        bookId: bookData.BookId,
      });
      if (res.length === 0) {
        hideGlobalLoading();
        return;
      }
      setReviews(res);
      hideGlobalLoading();
    } catch (err) {
      hideGlobalLoading();
      showAlert({
        title: "Error",
        message: getMessageFromError(err),
      });
    }
  });
  return {
    reviews,
    setReviews,
    loadMoreReview,
    USER_INFO,
    onPressDelete,
  };
};
