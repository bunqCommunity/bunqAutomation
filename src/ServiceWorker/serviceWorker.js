import axios from "axios";
import vapidPublicKey from "../Config/vapid-public-key.json";

const SUBSCRIPTION_STORAGE_KEY = "SUBSCRIPTION_SAVED";

// decode base64 public key
function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function register(config) {
    if ("serviceWorker" in navigator && "PushManager" in window) {
        navigator.serviceWorker
            .register("sw.js")
            .then(function(swReg) {
                swReg.pushManager.getSubscription().then(function(subscription) {
                    if (!(subscription === null)) {
                        console.log("User is subscribed", subscription);

                        saveSubscription(subscription);
                    } else {
                        swReg.pushManager
                            .subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
                            })
                            .then(function(subscription) {
                                console.log("New user subscription", subscription);

                                saveSubscription(subscription);
                            })
                            .catch(function(err) {
                                console.log("Failed to subscribe user: ", err);
                            });
                    }
                });
            })
            .catch(function(error) {
                console.error("Service Worker Error", error);
            });
    } else {
        console.warn("Push messaging is not supported");
    }
}

export function unregister() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then(registration => registration.unregister());
    }
}

function saveSubscription(subscription) {
    const storedSubscription = localStorage.getItem(SUBSCRIPTION_STORAGE_KEY);

    if (!storedSubscription || storedSubscription === "FAILED") {
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/web-push/subscribe`, subscription, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(() => {
                localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, "SUCCESS");
                console.log("Sent subscription to server");
            })
            .catch(error => {
                localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, "FAILED");
                console.error(error);
            });
    }
}
