export default function swDev() {
  function determineAppServerKey() {
    const vapidPublicKey =
      "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
    return urlBase64ToUint8Array(vapidPublicKey);
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  navigator.serviceWorker.register(swUrl).then((registration) => {
    console.warn("Service worker registered", registration);

    registration.pushManager.getSubscription().then(function (subscription) {
      if (subscription) {
        // Unsubscribe to remove push notifications
        subscription.unsubscribe().then(() => {
          console.log("Push notifications unsubscribed.");
        }).catch((error) => {
          console.error("Failed to unsubscribe from push notifications:", error);
        });
      }
    });
  });
}
