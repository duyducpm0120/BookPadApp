import { safeGet, safeGetString } from "@core/utils";
import { BotResponseType } from "@core/assets";

export class BotResponseModel {
  type: BotResponseType;

  message: string;

  constructor(type: BotResponseType, message: string) {
    this.type = type;
    this.message = message;
  }

  public static instantiate = (json: any) => {
    const type = safeGet(json, "type", BotResponseType.NONE);
    const message = safeGetString(json, "message", "");
    return new BotResponseModel(type, message);
  };
}
