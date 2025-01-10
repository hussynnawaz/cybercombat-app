import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';


/**
 * This is the UserHome component, which is the first screen that the user will see when they open the app.
 * It displays a background image, and then overlays two buttons on top of it.
 * The first button is labeled "User Login", and navigates to the UserLogin screen when pressed.
 * The second button is labeled "User Signup", and navigates to the UserSignup screen when pressed.
 */
const UserHome = () => {
  // Get a reference to the navigation object, which allows us to navigate between screens
  const navigation = useNavigation();

  // Return a JSX element that represents the UserHome screen
  return (
    // The outermost View element represents the entire screen
    <View style={styles.container}>
      // This Image element displays the background image
      <Image
        // The source of the image is the Register.jpeg image from the assets folder
        source={require('../../assets/Register.jpeg')}
        // The style prop is used to set the size and position of the image
        style={styles.backgroundImage}
      />
      // This View element represents the overlay that contains the two buttons
      <View style={styles.overlay}>
        // This Text element displays the title of the screen
        <Text style={styles.title}>Welcome</Text>
        // This Text element displays the subtitle of the screen
        <Text style={styles.subtitle}>Create an Account, or Login to and Existing Account</Text>
        // This TouchableOpacity element is wrapped around the first button, and is used to respond to presses
        <TouchableOpacity style={styles.buttonWrapper}>
          // This Button element is the first button, and is labeled "User Login"
          <Button
            title="User Login"
            // The style prop is used to set the size and position of the button
            style={styles.button}
            // The onPress prop is used to set the callback function that will be called when the button is pressed
            onPress={() => navigation.navigate('UserLogin')}
          />
        </TouchableOpacity>
        // This TouchableOpacity element is wrapped around the second button, and is used to respond to presses
        <TouchableOpacity style={styles.buttonWrapper}>
          // This Button element is the second button, and is labeled "User Signup"
          <Button
            title="User Signup"
            // The style prop is used to set the size and position of the button
            style={styles.button}
            // The onPress prop is used to set the callback function that will be called when the button is pressed
            onPress={() => navigation.navigate('UserSignup')}
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

export default UserHome;