import { safeGetNumber, safeGetString } from "@core/utils";
import { size } from "lodash";

export class CategoryModel {
  CategoryId: number;

  CategoryName: string;

  CategoryDescription: string;

  CategoryIcon: string;

  IsDeleted: boolean;

  constructor(
    CategoryId: number,
    CategoryName: string,
    CategoryDescription: string,
    CategoryIcon: string,
    IsDeleted: boolean
  ) {
    this.CategoryId = CategoryId;
    this.CategoryName = CategoryName;
    this.CategoryDescription = CategoryDescription;
    this.CategoryIcon = CategoryIcon;
    this.IsDeleted = IsDeleted;
  }

  public static instantiate = (json: any) => {
    const CategoryId = safeGetNumber(json, "CategoryId", 0);
    const CategoryName = safeGetString(json, "CategoryName", "");
    const CategoryDescription = safeGetString(json, "CategoryDescription", "");
    const CategoryIcon = safeGetString(json, "CategoryIcon", "");
    const IsDeleted = safeGetNumber(json, "IsDeleted", 0) === 1;
    return new CategoryModel(
      CategoryId,
      CategoryName,
      CategoryDescription,
      CategoryIcon,
      IsDeleted
    );
  };
  // public static instantiateList = (books: any[]) => {
  //   if (size(books) === 0) return [];
  //   return books.map((book: any) => BookModel.instantiate(book));
  // };

  public static instantiateList = (data: any[]) => {
    if (size(data) === 0) return [];
    return data.map((item: any) => CategoryModel.instantiate(item));
  };
}
