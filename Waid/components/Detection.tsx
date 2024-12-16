import { firestore } from 'firebase-admin';

// Define the type for the animal detection data
export type Detection = {
  id: string;
  animalName: string;
  timestamp: firestore.Timestamp; // Use Firestore Timestamp type for timestamp
};
