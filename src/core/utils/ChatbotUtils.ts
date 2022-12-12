import { BotResponseType } from "@core/assets";
import { BotResponseModel } from "@core/models";
import { safeGet } from "./CommonUtils";

export const convertToBotResponseModel = (response: any): BotResponseModel => {
  const message = safeGet(
    response,
    "queryResult.fulfillmentMessages[0].text.text[0]",
    {}
  );
  try {
    const botResponse = JSON.parse(message);
    return BotResponseModel.instantiate(botResponse);
  } catch (err) {
    return {
      type: BotResponseType.TEXT,
      message,
    };
  }
};
