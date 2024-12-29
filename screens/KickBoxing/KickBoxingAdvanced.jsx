import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Video } from 'expo-av';
import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const KickBoxingAdvanced = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const db = getFirestore();
  const auth = getAuth();
  const videoDetails = [
    {
      title: 'Jab RoundHouse',
      videoSource: require('../../assets/KickBoxing/ad1.mp4'),
      description: 'The Jab Roundhouse is a combination of the quick jab to set up an opponent and a powerful roundhouse kick. The jab disrupts the opponent’s rhythm, while the roundhouse kick delivers significant impact to the head or body. This combination is effective in close to medium range, overwhelming the opponent with speed and force.',
      speed: 'Speed: 7/10',
      power: 'Power: 8/10',
      accuracy: 'Accuracy: 8/10',
      consequence: 'A successful jab roundhouse combo can disorient or knock down the opponent.'
    },
    {
      title: 'Jumping Front Kick',
      videoSource: require('../../assets/KickBoxing/ad2.mp4'),
      description: 'The Jumping Front Kick is an explosive technique where the fighter jumps into the kick, targeting the opponent’s midsection or head. This kick utilizes momentum and power, delivering a forceful strike with minimal telegraphing. It’s an excellent tool for closing distance or overwhelming an opponent.',
      speed: 'Speed: 8/10',
      power: 'Power: 9/10',
      accuracy: 'Accuracy: 7/10',
      consequence: 'A successful jumping front kick can knock the wind out of the opponent or destabilize their stance.'
    },
    {
      title: 'Block Jump Front Kick',
      videoSource: require('../../assets/KickBoxing/ad3.mp4'),
      description: 'The Block Jump Front Kick is a defensive technique that transitions into an offensive strike. First, the fighter blocks an incoming attack, then immediately jumps into a front kick aimed at the opponent’s midsection or head. This combo is effective for both defense and offense, utilizing quick reflexes to gain control.',
      speed: 'Speed: 7/10',
      power: 'Power: 8/10',
      accuracy: 'Accuracy: 7/10',
      consequence: 'A successful Block Jump Front Kick can off-balance the opponent and create a strong counter-attack opportunity.'
    },
    {
      title: 'Jab Cross Front Kick',
      videoSource: require('../../assets/KickBoxing/ad4.mp4'),
      description: 'The Jab Cross Front Kick is a fluid combination of punches followed by a front kick. The jab and cross create an opening in the opponent’s defense, setting up the front kick to finish the sequence. This combination is effective for maintaining pressure and controlling the pace of the fight.',
      speed: 'Speed: 8/10',
      power: 'Power: 7/10',
      accuracy: 'Accuracy: 9/10',
      consequence: 'A successful jab-cross-front kick combo can disorient the opponent and create openings for further strikes.'
    },
    {
      title: 'Jump Spinning Wheel Kick',
      videoSource: require('../../assets/KickBoxing/ad5.mp4'),
      description: 'The Jump Spinning Wheel Kick is an advanced move where the fighter jumps and spins while executing a roundhouse kick. This kick delivers powerful force while taking the opponent by surprise, targeting the head or body. It is a high-risk, high-reward strike, effective at overwhelming or knocking out the opponent.',
      speed: 'Speed: 8/10',
      power: 'Power: 10/10',
      accuracy: 'Accuracy: 7/10',
      consequence: 'A successful Jump Spinning Wheel Kick can lead to a knockout or severely impact the opponent’s ability to continue.'
    },
    {
      title: 'Spinning Hook Advance',
      videoSource: require('../../assets/KickBoxing/ad6.mp4'),
      description: 'The Spinning Hook Advance is a combination of a spinning motion followed by a hook kick aimed at the opponent’s head or body. This technique utilizes speed and surprise, often catching the opponent off guard. It is a powerful strike, capable of causing significant damage.',
      speed: 'Speed: 8/10',
      power: 'Power: 9/10',
      accuracy: 'Accuracy: 8/10',
      consequence: 'A successful Spinning Hook Advance can result in a knockout or cause serious head or body injuries.'
    },
    {
      title: '360 Kick Advance',
      videoSource: require('../../assets/KickBoxing/ad7.mp4'),
      description: 'The 360 Kick Advance is a dynamic and powerful spinning kick, where the fighter spins 360 degrees before delivering the strike. It is often aimed at the head or upper body, and the spinning motion adds considerable power to the kick. This kick is effective for breaking through defenses and catching opponents by surprise.',
      speed: 'Speed: 7/10',
      power: 'Power: 8/10',
      accuracy: 'Accuracy: 7/10',
      consequence: 'A successful 360 Kick Advance can disorient the opponent or cause a severe knockout if delivered correctly.'
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
      <Text style={styles.videoTitle}>KickBoxing Basic Techniques</Text>

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
      backgroundColor: '#f5f5f5', // Lighter background for contrast
    },
    videoTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 15,
      color: '#333',
      textAlign: 'center',
    },
    videoRow: {
      marginVertical: 20,
      alignItems: 'center',
      width: '100%',
    },
    watchButton: {
      padding: 20,
      backgroundColor: '#3498db',
      borderRadius: 12,
      marginBottom: 15,
      width: '100%', // Increased width
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 5, 
      
    },
    watchButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '700', // Bolder text for impact
      textAlign: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    descriptionContainer: {
      width: '100%',
      padding: 15,
      backgroundColor: 'rgba(255, 255, 255, 0.85)', // More opacity for readability
      borderRadius: 12,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 5, // Android shadow
    },
    descriptionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginBottom: 8,
    },
    descriptionText: {
      fontSize: 16,
      color: '#555',
      lineHeight: 24, // Improve readability
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
      borderRadius: 12, // Rounded corners for the video player
      overflow: 'hidden', // Ensures the video fits within rounded corners
    },
    closeButton: {
      marginTop: 20,
      padding: 12,
      backgroundColor: '#e74c3c',
      borderRadius: 12,
      width: '60%', // Button width adjustment
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '700', // Bolder text for emphasis
      textAlign: 'center',
    },
  });
  

export default KickBoxingAdvanced;
