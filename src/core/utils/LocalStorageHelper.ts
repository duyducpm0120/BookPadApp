/* eslint-disable consistent-return */
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

const setItem = (key: string, value: any, expires?: number) => {
  storage.save({
    key,
    data: value,
    expires: expires || null,
  });
};

const getItem = (key: string) => {
  return storage.load({
    key,
  });
};

const removeItem = (key: string) => {
  storage.remove({
    key,
  });
};

export const clearAll = () => {
  storage.clearMap();
};

const LocalStorageHelper = {
  setItem,
  getItem,
  removeItem,
};

export default LocalStorageHelper;

// export const setStringItem = async (key: string, value: string) => {
//   try {
//     await AsyncStorage.setItem(key, value);
//   } catch (e) {
//     // saving error
//   }
// };

// export const setObjectItem = async (key: string, value: any) => {
//   try {
//     const jsonValue = JSON.stringify(value);
//     await AsyncStorage.setItem(key, jsonValue);
//   } catch (e) {
//     // saving error
//   }
// };

// export const getStringItem = async (key: string) => {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     if (value !== null) {
//       return value;
//     }
//   } catch (e) {
//     // error reading value
//   }
// };

// export const getObjectItem = async (key: string) => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(key);
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     // error reading value
//   }
// };
