import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; 
import { useNavigation } from '@react-navigation/native';

const ProgressScreen = () => {
  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState(['Name', 'Email', 'Videos Watched', 'Action']);
  
  const db = getFirestore();
  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map(doc => doc.data());
        const formattedData = usersData.map(user => [
          user.name, // Referencing the correct 'name' field from Firestore
          user.email,
          user.videosWatched,
          <Button title="Issue Certificate" onPress={() => issueCertificate(user.name)} />
        ]);
        setTableData(formattedData);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchUserData();
  }, []);

  const issueCertificate = (userName) => {
 
    console.log(`Issuing certificate to ${userName}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <Table borderStyle={styles.tableBorder}>
          <Row data={tableHead} style={styles.tableHead} textStyle={styles.tableText} />
          <Rows data={tableData} textStyle={styles.tableText} />
        </Table>
      </ScrollView>
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
});

export default ProgressScreen;
