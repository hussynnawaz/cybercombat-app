import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { getFirestore, doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const UploadScreen = () => {
  const db = getFirestore();
  const auth = getAuth();
  const [selectedMedia, setSelectedMedia] = useState(null); // To store selected media

  const pickMedia = async () => {
    try {
      // Request permissions to access media
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'You need to grant media library access to select files.');
        return;
      }

      // Open media picker (image or video)
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow both images and videos
        multiple: true, // Allow multiple files to be selected
      });

      if (!result.canceled && result.assets.length > 0) {
        setSelectedMedia(result.assets); // Save selected media assets
        uploadMedia(result.assets); // Proceed to upload media
      } else {
        Alert.alert('Cancelled', 'No media selected.');
      }
    } catch (error) {
      console.error('Error picking media:', error);
      Alert.alert('Error', 'Unable to pick media.');
    }
  };

  const uploadMedia = async (assets) => {
    try {
      const currentUser = auth.currentUser; // Get the current logged-in user
      if (currentUser) {
        const uid = currentUser.uid;
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);
        const userName = userDoc.exists() ? userDoc.data().name : 'Unknown User';

        for (let asset of assets) {
          const uri = asset.uri;
          const fileType = asset.type; // "image" or "video"
          const mimeType = fileType === 'image' ? 'image/jpeg' : 'video/mp4'; // Handle MIME types accordingly

          // Read the file
          const fileInfo = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          let data = new FormData();
          data.append('file', {
            uri,
            type: mimeType, // Set MIME type based on the file type
            name: uri.split('/').pop(),
            data: fileInfo,
          });

          const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://woo-management.com/file.php',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data,
          };

          // Upload the media
          axios
            .request(config)
            .then(async (response) => {
              const fileURL = response.data?.file_url;

              // Add media entry to Firestore
              const mediaRef = collection(doc(db, 'users', uid), 'media'); // Subcollection for media
              await addDoc(mediaRef, {
                fileURL,
                uploadDate: serverTimestamp(),
                userName,
                uid,
                mediaType: fileType, // Store media type (image or video)
              });

              Alert.alert('Success', 'Media uploaded successfully!');
            })
            .catch((error) => {
              console.error('Error uploading media:', error);
              Alert.alert('Error', 'Failed to upload media.');
            });
        }
      } else {
        Alert.alert('Error', 'User not logged in.');
      }
    } catch (error) {
      console.error('Error uploading media:', error);
      Alert.alert('Error', 'Failed to upload media.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Media</Text>
      <Button title="Pick Media" onPress={pickMedia} color="#1E90FF" />
      {selectedMedia && (
        <View style={styles.mediaContainer}>
          <Text style={styles.mediaText}>
            {selectedMedia.length} media file(s) selected.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  mediaContainer: {
    marginTop: 20,
  },
  mediaText: {
    fontSize: 16,
    color: '#555',
  },
});

export default UploadScreen;
