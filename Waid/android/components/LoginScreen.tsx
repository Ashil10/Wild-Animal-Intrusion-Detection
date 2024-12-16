import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { login } from '../auth/authService';

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleLogin = async () => {
        try {
            await login(email, password);
            setModalMessage('Login Successful');
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
                navigation.navigate('Home');
            }, 2000); // Close modal and navigate after 2 seconds
        } catch (error: any) {
            setModalMessage('Login Failed: ' + (error?.message || 'An unknown error occurred'));
            setModalVisible(true);
            setTimeout(() => setModalVisible(false), 2000); // Close modal after 2 seconds
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#B8B8B8"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#B8B8B8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>

            {/* Custom Modal for Login Feedback */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF5E0', // Light beige background for a fresh look
        padding: 20,
    },
    heading: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2E3B46', // Darker shade for the heading
        marginBottom: 40,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF', // White background for input fields
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#2E3B46', // Dark text color for readability
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#db8981', // Coral shade for buttons
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#db8981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF', // White button text
        fontWeight: 'bold',
    },
    signupButton: {
        marginTop: 20,
    },
    signupText: {
        fontSize: 14,
        color: '#2E3B46', // Dark text for sign-up link
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalBox: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    modalText: {
        fontSize: 16,
        color: '#000', // Black text for feedback
        textAlign: 'center',
    },
});

export default LoginScreen;
