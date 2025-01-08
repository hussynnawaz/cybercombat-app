import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { useSelector } from 'react-redux';  // Import useSelector to access Redux store
import { db, auth } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const PersonalProgress = () => {
  const [tableData, setTableData] = useState([]);
  const [tableHead] = useState(['Name', 'Email', 'Videos Watched']);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');  // State to store the user's name

  // Fetch user data from Redux store
  const user = useSelector(state => state.user);  // Assuming your Redux store has a `user` slice

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const currentUser = auth.currentUser; // Now auth is imported properly

        if (currentUser) {
          const usersDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(usersDocRef);

          if (userDoc.exists()) {
            setUserName(userDoc.data().name || 'User');
          } else {
            console.log("No such user document!");
          }
        } else {
          console.log("No current user");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        Alert.alert("Error", "Failed to fetch user data.");
      }
    };

    if (user) {
      fetchUsersData();
    }
  }, [user]);  // Depend on `user` to re-fetch data if necessary

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text>Loading data...</Text>
        </View>
      )}
      {!loading && user && tableData.length > 0 && (
        <>
          <Text style={styles.greeting}>Hello, {userName ? userName : 'User'}!</Text>
          <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
            <Table borderStyle={styles.tableBorder}>
              <Row data={tableHead} style={styles.tableHead} textStyle={styles.tableText} />
              <Rows data={tableData} textStyle={styles.tableText} />
            </Table>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  tableHead: {
    height: 40,
    backgroundColor: '#3498db',
  },
  tableText: {
    margin: 6,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
});

export default PersonalProgress;