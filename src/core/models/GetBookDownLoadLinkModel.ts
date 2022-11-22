import { safeGet, safeGetString } from "@core/utils";

export class GetBookDownLoadLinkModel {
  downloadLink: string;

  constructor(downloadLink: string) {
    this.downloadLink = downloadLink;
  }

  public static instantiate = (json: any) => {
    console.log("json download link asdasd", json);
    const data = safeGet(json, "data", {});
    const downloadLink = safeGetString(data, "downloadLink", "");
    return new GetBookDownLoadLinkModel(downloadLink);
  };
}
