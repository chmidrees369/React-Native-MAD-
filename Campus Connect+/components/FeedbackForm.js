// components/FeedbackForm.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { Rating, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../constants/theme';

const FeedbackForm = ({ eventId }) => {
  const { colors } = useTheme();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (!rating) {
      Alert.alert('Rating Required', 'Please provide a star rating.');
      return;
    }

    const feedback = {
      id: Date.now().toString(),
      rating,
      comment,
      eventId,
      timestamp: new Date().toISOString(),
    };

    const saved = await AsyncStorage.getItem('feedback');
    const existing = saved ? JSON.parse(saved) : [];
    const updated = [...existing, feedback];

    await AsyncStorage.setItem('feedback', JSON.stringify(updated));
    Alert.alert('Thank You!', 'Your feedback has been submitted.');
    setRating(0);
    setComment('');
  };

  return (
    <View style={styles.container}>
      <Rating
        showRating
        startingValue={rating}
        onFinishRating={setRating}
        tintColor={colors.card}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Write your feedback..."
        placeholderTextColor={colors.text}
        value={comment}
        onChangeText={setComment}
        multiline
        style={[
          styles.input,
          { color: colors.text, borderColor: colors.border },
        ]}
      />
      <Button
        title="Submit Feedback"
        onPress={handleSubmit}
        buttonStyle={{ backgroundColor: colors.primary, borderRadius: 10 }}
        containerStyle={{ marginTop: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
  },
});

export default FeedbackForm;
