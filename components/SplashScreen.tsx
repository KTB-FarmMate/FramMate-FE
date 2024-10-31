// SplashScreen.tsx
import React, {useEffect, useRef} from 'react';
import {Text, Image, Animated, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {BACKEND_SERVER_URL} from 'react-native-dotenv';
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
      createMemberId();
    }
  } catch (error) {
    console.error('Error loading memberId:', error);
  }
};
const createMemberId = async () => {
  const memberId = uuidv4();
  const requestUrl = `${BACKEND_SERVER_URL}/members`;

  console.log(requestUrl);
  try {
    const response = await fetch(requestUrl, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('서버 응답이 좋지 않습니다.');
    }

    // AsyncStorage에 memberId 저장
    await AsyncStorage.setItem('memberId', memberId);
  } catch (error) {
    console.error('Error creating new memberId:', error);
    return; // 오류 발생 시 함수 종료
  }
};

export const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const initialize = async () => {
      // memberId 로드 비동기 호출
      await loadMemberId();

      // 애니메이션 실행
      await new Promise<void>(resolve => {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }).start(() => {
          resolve(); // 애니메이션이 완료되면 resolve 호출
        });
      });

      // 애니메이션이 완료된 후 화면 전환
      navigation.replace('FoodGrid');
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
