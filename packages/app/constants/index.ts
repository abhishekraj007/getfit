import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const APP_NAME = 'Body Fitness';
export const HEADER_HEIGHT = 240;
export const HEADER_HEIGHT_WITHOUT_IMAGE = 60;
export const APP_PACKAGE_NAME = Constants.expoConfig?.android?.package;

export const APP_ITUNE_ID = Constants.expoConfig?.ios?.bundleIdentifier;
export const APP_URL =
  Platform.OS === 'android'
    ? `https://play.google.com/store/apps/details?id=${APP_PACKAGE_NAME}`
    : `https://apps.apple.com/app/apple-store/id${APP_ITUNE_ID}`;
export const APP_REVIEW_URL =
  Platform.OS === 'android' ? `${APP_URL}&showAllReviews=true` : `${APP_URL}?action=write-review`;
export const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

export const PAGE_HEADER_HEIGHT = HEADER_HEIGHT + STATUS_BAR_HEIGHT;
export const PAGE_HEADER_HEIGHT_WITHOUT_BACKGROUND =
  HEADER_HEIGHT_WITHOUT_IMAGE + STATUS_BAR_HEIGHT;
export const PLAYER_BAR_HEIGHT = 64;
