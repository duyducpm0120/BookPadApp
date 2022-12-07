import type { BookModel } from "@core";
import { useState } from "react";

export const useViewModel = (props: { bookData: BookModel }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  return {
    reviews,
    setReviews,
  };
};
