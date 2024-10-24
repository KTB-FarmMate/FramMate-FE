import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FoodItem} from './FoodItem';
import {SearchBar} from './SearchBar';

const foodData = [
  {
    id: 1,
    name: '감자',
    image: require('../assets/potato.png'),
    isActive: true,
  },
  {
    id: 2,
    name: '토마토',
    image: require('../assets/tomato.png'),
    isActive: true,
  },
  {
    id: 3,
    name: '양파',
    image: require('../assets/onion.png'),
    isActive: false,
  },
  {
    id: 4,
    name: '고구마',
    image: require('../assets/sweet-potato.png'),
    isActive: false,
  },
];

export const FoodGrid = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFoodData = foodData.filter(food =>
    food.name.includes(searchQuery),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>작물 목록</Text>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <View style={styles.gridContainer}>
        {filteredFoodData.map(food => (
          <FoodItem
            key={food.id}
            name={food.name}
            image={food.image}
            isActive={food.isActive}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
