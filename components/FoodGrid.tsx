import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FoodItem} from './FoodItem';
import {SearchBar} from './SearchBar';
import {useFoodContext} from '../context/FoodContext'; // Adjust the path as necessary

export const FoodGrid = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {foods} = useFoodContext();

  const filteredFoodData = foods.filter(food =>
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
