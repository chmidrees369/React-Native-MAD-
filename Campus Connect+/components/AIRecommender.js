// components/AIRecommender.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mockEvents from '../data/mockEvents.json';
import { useTheme } from '../constants/theme';
import EventCard from './EventCard';

const AIRecommender = ({ navigation }) => {
  const { colors } = useTheme();
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const saved = await AsyncStorage.getItem('preferences');
        const prefs = saved ? JSON.parse(saved) : [];

        // Match events with any tag found in user's preferences
        const matched = mockEvents.filter(event =>
          event.tags.some(tag => prefs.includes(tag))
        );

        // Fallback if no preferences or matches found
        const fallback = mockEvents.slice(0, 3);
        setRecommended(matched.length > 0 ? matched : fallback);
      } catch (e) {
        console.error('AIRecommender error:', e);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={[styles.header, { color: colors.text }]}>🔥 AI Suggested Events For You</Text>

      {recommended.length === 0 ? (
        <Text style={{ color: colors.text, marginLeft: 16 }}>No recommendations at this time.</Text>
      ) : (
        <FlatList
          data={recommended}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <EventCard event={item} onPress={() => navigation.navigate('EventDetails', { event: item })} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
  },
});

export default AIRecommender;
