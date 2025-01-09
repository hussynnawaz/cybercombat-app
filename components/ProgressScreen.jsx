import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ProgressScreen = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();
  const navigation = useNavigation();

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTableData(usersData);
      } catch (error) {
        console.error('Error fetching user data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Function to issue the certificate
  const issueCertificate = async (userId, userName) => {
    try {
      console.log(`Attempting to issue certificate to ${userName} (User ID: ${userId})`);

      // API call to issue certificate
      const response = await axios.post('http://192.168.1.5:5000/issue_cert', {
        user_id: userId,
      });

      // Log the response and show alert on success
      console.log(response.data);
      Alert.alert('Success', `Certificate issued to ${userName} successfully!`);
    } catch (error) {
      console.error('Error issuing certificate:', error);
      Alert.alert('Error', 'An error occurred while issuing the certificate.');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {tableData.map((user, index) => (
            <Card key={index} style={styles.card}>
              <Card.Content>
                <Text style={styles.cardTitle}>User Progress</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Name:</Text>
                  <Text style={styles.value}>{user.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Email:</Text>
                  <Text style={styles.value}>{user.email}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Videos Watched:</Text>
                  <Text style={styles.value}>{user.videosWatched}</Text>
                </View>
                <Button
                  mode="contained"
                  onPress={() => issueCertificate(user.id, user.name)}
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                >
                  Issue Certificate
                </Button>
              </Card.Content>
            </Card>
          ))}
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
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#3498db',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonLabel: {
    color: '#fff',
  },
});

export default ProgressScreen;
