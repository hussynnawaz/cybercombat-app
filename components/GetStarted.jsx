import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const title = 'Welcome to CyberCombat 3D';
//const description = 'Prepare for the ultimate test of strength, strategy, and skill in the world of Mixed Martial Arts. Enter the arena and fight for glory!';

const GetStarted = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/splashimage.jpg')} style={styles.image} />
      
      <View style={styles.textOverlay}>
        <Text style={styles.titleText}>{title}</Text>

      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SplashScreen')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212', // Dark background color
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    top: 50, // Position the text overlay near the top
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
  },
  button: {
    position: 'absolute',
    bottom: 30, // Button at the bottom of the image
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default GetStarted;
