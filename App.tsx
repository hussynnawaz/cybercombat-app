import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from './screens/SplashScreen';
import UserHome from './screens/User/UserHome';  
import ExpertHome from './screens/Expert/ExpertHome';
import UserSignup from './screens/User/UserSignup';
import ForgotPassword from './screens/ForgotPassword';
import ExpertSignup from './screens/Expert/ExpertSignup';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} /> 
        <Stack.Screen name="UserHome" component={UserHome} />      
        <Stack.Screen name="ExpertHome" component={ExpertHome} />
        <Stack.Screen name="UserSignup" component={UserSignup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ExpertSignup" component={ExpertSignup} />
        </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});