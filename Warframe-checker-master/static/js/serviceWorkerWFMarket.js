/**
 * Created by kyckyc on 5/16/17.
 */

importScripts('/static/workers/libs/idb-keyval.js');
// importScripts('/static/workers/libs/sw-offline-google-analytics.27.js');
importScripts('/static/workers/libs/analytics.js');
// goog.offlineGoogleAnalytics.initialize();
self.analytics.trackingId = 'UA-58725564-1';

let clickUrl = null;

self.addEventListener('install',function(event){
    console.log('[Service Worker] Installed');
    console.log(event)
});


self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
    let header, body;
    [header, body, clickUrl] = event.data.text().split('::');
    const options = {
        body: body,
        icon: '/static/assets/frontend/logo_icon_only.png',
    };

    event.waitUntil(Promise.all(
        [
            self.registration.showNotification(header, options),
            self.analytics.trackEvent('push-received'),
        ]
    ));
});


self.addEventListener('notificationclick', function (event) {
    if (!event.action) {
        // Was a normal notification click
        event.notification.close();
        console.log('[Service Worker] Notification Click.');
        console.log(event.notification);
        console.log(event);
        console.log(clickUrl);
        const urlToOpen = new URL(!!clickUrl ? clickUrl : '/', self.location.origin).href;

        const promiseChain = clients.matchAll({
            type: 'all',
            includeUncontrolled: true
        })
            .then((windowClients) => {
                let matchingClient = null;
                let windowClient = null;

                for (let i = 0; i < windowClients.length; i++) {
                    // Focus last opened window, for now.
                    windowClient = windowClients[i];
                    if (windowClient.url === urlToOpen) {
                        matchingClient = windowClient;
                        break;
                    }
                }

                if (matchingClient) {
                    return matchingClient.focus();
                } else {
                    return clients.openWindow(urlToOpen);
                }
            });
        event.waitUntil(Promise.all(
            [
                promiseChain,
                self.analytics.trackEvent('notification-click'),
            ]
        ));
    }
});


self.addEventListener('notificationclose', function (event) {
    const dismissedNotification = event.notification;

    event.waitUntil(Promise.all(
        [
            self.analytics.trackEvent('notification-close'),
        ]
    ));
});