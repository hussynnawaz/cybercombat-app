import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Button, DataTable } from 'react-native-paper';

const ExpertDashboard = ({ navigation }) => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchExpertData = async () => {
      console.log('Starting to fetch expert data...');
      try {
        // Get the current authenticated user
        const currentUser = auth.currentUser;
        console.log('Current user:', currentUser);

        if (currentUser) {
          // Get the expert document for the current user
          const expertDocRef = doc(db, 'experts', currentUser.uid);
          const expertDoc = await getDoc(expertDocRef);
          console.log('Expert document:', expertDoc);

          // Get the name of the current user from the expert document
          if (expertDoc.exists()) {
            const expertData = expertDoc.data();
            setUserName(expertData.name);
            console.log('User name set to:', expertData.name);
          } else {
            console.log('No such expert document!');
          }
        }

        // Get all the users and store them in the experts state
        const querySnapshot = await getDocs(collection(db, 'users'));
        const expertsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          // Get the data from the document snapshot
          // and spread it into an object
          ...doc.data(),
        }));
        setExperts(expertsList);
        console.log('Experts data set:', expertsList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        // Set the loading state to false once the data has been fetched
        setLoading(false);
        console.log('Fetch expert data completed');
      }
    };

    fetchExpertData();
  }, []);

  const handleNameClick = (user) => {
    console.log('Navigating to IndividualProgressScreen with user:', user);
    navigation.navigate('IndividualProgressScreen', { user });
  };

  if (loading) {
    console.log('Loading state...');
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {userName ? userName : 'Expert'}!</Text>
      <Text style={styles.title}>Expert Dashboard</Text>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>#</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
        </DataTable.Header>

        {experts.map((item, index) => (
          <DataTable.Row key={item.id} onPress={() => handleNameClick(item)}>
            <DataTable.Cell>{index + 1}</DataTable.Cell>
            <DataTable.Cell style={styles.nameCell}>
              <Text style={styles.nameText}>{item.name}</Text>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <Button
        mode="contained"
        onPress={() => {
          console.log('Navigating to ProgressScreen');
          navigation.navigate('ProgressScreen');
        }}
        style={styles.button}
      >
        View Detailed Progress
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#3498db',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  nameText: {
    fontSize: 18,
    color: '#3498db',
    textDecorationLine: 'underline',
  },
  nameCell: {
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#3498db',
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
  },
});

export default ExpertDashboard;
