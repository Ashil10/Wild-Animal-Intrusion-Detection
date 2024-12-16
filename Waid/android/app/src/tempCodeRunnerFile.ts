import { initializeApp } from 'firebase/app';
import auth from '@react-native-firebase/auth'; // Firebase Auth from @react-native-firebase
import firestore from '@react-native-firebase/firestore';

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

export { firebaseApp, authInstance, detectionsCollection, auth};
