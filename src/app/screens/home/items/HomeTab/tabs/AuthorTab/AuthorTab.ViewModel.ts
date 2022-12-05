import type { BookAuthor } from "@core";
import { useGlobalState, useMount } from "@core";
import { getAuthors } from "@core/services";
import { useState } from "react";

export const useViewModel = () => {
  const [authorList, setAuthorList] = useState<BookAuthor[]>([]);
  const { TOKEN } = useGlobalState();

  const getAuthorList = async () => {
    const authors = await getAuthors({ token: TOKEN });
    console.log("authors asdasd", authors);
    const authorsAlphabetically = authors.sort((a, b) =>
      a.AuthorName.localeCompare(b.AuthorName)
    );
    setAuthorList(authorsAlphabetically);
  };

  useMount(() => {
    try {
      getAuthorList();
    } catch (err) {
      console.log("err", err);
    }
  });

  return {
    selectors: {
      authorList,
    },
  };
};
