export const a = {};

export const END_POINT = "http://localhost:4000/";

export enum TimeToMillisecondsEnum {
  SECOND = 1000,
  MINUTE = 1000 * 60,
  HOUR = 1000 * 60 * 60,
  DAY = 1000 * 60 * 60 * 24,
}

export * from "./ErrorCode";
export * from "./AppTab";
export * from "./CacheKey";
