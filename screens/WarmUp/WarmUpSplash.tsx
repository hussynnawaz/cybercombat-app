import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const WarmUpSplash = ({ navigation }: any) => {
  return (
    <ImageBackground
      source={require('../../assets/warmup3.jpg')} // Replace with your background image path
      style={styles.container}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Warmup1')} // Navigate to Warmup1Screen
        >
          <Text style={styles.buttonText}>Warmup 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Warmup2')} // Navigate to Warmup2Screen
        >
          <Text style={styles.buttonText}>Warmup 2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Warmup3')} // Navigate to Warmup3Screen
        >
          <Text style={styles.buttonText}>Warmup 3</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Warmup4')} // Navigate to Warmup4Screen
        >
          <Text style={styles.buttonText}>Warmup 4</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Warmup5')} // Navigate to Warmup5Screen
        >
          <Text style={styles.buttonText}>Warmup 5</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Warmup6')} // Navigate to Warmup6Screen
        >
          <Text style={styles.buttonText}>Warmup 6</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150, // Set to a fixed size for square buttons
    height: 150,
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Transparent background
    borderRadius: 15, // Optional, gives a slight rounded corner
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default WarmUpSplash;
