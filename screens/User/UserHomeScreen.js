import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const UserHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/bruce-lee.jpg')} // Replace with your image path
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FightStyle')}
        >
          <Text style={styles.buttonText}>Choose your fighting style</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '90%',
    height: '80%',
    resizeMode: 'cover',
  },
  contentContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserHomeScreen;
