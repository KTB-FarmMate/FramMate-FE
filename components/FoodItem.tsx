// FoodItem.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

interface FoodItemProps {
  name: string;
  image: ImageSourcePropType;
  isActive: boolean;
}

type FoodItemNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FoodGrid'
>;

export const FoodItem: React.FC<FoodItemProps> = ({name, image, isActive}) => {
  const navigation = useNavigation<FoodItemNavigationProp>();

  const handlePress = () => {
    if (isActive) {
      navigation.navigate('ChatScreen');
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={[styles.image, !isActive && styles.grayscale]}
        />
        {!isActive && <View style={styles.overlay} />}
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  imageContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  grayscale: {
    opacity: 0.5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoodItem;
