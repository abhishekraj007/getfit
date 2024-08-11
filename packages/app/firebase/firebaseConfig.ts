import { getApps, initializeApp, getApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore';

import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDpCu0SIj7uJkuTBn_yPV4as0f0IPO4TXA',
  authDomain: 'be-fit-kwyjg.firebaseapp.com',
  projectId: 'be-fit-kwyjg',
  storageBucket: 'be-fit-kwyjg.appspot.com',
  messagingSenderId: '310345225223',
  appId: '1:310345225223:web:b1b6cf6ba00945596cc6a2',
  measurementId: 'G-38VTT550KJ',
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig)

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// export const analytics = getAnalytics(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
