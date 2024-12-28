import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ExpertDashboard = ({ navigation }) => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(''); // State to hold the logged-in user's name

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchExpertData = async () => {
      try {
        const currentUser = auth.currentUser; // Get the current logged-in expert

        if (currentUser) {
          // Fetch the expert's name from Firestore
          const expertDocRef = doc(db, 'experts', currentUser.uid);
          const expertDoc = await getDoc(expertDocRef);

          if (expertDoc.exists()) {
            setUserName(expertDoc.data().name); // Set the logged-in expert's name
          } else {
            console.log("No such expert document!");
          }
        }

        // Fetch all experts for the list
        const querySnapshot = await getDocs(collection(db, 'users'));
        const expertsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExperts(expertsList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpertData();
  }, []);

  const renderExpert = ({ item, index }) => {
    // Convert timestamp to human-readable format
    const joinDate = new Date(item.createdAt.seconds * 1000).toLocaleDateString();

    return (
      <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
        <Text style={styles.cell}>{index + 1}</Text>
        <Text style={styles.cell}>{item.name}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Progress', { expertId: item.id })}
        >
          <Text style={styles.buttonText}>View Progress</Text>
        </TouchableOpacity>
      </View>
    );
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
      {/* Dynamic greeting */}
      <Text style={styles.greeting}>Hello, {userName ? userName : 'Expert'}!</Text>

      <Text style={styles.title}>Expert Dashboard</Text>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.cell]}>#</Text>
          <Text style={[styles.headerCell, styles.cell]}>Name</Text>
          <Text style={[styles.headerCell, styles.cell]}>Action</Text>
        </View>
        <FlatList
          data={experts}
          keyExtractor={(item) => item.id}
          renderItem={renderExpert}
        />
      </View>
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
  table: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    padding: 10,
  },
  headerCell: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: '#ffffff',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    flexWrap: 'wrap',
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ExpertDashboard;
