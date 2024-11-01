// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import SplashScreen from './components/SplashScreen';
import {FoodGrid} from './components/FoodGrid';
import {ChatScreen} from './components/ChatScreen';
import {FoodRegister} from './components/FoodRegister';
import {FoodProvider} from './context/FoodContext';

export type RootStackParamList = {
  Splash: undefined;
  FoodGrid: undefined;
  FoodRegister: {id: number; name: string};
  ChatScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <FoodProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="FoodGrid" component={FoodGrid} />
            <Stack.Screen name="FoodRegister" component={FoodRegister} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </FoodProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
