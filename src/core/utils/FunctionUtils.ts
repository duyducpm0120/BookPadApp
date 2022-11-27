import { CacheKeyEnum } from "../const/CacheKey";
import LocalStorageHelper from "./LocalStorageHelper";

export const clearStorageToken = async () => {
  LocalStorageHelper.removeItem(CacheKeyEnum.TOKEN);
};
