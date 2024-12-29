import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const KickBoxingCategory = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Image source={require('../../assets/kickboxing-bg1.jpg')} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('KickBoxingBasic')}>
          <Text style={styles.buttonText}>Basic</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Image source={require('../../assets/kickboxing-bg2.jpg')} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('KickBoxingIntermediate')}>
          <Text style={styles.buttonText}>Intermediate</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Image source={require('../../assets/kickboxing-bg3.png')} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('KickBoxingAdvanced')}>
          <Text style={styles.buttonText}>Advanced</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,  
    margin: 0, 
    backgroundColor: '#fff', 
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,  
  },
  image: {
    width: '100%',
    height: '80%',  
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#000', 
    paddingVertical: 20,  
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%', 
    marginTop: 0,  
    marginBottom: 10,  
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,  
    fontWeight: 'bold',
    textAlign: 'center',  
  },
});
export default KickBoxingCategory;
