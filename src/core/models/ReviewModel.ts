import { safeGetNumber } from "@core/utils";
import { UserInfoModel } from "./UserInfoModel";

export class ReviewModel {
  BookReviewId: number;

  BookReviewScore: number;

  BookReviewComment: string;

  IsDeleted: boolean;

  CreatedAt: Date;

  UpdatedAt: Date;

  OwnerId: number;

  BookId: number;

  Owner: UserInfoModel;

  constructor(
    BookReviewId: number,
    BookReviewScore: number,
    BookReviewComment: string,
    IsDeleted: boolean,
    CreatedAt: Date,
    UpdatedAt: Date,
    OwnerId: number,
    BookId: number,
    Owner: UserInfoModel
  ) {
    this.BookReviewId = BookReviewId;
    this.BookReviewScore = BookReviewScore;
    this.BookReviewComment = BookReviewComment;
    this.IsDeleted = IsDeleted;
    this.CreatedAt = CreatedAt;
    this.UpdatedAt = UpdatedAt;
    this.OwnerId = OwnerId;
    this.BookId = BookId;
    this.Owner = Owner;
  }

  public static instantiate = (json: any) => {
    const BookReviewId = safeGetNumber(json, "BookReviewId", 0);
    const BookReviewScore = safeGetNumber(json, "BookReviewScore", 0);
    const { BookReviewComment } = json;
    const { IsDeleted } = json;
    const { CreatedAt } = json;
    const { UpdatedAt } = json;
    const OwnerId = safeGetNumber(json, "OwnerId", 0);
    const BookId = safeGetNumber(json, "BookId", 0);
    const Owner = UserInfoModel.instantiate(json.Owner);

    return new ReviewModel(
      BookReviewId,
      BookReviewScore,
      BookReviewComment,
      IsDeleted,
      CreatedAt,
      UpdatedAt,
      OwnerId,
      BookId,
      Owner
    );
  };

  public static instantiateList = (json: any) => {
    const returnData: ReviewModel[] = [];
    json.forEach((element: any) => {
      returnData.push(ReviewModel.instantiate(element));
    });
    return returnData;
  };
}
