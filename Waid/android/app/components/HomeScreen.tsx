import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { auth } from '../src/firebaseconfig';

type Detection = {
  id: string;
  animal: string;
  timestamp: { seconds: number };
};

const HomeScreen = ({ navigation }: any) => {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [user, setUser] = useState<any>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    const initializeMessaging = async () => {
      try {
        const permissionStatus = await messaging().requestPermission();
        const isAuthorized =
          permissionStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          permissionStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (isAuthorized) {
          console.log('Notification permissions granted.');
          const deviceToken = await messaging().getToken();
          console.log('FCM Token:', deviceToken);
        } else {
          console.log('Notification permissions denied.');
        }

        const messageListener = messaging().onMessage(async (remoteMessage) => {
          const notificationBody = remoteMessage.notification?.body || 'Details unavailable';
          setAlertMessage(notificationBody);
          setAlertVisible(true);
        });

        return () => messageListener();
      } catch (error) {
        console.error('Failed to set up messaging:', error);
      }
    };

    initializeMessaging();
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore()
        .collection('detections')
        .orderBy('timestamp', 'desc')
        .limit(5)
        .onSnapshot(
          (querySnapshot) => {
            if (!querySnapshot.empty) {
              const detectionList: Detection[] = [];
              querySnapshot.forEach((doc) => {
                const data = doc.data() as Detection;
                detectionList.push({ ...data, id: doc.id });
              });

              setDetections(detectionList);

              const mostRecentDetection = detectionList[0];
              setAlertMessage(
                `${mostRecentDetection.animal} detected at ${new Date(
                  mostRecentDetection.timestamp.seconds * 1000
                ).toLocaleString()}`
              );
              setAlertVisible(true);
            } else {
              console.log('No detections available.');
            }
          },
          (error) => {
            console.error('Error fetching detections:', error);
          }
        );

      return () => unsubscribe();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Please Log In</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Modal visible={alertVisible} transparent animationType="slide">
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>{alertMessage}</Text>
          <TouchableOpacity onPress={() => setAlertVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Intrusions</Text>
      <FlatList
        data={detections}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.item,
              index === 0 ? styles.latestItem : null,
            ]}
          >
            <Text style={styles.animalText}>{`ALERT: ${item.animal}`}</Text>
            <Text style={styles.timestampText}>
              {`Detected at: ${new Date(item.timestamp.seconds * 1000).toLocaleString()}`}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  logoutText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  item: {
    backgroundColor: '#34495e',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  latestItem: {
    backgroundColor: '#e74c3c',
    borderColor: '#c0392b',
    borderWidth: 2,
  },
  animalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f39c12',
    marginBottom: 5,
  },
  timestampText: {
    fontSize: 16,
    color: '#ecf0f1',
  },
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertText: {
    fontSize: 18,
    color: '#000',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
