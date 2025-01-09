import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Button } from 'react-native-paper';

const IndividualProgressScreen = ({ route, navigation }) => {
  const { user } = route.params; 
  const [userData, setUserData] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', user.id);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log('No such user document!');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, [user.id]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Not available';
    const date = timestamp.toDate(); // Convert Firestore timestamp to JS Date object
    return date.toLocaleString(); // Format the date to a readable string
  };

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
     <Text style={styles.loadingMessage}>Warming up the rocket, your data's almost there! 🚀</Text>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>User Progress</Text>

      <Text style={styles.label}>Name:</Text>
      <Text style={styles.info}>{userData.name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.info}>{userData.email}</Text>

      <Text style={styles.label}>Account Creation Date:</Text>
      <Text style={styles.info}>{formatTimestamp(userData.createdAt)}</Text>

      <Text style={styles.label}>Videos Watched:</Text>
      <Text style={styles.info}>{userData.videosWatched}</Text>

      <Text style={styles.label}>Certification Issue Date:</Text>
      <Text style={styles.info}>{formatTimestamp(userData.certIssueDate) || 'Not issued yet'}</Text>

      <Button
        mode="contained"
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        Go Back
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3498db',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#555',
  },
  button: {
    backgroundColor: '#3498db',
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  loadingMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
});

export default IndividualProgressScreen;
