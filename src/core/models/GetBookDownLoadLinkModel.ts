import { safeGet, safeGetString } from "@core/utils";

export class GetBookDownLoadLinkModel {
  downloadLink: string;

  constructor(downloadLink: string) {
    this.downloadLink = downloadLink;
  }

  public static instantiate = (json: any) => {
    const data = safeGet(json, "data", {});
    const downloadLink = safeGetString(data, "downloadLink", "");
    return new GetBookDownLoadLinkModel(downloadLink);
  };
}
