// screens/FeedbackScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  KeyboardAvoidingView,
} from 'react-native';
import { Button, Rating } from 'react-native-elements';
import { useTheme } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

// Enable animation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FeedbackScreen = ({ route, navigation }) => {
  const { event } = route.params;
  const { colors } = useTheme();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a star rating.');
      return;
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSubmitting(true);

    const feedbackData = {
      id: Date.now().toString(),
      eventId: event.id,
      rating,
      comment,
      timestamp: new Date().toISOString(),
    };

    try {
      const stored = await AsyncStorage.getItem('feedback');
      const existing = stored ? JSON.parse(stored) : [];
      const updated = [...existing, feedbackData];
      await AsyncStorage.setItem('feedback', JSON.stringify(updated));

      setRating(0);
      setComment('');

      Alert.alert('✅ Thank You!', 'Your feedback has been submitted.');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('❌ Error', 'Could not save feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.wrapper}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: colors.text }]}>{event.title}</Text>

        <Text style={[styles.label, { color: colors.text }]}>🗓️ {moment(event.date).format('dddd, MMM Do YYYY — h:mm A')}</Text>

        <Text style={[styles.label, { color: colors.text, marginTop: 25 }]}>Rate this Event</Text>
        <Rating
          showRating
          startingValue={rating}
          onFinishRating={setRating}
          tintColor={colors.card}
          style={{ marginVertical: 10 }}
        />

        <TextInput
          placeholder="💬 Write your feedback here..."
          placeholderTextColor={colors.placeholder || '#888'}
          multiline
          value={comment}
          onChangeText={setComment}
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text, borderColor: colors.border },
          ]}
        />

        <Button
          title="Submit Feedback"
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          buttonStyle={{
            backgroundColor: colors.primary,
            borderRadius: 12,
            paddingVertical: 14,
          }}
          titleStyle={{ fontSize: 16, fontWeight: '600' }}
          containerStyle={{ marginTop: 24 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    height: 130,
    marginTop: 12,
    textAlignVertical: 'top',
  },
});

export default FeedbackScreen;
