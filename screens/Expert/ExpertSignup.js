import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ExpertSignup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Create new expert in Firebase Authentication and store expert data in Firestore
  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      // Create user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Save expert data to Firestore under 'expert' collection
      await firestore().collection('expert').doc(user.uid).set({
        name,
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      // Send success message to user
      Alert.alert('Account Created Successfully', 'You can now log in.');

      // Navigate to HomeScreen
      navigation.navigate('Home');

    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset functionality
  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Please enter your email to reset your password.');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Password Reset', 'Check your email for password reset instructions.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expert Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.resetLink} onPress={handlePasswordReset}>
        <Text style={styles.resetText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#6200ea',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetLink: {
    marginTop: 10,
  },
  resetText: {
    color: '#6200ea',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default ExpertSignup;
