import { Platform } from 'react-native';

export const APP_NAME = 'Body Fitness';
export const HEADER_HEIGHT = 240;
export const HEADER_HEIGHT_WITHOUT_IMAGE = 60;
export const APP_PACKAGE_NAME = 'com.akrj.bodyfitnessapp';
export const APP_ITUNE_ID = 'com.akrj.bodyfitnessapp';
export const APP_URL =
  Platform.OS === 'android'
    ? `https://play.google.com/store/apps/details?id=${APP_PACKAGE_NAME}`
    : `https://apps.apple.com/app/apple-store/id${APP_ITUNE_ID}`;
export const APP_REVIEW_URL =
  Platform.OS === 'android' ? `${APP_URL}&showAllReviews=true` : `${APP_URL}?action=write-review`;
