// screens/FeedbackListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../constants/theme';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

const FeedbackListScreen = ({ route }) => {
  const { event } = route.params;
  const { colors } = useTheme();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const saved = await AsyncStorage.getItem(`comments_${event.id}`);
        const parsed = saved ? JSON.parse(saved) : [];
        setComments(parsed.reverse());
      } catch (e) {
        console.error('Failed to load comments', e);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [event.id]);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10, color: colors.text }}>Loading comments...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Feedback for: {event.title}</Text>

      {comments.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.text }]}>No comments yet.</Text>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animatable.View animation="fadeInUp" duration={600} delay={index * 100}>
              <Card containerStyle={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.row}>
                  <Avatar
                    rounded
                    title={item.user.charAt(0).toUpperCase()}
                    containerStyle={{ backgroundColor: colors.primary }}
                  />
                  <View style={styles.info}>
                    <Text style={[styles.name, { color: colors.text }]}>{item.user}</Text>
                    <Text style={[styles.timestamp, { color: colors.text }]}>
                      {moment(item.timestamp).format('MMM D, YYYY — h:mm A')}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.comment, { color: colors.text }]}>{item.text}</Text>
              </Card>
            </Animatable.View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
  card: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
  },
  comment: {
    fontSize: 15,
    marginTop: 6,
  },
});

export default FeedbackListScreen;
