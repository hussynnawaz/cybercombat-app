import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Video } from 'expo-av';
import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const MuayThaiBasic = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const db = getFirestore();
  const auth = getAuth();

  const videoDetails = [
    {
      title: 'Elbow Hook',
      videoSource: require('../../assets/MuayThai/mt-basic1.mp4'),
      description: 'The elbow hook is a close-range strike with the elbow, aimed to hit the opponent’s head or body with a sharp, angular motion.',
      speed: 'Speed: 7/10',
      power: 'Power: 9/10',
      accuracy: 'Accuracy: 8/10',
      consequence: 'A successful elbow hook can cause cuts, bruises, or knockout injuries.'
    },
    {
      title: 'Knee Jump',
      videoSource: require('../../assets/MuayThai/mtbasic2.mp4'),
      description: 'The knee jump is a powerful strike where you leap forward and drive your knee into the opponent, typically targeting their midsection or head.',
      speed: 'Speed: 8/10',
      power: 'Power: 10/10',
      accuracy: 'Accuracy: 7/10',
      consequence: 'A knee jump can break ribs, cause internal injuries, or lead to a knockout if executed correctly.'
    }
  ];

  const handleVideoCompletion = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userDocRef, {
          videosWatched: increment(1),
        });
      }
    } catch (error) {
      console.error("Error updating user's videosWatched field: ", error);
    }
    setModalVisible(false);
  };

  const handleVideoClick = (index) => {
    setCurrentVideo(videoDetails[index]);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.videoTitle}>Muay Thai Basics</Text>

      <View style={styles.videoRow}>
        <TouchableOpacity
          style={styles.watchButton}
          onPress={() => handleVideoClick(0)}
        >
          <Text style={styles.watchButtonText}>Watch Elbow Hook Video</Text>
        </TouchableOpacity>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Speed:</Text>
          <Text style={styles.descriptionText}>{videoDetails[0].speed}</Text>
          <Text style={styles.descriptionTitle}>Power:</Text>
          <Text style={styles.descriptionText}>{videoDetails[0].power}</Text>
          <Text style={styles.descriptionTitle}>Accuracy:</Text>
          <Text style={styles.descriptionText}>{videoDetails[0].accuracy}</Text>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.descriptionText}>{videoDetails[0].description}</Text>
          <Text style={styles.descriptionTitle}>Consequence:</Text>
          <Text style={styles.descriptionText}>{videoDetails[0].consequence}</Text>
        </View>
      </View>

      <View style={styles.videoRow}>
        <TouchableOpacity
          style={styles.watchButton}
          onPress={() => handleVideoClick(1)}
        >
          <Text style={styles.watchButtonText}>Watch Knee Jump Video</Text>
        </TouchableOpacity>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Speed:</Text>
          <Text style={styles.descriptionText}>{videoDetails[1].speed}</Text>
          <Text style={styles.descriptionTitle}>Power:</Text>
          <Text style={styles.descriptionText}>{videoDetails[1].power}</Text>
          <Text style={styles.descriptionTitle}>Accuracy:</Text>
          <Text style={styles.descriptionText}>{videoDetails[1].accuracy}</Text>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.descriptionText}>{videoDetails[1].description}</Text>
          <Text style={styles.descriptionTitle}>Consequence:</Text>
          <Text style={styles.descriptionText}>{videoDetails[1].consequence}</Text>
        </View>
      </View>

      {/* Video Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Video
            source={currentVideo?.videoSource}
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
  videoRow: {
    marginVertical: 20,
    alignItems: 'center',
  },
  watchButton: {
    padding: 15,
    backgroundColor: '#3498db',
    borderRadius: 8,
    marginBottom: 10,
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

export default MuayThaiBasic;
