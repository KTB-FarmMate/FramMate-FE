import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {FoodGrid} from './components/FoodGrid.tsx';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FoodGrid />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
