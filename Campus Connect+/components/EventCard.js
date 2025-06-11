import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import { useTheme } from '../constants/theme';
import moment from 'moment';

const placeholderUri = 'https://via.placeholder.com/800x600?text=No+Image';

const EventCard = ({ event, onPress }) => {
  const { colors } = useTheme();
  const [imageError, setImageError] = useState(false);

  // Sanitize URL: trim whitespace and remove leading '=' characters
  const rawUri = event.image || '';
  const cleanUri = rawUri.trim().replace(/^=+/, '');
  const displayUri = !imageError && cleanUri ? cleanUri : placeholderUri;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <Image
        source={{ uri: displayUri }}
        style={styles.image}
        onError={() => setImageError(true)}
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {event.title}
        </Text>
        <View style={styles.row}>
          <Icon name="event" size={16} color={colors.primary} />
          <Text style={[styles.info, { color: colors.text }]}>  
            {moment(event.date).format('MMM Do, YYYY - h:mm A')}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="place" size={16} color={colors.primary} />
          <Text style={[styles.info, { color: colors.text }]}>
            {event.venue}
          </Text>
        </View>
        <View style={styles.tags}>
          {event.tags.map((tag, idx) => (
            <View key={idx} style={[styles.tag, { backgroundColor: colors.tag }]}>  
              <Text style={[styles.tagText, { color: colors.text }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <Text style={[styles.capacity, { color: colors.text }]}>  
            {event.attendees}/{event.capacity}
          </Text>
          <Rating
            imageSize={14}
            readonly
            startingValue={event.rating}
            tintColor={colors.card}
            style={styles.rating}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  info: {
    marginLeft: 8,
    fontSize: 14,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  capacity: {
    fontSize: 13,
  },
  rating: {
    marginRight: 4,
  },
});

export default EventCard;
