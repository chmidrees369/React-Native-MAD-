// components/ThemeToggle.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { ThemeContext } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Ionicons name={isDark ? 'moon' : 'sunny'} size={22} color={isDark ? '#facc15' : '#f97316'} />
      <Text style={[styles.label, { color: isDark ? '#facc15' : '#333' }]}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Switch value={isDark} onValueChange={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e2e8f0',
    justifyContent: 'space-between',
    elevation: 2,
  },
  label: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ThemeToggle;
