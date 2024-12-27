import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Video } from 'expo-av';
import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const BoxingBasic = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isVideoCompleted, setVideoCompleted] = useState(false);
  const videoRef = React.useRef(null);
  const db = getFirestore();
  const auth = getAuth();

  const title = 'Jab';
  const description =
    'Master the jab to improve your speed, precision, and power. A well-executed jab can disorient your opponent, set up combos, and control the pace of the fight, delivering a quick and effective strike to keep them on the defensive';
const consequence = 'A strong jab can cause bruising, disorientation, or temporary vision loss.'
const speed='Speed: 10/10'
const power='Power: 7/10'
const Accuracy='Accuracy: 9/10'


  const videoSource = require('../../assets/BoxingExerciseVideos/Jab.mp4');

  const handleVideoCompletion = async () => {
    setVideoCompleted(true);
    setModalVisible(false);

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userDocRef, {
          videosWatched: increment(1), // Use `increment` from Firestore
        });
      }
    } catch (error) {
      console.error("Error updating user's videosWatched field: ", error);
    }
  };

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.videoTitle}>{title}</Text>

      <TouchableOpacity
        style={styles.watchButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.watchButtonText}>Watch Video</Text>
      </TouchableOpacity>

      <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionTitle}>Speed:</Text>
      <Text style={styles.descriptionText}>{speed}</Text>
      <Text style={styles.descriptionTitle}>Power:</Text>
        <Text style={styles.descriptionText}>{power}</Text>
        <Text style={styles.descriptionTitle}>Accuracy:</Text>
        <Text style={styles.descriptionText}>{Accuracy}</Text>
    
        <Text style={styles.descriptionTitle}>Description:</Text>
        <Text style={styles.descriptionText}>{description}</Text>
        <Text style={styles.descriptionTitle}>Consequence:</Text>
        <Text style={styles.descriptionText}>{consequence}</Text>
      
      </View>
       

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Video
            ref={videoRef}
            source={videoSource}
            style={styles.videoPlayer}
            resizeMode="contain"
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) handleVideoCompletion();
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  videoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
    textAlign: 'center',
  },
  watchButton: {
    padding: 15,
    backgroundColor: '#3498db',
    borderRadius: 8,
    marginBottom: 20,
  },
  watchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  descriptionContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  videoPlayer: {
    width: '90%',
    height: '50%',
    backgroundColor: '#000',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default BoxingBasic;
