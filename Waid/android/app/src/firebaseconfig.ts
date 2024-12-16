import { initializeApp } from 'firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

// Firebase configuration object
const firebaseConfig = {
    apiKey: 'AIzaSyCt9C-_xCOFaoXCbcB4L15iH5Z7ZAvescI',
    authDomain: 'waid-3c1f7.firebaseapp.com',
    projectId: 'waid-3c1f7',
    storageBucket: 'waid-3c1f7.appspot.com',
    messagingSenderId: '881708195258',
    appId: '1:881708195258:android:d7b9f600d045d463869183',
};

// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const authInstance = auth();

// Initialize Firestore
const firestoreInstance = firestore();
const detectionsCollection = firestoreInstance.collection('detections');

// Request permission for notifications
const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Notification permissions granted.');
    } else {
        console.log('Notification permissions denied.');
    }
};

// Initialize Firebase Messaging
const initializeMessaging = async () => {
    // Request permission for notifications
    await requestUserPermission();

    // Get FCM Token
    const token = await messaging().getToken();
    console.log('FCM Token:', token);

    // Listen for messages when the app is in the foreground
    messaging().onMessage(async remoteMessage => {
        console.log('A new foreground notification:', remoteMessage);
    });

    // Handle background notifications
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification caused the app to open from the background:', remoteMessage.notification);
    });

    // Handle notification when the app is opened from a quit state
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log('Notification caused the app to open from a quit state:', remoteMessage.notification);
            }
        });
        // Listen for token refreshes
messaging().onTokenRefresh(fcmToken => {
    console.log('FCM Token refreshed:', fcmToken);
    // You can send the refreshed token to your server or update your app's state
});

};

export { firebaseApp, authInstance, detectionsCollection, auth, initializeMessaging };
