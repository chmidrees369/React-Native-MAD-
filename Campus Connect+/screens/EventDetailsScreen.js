import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Icon, Rating, Button } from 'react-native-elements';
import { useTheme } from '../constants/theme';
import CommentSection from '../components/CommentSection';
import FeedbackForm from '../components/FeedbackForm';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const EventDetailsScreen = ({ route, navigation }) => {
  const { event } = route.params;
  const { colors } = useTheme();
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <Animatable.Image
        animation="fadeIn"
        duration={800}
        source={{ uri: event.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <Animatable.View
        animation="fadeInUp"
        delay={200}
        style={[styles.content, { backgroundColor: colors.card }]}
      >
        <Text style={[styles.title, { color: colors.text }]}>{event.title}</Text>

        <View style={styles.row}>
          <Icon name="event" color={colors.primary} />
          <Text style={[styles.info, { color: colors.text }]}>
            {moment(event.date).format('dddd, MMM Do YYYY - h:mm A')}
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="place" color={colors.primary} />
          <Text style={[styles.info, { color: colors.text }]}>{event.venue}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="category" color={colors.primary} />
          <Text style={[styles.info, { color: colors.text }]}>{event.category}</Text>
        </View>

        <Text style={[styles.description, { color: colors.text }]}>
          {event.description}
        </Text>

        <View style={styles.tags}>
          {event.tags.map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: colors.border }]}>
              <Text style={[styles.tagText, { color: colors.text }]}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.stats}>
          <Text style={[styles.info, { color: colors.text }]}>
            Attendance: {event.attendees}/{event.capacity}
          </Text>
          <Rating
            imageSize={16}
            readonly
            startingValue={event.rating}
            tintColor={colors.card}
          />
        </View>

        <Button
          title="Check-In / View Pass"
          icon={<Icon name="qr-code" color="white" />}
          buttonStyle={{ backgroundColor: colors.primary, marginTop: 16, borderRadius: 8 }}
          onPress={() => navigation.navigate('CheckIn', { event })}
        />

        <Button
          title={showFeedback ? 'Hide Feedback' : 'Give Feedback'}
          type="clear"
          titleStyle={{ color: colors.primary }}
          icon={<Icon name="rate-review" color={colors.primary} />}
          onPress={() => setShowFeedback(!showFeedback)}
        />

        <View style={{ marginTop: 20 }}>
          {showFeedback && <FeedbackForm eventId={event.id} />}
          <CommentSection eventId={event.id} />
        </View>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 230,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -18,
    padding: 20,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  info: {
    marginLeft: 10,
    fontSize: 15,
  },
  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    alignItems: 'center',
  },
});

export default EventDetailsScreen;
