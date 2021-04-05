importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');

const config = {
    apiKey: 'AIzaSyC1u5orfqFyUVanmqCEj80OGHoz9WAaD_8',
    authDomain: 'gamisofttest.firebaseapp.com',
    databaseURL: 'https://gamisofttest.firebaseio.com',
    projectId: 'gamisofttest',
    storageBucket: 'gamisofttest.appspot.com',
    messagingSenderId: '850151815604',
    appId: '1:850151815604:web:a0986397e16ddafd62dae1',
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
    };
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener('notificationclick', event => {
    return event;
});
