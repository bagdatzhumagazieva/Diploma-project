export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('[SW]: SCOPE: ', registration?.scope);
        return registration?.scope;
      })
      .catch(err => err);
  }
};
