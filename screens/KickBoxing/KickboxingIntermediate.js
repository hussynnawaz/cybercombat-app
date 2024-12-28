import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Video } from 'expo-av';
import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const KickBoxingBasic = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const db = getFirestore();
  const auth = getAuth();
  const videoDetails = [
    {
      title: 'Jab Cross Front Kick',
      videoSource: require('../../assets/KickBoxing/int1.mp4'),
      description: 'The Front Kick is a versatile technique used in kickboxing to strike the opponent’s midsection or head. Delivered with a straight leg and a push from the hip, this kick can generate significant force with minimal telegraphing. It is commonly used to create distance, set up other strikes, or disrupt the opponent’s rhythm.',
      speed: 'Speed: 6/10',
      power: 'Power: 7/10',
      accuracy: 'Accuracy: 9/10',
      consequence: 'A successful front kick can disorient or destabilize the opponent, potentially setting up a follow-up strike.'
    },
    {
      title: 'Double RoundHouse Kick',
      videoSource: require('../../assets/KickBoxing/int2.mp4'),
      description: 'The Side Kick in kickboxing is an explosive, lateral strike using the edge of the foot or heel. It is aimed at an opponent’s torso or legs, often used to create distance or push back an opponent. With its focus on precision and power, the side kick can disable an opponent’s ability to close the distance and attack effectively.',
      speed: 'Speed: 8/10',
      power: 'Power: 9/10',
      accuracy: 'Accuracy: 8/10',
      consequence: 'A successful side kick can off-balance an opponent, and when targeted at the legs, it can cause significant pain or injury.'
    },
    {
      title: 'Spin Side Kick',
      videoSource: require('../../assets/KickBoxing/int3.mp4'),
      description: 'The Roundhouse Kick is a powerful, sweeping kick often seen in kickboxing, utilizing the shin or foot to strike an opponent. This kick is delivered in a circular motion and can target the opponent’s head, body, or legs. With its speed and versatility, it is one of the most effective weapons for overwhelming opponents in close or medium range.',
      speed: 'Speed: 8/10',
      power: 'Power: 9/10',
      accuracy: 'Accuracy: 8/10',
      consequence: 'A well-placed roundhouse kick can cause significant damage, including bruising, cuts, or knockout if delivered to the head.'
    },
    {
      title: 'High Round House Kick',
      videoSource: require('../../assets/KickBoxing/int4.mp4'),
      description: 'The Axe Kick is an overhead strike that descends sharply, often targeting an opponent’s head or shoulders. In kickboxing, it’s a surprise attack designed to land with the heel or foot in a powerful, downward motion. This kick is effective at breaking through defenses when the opponent is focused on lower attacks or has their guard up.',
      speed: 'Speed: 7/10',
      power: 'Power: 9/10',
      accuracy: 'Accuracy: 7/10',
      consequence: 'A well-executed axe kick can result in a knockout or cause serious head or shoulder injuries due to the impact of the downward strike.'
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
  

export default KickBoxingBasic;
