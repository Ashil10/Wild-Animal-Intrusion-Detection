Wild Animal Intrusion Detection App

This repository contains the Wild Animal Intrusion Detection App, a React Native application designed to provide real-time alerts and historical logs of detected wild animals, specifically elephants and tigers, identified using a thermal camera and processed with Mask R-CNN on a Raspberry Pi.

The app integrates with Firebase Firestore and Firebase Authentication for user login and data management. Upon successful login (via mail), users can view real-time alerts and logs of previous detections.

Features
	•	Firebase Authentication: Users can log in via Gmail to access the app.
	•	Real-Time Alerts: Alerts are triggered when an animal is detected by the Raspberry Pi system.
	•	Firestore Integration: Logs of previous detections, including timestamps and animal species, are stored and retrieved.
	•	Mask R-CNN Integration: Thermal camera data is processed by a Mask R-CNN model to detect animals.
	•	Repellent System: Upon detection of an animal, a frequency is emitted to repel elephants and tigers.

Technologies Used
	1.	Frontend:
	•	React Native with TypeScript
	•	Firebase Authentication for login via Gmail
	•	Firebase Firestore for storing and retrieving detection logs
	2.	Backend Integration:
	•	Raspberry Pi using Mask R-CNN to detect elephants and tigers.
	•	Data pushed to Firestore via the Raspberry Pi upon detection.
	3.	Real-Time Communication:
	•	Firebase Cloud Messaging (FCM) for real-time notifications.

Installation and Setup

Prerequisites
	•	Node.js and npm installed
	•	Android Studio for Android app development
	•	Firebase Project set up with Authentication and Firestore enabled

Steps to Set Up
	1.	Clone the Repository:

git clone https://github.com/Ashil10/Wild-Animal-Intrusion-Detection.git
cd Wild-Animal-Intrusion-Detection


	2.	Install Dependencies:

npm install


	3.	Set Up Firebase Configuration:
	•	Add your Firebase project configuration in a .env file based on the provided .env.example.
	•	Example .env file:

REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_auth_domain
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_storage_bucket
REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_APP_ID=your_app_id


	4.	Run the App:

npx react-native run-android

How It Works
	1.	Animal Detection:
	•	The Raspberry Pi uses a thermal camera and the Mask R-CNN model to identify elephants and tigers.
	•	Upon detection, it sends the species and timestamp data to Firebase Firestore.
	2.	Real-Time Alerts:
	•	The React Native app fetches this data and displays it on the Alerts screen.
	•	Notifications are sent to the user’s device via Firebase Cloud Messaging.
	3.	User Authentication:
	•	Users log in via Gmail using Firebase Authentication.
	4.	Historical Logs:
	•	The app provides a history of all detections stored in Firestore, accessible on the Logs screen.

Excluded Files and Folders

To keep the repository clean and secure:
	•	Build Files:
	•	The android/app/ folder is excluded as the app is being developed for Android only.
	•	The ios/ folder is not included since the app is not yet implemented for iOS.
	•	Node Modules:
	•	The node_modules/ folder is excluded as it contains installed dependencies. Use npm install to generate it.
	•	Vendor Folder:
	•	Third-party dependencies or prebuilt libraries (if any) are excluded.
	•	API Keys:
	•	All sensitive information like API keys has been removed. Use a .env file for configuration.

Screens and Functionality
	1.	Login Screen
	•	Allows users to log in with Gmail credentials via Firebase Authentication.
	2.	Alerts Screen
	•	Displays real-time notifications of detected animals.
	3.	Logs Screen
	•	Provides a history of all detected animals, including timestamps.

Future Improvements
	•	Adding support for iOS.
	•	Enhancing the user interface with more intuitive designs.
	•	Expanding repellent mechanisms to include other species.
	•	Incorporating offline data caching.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contributing

Feel free to fork the repository and submit a pull request to contribute to the project.

Acknowledgments

Special thanks to the Mask R-CNN model, the Raspberry Pi community, and Firebase for their support in making this project possible.
