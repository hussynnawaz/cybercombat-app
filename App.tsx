import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './screens/SplashScreen';
import UserHome from './screens/User/UserHome';
import ExpertHome from './screens/Expert/ExpertHome';
import UserSignup from './screens/User/UserSignup';
import ForgotPassword from './screens/ForgotPassword';
import ExpertSignup from './screens/Expert/ExpertSignup';
import UserLogin from './screens/User/UserLogin.jsx';
import UserHomeScreen from './screens/User/UserHomeScreen';
import FightStyle from './screens/User/FightStyle';
import BoxingSplash from './screens/Boxing/BoxingSplash';
import WarmUpSplash from './screens/WarmUp/WarmUpSplash';
import Warmup1 from './screens/WarmUp/Warmup1';
import BoxingCategory from './screens/Boxing/BoxingCategory';
import KickBoxingSplash from './screens/KickBoxing/KickBoxingSplash';
import ExpertDashboard from './screens/Expert/ExpertDashboard';
import ExpertLogin from './screens/Expert/ExpertLogin';
import Warmup2 from './screens/WarmUp/Warmup2';
import Warmup3 from './screens/WarmUp/Warmup3';
import Warmup4 from './screens/WarmUp/Warmup4';
import Warmup5 from './screens/WarmUp/Warmup5';
import Warmup6 from './screens/WarmUp/Warmup6';
import BoxingBasic from './screens/Boxing/BoxingBasic';
import BoxingAdvanced from './screens/Boxing/BoxingAdvanced';
import GetStarted from './screens/GetStarted.jsx';
import MuayThaiSplash from './screens/MuayThai/MuayThaiSplash';
import MuayThaiCategory from './screens/MuayThai/MuayThaiCategory';
import MuayThaiBasic from './screens/MuayThai/MuayThaiBasic';
import MuayThaiIntermediate from './screens/MuayThai/MuayThaiIntermediate';
import MuayThaiAdvanced from './screens/MuayThai/MuayThaiAdvanced';
import KickBoxingBasic from './screens/KickBoxing/KickBoxingBasic';
import KickBoxingAdvanced from './screens/KickBoxing/KickBoxingAdvanced';
import KickBoxingIntermediate from './screens/KickBoxing/KickBoxingIntermediate';
import KickBoxingCategory from './screens/KickBoxing/KickBoxingCategory';
import BoxingIntermediate from './screens/Boxing/BoxingIntermediate.jsx';
import ProgressScreen from './screens/ProgressScreen.jsx';
import UploadScreen from './screens/User/UploadScreen'
import React from 'react';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: { height: 60 },
    }}>
    <Tab.Screen name="Home" component={UserHomeScreen} />
    <Tab.Screen name="Profile" component={UserHome} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="UserSignup" component={UserSignup} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ExpertSignup" component={ExpertSignup} />
          <Stack.Screen name="UserLogin" component={UserLogin} />
          <Stack.Screen name="FightStyle" component={FightStyle} />
          <Stack.Screen name="BoxingSplash" component={BoxingSplash} />
          <Stack.Screen name="BoxingCategory" component={BoxingCategory} />
          <Stack.Screen name="UserHomeScreen" component={HomeTabs} />
          <Stack.Screen name="ExpertHome" component={ExpertHome} />
          <Stack.Screen name="UserHome" component={UserHome} />
          <Stack.Screen name="WarmUpSplash" component={WarmUpSplash} />
          <Stack.Screen name="Warmup1" component={Warmup1} />
          <Stack.Screen name="KickBoxingSplash" component={KickBoxingSplash} />
          <Stack.Screen name="ExpertDashboard" component={ExpertDashboard} />
          <Stack.Screen name="ExpertLogin" component={ExpertLogin} />
          <Stack.Screen name="Warmup2" component={Warmup2} />
          <Stack.Screen name="Warmup3" component={Warmup3} />
          <Stack.Screen name="Warmup4" component={Warmup4} />
          <Stack.Screen name="Warmup5" component={Warmup5} />
          <Stack.Screen name="Warmup6" component={Warmup6} />
          <Stack.Screen name="BoxingBasic" component={BoxingBasic} />
          <Stack.Screen name="BoxingIntermediate" component={BoxingIntermediate} />
          <Stack.Screen name="BoxingAdvanced" component={BoxingAdvanced} />
          <Stack.Screen name="MuayThaiSplash" component={MuayThaiSplash} />
          <Stack.Screen name="MuayThaiCategory" component={MuayThaiCategory} />
          <Stack.Screen name="MuayThaiBasic" component={MuayThaiBasic} />
          <Stack.Screen name="MuayThaiIntermediate" component={MuayThaiIntermediate} />
          <Stack.Screen name="MuayThaiAdvanced" component={MuayThaiAdvanced} />
          <Stack.Screen name="KickBoxingCategory" component={KickBoxingCategory} />
          <Stack.Screen name="KickBoxingBasic" component={KickBoxingBasic} />
          <Stack.Screen name="KickBoxingAdvanced" component={KickBoxingAdvanced} />
          <Stack.Screen name="KickBoxingIntermediate" component={KickBoxingIntermediate} />
          <Stack.Screen name="ProgressScreen" component={ProgressScreen} />
          <Stack.Screen name="UploadScreen" component={UploadScreen} />
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
