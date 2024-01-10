import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {
  async save(key: string, value: any) {
    // if (Platform.OS !== 'web') {
    //   await SecureStore.setItemAsync(key, JSON.stringify(value));
    // } else {
    // }
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async get(key: string) {
    let jsonValue;

    jsonValue = await SecureStore.getItemAsync(key);
    // if (Platform.OS !== 'web') {
    // } else {
    //   jsonValue = await AsyncStorage.getItem(key);
    // }
    return jsonValue != null ? JSON.parse(jsonValue) : undefined;
  },

  remove(key: string) {
    // if (Platform.OS !== 'web') {
    //   return SecureStore.deleteItemAsync(key);
    // }

    return AsyncStorage.removeItem(key);
  },
};
