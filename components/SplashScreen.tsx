// SplashScreen.tsx
import React, {useEffect, useRef} from 'react';
import {Text, Image, Animated, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace('FoodGrid'); // 3초 후 FoodGrid로 이동
    });
  }, [navigation, opacity]);

  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.appName}>FarmMate</Text>
      <Text style={styles.tagline}>AI 비서와 함께 시작하는 도시농업</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
});

export default SplashScreen;
