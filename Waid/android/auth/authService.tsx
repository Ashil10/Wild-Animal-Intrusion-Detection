import auth from '@react-native-firebase/auth'; // Import from @react-native-firebase
import { FirebaseError } from 'firebase/app';

// Sign Up
export const signUp = async (email: string, password: string): Promise<void> => {
    try {
        await auth().createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
        if (error instanceof FirebaseError) {
            throw new Error(error.message); // Forward Firebase-specific error messages
        } else {
            throw new Error('An unknown error occurred during sign-up.');
        }
    }
};

// Login
export const login = async (email: string, password: string) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        return userCredential.user; // Return the user object
    } catch (error: any) {
        if (error instanceof FirebaseError) {
            throw new Error(error.message); // Forward Firebase-specific error messages
        } else {
            throw new Error('Check Credentials');
        }
    }
};

// Logout
export const logout = async (): Promise<void> => {
    try {
        await auth().signOut();
    } catch (error: any) {
        if (error instanceof FirebaseError) {
            throw new Error(error.message); // Forward Firebase-specific error messages
        } else {
            throw new Error('An unknown error occurred during logout.');
        }
    }
};
