// components/EventList.js
import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import EventCard from './EventCard';
import { useTheme } from '../constants/theme';

const EventList = ({ events, onEventPress }) => {
  const { colors } = useTheme();

  if (!events || events.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.text }]}>
          No events found. Try adjusting your search or check back later.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <EventCard event={item} onPress={() => onEventPress(item)} />
      )}
      contentContainerStyle={{ paddingBottom: 80 }}
      style={{ marginHorizontal: 8 }}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EventList;
