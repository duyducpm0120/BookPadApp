import { safeGet, safeGetString } from "@core/utils";

export class LogInModel {
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  public static instantiate = (json: any) => {
    console.log("json asdasd", json);
    const data = safeGet(json, "data", { token: "" });
    const token = safeGetString(data, "token", "");
    return new LogInModel(token);
  };
}
