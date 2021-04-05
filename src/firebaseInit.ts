import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
  apiKey: 'AIzaSyC1u5orfqFyUVanmqCEj80OGHoz9WAaD_8',
  authDomain: 'gamisofttest.firebaseapp.com',
  databaseURL: 'https://gamisofttest.firebaseio.com',
  projectId: 'gamisofttest',
  storageBucket: 'gamisofttest.appspot.com',
  messagingSenderId: '850151815604',
  appId: '1:850151815604:web:a0986397e16ddafd62dae1',
};

let messaging: firebase.messaging.Messaging;

if (firebase.messaging.isSupported()) {
  firebase.initializeApp(config);
  messaging = firebase.messaging();
  messaging.usePublicVapidKey('BLEAo_q4S5xO9IqVcMYTjbWJ6b6cy1Z2rSdWOsEIAGwu76nNXL28GsCl3Q5tsI1ZaheLi-gItQXQNfXslyeRH9Q');
}

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .getToken()
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = () => {
  return new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
};
