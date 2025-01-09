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
      try {
        const currentUser = auth.currentUser;

        if (currentUser) {
          const expertDocRef = doc(db, 'experts', currentUser.uid);
          const expertDoc = await getDoc(expertDocRef);

          if (expertDoc.exists()) {
            setUserName(expertDoc.data().name);
          } else {
            console.log('No such expert document!');
          }
        }

        const querySnapshot = await getDocs(collection(db, 'users'));
        const expertsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExperts(expertsList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpertData();
  }, []);

  const handleNameClick = (user) => {
    navigation.navigate('IndividualProgressScreen', { user });
  };

  if (loading) {
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
        onPress={() => navigation.navigate('ProgressScreen')}
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
