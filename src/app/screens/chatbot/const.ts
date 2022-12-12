import { LOCAL_IMAGES } from "@core";
import type { User } from "react-native-gifted-chat";

export const botAvatar = LOCAL_IMAGES.chatbot;
export const BOT: User = {
  _id: 2,
  name: "Mr.Bot",
  avatar: botAvatar,
};
