import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Screens/Home/HomeScreen';
import SplashScreen from './src/Screens/Splash/SplashScreen';
import HistoryScreen from './src/Screens/History/HistoryScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}} >
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='History' component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;