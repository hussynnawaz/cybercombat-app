import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';

const ExpertHome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Register.jpeg')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Create an Account, or Login to and Existing Account</Text>
        <TouchableOpacity style={styles.buttonWrapper}>
          <Button
            title="Expert Login"
            style={styles.button}
            onPress={() => navigation.navigate('ExpertLogin')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper}>
          <Button
            title="Expert Signup"
            style={styles.button}
            onPress={() => navigation.navigate('ExpertSignup')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 30,
  },
  buttonWrapper: {
    marginVertical: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 10,
  },
});

export default ExpertHome;