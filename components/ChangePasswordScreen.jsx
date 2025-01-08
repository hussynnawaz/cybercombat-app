import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChangePassword = async () => {
    setError('');
    if (newPassword !== confirmNewPassword) {
      setError("New passwords don't match!");
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long!');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (user) {
        // Reauthenticate the user with their current password
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Update the password in Firebase Auth
        await updatePassword(user, newPassword);

        // Check if the user is in both "users" and "experts" collections
        const userDocRef = doc(db, 'users', user.uid);
        const expertDocRef = doc(db, 'experts', user.uid);
        
        // Fetch user data from both collections to ensure it's valid for either role
        const userSnap = await getDoc(userDocRef);
        const expertSnap = await getDoc(expertDocRef);
        
        if (userSnap.exists() || expertSnap.exists()) {
          // Successfully updated the password, now update it in the database if needed
          if (userSnap.exists()) {
            await updateDoc(userDocRef, { password: newPassword }); // You may need to store it securely
          }

          if (expertSnap.exists()) {
            await updateDoc(expertDocRef, { password: newPassword }); // Similarly, update for expert if exists
          }

          Alert.alert('Success', 'Password updated successfully!');
        } else {
          throw new Error('User not found in either database.');
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      
      <TextInput
        label="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        style={styles.input}
      />
      
      <TextInput
        label="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />
      
      <TextInput
        label="Confirm New Password"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        secureTextEntry
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        mode="contained"
        loading={loading}
        onPress={handleChangePassword}
        style={styles.button}
      >
        {loading ? 'Updating...' : 'Update Password'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ChangePasswordScreen;
