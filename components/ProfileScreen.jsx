import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, IconButton, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

function ProfileScreen() {
  const [username, setUsername] = useState('');
  const [greeting, setGreeting] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'users', user.uid); // Reference to the 'users' collection using UID
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUsername(userData.name); // Set the user's name from the database
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return 'Good Morning';
      } else if (currentHour < 18) {
        return 'Good Afternoon';
      } else {
        return 'Good Evening';
      }
    };

    fetchUserData();
    setGreeting(getGreeting());
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('SplashScreen'); // Navigate to the Splash Screen after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.greeting}>{greeting}, {username || 'User'}</Text>
      </Card>

      {/* Profile Card */}
      <TouchableRipple onPress={() => navigation.navigate('ProfileSettingsScreen')} style={styles.card}>
        <Card>
          <Card.Title title="Profile" left={(props) => <IconButton {...props} icon="account" />} />
        </Card>
      </TouchableRipple>

      {/* Password Card */}
      <TouchableRipple onPress={() => navigation.navigate('ChangePasswordScreen')} style={styles.card}>
        <Card>
          <Card.Title title="Password" left={(props) => <IconButton {...props} icon="lock" />} />
        </Card>
      </TouchableRipple>

      {/* Progress Card */}
      <TouchableRipple onPress={() => navigation.navigate('PersonalProgress')} style={styles.card}>
        <Card>
          <Card.Title title="Progress" left={(props) => <IconButton {...props} icon="bar-chart" />} />
        </Card>
      </TouchableRipple>

      {/* Logout Button */}
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleLogout}
        color="#d9534f"
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
  card: {
    marginVertical: 10,
    width: '100%',
    padding: 10,
  },
});

export default ProfileScreen;
