import { safeGet, safeGetArray } from "@core/utils";
import { END_POINT } from "@core/const";
import axios from "axios";
import type { BookAuthor } from "../models/BookModel";
import { BookModel } from "../models/BookModel";

const MOCK_AUTHORS = [
  {
    AuthorId: "2",
    AuthorName: "John Steinbeck",
    AuthorDOB: "",
    AuthorDOD: "",
    AuthorDescription:
      "Nguyễn Du (阮攸; 3 January 1766 – 16 September 1820), pen names Tố Như (素如) and Thanh Hiên (清軒), is a celebrated Vietnamese poet. He is most known for writing the epic poem The Tale of Kiều.[1][2]",
  },
  {
    AuthorId: "3",
    AuthorName: "Colleen Hoover",
    AuthorDOB: "",
    AuthorDOD: "",
    AuthorDescription:
      "Nguyễn Du (阮攸; 3 January 1766 – 16 September 1820), pen names Tố Như (素如) and Thanh Hiên (清軒), is a celebrated Vietnamese poet. He is most known for writing the epic poem The Tale of Kiều.[1][2]",
  },
  {
    AuthorId: "5",
    AuthorName: "Marx, Karl",
    AuthorDOB: "",
    AuthorDOD: "",
    AuthorDescription:
      "Nguyễn Du (阮攸; 3 January 1766 – 16 September 1820), pen names Tố Như (素如) and Thanh Hiên (清軒), is a celebrated Vietnamese poet. He is most known for writing the epic poem The Tale of Kiều.[1][2]",
  },
  {
    AuthorId: "6",
    AuthorName: "Miller, Madeline",
    AuthorDOB: "",
    AuthorDOD: "",
    AuthorDescription:
      "Nguyễn Du (阮攸; 3 January 1766 – 16 September 1820), pen names Tố Như (素如) and Thanh Hiên (清軒), is a celebrated Vietnamese poet. He is most known for writing the epic poem The Tale of Kiều.[1][2]",
  },
  {
    AuthorId: "7",
    AuthorName: "Leo & Pevear Tolstoy",
    AuthorDOB: "",
    AuthorDOD: "",
    AuthorDescription:
      "Nguyễn Du (阮攸; 3 January 1766 – 16 September 1820), pen names Tố Như (素如) and Thanh Hiên (清軒), is a celebrated Vietnamese poet. He is most known for writing the epic poem The Tale of Kiều.[1][2]",
  },
  {
    AuthorId: "8",
    AuthorName: "Frank Herbert",
    AuthorDOB: "",
    AuthorDOD: "",
    AuthorDescription:
      "Nguyễn Du (阮攸; 3 January 1766 – 16 September 1820), pen names Tố Như (素如) and Thanh Hiên (清軒), is a celebrated Vietnamese poet. He is most known for writing the epic poem The Tale of Kiều.[1][2]",
  },
  {
    AuthorId: "14",
    AuthorName: "Nguyen Du",
    AuthorDOB: "",
    AuthorDOD: "",
    AuthorDescription:
      "Nguyễn Du (阮攸; 3 January 1766 – 16 September 1820), pen names Tố Như (素如) and Thanh Hiên (清軒), is a celebrated Vietnamese poet. He is most known for writing the epic poem The Tale of Kiều.[1][2]",
  },
  {
    AuthorId: "16",
    AuthorName: "J. R. R. Tolkien",
    AuthorDOB: "",
    AuthorDOD: "",
    AuthorDescription:
      "Nguyễn Du (阮攸; 3 January 1766 – 16 September 1820), pen names Tố Như (素如) and Thanh Hiên (清軒), is a celebrated Vietnamese poet. He is most known for writing the epic poem The Tale of Kiều.[1][2]",
  },
  {
    AuthorId: "17",
    AuthorName: "AAA",
    AuthorDOB: "",
    AuthorDOD: "",
    AuthorDescription:
      "Nguyễn Du (阮攸; 3 January 1766 – 16 September 1820), pen names Tố Như (素如) and Thanh Hiên (清軒), is a celebrated Vietnamese poet. He is most known for writing the epic poem The Tale of Kiều.[1][2]",
  },
  {
    AuthorId: "21",
    AuthorName: "George R.R. Martin",
    AuthorDOB: "",
    AuthorDOD: "",
    AuthorDescription:
      "Nguyễn Du (阮攸; 3 January 1766 – 16 September 1820), pen names Tố Như (素如) and Thanh Hiên (清軒), is a celebrated Vietnamese poet. He is most known for writing the epic poem The Tale of Kiều.[1][2]",
  },
  {
    AuthorId: "25",
    AuthorName: "Albert Camus",
    AuthorDOB: "",
    AuthorDOD: "",
    AuthorDescription:
      "Nguyễn Du (阮攸; 3 January 1766 – 16 September 1820), pen names Tố Như (素如) and Thanh Hiên (清軒), is a celebrated Vietnamese poet. He is most known for writing the epic poem The Tale of Kiều.[1][2]",
  },
  {
    AuthorId: "26",
    AuthorName: "E. M. Forster",
    AuthorDOB: "",
    AuthorDOD: "",
    AuthorDescription:
      "Nguyễn Du (阮攸; 3 January 1766 – 16 September 1820), pen names Tố Như (素如) and Thanh Hiên (清軒), is a celebrated Vietnamese poet. He is most known for writing the epic poem The Tale of Kiều.[1][2]",
  },
];

const getAllAuthorsEndpoint = `${END_POINT}search/getAllAuthors`;
const searchBookEndPoint = `${END_POINT}search/authorBookSearch`;
export const getAuthors = async ({ token }: { token: string }) => {
  const res = await axios.get(getAllAuthorsEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("res asdasd", res);
  const authorList: BookAuthor[] = safeGet(res, "data.authors", []);
  return authorList;
};

export const searchBookByAuthor = async ({
  token,
  lastBookId,
  limit,
  authorId,
}: {
  token: string;
  lastBookId: number;
  limit: number;
  authorId: number;
}) => {
  const endPoint = searchBookEndPoint;
  const res = await axios.post(
    endPoint,
    {
      limit,
      last: Number(lastBookId),
      authorId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const bookData = safeGetArray(res, "data.books", []);
  const returnData = BookModel.instantiateList(bookData);
  return returnData;
};
