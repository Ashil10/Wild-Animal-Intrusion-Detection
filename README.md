###  Wild Animal Intrusion Repellent System


## Introduction

This project, titled Wild Animal Intrusion Detection and Repellent System, was developed as part of our final year B.Tech project in Computer Science and Engineering in collaboration with IIIT Kottayam. The system was designed by myself and Parvathy Gopan to address the issue of wild animal intrusion, particularly targeting elephants and tigers. We implemented a repellent mechanism that utilizes animal detection through Mask RCNN. Upon detection, the system triggers the repellent, which is emitted via an amplifier and an ultrasonic transducer, all controlled by a central Raspberry Pi B4. In parallel, a React Native application was developed to provide real-time alerts about animal detections. The project team consisted of Ramkrishna K, Joel Sebastian, Abin JS, Harsha Anand, Lekha, Parvathy Gopan, and myself.

---

## Project Structure

The project is organized into the following folders and files:

### 1. **MATLAB Code**
This folder contains MATLAB code for enhancing base sounds (bee and vervet monkey) to specified frequencies to effectively repel target animals.

#### a) MATLAB Elephant Repellent
- **Purpose**: Repels elephants using a bee sound as the base.
- Enhances the bee sound to specified frequencies suitable for repelling elephants.

#### b) MATLAB Tiger Repellent
- **Purpose**: Repels tigers using vervet monkey sound as the base.
- Enhances the vervet monkey sound to specified frequencies suitable for repelling tigers.

---

### 2. **Python Code**
- **Purpose**: Plays sound frequencies on a Raspberry Pi device when an animal intrusion is detected.
- **Features**:
  - Reads pre-configured sound files from local storage.
  - Plays sounds through an audio output device connected to the Raspberry Pi.
  - Can be triggered by real-time signals received from the frontend app.

---

### 3. **Frontend App Code**
- **Framework**: React Native
- **Features**:
  - **Authentication**: Uses Firebase Authentication for user login and registration.
  - **Database**: Stores real-time intrusion data in Firestore.
  - **Dashboard**:
    - Displays the current status of the repellent system.
    - Shows real-time alerts and logs of animal intrusions.
  - **Connection to Raspberry Pi**: Interacts with the Raspberry Pi to trigger sound playback.
- **Folder**: `frontend/`
  - `App.js`: Main entry point.
  - `firebaseConfig.js`: Contains Firebase project configuration.
  - `screens/`: Includes various app screens 
  - `components/`: Reusable UI components.

---

### 4. **Database**
- **Service**: Firebase Firestore
- **Structure**:
  - `users`: Stores user profiles and authentication details.
  - `intrusions`: Logs all detected intrusions, including timestamp and species.
  - `settings`: Stores app configuration and repellent settings.

---

## Setup and Installation

### Prerequisites
1. MATLAB (for generating and processing sound frequencies).
2. Python 3.x (for Raspberry Pi code).
3. Node.js and npm (for the React Native app).
4. Firebase account with Firestore and Authentication enabled.

### Step 1: Set Up MATLAB Code
- Navigate to `matlab/elephant` and `matlab/tiger` directories.
- Run the respective `bee_sound_enhancement.m` and `vervet_sound_enhancement.m` scripts to generate enhanced sound files.
- Save the generated `.wav` files for use in the Raspberry Pi.

### Step 2: Deploy Raspberry Pi Code
1. Transfer the generated `.wav` files to the Raspberry Pi.
2. Install necessary Python libraries:
   ```bash
   pip install pyaudio numpy
   ```
3. Run the `raspberry_pi_sound_player.py` script:
   ```bash
   python raspberry_pi_sound_player.py
   ```

### Step 3: Set Up React Native App
1. Navigate to the `frontend/` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Firebase by replacing the content of `firebaseConfig.js` with your Firebase project credentials.
4. Run the app on an emulator or physical device:
   ```bash
   npx react-native run-android
   ```

---

## Usage
1. Start the MATLAB scripts to generate enhanced sound frequencies.
2. Run the Python code on the Raspberry Pi to enable sound playback.
3. Launch the React Native app to monitor and control the system.
4. Use the app’s dashboard to receive real-time alerts and log entries when an animal intrusion is detected.

---

## Future Enhancements
- Add support for more species using additional sound patterns.
- Implement advanced AI-based detection and classification.
- Extend the app’s functionality to allow remote configuration of repellent settings.



