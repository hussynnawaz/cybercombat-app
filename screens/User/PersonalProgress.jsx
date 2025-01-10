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
          <Text style={styles.loadingText}>Loading your progress...</Text>
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
