// components/CommentSection.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../constants/theme';
import moment from 'moment';

const CommentSection = ({ eventId }) => {
  const { colors } = useTheme();
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(`comments_${eventId}`);
      if (saved) setComments(JSON.parse(saved));
    })();
  }, [eventId]);

  const handleAdd = async () => {
    const newComment = {
      id: Date.now().toString(),
      user: 'You',
      text: input.trim(),
      timestamp: new Date().toISOString(),
    };
    const updated = [...comments, newComment];
    setComments(updated);
    await AsyncStorage.setItem(`comments_${eventId}`, JSON.stringify(updated));
    setInput('');
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={[styles.header, { color: colors.text }]}>Comments</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Avatar
              rounded
              title={item.user.charAt(0)}
              containerStyle={{ backgroundColor: colors.primary }}
            />
            <View style={styles.textBox}>
              <Text style={[styles.name, { color: colors.text }]}>{item.user}</Text>
              <Text style={[styles.text, { color: colors.text }]}>{item.text}</Text>
              <Text style={[styles.time, { color: colors.text }]}>
                {moment(item.timestamp).fromNow()}
              </Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Add a comment..."
          placeholderTextColor={colors.text}
          value={input}
          onChangeText={setInput}
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.border },
          ]}
        />
        <TouchableOpacity onPress={handleAdd} disabled={!input.trim()}>
          <Icon name="send" color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  comment: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  textBox: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
  },
  text: {
    marginVertical: 2,
  },
  time: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    fontSize: 14,
  },
});

export default CommentSection;
