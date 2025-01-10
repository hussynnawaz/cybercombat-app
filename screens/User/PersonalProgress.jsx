import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { ActivityIndicator, Text, Card, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { db, auth } from '../../firebaseConfig';
import { doc, getDoc, Timestamp } from 'firebase/firestore';

/**
 * This component fetches and displays the user's progress data from Firestore.
 * It uses React hooks for managing state and side effects.
 */
const PersonalProgress = () => {
  // State hook to store user data fetched from Firestore
  const [userData, setUserData] = useState(null);
  // State hook to manage loading state
  const [loading, setLoading] = useState(true);

  // Access the current user data from the Redux store
  const user = useSelector(state => state.user);

  // Effect hook that runs once when the component mounts
  useEffect(() => {
    // Asynchronous function to fetch user data from Firestore
    const fetchUserData = async () => {
      console.log('Fetching user data...'); // Log the start of the fetch

      try {
        // Get the currently authenticated user from Firebase Auth
        const currentUser = auth.currentUser;
        if (currentUser) {
          console.log('Current user:', currentUser); // Log current user info

          // Reference the user's document in Firestore using their UID
          const userDocRef = doc(db, 'users', currentUser.uid);
          // Fetch the document from Firestore
          const userDoc = await getDoc(userDocRef);

          // Check if the document exists
          if (userDoc.exists()) {
            console.log('User document found:', userDoc.data()); // Log the document data
            setUserData(userDoc.data()); // Store document data in state
          } else {
            console.log('No such user document!'); // Log if no document is found
          }
        } else {
          console.log('No current user'); // Log if no current user is authenticated
        }
      } catch (error) {
        console.error('Error fetching user data:', error); // Log errors
        Alert.alert('Error', 'Failed to fetch user data.'); // Alert the user in case of an error
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchUserData(); // Invoke the fetch function

  }, [user.uid]); // Dependency array: runs effect when user ID changes

  /**
   * Formats a Firestore Timestamp to a readable date string.
   * @param {Timestamp} timestamp The timestamp to format.
   * @returns {string} The formatted date string or 'N/A' if invalid.
   */
  const formatDate = timestamp =>
    timestamp instanceof Timestamp ? timestamp.toDate().toLocaleString() : 'N/A';

  // Render a loading spinner while data is being fetched
  if (loading) {
    console.log('Loading...'); // Log loading state
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading your progress...</Text>
      </View>
    );
  }

  console.log('Loading complete. User data:', userData); // Log when loading is complete

  // Render the user's progress data in a scrollable card layout
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Card.Title
          title="Your Progress"
          titleStyle={styles.cardTitle}
          style={styles.cardHeader}
        />
        <Card.Content>
          {[
            { label: 'Name', value: userData?.name || 'N/A' },
            { label: 'Videos Watched', value: userData?.videosWatched || 'N/A' },
            { label: 'Certificate Issue Date', value: formatDate(userData?.certIssueDate) },
            { label: 'Issued by Expert', value: 'To be added' }
          ].map((item, index) => (
            <React.Fragment key={index}>
              <View style={styles.row}>
                <Text style={styles.header}>{item.label}:</Text>
                <Text style={styles.value}>{item.value}</Text>
              </View>
              <Divider style={styles.divider} />
            </React.Fragment>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#3498db',
    fontWeight: '500',
  },
  content: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  card: {
    margin: 15,
    elevation: 5,
    borderRadius: 12,
    padding: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardHeader: {
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'column',
    marginVertical: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  value: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 6,
    fontWeight: '400',
  },
  divider: {
    marginVertical: 8,
    backgroundColor: '#BDC3C7',
  },
});

export default PersonalProgress;
