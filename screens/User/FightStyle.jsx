import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

/**
 * This component displays a screen with three sections, each of which
 * displays a different image and a button with the text "Boxing", "Kick
 * Boxing", or "Muay Thai". When the button is pressed, the component
 * navigates to the corresponding screen.
 */
const FightStyle = ({ navigation }) => {
  console.log('navigation: ', navigation);
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Image
          source={require('../../assets/fight1.png')}
          style={styles.sectionImage}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('Boxing button pressed');
            navigation.navigate('BoxingSplash');
          }}
        >
          <Text style={styles.buttonText}>Boxing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Image
          source={require('../../assets/kb.png')}
          style={styles.sectionImage}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('KickBoxing button pressed');
            navigation.navigate('KickBoxingSplash');
          }}
        >
          <Text style={styles.buttonText}>Kick Boxing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Image
          source={require('../../assets/mt.png')}
          style={styles.sectionImage}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('MuayThai button pressed');
            navigation.navigate('MuayThaiSplash');
          }}
        >
          <Text style={styles.buttonText}>Muay Thai</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sectionImage: {
    width: '100%',
    height: '90%',
    marginBottom: 0,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default FightStyle;