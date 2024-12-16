import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './android/app/components/LoginScreen';
import SignUpScreen from './android/app/components/SignUpScreen';
import HomeScreen from './android/app/components/HomeScreen';
import SplashScreen from './android/app/components/SplashScreen';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
        // Request permission for notifications
        const requestPermission = async () => {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);

                // Get the device token and save it in Firestore
                const token = await messaging().getToken();
                console.log('FCM Token:', token);
            }
        };

        requestPermission();

        // Handle foreground messages
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            Alert.alert(
                remoteMessage.notification?.title || 'Notification',
                remoteMessage.notification?.body || 'You have a new message'
            );
        });

        return unsubscribe; // Cleanup on unmount
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
