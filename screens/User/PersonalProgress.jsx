import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { ActivityIndicator, Text, Card, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { db, auth } from '../../firebaseConfig';
import { doc, getDoc, Timestamp } from 'firebase/firestore';

const PersonalProgress = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useSelector(state => state.user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log('No such user document!');
          }
        } else {
          console.log('No current user');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = timestamp => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleString();
    }
    return 'N/A';
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} size="large" color="#3498db" />
          <Text style={styles.loadingText}>Loading data...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <Card style={styles.card}>
            <Card.Title
              title="Your Progress"
              titleStyle={styles.cardTitle}
              style={styles.cardHeader}
            />
            <Card.Content>
              <View style={styles.row}>
                <Text style={styles.header}>Name:</Text>
                <Text style={styles.value}>{userData?.name || 'N/A'}</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.header}>Videos Watched:</Text>
                <Text style={styles.value}>{userData?.videosWatched || 'N/A'}</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.header}>Certificate Issue Date:</Text>
                <Text style={styles.value}>{formatDate(userData?.certIssueDate)}</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.header}>Issued by Expert:</Text>
                {/* Uncomment and replace the following line when adding this field */}
                {/* <Text style={styles.value}>{userData?.expertName || 'N/A'}</Text> */}
                <Text style={styles.value}>To be added</Text>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  content: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  card: {
    margin: 10,
    elevation: 3,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  cardHeader: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  divider: {
    marginVertical: 5,
    backgroundColor: '#ddd',
  },
});

export default PersonalProgress;
