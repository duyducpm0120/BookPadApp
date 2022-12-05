import type { BookAuthor } from "@core";
import { useMount } from "@core";
import { getAuthors } from "@core/services";
import { useState } from "react";

export const useViewModel = () => {
  const [authorList, setAuthorList] = useState<BookAuthor[]>([]);

  const getAuthorList = async () => {
    const authors = await getAuthors();
    const authorsAlphabetically = authors.sort((a, b) =>
      a.AuthorName.localeCompare(b.AuthorName)
    );
    setAuthorList(authorsAlphabetically);
  };

  useMount(() => {
    getAuthorList();
  });

  return {
    selectors: {
      authorList,
    },
  };
};
