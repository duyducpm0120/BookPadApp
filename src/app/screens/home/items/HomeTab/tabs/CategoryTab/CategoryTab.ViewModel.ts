import { useGlobalState, useMount } from "@core";
import type { CategoryModel } from "@core/models/CategoryModel";
import { getCategories } from "@core/services";
import { useState } from "react";

export const useViewModel = () => {
  const [categoryList, setCategoryList] = useState<CategoryModel[]>([]);
  const { TOKEN } = useGlobalState();

  const getCategoryList = async () => {
    try {
      const categories = await getCategories({ token: TOKEN });
      setCategoryList(categories);
    } catch (err) {
      //
    }
  };

  useMount(() => {
    try {
      getCategoryList();
    } catch (err) {
      console.log("err", err);
    }
  });

  return {
    selectors: {
      categoryList,
    },
  };
};
