import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
// import splashimage from '../assets/splashimage.jpeg';

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splashimage.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Please Login or Signup to Continue</Text>
        <TouchableOpacity style={styles.buttonWrapper}>
          <Button
            title="User"
            style={styles.button}
            onPress={() => navigation.navigate('UserHome')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper}>
          <Button
            title="Expert"
            style={styles.button}
            onPress={() => navigation.navigate('ExpertHome')}
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

export default SplashScreen;
