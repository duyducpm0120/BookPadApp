import { END_POINT } from "@core/const";
import axios from "axios";

const updateProfileEndpoint = `${END_POINT}user/updateProfilePic`;

export const updateProfilePic = async (pic, token) => {
  const formData = new FormData();
  formData.append("img", {
    uri: pic.uri,
    type: pic.type,
    name: pic.fileName,
  });

  await axios.post(updateProfileEndpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
