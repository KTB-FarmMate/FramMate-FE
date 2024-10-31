// SplashScreen.tsx
import React, {useEffect, useRef} from 'react';
import {Text, Image, Animated, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {RootStackParamList} from '../App';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

const loadMemberId = async () => {
  try {
    let memberId = await AsyncStorage.getItem('memberId');

    if (!memberId) {
      memberId = uuidv4();
      await AsyncStorage.setItem('memberId', memberId);
    }
  } catch (error) {
    console.error('Error loading memberId:', error);
  }
};

export const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const initialize = async () => {
      await loadMemberId(); // loadMemberId가 완료될 때까지 대기

      Animated.timing(opacity, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('FoodGrid');
      });
    };

    initialize();
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
