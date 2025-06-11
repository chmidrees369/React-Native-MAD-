// screens/FeedScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../constants/theme';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

const FeedScreen = () => {
  const { colors } = useTheme();
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const feedbackRaw = await AsyncStorage.getItem('feedback');
        const feedbackData = feedbackRaw ? JSON.parse(feedbackRaw) : [];

        const commentsRaw = await AsyncStorage.getItem('comments');
        const commentsData = commentsRaw ? JSON.parse(commentsRaw) : [];

        const combined = [...feedbackData, ...commentsData]
          .map(item => ({
            id: item.id,
            type: item.rating ? 'Feedback' : 'Comment',
            text: item.comment || item.text,
            user: item.user || 'Anonymous',
            timestamp: item.timestamp,
          }))
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setFeedItems(combined);
      } catch (e) {
        console.error('Failed to load feed', e);
      } finally {
        setLoading(false);
      }
    };

    loadFeed();
  }, []);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10, color: colors.text }}>Loading feed...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Activity Feed</Text>

      {feedItems.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.text }]}>No recent activity yet.</Text>
      ) : (
        <FlatList
          data={feedItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animatable.View animation="fadeInUp" delay={index * 100}>
              <Card containerStyle={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.row}>
                  <Avatar
                    rounded
                    title={item.user.charAt(0)}
                    containerStyle={{ backgroundColor: colors.primary }}
                  />
                  <View style={styles.info}>
                    <Text style={[styles.user, { color: colors.text }]}>{item.user}</Text>
                    <Text style={[styles.timestamp, { color: colors.text }]}>
                      {moment(item.timestamp).format('MMM D, YYYY • h:mm A')}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.content, { color: colors.text }]}>
                  {item.type === 'Feedback' ? '⭐ Feedback: ' : '💬 Comment: '}
                  {item.text}
                </Text>
              </Card>
            </Animatable.View>
          )}
          contentContainerStyle={{ paddingBottom: 30 }}
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
    paddingTop: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  info: {
    marginLeft: 10,
  },
  user: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
  },
  content: {
    fontSize: 15,
    marginTop: 6,
    lineHeight: 20,
  },
});

export default FeedScreen;
