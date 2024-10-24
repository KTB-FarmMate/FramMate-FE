import React from 'react';
import {View, TextInput, Image, StyleSheet} from 'react-native';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <View style={styles.searchContainer}>
      <Image
        source={require('../assets/search.png')}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="검색어 입력"
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        autoCorrect={false}
        keyboardType="default"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});
