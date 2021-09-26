import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@ACCESS_TOKEN";

export const setAccessToken = token => AsyncStorage.setItem(KEY, token);
export const getAccessToken = () => AsyncStorage.getItem(KEY);
export const removeAccessToken = () => AsyncStorage.removeItem(KEY);
