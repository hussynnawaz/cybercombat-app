import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

const MuayThaiSplash = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
    
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/warmup.png')} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WarmUpSplash')}>
          <Text style={styles.buttonText}>Warmup</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/muay-thai-bg.jpg')} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MuayThaiCategory')}>
          <Text style={styles.buttonText}>Fight</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, 
  },
  image: {
    width: '100%',
    height: '85%', 
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: 'purple',
    paddingVertical: 20,  
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '80%', 
    marginTop: 20, 
    
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18, 
    textAlign: 'center',
  },
});

export default MuayThaiSplash;
