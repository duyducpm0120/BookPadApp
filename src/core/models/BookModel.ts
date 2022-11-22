import { size } from "lodash";
import { PublisherModel } from "@core/models";
import { safeGet, safeGetArray, safeGetString } from "@core/utils";
import { safeGetNumber } from "../utils/CommonUtils";

export interface BookAuthor {
  AuthorId: string;
  AuthorName: string;
  AuthorDescription: string;
}
export class BookModel {
  // BookId: number;
  // BookName: string;
  // IsLocked: boolean;
  // PublishedAt: Date;
  // CreatedAt: Date;
  // UpdatedAt: Date;
  // BookDescription: string;
  // BookCoverImage: string;
  // BookPublisherId: number;
  // BookFileId: number;
  // isDeleted: boolean;
  BookId: string;

  BookName: string;

  BookDescription: string;

  PublishedAt: string;

  CreatedAt: string;

  BookCoverImage: string;

  BookPublisher: PublisherModel;

  Languages: any[];

  Authors: BookAuthor[];

  ReviewStars: number;

  constructor(
    BookId: string,
    BookName: string,
    BookDescription: string,
    PublishedAt: string,
    CreatedAt: string,
    BookCoverImage: string,
    BookPublisher: PublisherModel,
    Languages: any[],
    Authors: BookAuthor[],
    ReviewStars: number
  ) {
    this.BookId = BookId;
    this.BookName = BookName;
    this.BookDescription = BookDescription;
    this.PublishedAt = PublishedAt;
    this.CreatedAt = CreatedAt;
    this.BookCoverImage = BookCoverImage;
    this.BookPublisher = BookPublisher;
    this.Languages = Languages;
    this.Authors = Authors;
    this.ReviewStars = ReviewStars;
  }

  public static instantiate = (json: any) => {
    const bookId = safeGetNumber(json, "BookId", -1);
    const bookName = safeGetString(json, "BookName", "");
    const bookDescription = safeGetString(json, "BookDescription", "");
    const publishedAt = safeGetString(json, "PublishedAt", "");
    const createdAt = safeGetString(json, "CreatedAt", "");
    const bookCoverImage = safeGetString(json, "BookCoverImage", "");
    const bookPublisher = PublisherModel.instantiate(
      safeGet(json, "BookPublisher", {})
    );
    const languages = safeGet(json, "Languages", []);
    const authors = safeGetArray(json, "Authors", []);
    const reviewStars = safeGetNumber(json, "ReviewStars", 3.5);
    // console.log('authors', authors);
    return new BookModel(
      bookId.toString(),
      bookName,
      bookDescription,
      publishedAt,
      createdAt,
      bookCoverImage,
      bookPublisher,
      languages,
      authors,
      reviewStars
    );
  };

  public static instantiateList = (books: any[]) => {
    if (size(books) === 0) return [];
    return books.map((book: any) => BookModel.instantiate(book));
  };
}
