// components/SearchFilter.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/theme';

const SearchFilter = ({ query, onSearch }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Ionicons name="search" size={20} color={colors.text} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder="Search events by name, tag, or category..."
        placeholderTextColor={colors.placeholder}
        value={query}
        onChangeText={onSearch}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchFilter;
