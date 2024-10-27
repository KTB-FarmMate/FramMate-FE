// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import SplashScreen from './components/SplashScreen';
import {FoodGrid} from './components/FoodGrid';
import {ChatScreen} from './components/ChatScreen';

export type RootStackParamList = {
  Splash: undefined;
  FoodGrid: undefined;
  ChatScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="FoodGrid" component={FoodGrid} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
