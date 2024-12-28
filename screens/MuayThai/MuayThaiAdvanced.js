import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Video } from 'expo-av';
import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const MuayThaiAdvanced = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const db = getFirestore();
  const auth = getAuth();

  const videoDetails = [
    {
      title: 'Elbow Hook Combo',
      videoSource: require('../../assets/MuayThai/mtadv1.mp4'),
      description: 'The Elbow Hook Combo is a rapid combination of elbow strikes performed in close range. The technique begins with a swinging elbow hook, followed by a quick follow-up hook with the opposite elbow. It\'s designed to break through an opponent\'s defense and land powerful strikes to the head or body.',
      speed: 'Speed: 6/10',
      power: 'Power: 10/10',
      accuracy: 'Accuracy: 7/10',
      consequence: 'A successful double elbow hook can cause serious facial injuries or a knockout.'
    },
    {
      title: 'Punch Elbow Knee Combo',
      videoSource: require('../../assets/MuayThai/mtadv2.mp4'),
      description: 'The Punch Elbow Knee Combo involves a fluid sequence of attacks, starting with a powerful punch to the opponent’s face or body, followed by a sharp elbow strike, and ending with a decisive knee strike to the midsection or head. This combo is perfect for overwhelming an opponent with speed and force.',
      speed: 'Speed: 8/10',
      power: 'Power: 9/10',
      accuracy: 'Accuracy: 8/10',
      consequence: 'A well-executed front knee hit can cause severe internal injuries or even break the opponent’s ribs.'
    },
    {
      title: 'Elbow Hook Jump Knee Combo',
      videoSource: require('../../assets/MuayThai/mtadv3.mp4'),
      description: 'The Elbow Hook Jump Knee Combo starts with a quick, explosive elbow hook aimed at the opponent\'s head or body, immediately followed by a jump knee strike to the face or chest. This combination is designed to surprise and destabilize an opponent, making it an effective close-range tactic.',
      speed: 'Speed: 8/10',
      power: 'Power: 9/10',
      accuracy: 'Accuracy: 8/10',
      consequence: 'A well-executed jump knee can cause severe impact, often leading to a knockout or serious injury.'
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
      <Text style={styles.videoTitle}>Muay Thai Intermediate Techniques</Text>

      {videoDetails.map((video, index) => (
        <View key={index}>
          {/* Video Section */}
          <View style={styles.videoRow}>
            <TouchableOpacity
              style={styles.watchButton}
              onPress={() => handleVideoClick(index)}
            >
              <Text style={styles.watchButtonText}>Watch {video.title} Video</Text>
            </TouchableOpacity>
          </View>

          {/* Description Section */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Speed:</Text>
            <Text style={styles.descriptionText}>{video.speed}</Text>
            <Text style={styles.descriptionTitle}>Power:</Text>
            <Text style={styles.descriptionText}>{video.power}</Text>
            <Text style={styles.descriptionTitle}>Accuracy:</Text>
            <Text style={styles.descriptionText}>{video.accuracy}</Text>
            <Text style={styles.descriptionTitle}>Description:</Text>
            <Text style={styles.descriptionText}>{video.description}</Text>
            <Text style={styles.descriptionTitle}>Consequence:</Text>
            <Text style={styles.descriptionText}>{video.consequence}</Text>
          </View>
        </View>
      ))}

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
    flexGrow: 1,
    justifyContent: 'flex-start',
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
    width: '100%',
  },
  watchButton: {
    padding: 15,
    backgroundColor: '#3498db',
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  watchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
  },
  descriptionContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    marginVertical: 10,
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

export default MuayThaiAdvanced;
