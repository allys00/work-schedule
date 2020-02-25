import { Platform } from 'react-native';
import firebase from '@react-native-firebase/app';

// pluck values from your `GoogleService-Info.plist` you created on the firebase console
const iosConfig = {
  clientId: 'x',
  appId: 'x',
  apiKey: 'x',
  databaseURL: 'x',
  storageBucket: 'x',
  messagingSenderId: 'x',
  projectId: 'x',

  // enable persistence by adding the below flag
  persistence: true,
};

// pluck values from your `google-services.json` file you created on the firebase console
const androidConfig = {
  clientId: '664660977993-fd07a99ak1q8eja9vj73s0vc9n230bps.apps.googleusercontent.com',
  appId: '664660977993',
  apiKey: 'AIzaSyD1zeaTfwmqi8Lc-vb5DeJ8_BsPG2TqLT8',
  databaseURL: 'https://work-schedule-357b8.firebaseio.com',
  storageBucket: 'work-schedule-357b8.appspot.com',
  projectId: 'work-schedule-357b8',
  messagingSenderId: '664660977993',

  // enable persistence by adding the below flag
  persistence: true,
};

const config = Platform.OS === 'ios' ? iosConfig : androidConfig

firebase.initializeApp(config);
var db = firebase.firestore();