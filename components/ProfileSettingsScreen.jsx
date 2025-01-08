import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Modal } from 'react-native';
import { TextInput, Button, Text, IconButton, ActivityIndicator, Portal, Provider } from 'react-native-paper';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updateEmail, updateProfile, deleteUser } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; // Adjust the import based on your setup
import { useSelector } from 'react-redux'; // Import useSelector to get user data from Redux store

const ProfileSettingsScreen = () => {
  const user = useSelector(state => state.user); // Access the user from Redux store
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [actionType, setActionType] = useState(''); // 'save' or 'delete'

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const firebaseUser = auth.currentUser;
        if (firebaseUser) {
          const docRef = doc(db, 'users', firebaseUser.uid); // Reference to the 'users' collection using UID
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserName(userData.name); // Set the user's name from Firestore
            setUserEmail(userData.email); // Set the user's email from Firestore
            setNewName(userData.name); // Default to Firestore name if available
            setNewEmail(userData.email); // Default to Firestore email if available
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    if (!currentPassword) {
      setError('Please enter your password to confirm.');
      return;
    }

    setLoading(true);

    try {
      const firebaseUser = auth.currentUser;
      if (firebaseUser) {
        // Reauthenticate the user with the current password
        const credential = EmailAuthProvider.credential(firebaseUser.email, currentPassword);
        await reauthenticateWithCredential(firebaseUser, credential);

        // Update the user's name and email
        if (newName && newName !== firebaseUser.displayName) {
          await updateProfile(firebaseUser, { displayName: newName });
          setUserName(newName); // Update state
        }
        if (newEmail && newEmail !== firebaseUser.email) {
          await updateEmail(firebaseUser, newEmail);
          setUserEmail(newEmail); // Update state
        }

        // Update the name and email in Firestore as well
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        await updateDoc(userDocRef, { name: newName || firebaseUser.displayName, email: newEmail || firebaseUser.email });

        Alert.alert('Success', 'Your profile has been updated successfully.');
        setIsPasswordModalVisible(false);
      }
    } catch (error) {
      setError(error.message || 'An error occurred while saving changes.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentPassword) {
      setError('Please enter your password to confirm.');
      return;
    }

    setLoading(true);

    try {
      const firebaseUser = auth.currentUser;
      if (firebaseUser) {
        // Reauthenticate the user with the current password
        const credential = EmailAuthProvider.credential(firebaseUser.email, currentPassword);
        await reauthenticateWithCredential(firebaseUser, credential);

        // Deactivate the user account (update status to inactive in Firestore)
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        await updateDoc(userDocRef, { status: 'inactive' });

        // Optionally, delete expert's status if needed
        const expertDocRef = doc(db, 'experts', firebaseUser.uid);
        await updateDoc(expertDocRef, { status: 'inactive' });

        // Now delete the user account
        await deleteUser(firebaseUser);

        Alert.alert('Success', 'Your account has been deleted successfully.');
        setIsPasswordModalVisible(false);
      }
    } catch (error) {
      setError(error.message || 'An error occurred while deleting the account.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openPasswordModal = (action) => {
    setActionType(action);
    setIsPasswordModalVisible(true);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Profile Settings</Text>
        
        {/* Name Editable */}
        <View style={styles.inputContainer}>
          <TextInput
            label="Name"
            value={isNameEditing ? newName : userName}
            onChangeText={setNewName}
            disabled={!isNameEditing}
            style={styles.input}
            mode="outlined"
          />
          {!isNameEditing && (
            <IconButton
              icon="pencil"
              size={20}
              onPress={() => setIsNameEditing(true)}
            />
          )}
        </View>

        {/* Email Editable */}
        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            value={isEmailEditing ? newEmail : userEmail}
            onChangeText={setNewEmail}
            disabled={!isEmailEditing}
            style={styles.input}
            mode="outlined"
          />
          {!isEmailEditing && (
            <IconButton
              icon="pencil"
              size={20}
              onPress={() => setIsEmailEditing(true)}
            />
          )}
        </View>

        {/* Save Changes Button */}
        <Button
          mode="contained"
          onPress={() => openPasswordModal('save')}
          style={styles.button}
        >
          Save Changes
        </Button>

        {/* Delete Account Button */}
        <Button
          mode="contained"
          onPress={() => openPasswordModal('delete')}
          style={[styles.button, { backgroundColor: 'red' }]}
        >
          Delete Account
        </Button>

        {/* Error Message */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Password Confirmation Modal */}
        <Portal>
          <Modal visible={isPasswordModalVisible} onDismiss={() => setIsPasswordModalVisible(false)} contentContainerStyle={styles.modal}>
            <TextInput
              label="Enter Password to Confirm"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              style={styles.input}
              mode="outlined"
            />
            <Button
              mode="contained"
              onPress={actionType === 'save' ? handleSaveChanges : handleDeleteAccount}
              style={styles.modalButton}
            >
              {actionType === 'save' ? 'Save Changes' : 'Delete Account'}
            </Button>
            <Button
              mode="text"
              onPress={() => setIsPasswordModalVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    paddingHorizontal: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
  },
  button: {
    marginVertical: 10,
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalButton: {
    marginTop: 10,
  },
});

export default ProfileSettingsScreen;