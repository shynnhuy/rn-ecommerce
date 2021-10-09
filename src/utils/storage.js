import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "@ACCESS_TOKEN";
export const setAccessToken = (accessToken) =>
  AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
export const getAccessToken = () => AsyncStorage.getItem(ACCESS_TOKEN_KEY);
export const removeAccessToken = () =>
  AsyncStorage.removeItem(ACCESS_TOKEN_KEY);

const REFRESH_TOKEN_KEY = "@REFRESH_TOKEN";

export const setRefreshToken = (refreshToken) =>
  AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
export const getRefreshToken = () => AsyncStorage.getItem(REFRESH_TOKEN_KEY);
export const removeRefreshToken = () =>
  AsyncStorage.removeItem(REFRESH_TOKEN_KEY);

const NOTIFY_TOKEN_KEY = "@PUSH_NOTIFICATION";
export const setNotificationToken = (token) =>
  AsyncStorage.setItem(NOTIFY_TOKEN_KEY, token);
export const removeNotificationToken = () =>
  AsyncStorage.removeItem(NOTIFY_TOKEN_KEY);
