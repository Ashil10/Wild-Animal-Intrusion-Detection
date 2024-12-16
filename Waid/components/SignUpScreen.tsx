import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signUp } from '../auth/authService';

const SignUpScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            // Call sign-up method
            await signUp(email, password);
            navigation.navigate('Home');
        } catch (error: any) {
            console.error('Sign-up error:', error);
            const errorMessage =
                error?.message || 'An unknown error occurred'; // Safe fallback
            Alert.alert('Sign-Up Failed', errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#2E3B46" // Dark text for input placeholders
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#2E3B46" // Dark text for input placeholders
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.secondaryButtonText}>
                    Already have an account? Login
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF5E0', // Light beige background
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2E3B46', // Darker shade for heading
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#FFFFFF', // White background for input fields
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        fontSize: 16,
        color: '#2E3B46', // Dark text for input fields
    },
    button: {
        backgroundColor: '#db8981', // Soft red button
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF', // White text on the button
    },
    secondaryButton: {
        marginTop: 20,
    },
    secondaryButtonText: {
        fontSize: 16,
        color: '#2E3B46', // Dark text for sign-up link
        textDecorationLine: 'underline',
    },
});

export default SignUpScreen;
