import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Splash'>>();
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]); // Include navigation in dependency array

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.View style={[styles.textContainer, { opacity }]}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Protecting Wildlife, One Alert at a Time.</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#db8981', // Splash screen background color
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF5E0', // Light cream color for title text
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#FFF5E0', // Consistent light cream color for subtitle text
  },
});

export default SplashScreen;
