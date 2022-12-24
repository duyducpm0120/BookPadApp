import { safeGet, safeGetString } from "@core/utils";
import { BotResponseType } from "@core/assets";

export class BotResponseModel {
  type: BotResponseType;

  message: string;

  value: string;

  constructor(type: BotResponseType, message: string, value: string) {
    this.type = type;
    this.message = message;
    this.value = value;
  }

  public static instantiate = (json: any) => {
    const type = safeGet(json, "type", BotResponseType.NONE);
    const message = safeGetString(json, "message", "");
    const value = safeGetString(json, "value", "");
    return new BotResponseModel(type, message, value);
  };
}
