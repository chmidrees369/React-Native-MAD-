// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import EventCard from '../components/EventCard';
import AIRecommender from '../components/AIRecommender';
import { useTheme } from '../constants/theme';
import mockData from '../data/mockEvents.json';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');

  useEffect(() => {
    setEvents(mockData);
    const cats = ['All', ...new Set(mockData.map(e => e.category))];
    setCategories(cats);
  }, []);

  const filtered = events.filter(e => {
    const matchText =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchCat = selectedCat === 'All' || e.category === selectedCat;
    return matchText && matchCat;
  });

  const renderEvent = ({ item, index }) => (
    <Animatable.View animation="fadeInUp" delay={200 + index * 50} useNativeDriver>
      <EventCard
        event={item}
        onPress={() => navigation.navigate('EventDetails', { event: item })}
      />
    </Animatable.View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>  
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header, Search, Categories */}
        <Animatable.View animation="slideInDown" duration={800} style={styles.header}>
          <Text style={[styles.title, { color: colors.primary }]}>CampusConnect+</Text>
          <View
            style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Icon name="search" size={20} color={colors.placeholder} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search events..."
              placeholderTextColor={colors.placeholder}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <View style={styles.categoriesWrap}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.catChip,
                  {
                    backgroundColor: selectedCat === cat ? colors.primary : colors.card,
                    borderColor: selectedCat === cat ? colors.primary : colors.border
                  }
                ]}
                onPress={() => setSelectedCat(cat)}
              >
                <Text style={{ color: selectedCat === cat ? '#fff' : colors.text }}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animatable.View>

        {filtered.length === 0 ? (
          <Text style={[styles.noResult, { color: colors.text }]}>😕 No events match your search.</Text>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={item => item.id.toString()}
            renderItem={renderEvent}
            // Show AI suggestions at top but allow it to scroll away
            ListHeaderComponent={
              <Animatable.View animation="fadeInUp" delay={500} style={styles.recommendWrapper} useNativeDriver>
                <AIRecommender navigation={navigation} />
              </Animatable.View>
            }
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  header: { paddingTop: 12, paddingHorizontal: 16, paddingBottom: 8, zIndex: 1 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 12
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16 },
  categoriesWrap: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  catChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8
  },
  recommendWrapper: { paddingHorizontal: 16, paddingVertical: 8 },
  list: { paddingBottom: 30 },
  noResult: { textAlign: 'center', marginTop: 40, fontSize: 16, fontStyle: 'italic' }
});

export default HomeScreen;
